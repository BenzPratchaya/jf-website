// src/app/news/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { NewsItemType } from '../../../backend/data/news';

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

 
  const [allNewsItems, setAllNewsItems] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   // **KEY CHANGE: สร้าง ref สำหรับ news grid container**
  const newsGridRef = useRef<HTMLDivElement>(null); 

  // **KEY CHANGE: useEffect สำหรับ Fetch Data จาก Backend**
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/news', { cache: 'no-store' }); // ดึงจาก Backend API
        if (!res.ok) {
          throw new Error(`Failed to fetch news: ${res.statusText}`);
        }
        const data: NewsItemType[] = await res.json();
        setAllNewsItems(data);
      } catch (err: any) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Effect นี้จะทำงานแค่ครั้งเดียวเมื่อ Component Mount


    // คำนวณ Index ของข่าวที่จะแสดงในหน้าปัจจุบัน (ใช้ allNewsItems)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNewsItems = allNewsItems.slice(indexOfFirstItem, indexOfLastItem);

  // คำนวณจำนวนหน้าทั้งหมด (ใช้ allNewsItems)
  const totalPages = Math.ceil(allNewsItems.length / itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(1, prevPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(totalPages, prevPage + 1));
  };

  // **KEY CHANGE: ปรับ useEffect ให้เลื่อนไปที่ newsGridRef**
  useEffect(() => {
    if (newsGridRef.current) { // ตรวจสอบว่า ref มีค่า (element อยู่ใน DOM)
      newsGridRef.current.scrollIntoView({
        behavior: 'smooth', // เลื่อนแบบ Smooth
        block: 'start' // เลื่อนให้ส่วนบนสุดของ element อยู่ที่ส่วนบนสุดของ viewport
      });
    }
  }, [currentPage]); // Effect นี้จะทำงานทุกครั้งที่ currentPage เปลี่ยน

  const partnersBgImageStyle: React.CSSProperties = {
      backgroundImage: "url('/images/hero/hero_bg1.jpg')",
    };

  // **KEY CHANGE: แสดง Loading/Error State**
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="bg-gray-100 py-24 text-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800">กำลังโหลดข่าวสาร...</h1>
          <p className="text-lg text-gray-600 mt-4">กรุณารอสักครู่</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="bg-red-100 py-24 text-center min-h-screen">
          <h1 className="text-4xl font-bold text-red-800">เกิดข้อผิดพลาดในการโหลดข่าวสาร</h1>
          <p className="text-lg text-red-600 mt-4">{error}</p>
          <p className="text-md text-red-500 mt-2">โปรดตรวจสอบว่า Backend Server ทำงานอยู่</p>
        </main>
        <Footer />
      </>
    );
  }



  return (
    <>
      <Navbar />
      <main>
        {/* ส่วนหัวข้อหน้า News */}
        <section className="container text-center relative py-12 bg-gray-700 bg-cover bg-center bg-fixed text-white" style={partnersBgImageStyle}>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">NEWS & PROJECTS</h3>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4 leading-tight">Our news archive</h1>
        </section>

        {/* ส่วนแสดง Grid ข่าวสาร */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {allNewsItems.length === 0 ? (
                <p className="text-center text-xl text-gray-600">No news found at this time.</p>
            ) : (
                // **KEY CHANGE: กำหนด ref ให้กับ div ที่เป็น Grid Container**
                <div ref={newsGridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                {currentNewsItems.map((item: NewsItemType) => (
                  <div key={item.nit_id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:scale-105">
                    {/* News Image */}
                    <div className="relative w-full h-48 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
                      <Image
                        src={item.nit_image}
                        alt={item.nit_title}
                        width={400} 
                        height={200}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                      />
                    </div>

                    {/* News Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.nit_category}</span>
                        <span>{item.nit_date}</span>
                      </div>
                      
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.nit_title}
                      </h2>
                      <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
                        {item.nit_description}
                      </p>
                      
                      <Link href={item.nit_link} className="text-blue-600 font-medium text-sm hover:underline mt-auto">
                        Read more
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-12">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-lg font-medium text-gray-800">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-8 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}