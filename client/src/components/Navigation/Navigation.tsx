import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UserMenu } from "./UserMenu";

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLang = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("app_lang", lng);
    setOpen(false);
  };

  const flag = i18n.language.startsWith("vi") ? "🇻🇳" : "🇬🇧";

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      {/* Logo + brand */}
      <div className="flex items-center gap-2">
        <img src="/logo-lenart-text-black.png" alt="Logo" className="h-6" />
        <span className="font-semibold text-lg">{t("brand")}</span>
      </div>

      <div className="flex-1" />

      <div className="relative flex items-center gap-3">
        {/* <button className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm hover:bg-green-200">
          {t("upgrade")}
        </button> */}

        {/* Language switcher */}
        <button
          onClick={() => setOpen((s) => !s)}
          className="flex items-center gap-2 px-2 py-1 rounded-md border hover:bg-gray-100"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <span className="text-xl">{flag}</span>
          <span className="text-sm text-gray-700">{t("language")}</span>
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 top-10 w-40 bg-white border rounded-md shadow-lg overflow-hidden"
          >
            <button
              role="menuitem"
              onClick={() => changeLang("en")}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
            >
              🇬🇧 {t("english")}
            </button>
            <button
              role="menuitem"
              onClick={() => changeLang("vi")}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
            >
              🇻🇳 {t("vietnamese")}
            </button>
          </div>
        )}

        {/* UserMenu */}
        {/* <div className="w-8 h-8 rounded-full overflow-hidden border">
          <img
            src="/avatar.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div> */}
        <UserMenu
          name="Ngọc Minh Châu Nguyễn"
          email="nnmchau.lenart@gmail.com"
        />
      </div>
    </nav>
  );
}
