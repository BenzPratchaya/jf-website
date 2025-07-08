// src/app/admin/products/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pdt_id: '',
    pdt_name: '',
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
  const [productImage, setProductImage] = useState<File | null>(null); // สถานะสำหรับไฟล์รูปภาพ
  const [imagePreview, setImagePreview] = useState<string | null>(null); // สถานะสำหรับแสดงรูปภาพ
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file)); // สร้าง URL สำหรับแสดง Preview
    } else {
      setProductImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('pdt_id', formData.pdt_id);
    data.append('pdt_name', formData.pdt_name);
    data.append('pdt_description', formData.pdt_description);
    data.append('pdt_link', formData.pdt_link);
    data.append('pdt_partnerId', formData.pdt_partnerId);
    data.append('pdt_categoryId', formData.pdt_categoryId);
    
    data.append('pdt_details', JSON.stringify(formData.pdt_details)); // แปลง pdt_details ให้เป็น JSON string

    if (productImage) {
      data.append('productImage', productImage); // 'productImage' คือชื่อ field ที่ Backend จะรับไฟล์
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/products`, { // Backend API: POST /api/products
        method: 'POST',
        // ไม่ต้องระบุ 'Content-Type': 'multipart/form-data' เพราะ Browser จะจัดการให้เองเมื่อใช้ FormData
        credentials: 'include',
        body: data, // ส่ง FormData object
      });

      if (res.ok) {
        setSuccess('Product created successfully!');
        setFormData({ // Clear form
          pdt_id: '', pdt_name: '', pdt_description: '', pdt_link: '',
          pdt_partnerId: '', pdt_categoryId: '', pdt_details: { pdd_category: '', pdd_client: '', pdd_projectDate: '', pdd_projectUrl: '', pdd_longDescription: '', pdd_sectionsContent: [] }
        });
        setProductImage(null);
        setImagePreview(null);
        router.push('/admin/products');
      } else if (res.status === 401 || res.status === 403) {
        router.push('/admin/login');
      } else {
        const resData = await res.json();
        setError(resData.message || 'Failed to create product.');
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
        <div>
          <label htmlFor="pdt_id" className="block text-sm font-medium text-gray-700">Product ID</label>
          <input type="text" name="pdt_id" id="pdt_id" value={formData.pdt_id} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pdt_name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="pdt_name" id="pdt_name" value={formData.pdt_name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        
        {/* ช่องอัปโหลดไฟล์รูปภาพ */}
        <div>
          <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image File</label>
          <input 
            type="file" 
            name="productImage" 
            id="productImage" 
            accept="image/*" // รับเฉพาะไฟล์รูปภาพ
            onChange={handleImageChange} 
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          {imagePreview && (
            <Image
              width={96} 
              height={96}
              src={imagePreview} alt="Image Preview" className="mt-2 w-24 h-24 object-cover rounded" />
          )}
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