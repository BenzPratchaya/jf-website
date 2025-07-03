// src/app/admin/admins/[adminId]/edit/page.tsx
// ไม่มี 'use client' แล้ว ทำให้เป็น Server Component โดยปริยาย

// import React from 'react'; // ไม่จำเป็นต้องนำเข้า React ถ้าไม่ใช้ React.use() หรือ Hooks อื่นๆ ที่นี่

import EditAdminForm from './editAdminForm'; // นำเข้า Client Component

// นี่คือ Server Component ที่รับ params จาก URL
export default async function EditAdminPage({ params }: { params: { adminId: string } }) {
  // ใน Server Component, params จะเป็น Object ไม่ใช่ Promise จึงเข้าถึงได้โดยตรง
  const { adminId } = await params;

  // Render Client Component และส่ง adminId เป็น prop
  return <EditAdminForm adminId={adminId} />;
}