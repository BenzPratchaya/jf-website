// src/data/products.ts

// --- Definition of ProductDetailSection ---
export type ProductDetailSection = {
  pds_title?: string;
  pds_type: 'paragraph' | 'list' | 'image' | 'grid' | 'heading'; 
  pds_content?: string; // สำหรับ type 'paragraph' หรือ 'heading'
  pds_items?: string[]; // สำหรับ type 'list' or list inside gridItems
  pds_grid?: { title: string; items: string[] }[]; // สำหรับ type 'grid'
  pds_level?: 'h2' | 'h3'; // สำหรับ type 'heading' (ระดับของหัวข้อ)
};

// --- Definition of ProductDetails ---
export type ProductDetails = {
  pdd_sectionsContent?: ProductDetailSection[]; // ส่วนรายละเอียดเพิ่มเติมแบบยืดหยุ่น
  pdd_category: string;
  pdd_client: string;
  pdd_projectDate: string;
  pdd_projectUrl: string;
  pdd_longDescription: string;
};

// --- Definition of ProductType ---
export type ProductType = {
  pdt_id: string; // The URL slug (e.g., 'ge-oec-c-arm')
  pdt_name: string;
  pdt_image: string; // รูปภาพหลักของสินค้า (สำหรับหน้า Products List)
  pdt_description: string; // คำอธิบายสั้นๆ (สำหรับหน้า Products List)
  pdt_link: string; // Full URL path (e.g., '/products/ge-oec-c-arm')
  pdt_details: ProductDetails; // details is REQUIRED and typed as ProductDetails
  pdt_partnerId: string; // Partner ID for filtering
  pdt_categoryId: string; // Category ID
};

// --- Definition of PartnerType ---
export type PartnerType = {
    pnt_id: string;
    pnt_name: string; 
    pnt_logo: string;
};

// --- Definition of CategoryType ---
export type CategoryType = {
    cgt_id: string;
    cgt_name: string; 
};

// ******** นี่คือ products array แบบเต็มพร้อม details และ partnerId ********
export const products: ProductType[] = [
  {
    pdt_id: 'ge-oec-c-arm',
    pdt_name: 'GE C-Arm',
    pdt_image: '/images/products/2-GE-C ARM.jpg',
    pdt_description: 'ระบบเอกซเรย์ดิจิทัลคุณภาพสูง.',
    pdt_link: '/products/ge-oec-c-arm',
    pdt_details: {
      pdd_sectionsContent: [
        { pds_type: 'paragraph', pds_content: 'ภาพรวมระบบ DR ปฏิวัติการถ่ายภาพเอกซเรย์...' },
      ],
      pdd_category: 'เครื่องเอกซเรย์ดิจิทัล',
      pdd_client: 'โรงพยาบาลทั่วไป',
      pdd_projectDate: '15 พฤษภาคม 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'GE OEC C-Arm',
    },
    pdt_partnerId: 'ge',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'vinno-ultimus-9v',
    pdt_name: 'VINNO Ultimus 9V',
    pdt_image: '/images/products/3-Vinno-9V.jpg',
    pdt_description: 'เทคโนโลยีอัลตราซาวด์.',
    pdt_link: '/products/vinno-ultimus-9v',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่องสแกน CT',
      pdd_client: 'โรงพยาบาลเอกชน',
      pdd_projectDate: '10 เมษายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'Vinno Ultimus 9V เป็นเครื่องอัลตราซาวด์ประสิทธิภาพสูง',
    },
    pdt_partnerId: 'vinno',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'vivix-1717',
    pdt_name: 'VIVIX 1717',
    pdt_image: '/images/products/4-VIVIX-1717.jpg',
    pdt_description: 'เครื่อง MRI ล้ำสมัย.',
    pdt_link: '/products/vivix-1717',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่อง MRI',
      pdd_client: 'ศูนย์วินิจฉัยทางการแพทย์',
      pdd_projectDate: '01 พฤษภาคม 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'เครื่อง MRI ล้ำสมัย',
    },
    pdt_partnerId: 'vieworks',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'vivix-1417',
    pdt_name: 'VIVIX 1417',
    pdt_image: '/images/products/5-VIVIX-1417.jpg',
    pdt_description: 'อุปกรณ์อัลตราซาวด์.',
    pdt_link: '/products/vivix-1417',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'ระบบอัลตราซาวด์',
      pdd_client: 'คลินิกและโรงพยาบาล',
      pdd_projectDate: '20 เมษายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'ระบบอัลตราซาวด์อเนกประสงค์',
    },
    pdt_partnerId: 'vieworks',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'vr10x-40k',
    pdt_name: 'VR10X-40K',
    pdt_image: '/images/products/6-Octave.jpg',
    pdt_description: 'เครื่องมือส่องกล้อง.',
    pdt_link: '/products/vr10x-40k',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'อุปกรณ์ส่องกล้อง',
      pdd_client: 'คลินิกเฉพาะทาง',
      pdd_projectDate: '01 มีนาคม 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'อุปกรณ์ส่องกล้อง',
    },
    pdt_partnerId: 'vieworks',
    pdt_categoryId: 'vaterinary',
  },
  {
    pdt_id: 'vinno-d650',
    pdt_name: 'Vinno D650',
    pdt_image: '/images/products/7-Vinno-D650.jpg',
    pdt_description: 'ระบบอัลตราซาวด์.',
    pdt_link: '/products/vinno-d650',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'ระบบอัลตราซาวด์',
      pdd_client: 'โรงพยาบาลขนาดกลาง',
      pdd_projectDate: '05 มีนาคม 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'VINNO D650 เป็นระบบอัลตราซาวด์',
    },
    pdt_partnerId: 'vinno',
    pdt_categoryId: 'vaterinary',
  },
  {
    pdt_id: 'vinno-v5', 
    pdt_name: 'Vinno V5',
    pdt_image: '/images/products/8-Vinno-V5.jpg',
    pdt_description: 'เครื่องอัลตราซาวด์กะทัดรัดและอเนกประสงค์.',
    pdt_link: '/products/vinno-v5',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'ระบบอัลตราซาวด์พกพา',
      pdd_client: 'คลินิกขนาดเล็ก',
      pdd_projectDate: '10 เมษายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'VINNO V5 เป็นเครื่องอัลตราซาวด์แบบพกพา',
    },
    pdt_partnerId: 'vinno',
    pdt_categoryId: 'vaterinary',
  },
  {
    pdt_id: 'vinno-e20', 
    pdt_name: 'Vinno E20',
    pdt_image: '/images/products/9-Vinno-E20.jpg',
    pdt_description: 'ระบบอัลตราซาวด์ขั้นสูง.',
    pdt_link: '/products/vinno-e20',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'ระบบอัลตราซาวด์',
      pdd_client: 'โรงพยาบาลและคลินิก',
      pdd_projectDate: '20 พฤษภาคม 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'VINNO E20 เป็นระบบอัลตราซาวด์',
    },
    pdt_partnerId: 'vinno',
    pdt_categoryId: 'vaterinary',
  },
  {
    pdt_id: 'vinno-d300',
    pdt_name: 'Vinno D300',
    pdt_image: '/images/products/10-Vinno-D300.jpg',
    pdt_description: 'ระบบอัลตราซาวด์ที่เชื่อถือได้.',
    pdt_link: '/products/vinno-d300',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'ระบบอัลตราซาวด์',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'VINNO D300 เป็นระบบอัลตราซาวด์',
    },
    pdt_partnerId: 'vinno',
    pdt_categoryId: 'vaterinary',
  },
  {
    pdt_id: 'vinno-d550',
    pdt_name: 'Vinno D550',
    pdt_image: '/images/products/11-Vinno-D550.jpg',
    pdt_description: 'ระบบอัลตราซาวด์ที่เชื่อถือได้.',
    pdt_link: '/products/vinno-d550',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'ระบบอัลตราซาวด์',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'VINNO D550 เป็นระบบอัลตราซาวด์',
    },
    pdt_partnerId: 'vinno',
    pdt_categoryId: 'vaterinary',
  },
  {
    pdt_id: 'poskom-pxm',
    pdt_name: 'Poskom-PXM',
    pdt_image: '/images/products/12-Poskom-PXM.jpg',
    pdt_description: 'ระบบ X-ray ที่เชื่อถือได้.',
    pdt_link: '/products/poskom-pxm',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'ระบบ X-ray',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'Poskom-PXM X-ray System',
    },
    pdt_partnerId: 'poskom',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'poskom-air-ray',
    pdt_name: 'Poskom-Air-Ray',
    pdt_image: '/images/products/13-Poskom-Air Ray.jpg',
    pdt_description: 'ระบบ X-ray ที่เชื่อถือได้.',
    pdt_link: '/products/poskom-air-ray',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'ระบบ X-ray',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'Poskom-Air-Ray X-ray System',
    },
    pdt_partnerId: 'poskom',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'ge-act',
    pdt_name: 'GE-ACT',
    pdt_image: '/images/products/13-Poskom-Air Ray.jpg',
    pdt_description: 'เครื่อง CT ที่เชื่อถือได้.',
    pdt_link: '/products/ge-act',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่อง CT',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'เครื่อง CT ที่เชื่อถือได้',
    },
    pdt_partnerId: 'ge',
    pdt_categoryId: 'vaterinary',
  },
  {
    pdt_id: 'ge-signa-prime',
    pdt_name: 'GE-Signa Prime',
    pdt_image: '/images/products/15-GE-Signa Prime.jpg',
    pdt_description: 'เครื่อง MRI ที่เชื่อถือได้.',
    pdt_link: '/products/ge-signa-prime',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่อง MRI',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'เครื่อง MRI ที่เชื่อถือได้',
    },
    pdt_partnerId: 'ge',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'nx700',
    pdt_name: 'NX700',
    pdt_image: '/images/products/16-NX700.jpg',
    pdt_description: 'เครื่อง Dry Chemistry.',
    pdt_link: '/products/nx700',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่อง Dry Chemistry',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'เครื่อง Dry Chemistry',
    },
    pdt_partnerId: 'fujifilm',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'nx600',
    pdt_name: 'NX600',
    pdt_image: '/images/products/18-NX600.jpg',
    pdt_description: 'เครื่อง Dry Chemistry.',
    pdt_link: '/products/nx600',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่อง Dry Chemistry',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'เครื่อง Dry Chemistry',
    },
    pdt_partnerId: 'fujifilm',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'au10',
    pdt_name: 'AU10',
    pdt_image: '/images/products/19-AU10.jpg',
    pdt_description: 'เครื่อง Dry Chemistry.',
    pdt_link: '/products/au10',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่อง Dry Chemistry',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'เครื่อง Dry Chemistry',
    },
    pdt_partnerId: 'fujifilm',
    pdt_categoryId: 'vaterinary',
  },
  {
    pdt_id: 'urit-5160',
    pdt_name: 'URIT 5160',
    pdt_image: '/images/products/20-Urit-5160.jpg',
    pdt_description: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ.',
    pdt_link: '/products/urit-5160',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ',
    },
    pdt_partnerId: 'urit',
    pdt_categoryId: 'vaterinary',
  },
  {
    pdt_id: 'urit-2900',
    pdt_name: 'URIT 2900',
    pdt_image: '/images/products/21-Urit-2900.jpg',
    pdt_description: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ.',
    pdt_link: '/products/urit-2900',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ',
      pdd_client: 'คลินิกทั่วไป',
      pdd_projectDate: '01 มิถุนายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ',
    },
    pdt_partnerId: 'urit',
    pdt_categoryId: 'vaterinary',
  },
];

// ******** นี่คือ partners array ********
export const partners: PartnerType[] = [
    { pnt_id: 'all', pnt_name: 'All', pnt_logo: '/images/logos_partner/all_logo.png' },
    { pnt_id: 'fujifilm', pnt_name: 'Fujifilm', pnt_logo: '/images/logos_partner/fujifilm_logo.png' },
    { pnt_id: 'mbits', pnt_name: 'Mbits', pnt_logo: '/images/logos_partner/mbits_logo.png' },
    { pnt_id: 'mindray', pnt_name: 'Mindray', pnt_logo: '/images/logos_partner/mindray_logo.png' },
    { pnt_id: 'samsung', pnt_name: 'Samsung', pnt_logo: '/images/logos_partner/samsung_logo.png' },
    { pnt_id: 'synapse', pnt_name: 'Synapse', pnt_logo: '/images/logos_partner/synapse_logo.png' },
    { pnt_id: 'vieworks', pnt_name: 'Vieworks', pnt_logo: '/images/logos_partner/vieworks_logo.png' },
    { pnt_id: 'vinno', pnt_name: 'Vinno', pnt_logo: '/images/logos_partner/vinno_logo.png' }, 
    { pnt_id: 'ge', pnt_name: 'Ge', pnt_logo: '/images/logos_partner/ge_logo.png' },
    { pnt_id: 'poskom', pnt_name: 'Poskom', pnt_logo: '/images/logos_partner/poskom_logo.png' },
    { pnt_id: 'urit', pnt_name: 'Urit', pnt_logo: '/images/logos_partner/urit_logo.png' },
];

// ******** นี่คือ categories array ********
export const categories: CategoryType[] = [
    { cgt_id: 'all', cgt_name: 'All' },
    { cgt_id: 'healthcare', cgt_name: 'Health Care' },
    { cgt_id: 'vaterinary', cgt_name: 'Vaterinary' },
    { cgt_id: 'solutions', cgt_name: 'Solutions' },
];