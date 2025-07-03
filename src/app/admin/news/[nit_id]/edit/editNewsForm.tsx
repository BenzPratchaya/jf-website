// src/app/admin/news/[nit_id]/edit/editNewsForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NewsItem {
  _id: string;
  nit_id: string; // Custom news item ID
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

// Component นี้จะรับ nit_id เป็น prop
export default function EditNewsForm({ nit_id }: { nit_id: string }) { // เปลี่ยน newsId เป็น nit_id
  const router = useRouter();
  const [formData, setFormData] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        // Backend API: GET /api/news/:id (Backend Controller คาดหวัง nit_id)
        const res = await fetch(`http://localhost:5000/api/news/${nit_id}`, { // ใช้ nit_id ใน URL
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        } else if (res.status === 401 || res.status === 403) {
          router.push('/admin/login');
        } else {
          const data = await res.json();
          setError(data.message || 'Failed to fetch news item data.');
        }
      } catch (err) {
        console.error('Error fetching news item:', err);
        setError('An unexpected error occurred while fetching news item data.');
      } finally {
        setLoading(false);
      }
    };

    if (nit_id) { // ตรวจสอบ nit_id
      fetchNewsItem();
    }
  }, [nit_id, router]); // Dependency array: nit_id

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      if (name.startsWith('nid_')) {
        setFormData(prev => ({
          ...prev!,
          nit_details: {
            ...prev!.nit_details,
            [name]: value,
          },
        }));
      } else {
        setFormData(prev => ({ ...prev!, [name]: value }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData) {
        setError('No news item data to save.');
        return;
    }

    try {
      // Backend API: PUT /api/news/:id (ซึ่ง Controller คาดหวัง nit_id)
      const res = await fetch(`http://localhost:5000/api/news/${nit_id}`, { // ใช้ nit_id ใน URL
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess('News item updated successfully!');
        router.push('/admin/news');
      } else if (res.status === 401 || res.status === 403) {
        router.push('/admin/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to update news item.');
      }
    } catch (err) {
      console.error('Error updating news item:', err);
      setError('An unexpected error occurred while updating news item.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading news item data...</div>;
  }

  if (error && !formData) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }
  
  if (!formData) {
    return <div className="text-center mt-10 text-gray-500">News item not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit News Item: {formData.nit_title}</h1>
      <Link href="/admin/news" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to News List
      </Link>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="nit_id" className="block text-sm font-medium text-gray-700">News ID</label>
          <input type="text" name="nit_id" id="nit_id" value={formData.nit_id} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="nit_title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="nit_title" id="nit_title" value={formData.nit_title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="nit_image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="text" name="nit_image" id="nit_image" value={formData.nit_image} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="nit_category" className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" name="nit_category" id="nit_category" value={formData.nit_category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="nit_date" className="block text-sm font-medium text-gray-700">Date</label>
          <input type="text" name="nit_date" id="nit_date" value={formData.nit_date} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="e.g., 2023-01-15"/>
        </div>
        <div>
          <label htmlFor="nit_description" className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea name="nit_description" id="nit_description" value={formData.nit_description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <div>
          <label htmlFor="nit_link" className="block text-sm font-medium text-gray-700">News Link</label>
          <input type="text" name="nit_link" id="nit_link" value={formData.nit_link} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">News Details</h2>
        <div>
          <label htmlFor="nid_author" className="block text-sm font-medium text-gray-700">Author</label>
          <input type="text" name="nid_author" id="nid_author" value={formData.nit_details.nid_author || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <p className="text-sm text-gray-500">Note: nid_contentBlocks and nid_relatedLinks will require more complex UI for nested data.</p>


        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update News
        </button>
      </form>
    </div>
  );
}