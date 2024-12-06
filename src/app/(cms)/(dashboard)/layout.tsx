"use client";

import { ReactNode, useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
// import { getProfile } from '@/redux/actions/profileActions';
import { useRouter } from "next/navigation";
import SidebarCms from "@/components/cms/layout/sidebar-cms";
import HeaderCms from "@/components/cms/layout/header-cms";
import HeadTitle from "@/components/cms/layout/head-title";

interface LayoutDashboardCmsProps {
  children: ReactNode;
}

const LayoutDashboardCms: React.FC<LayoutDashboardCmsProps> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // dispatch(getProfile((path) => router.push(path), '', '/login'));

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, router]);

  return (
    <section className="flex h-screen ">
      <div className="overflow-hidden">
        <SidebarCms isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <HeaderCms onToggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <HeadTitle />
          {children}
        </div>
      </div>
    </section>
  );
};

export default LayoutDashboardCms;
