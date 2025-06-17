// src/app/products/[productId]/page.tsx
// นี่คือ Server Component

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// *** Import Navbar และ Footer ***
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';

// ******** Import Product related types and data from src/data/products.ts ********
import { products, ProductType, ProductDetails, ProductDetailSection } from '@/data/products';

// *** Import RelatedProductsSlider (Client Component) ***
import RelatedProductsSlider from '@/components/Product/RelatedProductsSlider'; // ตรวจสอบ Path ให้ถูกต้อง

interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const productId = params.productId;
  const product = products.find(p => p.id === productId);

  if (!product || !product.details) {
    console.error(`Error: ไม่พบสินค้าที่มี ID '${productId}' หรือข้อมูล details ไม่สมบูรณ์`);
    notFound();
  }

  const productDetails: ProductDetails = product.details; 

  // Helper function to render each section of the details (NO DARK MODE)
  const renderDetailSection = (section: ProductDetailSection, index: number) => {
    switch (section.type) {
      case 'paragraph':
        return (
          <div key={index} className="mb-4">
            {section.title && <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">{section.title}</h3>}
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        );
      case 'list':
        return (
          <div key={index} className="mb-4">
            {section.title && <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">{section.title}</h3>}
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {section.items?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case 'image':
        return (
          <div key={index} className="mb-6 flex justify-center">
            {section.title && <h3 className="sr-only">{section.title}</h3>}
          </div>
        );
      case 'grid':
        return (
          <div key={index} className="mb-6">
            {section.title && <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">{section.title}</h3>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {section.gridItems?.map((gridItem, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">{gridItem.title}</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {gridItem.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  // กรองสินค้าที่เกี่ยวข้อง (ไม่รวมสินค้าปัจจุบัน)
  const relatedProducts = products.filter(p => p.id !== productId && p.details);

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Product Image Section */}
              <div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="max-w-full h-auto object-contain rounded-lg"
                  style={{ maxHeight: '500px' }}
                />
              </div>

              {/* Product Information Section (Right Side on large screens) */}
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  {product.description}
                </p>

                {/* Project Information Box */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Project Information</h3>
                  <ul className="text-gray-700 text-base space-y-2">
                    <li><strong>Category:</strong> {productDetails.category}</li>
                    <li><strong>Client:</strong> {productDetails.client}</li>
                    <li><strong>Project date:</strong> {productDetails.projectDate}</li>
                    <li><strong>Project URL:</strong> <a href={productDetails.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{productDetails.projectUrl.replace(/(^\w+:|^)\/\//, '')}</a></li>
                  </ul>
                </div>

                {/* Example Portfolio Detail Description Box */}
                <div className="bg-blue-100 p-4 rounded-lg text-blue-800 font-medium">
                  <p>This is an example of portfolio detail</p>
                  <p className="text-sm mt-2">
                    {productDetails.longDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details Sections (Below main image/info on large screens) */}
            {productDetails.overview && (
              <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{productDetails.overview}</p>
              </div>
            )}

            {productDetails.keyFeatures && productDetails.keyFeatures.length > 0 && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Key Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {productDetails.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {productDetails.applications && productDetails.applications.length > 0 && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Applications:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {productDetails.applications.map((app, index) => (
                    <li key={index}>{app}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* NEW SECTION: Related Products Slider Component */}
        <div className="container mx-auto px-4"> {/* Ensure container matches general page container */}
            <RelatedProductsSlider products={relatedProducts} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetailPage;