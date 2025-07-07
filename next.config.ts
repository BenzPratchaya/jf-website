import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // *** เพิ่ม domains นี้เข้ามา ***
        domains: ['localhost'], // อนุญาตให้โหลดรูปภาพจาก localhost
        remotePatterns: [ // ใช้ remotePatterns เพื่อควบคุม host และ protocol
           // Localhost สำหรับ Development
            {
              protocol: 'http',
              hostname: 'localhost',
              port: '5000',
              pathname: '/uploads/**', 
            },
            // *** เพิ่ม Domain ของ Cloudinary ที่นี่ ***
            {
              protocol: 'https', // Cloudinary ใช้ HTTPS
              hostname: 'res.cloudinary.com', 
              port: '', // ไม่ต้องระบุ port สำหรับ HTTPS มาตรฐาน
              pathname: '/dyo2ntkuw/image/upload/**', // แทนที่ 'your_cloud_name' ด้วย Cloud Name ของคุณใน Cloudinary
            },
            // ถ้าคุณ Deploy Backend บน Render และใช้ Domain ของ Render ด้วย ก็เพิ่มที่นี่
            {
              protocol: 'https', 
              hostname: 'your-backend-app.onrender.com', // เปลี่ยนเป็น Domain จริงของ Render App
              port: '', 
              pathname: '/uploads/**', 
            },
        ],
    },
};

export default nextConfig;
