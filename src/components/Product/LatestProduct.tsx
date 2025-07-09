// components/Product/LatestProduct.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image";
// Import ProductType เท่านั้น
import { ProductType } from '@/data/products';

const LatestProduct = () => {
  // State สำหรับข้อมูลและสถานะการโหลด
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  // useEffect สำหรับ Fetch Data จาก Backend**
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/products`, { cache: 'no-store' }); // ดึงจาก Backend API
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data: ProductType[] = await res.json();
        setAllProducts(data);
      } catch (err: unknown) {
        console.error("Error fetching latest products:", err);
        setError("Failed to load latest products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Effect นี้จะทำงานแค่ครั้งเดียวเมื่อ Component Mount

  // กรองเอาแค่ 6 รายการหลังสุดจาก allProducts ที่ดึงมา
  const startIndex = Math.max(0, allProducts.length - 6);
  const latestProducts = allProducts.slice(startIndex);

  // แสดง Loading
  if (loading) {
    return (
      <section id="products" className="py-24 bg-white text-center">
        <h2 className="text-4xl my-16 uppercase text-gray-800">Products</h2>
        <p className="text-xl text-gray-600">Loading the latest products...</p>
      </section>
    );
  }

  // แสดง Error
  if (error) {
    return (
      <section id="products" className="py-24 bg-red-100 text-center">
        <h2 className="text-4xl my-16 uppercase text-red-800">An error occurred</h2>
        <p className="text-xl text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section id="products" className="container py-24 bg-white">
      {/* ส่วนหัวของ Products */}
      <h2 className="text-center text-4xl my-16 uppercase text-gray-800">Products</h2>

      {/* ใช้ Container เพื่อจัดเนื้อหาให้อยู่ตรงกลางและเพิ่มช่องว่าง */}
      {/* grid layout สำหรับการ์ดสินค้า */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* ใช้ map เพื่อแสดงสินค้า */}
          {latestProducts.map((product: ProductType, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col">
              <Link href={`/products/${product.pdt_id}`} className="flex-grow flex flex-col"> 
                <div className="relative w-full flex justify-center items-center p-4">
                  <Image
                    src={product.pdt_image}
                    alt={product.pdt_name}
                    width={400}
                    height={300}
                    className="max-w-xs h-auto object-contain mx-auto"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {product.pdt_name}
                  </h3>
                  {/* แสดง description ไม่เกิน 3 บรรทัด หรือตามที่คุณต้องการ */}
                  <p className="text-gray-600 text-sm mb-auto line-clamp-3">
                    {product.pdt_description}
                  </p>
                  <span className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                    Learn More &rarr;
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* ปุ่ม Read More */}
        <div className="text-center mt-12">
            <a 
              className="inline-block bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
              href="/products"
            >
                See All Products
            </a>  
        </div>
      </div>
    </section>
  )
}

export default LatestProduct;