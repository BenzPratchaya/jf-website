import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // *** เพิ่ม domains นี้เข้ามา ***
        domains: ['localhost'], // อนุญาตให้โหลดรูปภาพจาก localhost
        remotePatterns: [ // ใช้ remotePatterns เพื่อควบคุม host และ protocol
            {
              protocol: 'http',
              hostname: 'localhost',
              port: '5000',
              pathname: '/uploads/products/**', // อนุญาตเฉพาะ path ที่ต้องการ
            },
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com', // Domain ของ Cloudinary
              port: '', 
              pathname: '/your_cloud_name/image/upload/**', // เปลี่ยน 'your_cloud_name' เป็น Cloud Name ของคุณ
            },
        ],
    },
};

export default nextConfig;
