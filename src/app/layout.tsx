import type { Metadata } from 'next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'LoyalCust',
  description: 'Customer Relationship Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-custom antialiased">
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
