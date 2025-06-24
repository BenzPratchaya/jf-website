// src/app/news/[newsId]/page.tsx
// นี่คือ Server Component

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // ใช้ Next.js Image component
import Link from 'next/link';   // ใช้ Next.js Link component

// Import Navbar และ Footer
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';

// Import ข้อมูลข่าวสาร
import { newsItems, NewsItemType, NewsItemDetails } from '@/data/news';

// **KEY FIX: ลบ import companyLogo ออกไปจากไฟล์นี้**
// import companyLogo from "/images/LOGO-JF.png";

// Import NewsGallerySlider (Client Component)
import NewsGallerySlider from '@/components/News/NewsGallerySlider';

interface NewsDetailPageProps {
  params: {
    newsId: string; // ตรงกับชื่อโฟลเดอร์ [newsId] ใน URL
  };
}

const NewsDetailPage = async ({ params }: NewsDetailPageProps) => { // Server Component (ต้องมี async)
  const { newsId } = params;
  const newsItem = newsItems.find(item => item.id === newsId);

  if (!newsItem || !newsItem.details) {
    notFound();
  }

  const newsDetails: NewsItemDetails = newsItem.details;

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="text-sm mb-8">
            <ol className="list-none p-0 inline-flex flex-wrap text-gray-600">
              <li className="flex items-center">
                <Link href="/" className="hover:underline text-blue-600">หน้าแรก</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link href="/news" className="hover:underline text-blue-600">ข่าวสาร</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-800 font-semibold line-clamp-1 max-w-xs sm:max-w-md">
                {newsItem.title}
              </li>
            </ol>
          </nav>

          {/* News Content Area */}
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
            {/* Main Image */}
            <div className="mb-8 flex justify-center">
              <Image
                src={newsItem.imageUrl}
                alt={newsDetails.mainImageAlt || newsItem.title}
                width={1000}
                height={600}
                className="rounded-lg object-cover w-full h-auto max-h-[600px]"
                priority
              />
            </div>

            {/* Title and Meta Info (Author/Date/Category) */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {newsItem.title}
            </h1>
            <div className="flex justify-between items-start text-sm text-gray-500 mb-6 border-b pb-4">
              {/* Left Side: Author (with Logo) and Date */}
              <div className="flex flex-col items-start">
                {newsDetails.author && (
                  <div className="flex items-center gap-2 mb-1">
                    <Image // **KEY FIX: ใช้ Path ตรงๆ ใน src**
                      src="/images/LOGO-JF.png" // Path ของโลโก้ JF
                      alt="JF Advance Med Logo"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                    <span className="text-gray-600 font-medium">โดย {newsDetails.author}</span>
                  </div>
                )}
                <span className="text-gray-500 text-xs md:text-sm">{newsItem.date}</span>
              </div>

              {/* Right Side: Category Tag */}
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold self-start">
                {newsItem.category}
              </span>
            </div>

            {/* Full Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: newsDetails.fullContent }} />
            
            {/* Gallery Images (Optional) */}
            {newsDetails.galleryImages && newsDetails.galleryImages.length > 0 && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">รูปภาพเพิ่มเติม:</h3>
                <NewsGallerySlider images={newsDetails.galleryImages} title={newsItem.title} />
              </div>
            )}

            {/* Related Links (Optional) */}
            {newsDetails.relatedLinks && newsDetails.relatedLinks.length > 0 && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">ลิงก์ที่เกี่ยวข้อง:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {newsDetails.relatedLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewsDetailPage;