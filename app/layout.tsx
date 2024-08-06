'use client';
import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
import './globals.css';
import NavBar from '../components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { usePathname } from 'next/navigation';

const syne = Syne({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Kingsword Church',
//   description: 'Home of the Supernatural!',
// };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={syne.className}>
        {!isAdminRoute && <NavBar />}
        {children}
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
