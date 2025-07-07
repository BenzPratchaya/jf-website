// src/app/admin/products/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  pdt_id: string;
  pdt_name: string;
  pdt_image: string; // Product Image URL
  pdt_description: string;
  pdt_link: string;
  pdt_partnerId: string;
  pdt_categoryId: string;
  pdt_details: {
    pdd_sectionsContent?: unknown[];
    pdd_category: string;
    pdd_client: string;
    pdd_projectDate: string;
    pdd_projectUrl: string;
    pdd_longDescription: string;
  };
}

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else if (res.status === 401 || res.status === 403) {
        router.push('/admin/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to fetch products.');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An unexpected error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (pdt_id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${pdt_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setProducts(products.filter(product => product.pdt_id !== pdt_id));
      } else if (res.status === 401 || res.status === 403) {
        router.push('/admin/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to delete product.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('An unexpected error occurred while deleting product.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Link 
          href="/admin/products/create" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No products found. Add a new product to get started!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">_id (Internal)</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Product ID</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Product Name</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Product Image</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Partner ID</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Category ID</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-800">{product._id}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{product.pdt_id}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{product.pdt_name}</td>
                  <td className="py-2 px-4 text-sm">
                    {product.pdt_image && (
                      <Image
                        width={64}
                        height={64}
                        src={product.pdt_image} // ต้องใส่ base URL ของ backend
                        alt={product.pdt_name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src = '/images/placeholder.png'; // แสดงรูป placeholder หากมี error
                        }}
                      />
                    )}
                    {!product.pdt_image && (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800">{product.pdt_partnerId}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{product.pdt_categoryId}</td>
                  <td className="py-2 px-4 text-sm">
                    <Link 
                      href={`/admin/products/${product.pdt_id}/edit`} // ใช้ pdt_id ใน URL
                      className="text-yellow-600 hover:text-yellow-800 mr-3"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(product.pdt_id)} // ใช้ pdt_id ในการลบ
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