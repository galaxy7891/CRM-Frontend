import type { Metadata } from 'next';
import AppProvider from './layout_provider';
import Script from 'next/script';

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
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/trix/2.0.0/trix.min.css"
        />
      </head>
      <body className="font-custom antialiased">
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/trix/2.0.0/trix.min.js"
          strategy="lazyOnload"
        />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
