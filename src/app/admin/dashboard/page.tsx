// src/app/admin/dashboard/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        router.push('/admin/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Logout failed. Please try again.');
      }
    } catch (err) {
      console.error('Logout error:', err);
      setError('An unexpected error occurred during logout.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <button 
        onClick={handleLogout} 
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Card for Product Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Manage Products</h2>
          <p className="text-gray-600 mb-4">Add, edit, delete, and view all products.</p>
          <Link href="/admin/products" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Go to Products
          </Link>
        </div>

        {/* Card for News Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Manage News</h2>
          <p className="text-gray-600 mb-4">Create, update, and remove news articles.</p>
          <Link href="/admin/news" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Go to News
          </Link>
        </div>

        {/* Card for Admin Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Manage Admins</h2>
          <p className="text-gray-600 mb-4">Manage admin accounts and roles.</p>
          <Link href="/admin/admins" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
            Go to Admins
          </Link>
        </div>
      </div>
    </div>
  );
}