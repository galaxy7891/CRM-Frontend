'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { getProfile } from '@/redux/actions/profileActions';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import SidebarRev from '@/components/layout/sidebar-rev';

interface LayoutDashboardProps {
  children: ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(getProfile((path) => router.push(path), '', '/login'));

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, router]);

  return (
    <section className="flex h-screen ">
      <div className="overflow-hidden">
        <SidebarRev isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-auto p-4 lg:p-8">{children}</div>
      </div>
    </section>
  );
};

export default LayoutDashboard;
