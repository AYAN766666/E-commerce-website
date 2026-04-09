import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Bhoot Barhi - Premium E-Commerce Store',
  description: 'Your one-stop shop for all your needs! Discover amazing products at unbeatable prices.',
  keywords: ['e-commerce', 'shopping', 'online store', 'products', 'deals'],
  authors: [{ name: 'Bhoot Barhi Team' }],
  openGraph: {
    title: 'Bhoot Barhi - Premium E-Commerce Store',
    description: 'Your one-stop shop for all your needs!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <CartDrawer />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
