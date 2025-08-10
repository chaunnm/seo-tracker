import type { ReactNode } from "react";
import { Navigation } from "../components";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navigation />
      {/* <Topbar /> */}
      <div className="main-container">{children}</div>
    </>
  );
}
