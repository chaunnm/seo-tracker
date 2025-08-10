import { IoMdSettings } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import type { UserMenuItem } from "../../interfaces";

export const userMenuItems: UserMenuItem[] = [
  { key: "account", type: "link", path: "/account", icon: FaRegUserCircle },
  { key: "teamClients", type: "link", path: "/account", icon: HiUsers },

  // 2 toggle
  { key: "privacyBlur", type: "toggle", icon: "📷" },
  { key: "layout", type: "toggle", icon: "🔲" },

  { key: "giveFeedback", type: "link", path: "/feedback", icon: "💬" },
  { key: "needHelp", type: "link", path: "/help", icon: IoMdSettings },
  { key: "signOut", type: "link", path: "/logout", icon: MdOutlineLogout },
];
