// src/app/admin/news/page.tsx
'use client'; // Client Component

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NewsItem {
  _id: string; // MongoDB's internal ID
  nit_id: string; // Custom news item ID, ใช้สำหรับ URL และ API
  nit_image: string;
  nit_category: string;
  nit_date: string;
  nit_title: string;
  nit_description: string;
  nit_link: string;
  nit_details: {
    nid_contentBlocks: any[];
    nid_author?: string;
    nid_relatedLinks?: { text: string; url: string }[];
  };
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/news', { // Backend API: GET /api/news
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ส่ง HttpOnly cookie
      });

      if (res.ok) {
        const data = await res.json();
        setNews(data);
      } else if (res.status === 401 || res.status === 403) {
        router.push('/admin/login'); // Redirect หากไม่ได้รับอนุญาต
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to fetch news.');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('An unexpected error occurred while fetching news.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleDelete = async (nit_id: string) => { // รับ nit_id
    if (!window.confirm('Are you sure you want to delete this news item?')) {
      return;
    }

    try {
      // Backend API: DELETE /api/news/:id (Backend Controller คาดหวัง nit_id ที่ส่งมาใน param :id)
      const res = await fetch(`http://localhost:5000/api/news/${nit_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setNews(news.filter(item => item.nit_id !== nit_id)); // Filter ด้วย nit_id
      } else if (res.status === 401 || res.status === 403) {
        router.push('/admin/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to delete news item.');
      }
    } catch (err) {
      console.error('Error deleting news item:', err);
      setError('An unexpected error occurred while deleting news item.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News Management</h1>
        <Link 
          href="/admin/news/create" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add New News
        </Link>
      </div>

      <Link href="/admin/dashboard" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to Dashboard
      </Link>

      {news.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No news items found. Add a new news item to get started!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">_id (Internal)</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">News ID</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-800">{item._id}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{item.nit_id}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{item.nit_title}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{item.nit_category}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{item.nit_date}</td>
                  <td className="py-2 px-4 text-sm">
                    <Link 
                      href={`/admin/news/${item.nit_id}/edit`} // ใช้ nit_id ใน URL
                      className="text-yellow-600 hover:text-yellow-800 mr-3"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.nit_id)} // ใช้ nit_id ในการลบ
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}