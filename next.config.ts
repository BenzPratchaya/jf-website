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
        ],
    },
};

export default nextConfig;
