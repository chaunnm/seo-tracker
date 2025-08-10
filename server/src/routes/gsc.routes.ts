import { Router } from "express";
import { google } from "googleapis";
import { verifySession } from "../services";
import { User } from "../models";
import { oauth2Client } from "../config";

const r = Router();

// middleware ngắn: đổi refresh_token -> access_token
async function attachAccessToken(req: any, res: any, next: any) {
  const payload = verifySession(req.cookies?.session);
  if (!payload?.uid) return res.status(401).json({ error: "UNAUTHENTICATED" });

  const user = await User.findById(payload.uid);
  if (!user?.refreshToken)
    return res.status(401).json({ error: "NO_REFRESH_TOKEN" });

  oauth2Client.setCredentials({ refresh_token: user.refreshToken });
  const { token } = await oauth2Client.getAccessToken();
  req.accessToken = token;
  next();
}

r.get("/sites", attachAccessToken, async (req, res) => {
  const sc = google.searchconsole({
    version: "v1",
    headers: { Authorization: `Bearer ${req.accessToken}` },
  });
  const sites = await sc.sites.list({});
  // Chuẩn hóa ngắn gọn
  const items = (sites.data.siteEntry ?? [])
    .filter((s) => s.permissionLevel !== "siteUnverifiedUser")
    .map((s) => ({ siteUrl: s.siteUrl, permissionLevel: s.permissionLevel }));
  res.json(items);
});

type PerfBody = {
  siteUrl: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  dimensions?: string[]; // mặc định ["date"]
  rowLimit?: number; // mặc định 1000
  filters?: {
    type: "page" | "query" | "country" | "device";
    operator?: "equals" | "contains" | "notContains" | "notEquals";
    expression: string;
  }[];
};

r.post("/performance", attachAccessToken, async (req, res) => {
  const body = req.body as PerfBody;
  const sc = google.searchconsole({
    version: "v1",
    headers: { Authorization: `Bearer ${req.accessToken}` },
  });

  const dimensionFilterGroups = body.filters?.length
    ? [
        {
          groupType: "and",
          filters: body.filters.map((f) => ({
            dimension: f.type,
            operator: f.operator?.toUpperCase() ?? "EQUALS",
            expression: f.expression,
          })),
        },
      ]
    : undefined;

  const data = await sc.searchanalytics.query({
    siteUrl: body.siteUrl,
    requestBody: {
      startDate: body.startDate,
      endDate: body.endDate,
      dimensions: body.dimensions ?? ["date"],
      rowLimit: body.rowLimit ?? 1000,
      dimensionFilterGroups,
    },
  });

  res.json({
    rows: data.data.rows ?? [],
    responseAggregationType: data.data.responseAggregationType,
  });
});

export default r;
