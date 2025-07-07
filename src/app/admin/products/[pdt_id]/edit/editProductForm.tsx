// src/app/admin/products/[pdt_id]/edit/editProductForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    _id: string;
    pdt_id: string; // Custom product ID
    pdt_name: string;
    pdt_image: string; // Path/URL ของรูปภาพ
    pdt_description: string;
    pdt_link: string;
    pdt_partnerId: string;
    pdt_categoryId: string;
    pdt_details: {
        pdd_category: string;
        pdd_client: string;
        pdd_projectDate: string;
        pdd_projectUrl: string;
        pdd_longDescription: string;
        pdd_sectionsContent?: unknown[];
    };
}

// Component นี้จะรับ pdt_id เป็น prop
export default function EditProductForm({ pdt_id }: { pdt_id: string }) {
    const router = useRouter();
    const [formData, setFormData] = useState<Product | null>(null);
    const [productImageFile, setProductImageFile] = useState<File | null>(null); // สถานะสำหรับไฟล์ใหม่ที่เลือก
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // สถานะสำหรับ Preview รูปภาพ
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${pdt_id}`, { // Backend API: GET /api/products/:id
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setFormData(data);
                    // ตั้งค่า initial preview จากรูปภาพที่มีอยู่เดิม
                    if (data.pdt_image) {
                      setImagePreviewUrl(data.pdt_image); // ต้องใส่ base URL ของ backend
                    }
                } else if (res.status === 401 || res.status === 403) {
                    router.push('/admin/login');
                } else {
                    const data = await res.json();
                    setError(data.message || 'Failed to fetch product data.');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('An unexpected error occurred while fetching product data.');
            } finally {
                setLoading(false);
            }
        };

        if (pdt_id) {
            fetchProduct();
        }
    }, [pdt_id, router]); // Dependency array: pdt_id

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (formData) {
            if (name.startsWith('pdd_')) {
                setFormData(prev => ({
                    ...prev!,
                    pdt_details: {
                        ...prev!.pdt_details,
                        [name]: value,
                    },
                }));
            } else {
                setFormData(prev => ({ ...prev!, [name]: value }));
            }
        }
    };

    // จัดการการเลือกไฟล์รูปภาพใหม่
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProductImageFile(file);
        setImagePreviewUrl(URL.createObjectURL(file)); // สร้าง URL สำหรับแสดง Preview ของรูปใหม่
      } else {
        setProductImageFile(null); // ไม่มีไฟล์ใหม่เลือก
        // ไม่ล้าง imagePreviewUrl ที่เป็นของรูปเก่าทันที ถ้าผู้ใช้ไม่ได้ตั้งใจลบรูป
      }
    };

    // ฟังก์ชันสำหรับลบรูปภาพปัจจุบัน (ถ้าผู้ใช้ต้องการลบรูปภาพโดยไม่ใส่รูปใหม่)
    const handleClearImage = () => {
      setProductImageFile(null); // ล้างไฟล์ที่เลือกใหม่ (ถ้ามี)
      setImagePreviewUrl(null); // ล้าง preview
      if (formData) { // ล้าง pdt_image ใน formData ด้วย เพื่อส่งค่าว่างไป Backend
        setFormData(prev => ({ ...prev!, pdt_image: '' })); 
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData) {
            setError('No product data to save.');
            return;
        }

        const data = new FormData();
        data.append('pdt_id', formData.pdt_id); // ควรใช้ pdt_id จาก formData เผื่อมีการเปลี่ยนแปลง
        data.append('pdt_name', formData.pdt_name);
        data.append('pdt_description', formData.pdt_description);
        data.append('pdt_link', formData.pdt_link);
        data.append('pdt_partnerId', formData.pdt_partnerId);
        data.append('pdt_categoryId', formData.pdt_categoryId);
        data.append('pdt_details', JSON.stringify(formData.pdt_details)); // แปลง nested object เป็น JSON string

        if (productImageFile) {
          data.append('productImage', productImageFile); // 'productImage' คือชื่อ field ที่ Backend จะรับไฟล์
        } else if (formData.pdt_image !== undefined && formData.pdt_image === '') { // ถ้าผู้ใช้กด Clear Image หรือ pdt_image เป็นค่าว่าง
            data.append('pdt_image', ''); // ส่งค่าว่างไปให้ Backend รู้ว่าต้องการลบรูป
        }
        // ถ้า productImageFile เป็น null และ formData.pdt_image มีค่าอยู่ (คือไม่ได้เปลี่ยนรูปหรือลบรูป)
        // ไม่ต้อง append pdt_image เพราะ backend จะใช้ค่าเดิมจาก product ที่ถูกหาด้วย pdt_id

        try {
            const res = await fetch(`http://localhost:5000/api/products/${pdt_id}`, { // Backend API: PUT /api/products/:id (ซึ่ง Controller คาดหวัง pdt_id)
                method: 'PUT',
                credentials: 'include',
                body: data, // ส่ง FormData object
            });

            if (res.ok) {
                setSuccess('Product updated successfully!');
                router.push('/admin/products');
            } else if (res.status === 401 || res.status === 403) {
                router.push('/admin/login');
            } else {
                const resData = await res.json();
                setError(resData.message || 'Failed to update product.');
            }
        } catch (err) {
            console.error('Error updating product:', err);
            setError('An unexpected error occurred while updating product.');
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading product data...</div>;
    }

    if (error && !formData) {
        return <div className="text-center mt-10 text-red-600">{error}</div>;
    }
    
    if (!formData) {
        return <div className="text-center mt-10 text-gray-500">Product not found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Edit Product: {formData.pdt_name}</h1>
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
                
                {/* ช่องอัปโหลดไฟล์รูปภาพสำหรับ Edit */}
                <div>
                  <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image File</label>
                  {imagePreviewUrl && ( // แสดงรูปภาพปัจจุบันหรือรูปที่เลือกใหม่
                    <div className="mb-2">
                        <Image
                            width={96} 
                            height={96}
                            src={imagePreviewUrl} alt="Current Product Image" className="w-24 h-24 object-cover rounded" />
                        <button 
                            type="button" 
                            onClick={handleClearImage} 
                            className="mt-1 text-red-500 hover:text-red-700 text-sm"
                        >
                            Remove Image
                        </button>
                    </div>
                  )}
                  {/* input type file จะต้องไม่มี value หรือ defaultValue เพื่อให้มันว่างเปล่าเมื่อไม่มีไฟล์เลือก */}
                  <input 
                    type="file" 
                    name="productImage" 
                    id="productImage" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />
                  {/* ถ้าไม่มีรูปปัจจุบันและไม่มีการเลือกไฟล์ใหม่ จะแสดงข้อความ ไม่มีรูปภาพ */}
                  {!imagePreviewUrl && !productImageFile && (
                    <p className="text-gray-500 text-sm mt-1">No image selected or uploaded.</p>
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
                  Update Product
                </button>
            </form>
        </div>
    );
}