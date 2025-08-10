import type { PerfRow, SiteItem } from "../interfaces";

const API = import.meta.env.VITE_API_URL as string;

export async function listSites(): Promise<SiteItem[]> {
  const r = await fetch(`${API}/gsc/sites`, { credentials: "include" });
  if (!r.ok) throw new Error("Failed to load sites");
  return r.json();
}

export async function queryPerformance(params: {
  siteUrl: string;
  startDate: string;
  endDate: string;
  filters?: {
    type: "page" | "query" | "country" | "device";
    operator?: "equals" | "contains" | "notContains" | "notEquals";
    expression: string;
  }[];
}) {
  const r = await fetch(`${API}/gsc/performance`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!r.ok) throw new Error("Failed to load performance");
  return r.json() as Promise<{ rows: PerfRow[] }>;
}
