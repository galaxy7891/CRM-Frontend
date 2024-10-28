import HeaderCustomer from '@/components/customer/header-customer';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderCustomer />
      <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6 h-full flex flex-col">
        {children}
      </div>
    </>
  );
};

export default Layout;
