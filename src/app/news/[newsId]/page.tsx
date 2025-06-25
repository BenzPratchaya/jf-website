// src/app/news/[newsId]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // ใช้ Next.js Image component
import Link from 'next/link';   // ใช้ Next.js Link component
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { newsItems, NewsItemType, NewsItemDetails, NewsContentBlock } from '@/data/news';
const JF_LOGO_PATH = "/images/LOGO-JF.png";

interface NewsDetailPageProps {
  params: {
    newsId: string;
  };
}

const NewsDetailPage = async ({ params }: NewsDetailPageProps) => {
  const { newsId } = params;
  const newsItem = newsItems.find(item => item.id === newsId);

  if (!newsItem || !newsItem.details) {
    notFound();
  }

  const newsDetails: NewsItemDetails = newsItem.details;

  // Helper Function สำหรับ Render แต่ละ Content Block
  const renderContentBlock = (block: NewsContentBlock, blockIndex: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={blockIndex} className={`text-gray-700 leading-relaxed mb-4 `}>
            {block.content && <span dangerouslySetInnerHTML={{ __html: block.content }} />}
          </p>
        );
      case 'image':
        return (
          <div key={blockIndex} className={`my-6 flex justify-center`}>
            {block.imageUrl && (
              <Image
                src={block.imageUrl}
                alt={newsItem.title}
                width={800}
                height={500}
                className="rounded-lg shadow-md max-w-full h-auto object-cover"
              />
            )}
          </div>
        );
      case 'heading':
        if (block.level === 'h2') {
          return <h2 key={blockIndex} className={`text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4`}>{block.content}</h2>;
        } else if (block.level === 'h3') {

          return <h3 key={blockIndex} className={`text-xl md:text-2xl font-semibold text-gray-900 mt-6 mb-3`}>{block.content}</h3>;
        }
        return null;
      case 'list':
        return (
          <ul key={blockIndex} className={`list-disc list-inside space-y-2 text-gray-700 mb-4`}>
            {block.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 py-8 md:py-12 max-w-5xl mx-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="text-sm mb-8">
            <ol className="list-none p-0 inline-flex flex-wrap text-gray-600">
              <li className="flex items-center">
                <Link href="/" className="hover:underline text-blue-600">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link href="/news" className="hover:underline text-blue-600">News</Link>
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
                alt={newsItem.title}
                width={1000}
                height={600}
                className="rounded-lg object-cover w-full h-auto max-h-[600px]"
                priority
              />
            </div>

            {/* Title and Meta Info (Author/Date/Category) */}
            <h1 className="text-2xl md:text-3xl text-gray-900 mb-4 leading-tight">
              {newsItem.title}
            </h1>
            <div className="flex justify-between items-start text-sm text-gray-500 mb-6 border-b pb-4">
              {/* Left Side: Author (with Logo) and Date */}
              <div className="flex flex-col items-start">
                {newsDetails.author && (
                  <div className="flex items-center gap-2 mb-1">
                    <Image
                      src={JF_LOGO_PATH}
                      alt="JF Advance Med Logo"
                      width={72}
                      height={72}
                      className="rounded-full object-cover"
                    />
                    <span className="text-gray-600 font-medium">{newsDetails.author}</span>
                  </div>
                )}
                <span className="text-gray-500 text-xs md:text-sm">{newsItem.date}</span>
              </div>

              {/* Right Side: Category Tag */}
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold self-start">
                {newsItem.category}
              </span>
            </div>

            {/* Full Content using contentBlocks */}
            <div className="text-gray-700 leading-relaxed">
              {newsDetails.contentBlocks.map((block, index) => (
                renderContentBlock(block, index)
              ))}
            </div>
            

            {/* Related Links (Optional) */}
            {newsDetails.relatedLinks && newsDetails.relatedLinks.length > 0 && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Related links:</h3>
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