import HeaderCustomer from "@/components/customer/header-customer";
import React from "react";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <HeaderCustomer />
      <main className="mt-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
