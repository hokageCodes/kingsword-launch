'use client';
import { usePathname } from 'next/navigation';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import './layout.css';


export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
