import { useEffect, useState } from "react";
import { listSites } from "../services";
import { DomainCard } from "../components";

export default function Dashboard() {
  const [sites, setSites] = useState<{ siteUrl: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await listSites();
        setSites(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading sites...</div>;
  if (!sites.length) return <div className="p-6">No verified sites found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {sites.map((s) => (
        <DomainCard key={s.siteUrl} siteUrl={s.siteUrl} />
      ))}
    </div>
  );
}
