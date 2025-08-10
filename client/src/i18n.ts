import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { namespaces } from "./interfaces";

const stored = localStorage.getItem("app_lang") || "en";

void i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`)
    )
  )
  .init({
    lng: stored,
    fallbackLng: "en",
    ns: namespaces,
    defaultNS: "common",
    interpolation: { escapeValue: false },
    // Important: allow Suspense to wait for JSON loading
    react: { useSuspense: true },
  });

export default i18n;
