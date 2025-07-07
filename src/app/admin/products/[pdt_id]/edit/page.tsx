// src/app/admin/products/[pdt_id]/edit/page.tsx
// ไม่มี 'use client' แล้ว ทำให้เป็น Server Component โดยปริยาย

import EditProductForm from './editProductForm'; // นำเข้า Client Component

type Params = Promise<{ pdt_id: string }>

// นี่คือ Server Component ที่รับ params จาก URL
// แก้ไข: เปลี่ยน productId เป็น pdt_id ตามชื่อ Folder
export default async function EditProductPage( props : { params: Params }) {
  const params = await props.params;
  const pdt_id = params.pdt_id;

  // Render Client Component และส่ง pdt_id เป็น prop
  return <EditProductForm pdt_id={pdt_id} />; // แก้ไข: ส่ง pdt_id เป็น prop
}