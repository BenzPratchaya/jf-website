// src/app/admin/products/create/page.tsx
'use client'; // Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pdt_id: '', // Custom product ID
    pdt_name: '',
    pdt_image: '',
    pdt_description: '',
    pdt_link: '',
    pdt_partnerId: '',
    pdt_categoryId: '',
    pdt_details: {
      pdd_category: '',
      pdd_client: '',
      pdd_projectDate: '',
      pdd_projectUrl: '',
      pdd_longDescription: '',
      pdd_sectionsContent: [],
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('pdd_')) {
      setFormData(prev => ({
        ...prev,
        pdt_details: {
          ...prev.pdt_details,
          [name]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/products', { // Backend API: POST /api/products
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess('Product created successfully!');
        setFormData({ // Clear form
          pdt_id: '', pdt_name: '', pdt_image: '', pdt_description: '', pdt_link: '',
          pdt_partnerId: '', pdt_categoryId: '', pdt_details: { pdd_category: '', pdd_client: '', pdd_projectDate: '', pdd_projectUrl: '', pdd_longDescription: '', pdd_sectionsContent: [] }
        });
        router.push('/admin/products');
      } else if (res.status === 401 || res.status === 403) {
        router.push('/admin/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to create product.');
      }
    } catch (err) {
      console.error('Error creating product:', err);
      setError('An unexpected error occurred while creating product.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      <Link href="/admin/products" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to Product List
      </Link>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Input fields for Product details (อ้างอิงจาก Product.js model) */}
        <div>
          <label htmlFor="pdt_id" className="block text-sm font-medium text-gray-700">Product ID</label>
          <input type="text" name="pdt_id" id="pdt_id" value={formData.pdt_id} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pdt_name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="pdt_name" id="pdt_name" value={formData.pdt_name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pdt_image" className="block text-sm font-medium text-gray-700">Product Image URL</label>
          <input type="text" name="pdt_image" id="pdt_image" value={formData.pdt_image} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pdt_description" className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea name="pdt_description" id="pdt_description" value={formData.pdt_description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <div>
          <label htmlFor="pdt_link" className="block text-sm font-medium text-gray-700">Product Link</label>
          <input type="text" name="pdt_link" id="pdt_link" value={formData.pdt_link} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pdt_partnerId" className="block text-sm font-medium text-gray-700">Partner ID</label>
          <input type="text" name="pdt_partnerId" id="pdt_partnerId" value={formData.pdt_partnerId} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pdt_categoryId" className="block text-sm font-medium text-gray-700">Category ID</label>
          <input type="text" name="pdt_categoryId" id="pdt_categoryId" value={formData.pdt_categoryId} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">Product Details</h2>
        <div>
          <label htmlFor="pdd_category" className="block text-sm font-medium text-gray-700">Detail Category</label>
          <input type="text" name="pdd_category" id="pdd_category" value={formData.pdt_details.pdd_category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pdd_client" className="block text-sm font-medium text-gray-700">Client</label>
          <input type="text" name="pdd_client" id="pdd_client" value={formData.pdt_details.pdd_client} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pdd_projectDate" className="block text-sm font-medium text-gray-700">Project Date</label>
          <input type="text" name="pdd_projectDate" id="pdd_projectDate" value={formData.pdt_details.pdd_projectDate} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="e.g., 2023-01-15"/>
        </div>
        <div>
          <label htmlFor="pdd_projectUrl" className="block text-sm font-medium text-gray-700">Project URL</label>
          <input type="text" name="pdd_projectUrl" id="pdd_projectUrl" value={formData.pdt_details.pdd_projectUrl} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pdd_longDescription" className="block text-sm font-medium text-gray-700">Long Description</label>
          <textarea name="pdd_longDescription" id="pdd_longDescription" value={formData.pdt_details.pdd_longDescription} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <p className="text-sm text-gray-500">Note: pdd_sectionsContent is a complex nested array; additional UI components would be needed to manage its content.</p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}