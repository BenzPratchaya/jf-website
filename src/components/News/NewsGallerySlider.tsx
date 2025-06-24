// src/components/News/NewsGallerySlider.tsx
"use client"; // **สำคัญมาก: ต้องมีบรรทัดนี้**

import React from 'react';
import Image from 'next/image';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles (ต้อง import styles เหล่านี้ใน Client Component หรือ globals.css)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules for Swiper
import { Navigation, Pagination, A11y } from 'swiper/modules';

interface NewsGallerySliderProps {
  images: string[]; // รับ array ของ URL รูปภาพ
  title: string;    // ชื่อข่าวสำหรับ alt text
}

const NewsGallerySlider = ({ images, title }: NewsGallerySliderProps) => {
  if (!images || images.length === 0) {
    return null; // ไม่แสดงอะไรเลยถ้าไม่มีรูปภาพ
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      slidesPerView={1}
      spaceBetween={20}
      navigation // แสดงลูกศรนำทาง
      pagination={{ clickable: true }} // แสดงจุดบอกหน้า
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 30 },
        768: { slidesPerView: 3, spaceBetween: 40 },
      }}
      className="my-4 news-gallery-swiper pb-10" // Add pb-10 for pagination dots
    >
      {images.map((imagePath, index) => (
        <SwiperSlide key={index}>
          <Image
            src={imagePath}
            alt={`${title} - Image ${index + 1}`}
            width={600} // ขนาดที่เหมาะสมสำหรับรูปใน Gallery
            height={400} // ปรับตามสัดส่วน
            className="rounded-lg object-cover w-full h-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default NewsGallerySlider;