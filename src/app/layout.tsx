import type { Metadata } from 'next';
import AppProvider from './layout_provider';
import Script from 'next/script';

import './globals.css';

export const metadata: Metadata = {
  title: 'LoyalCust',
  description: 'Customer Relationship Management',
  icons: '/images/icons/sidebar/logo.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/trix@2.0.8/dist/trix.css"
        />
      </head>
      <body className="font-custom antialiased">
        <Script src="https://unpkg.com/trix@2.0.8/dist/trix.umd.min.js" />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
