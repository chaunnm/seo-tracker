import { useEffect, useMemo, useState } from "react";
import {
  // LineChart,
  // Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  // Legend,
  Area,
  AreaChart,
} from "recharts";
import { queryPerformance } from "../../services";
import type { PerfRow } from "../../interfaces";

type Props = { siteUrl: string };
const fmt = (d: string) => d; // có thể format ngày tùy ý

export default function DomainCard({ siteUrl }: Props) {
  const [rows, setRows] = useState<PerfRow[]>([]);
  const [loading, setLoading] = useState(true);

  // khoảng thời gian 6 tháng gần nhất
  const { startDate, endDate } = useMemo(() => {
    const end = new Date(); // hôm nay
    const start = new Date();
    start.setMonth(end.getMonth() - 6);
    const toIso = (d: Date) => d.toISOString().slice(0, 10);
    return { startDate: toIso(start), endDate: toIso(end) };
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { rows } = await queryPerformance({
          siteUrl,
          startDate,
          endDate,
        });
        setRows(rows);
      } finally {
        setLoading(false);
      }
    })();
  }, [siteUrl, startDate, endDate]);

  const data = useMemo(
    () =>
      rows.map((r) => ({
        date: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
      })),
    [rows]
  );

  const totals = useMemo(() => {
    let clicks = 0,
      impressions = 0;
    for (const r of rows) {
      clicks += r.clicks;
      impressions += r.impressions;
    }
    return { clicks, impressions };
  }, [rows]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <a
          href={siteUrl}
          target="_blank"
          className="font-semibold hover:underline"
        >
          {siteUrl}
        </a>
        <div className="text-sm text-gray-500">
          ✨ {totals.clicks.toLocaleString()} &nbsp; 👁{" "}
          {totals.impressions.toLocaleString()}
        </div>
      </div>

      <div className="mt-3 h-40">
        {loading ? (
          <div className="h-full grid place-items-center text-gray-500">
            Loading…
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient id="imp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="clk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickFormatter={fmt} hide />
              <YAxis hide />
              <Tooltip
                formatter={(v: number, n) => [v.toLocaleString(), n]}
                labelFormatter={(l) => `Date: ${l}`}
              />
              <Area
                type="monotone"
                dataKey="impressions"
                stroke="#8b5cf6"
                fill="url(#imp)"
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#3b82f6"
                fill="url(#clk)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* action icon row (optional) */}
      <div className="mt-2 flex items-center gap-3 text-gray-400 text-sm">
        <button className="hover:text-gray-700">☆</button>
        <button className="hover:text-gray-700">👁</button>
        <button className="hover:text-gray-700">🔗</button>
      </div>
    </div>
  );
}
