"use client";

import { ReactNode, useState } from "react";
import HeaderLandingPage from "@/components/landing-page/layout/header-landing-page";
import SidebarLandingPage from "@/components/landing-page/layout/sidebar-landing-page";
import Footer from "@/components/landing-page/layout/footer";
import Trial from "@/components/landing-page/layout/trial";

interface LayoutDashboardProps {
  children: ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <section>
      <SidebarLandingPage isOpen={isSidebarOpen} onClose={closeSidebar} />
      <HeaderLandingPage onToggleSidebar={toggleSidebar} />
      {children}
      <Trial/>
      <Footer />
    </section>
  );
};

export default LayoutDashboard;
