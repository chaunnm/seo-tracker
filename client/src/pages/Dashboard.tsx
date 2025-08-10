import { useAutoNs } from "../hooks/useNs";

export default function Dashboard() {
  const { t } = useAutoNs(import.meta.url);
  return (
    <div>
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p>{t("summary.totalClicks", { value: 2980 })}</p>
    </div>
  );
}
