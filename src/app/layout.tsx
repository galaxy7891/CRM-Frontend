import type { Metadata } from 'next';
import AppProvider from './layout_provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'LoyalCust',
  description: 'Customer Relationship Management',
  icons: '/icons/sidebar/logo.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-custom antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
