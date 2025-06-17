"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// ******** Import จากไฟล์ data ใหม่ ********
import { products, ProductType } from '@/data/products'; // ปรับ Path ตามที่คุณสร้าง

const Product = () => {
  return (
    <section id="products" className="py-24 bg-white" >
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1.2 }}
        className="text-center text-4xl my-16 uppercase text-gray-800"
      >
        Products
      </motion.h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {products.map((product: ProductType, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-whiterounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col"
            >
              <Link href={`/products/${product.id}`} className="flex-grow flex flex-col">
                <div className="relative w-full flex justify-center items-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-xs h-auto object-contain mx-auto"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-auto">
                    {product.description}
                  </p>
                  <span className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                    Learn More &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Product;