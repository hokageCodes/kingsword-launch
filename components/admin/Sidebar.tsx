// src/components/admin/AdminSidebar.tsx
"use client"
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'next/navigation';

const AdminSidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth!);
    router.push('/admin-login');
  };

  return (
    <div className="h-screen flex flex-col w-64 bg-gray-800 text-white">
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <li className="mb-2">
            <Link legacyBehavior href="/admin">
              <a className="hover:underline">Dashboard</a>
            </Link>
          </li>
          <li className="mb-2">
            <Link legacyBehavior href="/admin/users">
              <a className="hover:underline">Users</a>
            </Link>
          </li>
          <li className="mb-2">
            <Link legacyBehavior href="/admin/settings">
              <a className="hover:underline">Settings</a>
            </Link>
          </li>
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
