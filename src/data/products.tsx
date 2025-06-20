// src/data/products.ts

// --- Definition of ProductDetailSection ---
export type ProductDetailSection = {
  title?: string;
  type: 'paragraph' | 'list' | 'image' | 'grid';
  content?: string; // สำหรับ type 'paragraph'
  items?: string[]; // สำหรับ type 'list' or list inside gridItems
  //imageSrc?: string; // สำหรับ type 'image'
  altText?: string; // สำหรับ type 'image'
  gridItems?: { title: string; items: string[] }[]; // สำหรับ type 'grid'
};

// --- Definition of ProductDetails (this will be the type for product.details) ---
export type ProductDetails = {
  overview?: string; // ภาพรวมสินค้า
  keyFeatures?: string[]; // คุณสมบัติหลัก (รายการ)
  applications?: string[]; // การใช้งาน (รายการ)
  sectionsContent?: ProductDetailSection[]; // ส่วนรายละเอียดเพิ่มเติมแบบยืดหยุ่น
  category: string;
  client: string;
  projectDate: string;
  projectUrl: string;
  longDescription: string;
};

// --- Definition of ProductType ---
export type ProductType = {
  id: string; // The URL slug (e.g., 'ge-oec-c-arm')
  name: string;
  image: string; // รูปภาพหลักของสินค้า (สำหรับหน้า Products List)
  description: string; // คำอธิบายสั้นๆ (สำหรับหน้า Products List)
  link: string; // Full URL path (e.g., '/products/ge-oec-c-arm') - This will be derived from 'id' in practice
  details: ProductDetails; // details is now REQUIRED and typed as ProductDetails
  partnerId: string; // **KEY CHANGE: เพิ่ม partnerId เข้ามา**
  categoryId: string; // **KEY CHANGE: เพิ่ม categoryId เข้ามา**
};

// --- Definition of PartnerType ---
export type PartnerType = {
    id: string; // Slug ID for the partner (e.g., 'fujifilm', 'vinno')
    name: string; // Full name of the partner
    logo: string; // Path to partner's logo
};

// --- Definition of CategoryType ---
export type CategoryType = {
    id: string; // Slug ID for the category (e.g., 'radiology', 'it-solutions')
    name: string; // Full name of the category
};

// ******** นี่คือ products array แบบเต็มพร้อม details และ partnerId ********
export const products: ProductType[] = [
  {
    id: 'ge-oec-c-arm',
    name: 'GE C-Arm',
    image: '/images/products/2-GE-C ARM.jpg',
    description: 'ระบบเอกซเรย์ดิจิทัลคุณภาพสูง.',
    link: '/products/ge-oec-c-arm',
    details: {
      overview: 'ระบบ Digital Radiography.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่องเอกซเรย์ดิจิทัล',
      client: 'โรงพยาบาลทั่วไป',
      projectDate: '15 พฤษภาคม 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'GE OEC C-Arm',
    },
    partnerId: 'ge',
    categoryId: 'healthcare',
  },
  {
    id: 'vinno-ultimus-9v',
    name: 'VINNO Ultimus 9V',
    image: '/images/products/3-Vinno-9V.jpg',
    description: 'เทคโนโลยีอัลตราซาวด์.',
    link: '/products/vinno-ultimus-9v',
    details: {
      overview: 'เครื่องสแกน CT.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่องสแกน CT',
      client: 'โรงพยาบาลเอกชน',
      projectDate: '10 เมษายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'Vinno Ultimus 9V เป็นเครื่องอัลตราซาวด์ประสิทธิภาพสูง',
    },
    partnerId: 'vinno',
    categoryId: 'healthcare',
  },
  {
    id: 'mri-system',
    name: 'VIVIX 1717',
    image: '/images/products/4-VIVIX-1717.jpg',
    description: 'เครื่อง MRI ล้ำสมัย.',
    link: '/products/mri-system',
    details: {
      overview: 'เครื่อง MRI',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่อง MRI',
      client: 'ศูนย์วินิจฉัยทางการแพทย์',
      projectDate: '01 พฤษภาคม 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'เครื่อง MRI ล้ำสมัย',
    },
    partnerId: 'vieworks',
    categoryId: 'healthcare',
  },
  {
    id: 'ultrasound-system',
    name: 'VIVIX 1417',
    image: '/images/products/5-VIVIX-1417.jpg',
    description: 'อุปกรณ์อัลตราซาวด์.',
    link: '/products/ultrasound-system',
    details: {
      overview: 'ระบบอัลตราซาวด์.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'ระบบอัลตราซาวด์',
      client: 'คลินิกและโรงพยาบาล',
      projectDate: '20 เมษายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'ระบบอัลตราซาวด์อเนกประสงค์',
    },
    partnerId: 'vieworks',
    categoryId: 'healthcare',
  },
  {
    id: 'endoscopy-equipment',
    name: 'VR10X-40K',
    image: '/images/products/6-Octave.jpg',
    description: 'เครื่องมือส่องกล้อง.',
    link: '/products/endoscopy-equipment',
    details: {
      overview: 'เครื่องมือส่องกล้องที่มีความแม่นยำ.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'อุปกรณ์ส่องกล้อง',
      client: 'คลินิกเฉพาะทาง',
      projectDate: '01 มีนาคม 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'อุปกรณ์ส่องกล้อง',
    },
    partnerId: 'vieworks',
    categoryId: 'vaterinary',
  },
  {
    id: 'vinno-d650',
    name: 'Vinno D650',
    image: '/images/products/7-Vinno-D650.jpg',
    description: 'ระบบอัลตราซาวด์.',
    link: '/products/vinno-d650',
    details: {
      overview: 'Vinno D650 เป็นระบบอัลตราซาวด์.',
      keyFeatures: [],
      applications: ['ช่องท้อง', 'สูติกรรม & นรีเวชวิทยา', 'หัวใจ', 'ส่วนเล็กๆ', 'หลอดเลือด'],
      sectionsContent: [],
      category: 'ระบบอัลตราซาวด์',
      client: 'โรงพยาบาลขนาดกลาง',
      projectDate: '05 มีนาคม 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'VINNO D650 เป็นระบบอัลตราซาวด์',
    },
    partnerId: 'vinno',
    categoryId: 'vaterinary',
  },
  {
    id: 'vinno-v5', 
    name: 'Vinno V5',
    image: '/images/products/8-Vinno-V5.jpg',
    description: 'เครื่องอัลตราซาวด์กะทัดรัดและอเนกประสงค์.',
    link: '/products/vinno-v5',
    details: {
      overview: 'Vinno V5 เป็นระบบอัลตราซาวด์.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'ระบบอัลตราซาวด์พกพา',
      client: 'คลินิกขนาดเล็ก',
      projectDate: '10 เมษายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'VINNO V5 เป็นเครื่องอัลตราซาวด์แบบพกพา',
    },
    partnerId: 'vinno',
    categoryId: 'vaterinary',
  },
  {
    id: 'vinno-e20', 
    name: 'Vinno E20',
    image: '/images/products/9-Vinno-E20.jpg',
    description: 'ระบบอัลตราซาวด์ขั้นสูง.',
    link: '/products/vinno-e20',
    details: {
      overview: 'Vinno E20 เป็นระบบอัลตราซาวด์.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'ระบบอัลตราซาวด์',
      client: 'โรงพยาบาลและคลินิก',
      projectDate: '20 พฤษภาคม 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'VINNO E20 เป็นระบบอัลตราซาวด์',
    },
    partnerId: 'vinno',
    categoryId: 'vaterinary',
  },
  {
    id: 'vinno-d300',
    name: 'Vinno D300',
    image: '/images/products/10-Vinno-D300.jpg',
    description: 'ระบบอัลตราซาวด์ที่เชื่อถือได้.',
    link: '/products/vinno-d300',
    details: {
      overview: 'Vinno D300 เป็นระบบอัลตราซาวด์ที่เชื่อถือได้.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'ระบบอัลตราซาวด์',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'VINNO D300 เป็นระบบอัลตราซาวด์',
    },
    partnerId: 'vinno',
    categoryId: 'vaterinary',
  },
  {
    id: 'vinno-d550',
    name: 'Vinno D550',
    image: '/images/products/11-Vinno-D550.jpg',
    description: 'ระบบอัลตราซาวด์ที่เชื่อถือได้.',
    link: '/products/vinno-d550',
    details: {
      overview: 'Vinno D550 เป็นระบบอัลตราซาวด์ที่เชื่อถือได้.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'ระบบอัลตราซาวด์',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'VINNO D550 เป็นระบบอัลตราซาวด์',
    },
    partnerId: 'vinno',
    categoryId: 'vaterinary',
  },
  {
    id: 'Poskom-PXM',
    name: 'Poskom-PXM',
    image: '/images/products/12-Poskom-PXM.jpg',
    description: 'ระบบ X-ray ที่เชื่อถือได้.',
    link: '/products/poskom-pxm',
    details: {
      overview: 'Poskom-PXM X-ray System.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'ระบบ X-ray',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'Poskom-PXM X-ray System',
    },
    partnerId: 'poskom',
    categoryId: 'healthcare',
  },
  {
    id: 'Poskom-Air-Ray',
    name: 'Poskom-Air-Ray',
    image: '/images/products/13-Poskom-Air Ray.jpg',
    description: 'ระบบ X-ray ที่เชื่อถือได้.',
    link: '/products/poskom-air-ray',
    details: {
      overview: 'Poskom-PXM X-ray System.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'ระบบ X-ray',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'Poskom-Air-Ray X-ray System',
    },
    partnerId: 'poskom',
    categoryId: 'healthcare',
  },
  {
    id: 'GE-ACT',
    name: 'GE-ACT',
    image: '/images/products/13-Poskom-Air Ray.jpg',
    description: 'เครื่อง CT ที่เชื่อถือได้.',
    link: '/products/ge-act',
    details: {
      overview: 'เครื่อง CT ที่เชื่อถือได้.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่อง CT',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'เครื่อง CT ที่เชื่อถือได้',
    },
    partnerId: 'ge',
    categoryId: 'vaterinary',
  },
  {
    id: 'GE-Signa-Prime',
    name: 'GE-Signa Prime',
    image: '/images/products/15-GE-Signa Prime.jpg',
    description: 'เครื่อง MRI ที่เชื่อถือได้.',
    link: '/products/ge-signa-prime',
    details: {
      overview: 'เครื่อง MRI ที่เชื่อถือได้.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่อง MRI',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'เครื่อง MRI ที่เชื่อถือได้',
    },
    partnerId: 'ge',
    categoryId: 'healthcare',
  },
  {
    id: 'NX700',
    name: 'NX700',
    image: '/images/products/16-NX700.jpg',
    description: 'เครื่อง Dry Chemistry.',
    link: '/products/nx700',
    details: {
      overview: 'เครื่อง Dry Chemistry.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่อง Dry Chemistry',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'เครื่อง Dry Chemistry',
    },
    partnerId: 'fujifilm',
    categoryId: 'healthcare',
  },
  {
    id: 'NX600',
    name: 'NX600',
    image: '/images/products/18-NX600.jpg',
    description: 'เครื่อง Dry Chemistry.',
    link: '/products/nx600',
    details: {
      overview: 'เครื่อง Dry Chemistry.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่อง Dry Chemistry',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'เครื่อง Dry Chemistry',
    },
    partnerId: 'fujifilm',
    categoryId: 'healthcare',
  },
  {
    id: 'AU10',
    name: 'AU10',
    image: '/images/products/19-AU10.jpg',
    description: 'เครื่อง Dry Chemistry.',
    link: '/products/au10',
    details: {
      overview: 'เครื่อง Dry Chemistry.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่อง Dry Chemistry',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'เครื่อง Dry Chemistry',
    },
    partnerId: 'fujifilm',
    categoryId: 'vaterinary',
  },
  {
    id: 'Urit-5160',
    name: 'URIT 5160',
    image: '/images/products/20-Urit-5160.jpg',
    description: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ.',
    link: '/products/urit-5160',
    details: {
      overview: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ',
    },
    partnerId: 'urit',
    categoryId: 'vaterinary',
  },
  {
    id: 'Urit-2900',
    name: 'URIT 2900',
    image: '/images/products/21-Urit-2900.jpg',
    description: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ.',
    link: '/products/urit-2900',
    details: {
      overview: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ.',
      keyFeatures: [],
      applications: [],
      sectionsContent: [],
      category: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.example.com',
      longDescription: 'เครื่องตรวจนับเม็ดเลือดอัตโนมัติ',
    },
    partnerId: 'urit',
    categoryId: 'vaterinary',
  },
];

// ******** นี่คือ partners array ********
export const partners = [
    { id: 'all', name: 'All', logo: '/images/logos_partner/all_logo.png' },
    { id: 'fujifilm', name: 'Fujifilm', logo: '/images/logos_partner/fujifilm_logo.png' },
    { id: 'mbits', name: 'Mbits', logo: '/images/logos_partner/mbits_logo.png' },
    { id: 'mindray', name: 'Mindray', logo: '/images/logos_partner/mindray_logo.png' },
    { id: 'samsung', name: 'Samsung', logo: '/images/logos_partner/samsung_logo.png' },
    { id: 'synapse', name: 'Synapse', logo: '/images/logos_partner/synapse_logo.png' },
    { id: 'vieworks', name: 'Vieworks', logo: '/images/logos_partner/vieworks_logo.png' },
    { id: 'vinno', name: 'Vinno', logo: '/images/logos_partner/vinno_logo.png' }, 
    { id: 'ge', name: 'Ge', logo: '/images/logos_partner/ge_logo.png' },
    { id: 'poskom', name: 'Poskom', logo: '/images/logos_partner/poskom_logo.png' },
    { id: 'urit', name: 'Urit', logo: '/images/logos_partner/urit_logo.png' },
];

// ******** นี่คือ categories array ********
export const categories: CategoryType[] = [
    { id: 'all', name: 'All' },
    { id: 'healthcare', name: 'Health Care' },
    { id: 'vaterinary', name: 'Vaterinary' },
    { id: 'solutions', name: 'Solutions' },
];