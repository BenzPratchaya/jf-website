// src/app/products/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import Product from '@/components/Product/Product';
import { products, ProductType, partners, PartnerType, categories, CategoryType } from '@/data/products';

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [displayedPartners, setDisplayedPartners] = useState<PartnerType[]>([]); 

  const partnersBgImageStyle: React.CSSProperties = {
    backgroundImage: "url('/images/hero/hero_bg1.jpg')",
  };

  useEffect(() => {
    console.log('Filtering Logic triggered:', { selectedCategory, selectedPartner });
    
    let currentFilteredProducts: ProductType[] = products;
    let relevantPartnerIds: Set<string> = new Set(); 

    if (selectedCategory !== 'all') {
      currentFilteredProducts = currentFilteredProducts.filter(product => product.categoryId === selectedCategory);
    }

    currentFilteredProducts.forEach(product => {
      relevantPartnerIds.add(product.partnerId);
    });

    // KEY CHANGE: displayedPartners จะต้องรวม 'all' เสมอ (ไม่ว่าจะเลือก Category ไหน)
    // และกรอง Partner อื่นๆ ตาม relevantPartnerIds
    const filteredPartnersForDisplay = partners.filter(p => relevantPartnerIds.has(p.id) || p.id === 'all');
    setDisplayedPartners(filteredPartnersForDisplay);

    if (selectedPartner !== 'all') {
      currentFilteredProducts = currentFilteredProducts.filter(product => product.partnerId === selectedPartner);
    }

    setFilteredProducts(currentFilteredProducts);
    console.log('Filtering Result: Filtered products count =', currentFilteredProducts.length);
    
  }, [selectedCategory, selectedPartner, products]);

  return (
    <>
      <Navbar />

      <main>
        <section className="container text-center relative py-12 bg-gray-700 bg-cover bg-center bg-fixed text-white" style={partnersBgImageStyle}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-200">Our Products</h1>
            <p className="text-lg text-gray-300 mt-2">JF Med is a manufacturer and suppliers of a wide range of high quality medical, surgical and hospital products. Our products 
            are ISO 9001 and CE certified and we have been recognized as Star Export House by Government of Thailand. We supply our 
            products in more than 80 countries worldwide.</p>
        </section>

        {/* ส่วนเลือก Category */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Categories</h2>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {categories.map((category: CategoryType) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedPartner('all'); // Reset partner selection when category changes
                  }}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-200 hover:scale-110 ease-in-out
                             ${selectedCategory === category.id ? 'border-blue-600 shadow-md bg-blue-50 text-blue-800 font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>


        {/* ส่วนเลือก Partner */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              {/* KEY CHANGE: Simplified conditional rendering for Partner blocks */}
              {displayedPartners.map((partner: PartnerType) => {
                const isPartnerSelected = selectedPartner === partner.id;

                if (partner.id === 'all') { // ถ้าเป็น Partner "all" เสมอ --> ให้เป็นปุ่ม
                  return (
                    <button 
                      key={partner.id}
                      onClick={() => setSelectedPartner(partner.id)}
                      className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ease-in-out hover:scale-110
                                 ${isPartnerSelected ? 'border-blue-600 shadow-md bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      {partner.name}
                    </button>
                  );
                } else { // สำหรับ Partner อื่นๆ ทั้งหมด --> เป็นบล็อกโลโก้ (แบบเดิม)
                  return (
                    <div
                      key={partner.id}
                      onClick={() => setSelectedPartner(partner.id)}
                      className={`cursor-pointer p-3 md:p-4 rounded-lg border-2 transition-all duration-200 ease-in-out hover:scale-110
                                 ${isPartnerSelected ? 'border-blue-600 shadow-2xl bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                                 w-28 h-28 flex flex-col items-center justify-center text-center overflow-hidden`}
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name + ' Logo'}
                        width={80} 
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </section>

        {/* ส่วนแสดงรายการสินค้าที่ถูกกรองแล้ว */}
        {filteredProducts.length > 0 ? (
            <Product productsToShow={filteredProducts} />
        ) : (
            <section className="py-12 bg-gray-50 text-center">
                <p className="text-xl text-gray-600">Product Not found</p>
            </section>
        )}
        
      </main>

      <Footer />
    </>
  );
}