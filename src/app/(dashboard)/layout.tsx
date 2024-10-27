'use client';

import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { ReactNode, useEffect, useState } from 'react';

interface LayoutDashboardProps {
  children: ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false); 
      }
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="flex h-screen ">
      <div className='overflow-hidden'>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-auto p-4 lg:p-8">{children}</div>
      </div>
    </section>
  );
};

export default LayoutDashboard;
