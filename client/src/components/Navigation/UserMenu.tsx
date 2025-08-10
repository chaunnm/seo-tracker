import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { userMenuItems } from "./UserMenuItem";
import { useAuth } from "../../contexts";

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [privacyBlur, setPrivacyBlur] = useState(false);
  const [layoutCompact, setLayoutCompact] = useState<boolean>(() => {
    return localStorage.getItem("layout_mode") === "compact";
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleLayout = () => {
    setLayoutCompact((v) => {
      const next = !v;
      localStorage.setItem("layout_mode", next ? "compact" : "default");
      return next;
    });
  };

  // Close on outside click / Esc
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // Đổi route thì đóng menu
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar button */}
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 bg-gray-50">
          <img
            src={user?.picture || "/favicon.ico"}
            alt={user?.name ?? "User"}
            className="w-full h-full object-cover"
          />
        </div>
        <svg
          className={`w-4 h-4 text-gray-600 transition ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.25 7.5l4.5 4.5 4.5-4.5H5.25z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden z-50"
        >
          {/* Header */}
          <div className="px-4 py-3">
            <div className="text-gray-900 font-semibold">
              {user?.name || "Guest"}
            </div>
            <div className="text-gray-500 text-sm">{user?.email || ""}</div>
          </div>
          <hr />

          {/* Items */}
          <div className="py-1 text-sm">
            {userMenuItems.map((item, idx) => {
              // Toggles
              if (item.type === "toggle") {
                if (item.key === "privacyBlur") {
                  return (
                    <button
                      key={idx}
                      className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
                      onClick={() => setPrivacyBlur((s) => !s)}
                    >
                      <span className="flex items-center gap-2">
                        {typeof item.icon === "string" ? (
                          <span>{item.icon}</span>
                        ) : item.icon ? (
                          <item.icon className="w-4 h-4" />
                        ) : null}
                        {t("userNav.privacyBlur")}
                      </span>
                      <span
                        className={`text-xs ${
                          privacyBlur ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {privacyBlur ? t("toogle.on") : t("toogle.off")}
                      </span>
                    </button>
                  );
                }
                // layout toggle
                return (
                  <button
                    key={idx}
                    className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
                    onClick={toggleLayout}
                  >
                    <span className="flex items-center gap-2">
                      {typeof item.icon === "string" ? (
                        <span>{item.icon}</span>
                      ) : item.icon ? (
                        <item.icon className="w-4 h-4" />
                      ) : null}
                      {t("userNav.layout")}
                    </span>
                    <span
                      className={`text-xs ${
                        layoutCompact ? "text-green-600" : "text-blue-600"
                      }`}
                    >
                      {layoutCompact ? t("toogle.default") : t("toogle.wide")}
                    </span>
                  </button>
                );
              }

              // Sign out (link-like action)
              if (item.key === "signOut") {
                return (
                  <button
                    key={idx}
                    onClick={logout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600"
                  >
                    {t(`userNav.${item.key}`)}
                  </button>
                );
              }

              // Normal link item
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2">
                    {typeof item.icon === "string" ? (
                      <span>{item.icon}</span>
                    ) : item.icon ? (
                      <item.icon className="w-4 h-4" />
                    ) : null}
                    <span>{t(`userNav.${item.key}`)}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* --- tiny subcomponents --- */
// const MenuItem = ({
//   label,
//   subLabel,
//   icon,
// }: {
//   label: string;
//   subLabel?: string;
//   icon?: string;
// }) => (
//   <button className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50">
//     <span className="flex items-center gap-2">
//       {icon ? <span>{icon}</span> : null}
//       <span>{label}</span>
//     </span>
//     {subLabel ? (
//       <span className="text-xs text-gray-400">{subLabel}</span>
//     ) : null}
//   </button>
// );

// const LangButton = ({
//   active,
//   label,
//   flag,
//   onClick,
// }: {
//   active: boolean;
//   label: string;
//   flag: string;
//   onClick: () => void;
// }) => (
//   <button
//     onClick={onClick}
//     className={`px-3 py-1 rounded-md border text-sm flex items-center gap-2 transition
//       ${
//         active
//           ? "border-green-500 text-green-700 bg-green-50"
//           : "border-gray-200 text-gray-700 hover:bg-gray-50"
//       }`}
//   >
//     <span className="text-base">{flag}</span>
//     {label}
//   </button>
// );
