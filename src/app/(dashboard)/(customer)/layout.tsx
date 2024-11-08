import HeaderCustomer from '@/components/import/header-customer';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <HeaderCustomer />
        {children}
    </div>
  );
};

export default Layout;
