// components/Product/RelatedProductsSlider.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // Navigation (ลูกศร)
import 'swiper/css/pagination'; // Pagination (จุด)
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { ProductType } from '@/data/products';

interface RelatedProductsSliderProps {
  products: ProductType[]; // รับ array ของสินค้าที่เกี่ยวข้องเข้ามา
}

const RelatedProductsSlider = ({ products }: RelatedProductsSliderProps) => {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">สินค้าอื่นๆ ที่เกี่ยวข้อง</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">ไม่มีสินค้าอื่นๆ ที่เกี่ยวข้องในขณะนี้</p>
      ) : (
        <Swiper
          // Modules ที่จะใช้
          modules={[Navigation, Pagination, A11y]}
          // จำนวนสไลด์ที่แสดงพร้อมกัน
          slidesPerView={1} // Default: 1 slide per view on smallest screens
          spaceBetween={20} // Space between slides
          // Responsive breakpoints
          breakpoints={{
            640: { // When window width is >= 640px (sm breakpoint)
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: { // When window width is >= 768px (md breakpoint)
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: { // When window width is >= 1024px (lg breakpoint)
              slidesPerView: 4, // Display 4 slides on larger screens
              spaceBetween: 40,
            },
          }}
          navigation // Enable navigation arrows
          pagination={{ clickable: true }} // Enable pagination dots
          // loop={true} // Optional: Loop the slides
          className="mySwiper pb-10" // Add some padding for pagination dots
        >
          {products.map((p, idx) => (
            <SwiperSlide key={p.id || idx}> {/* ใช้ p.id เป็น key */}
              <Link href={p.link} className="block group">
                <div className="bg-white mb-10 rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105 flex flex-col h-full">
                  <div className="relative w-full flex justify-center items-center p-4">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={200} // Adjust based on common related product image size
                      height={200} // Adjust based on common related product image size
                      className="max-w-xs h-auto object-contain mx-auto"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {p.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default RelatedProductsSlider;