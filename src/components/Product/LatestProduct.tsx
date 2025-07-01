// components/Product/LatestProduct.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image";

// Import ProductType เท่านั้น
import { ProductType } from '@/data/products';

// KEY CHANGE: คอมโพเนนต์ Product จะรับ productsToShow เป็น prop
interface ProductProps {
  productsToShow: ProductType[]; // รับ array ของสินค้าที่จะแสดง
}

const LatestProduct = ({ productsToShow }: ProductProps) => { // รับ prop productsToShow
  // KEY CHANGE: กรองเอาแค่ 6 รายการหลังสุด
  // ตรวจสอบให้แน่ใจว่า productsToShow มีอย่างน้อย 6 รายการก่อนที่จะ slice
  const startIndex = Math.max(0, productsToShow.length - 6);
  const latestProducts = productsToShow.slice(startIndex);


  return (
    <section id="products" className="container py-24 bg-white">
      <h2 className="text-center text-4xl my-16 uppercase text-gray-800">Products</h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
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
            <motion.a
                className="inline-block bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                href="/products"
            >
                See All Products
            </motion.a>  
        </div>
      </div>
    </section>
  )
}

export default LatestProduct;