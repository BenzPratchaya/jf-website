// src/app/admin/news/[nit_id]/edit/page.tsx
// ไม่มี 'use client' แล้ว ทำให้เป็น Server Component โดยปริยาย

import EditNewsForm from './editNewsForm'; // นำเข้า Client Component

// นี่คือ Server Component ที่รับ params จาก URL
export default async function EditNewsPage({ params }: { params: { nit_id: string } }) { // เปลี่ยน newsId เป็น nit_id
  // ใน Server Component, params จะเป็น Object หรือ Promise ที่สามารถ await ได้
  const { nit_id } = await params; // Destructure nit_id

  // Render Client Component และส่ง nit_id เป็น prop
  return <EditNewsForm nit_id={nit_id} />; // ส่ง nit_id เป็น prop
}