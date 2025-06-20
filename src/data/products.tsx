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
    name: 'Digital Radiography (DR) - GE C-Arm',
    image: '/images/products/2-GE-C ARM.jpg',
    description: 'ระบบเอกซเรย์ดิจิทัลคุณภาพสูง เพื่อความคมชัดของภาพที่เหนือกว่าและขั้นตอนการทำงานที่รวดเร็วยิ่งขึ้น.',
    link: '/products/ge-oec-c-arm',
    details: {
      overview: 'ระบบ Digital Radiography ของเรานำเสนอเทคโนโลยีที่ล้ำสมัยเพื่อความคมชัดของภาพที่เหนือกว่าและขั้นตอนการทำงานที่มีประสิทธิภาพในสถานพยาบาลที่ทันสมัย.',
      keyFeatures: [
        'เครื่องตรวจจับดิจิทัลความละเอียดสูงเพื่อภาพที่คมชัด.',
        'การรับและดูภาพได้ทันที ช่วยลดเวลารอของผู้ป่วย.',
        'ลดปริมาณรังสีเมื่อเทียบกับฟิล์มเอกซเรย์แบบดั้งเดิม.',
        'การผสานรวมที่ราบรื่นกับระบบ PACS และ EMR.',
        'การออกแบบที่กะทัดรัดและถูกหลักสรีรศาสตร์เพื่อความสะดวกในการใช้งานในสถานการณ์ต่างๆ.',
      ],
      applications: [
        'รังสีวิทยาทั่วไป',
        'แผนกฉุกเฉิน',
        'ศัลยกรรมกระดูก',
        'และอื่นๆ อีกมากมาย ช่วยเพิ่มความแม่นยำในการวินิจฉัยและประสิทธิภาพการดำเนินงาน.',
      ],
      sectionsContent: [
        {
          title: 'ภาพรวมระบบ',
          type: 'paragraph',
          content: 'ระบบ DR ปฏิวัติการถ่ายภาพเอกซเรย์ด้วยความสามารถดิจิทัลขั้นสูง ให้การวินิจฉัยที่รวดเร็วและแม่นยำ.',
        },
        {
          title: 'ข้อมูลติดต่อ',
          type: 'paragraph',
          content: 'ติดต่อเราเพื่อขอคำปรึกษาโดยละเอียดและใบเสนอราคาที่ปรับให้เหมาะกับคุณ.',
        }
      ],
      category: 'เครื่องเอกซเรย์ดิจิทัล',
      client: 'โรงพยาบาลทั่วไป',
      projectDate: '15 พฤษภาคม 2568',
      projectUrl: 'https://www.gehealthcare.com/oec-c-arm',
      longDescription: 'GE OEC C-Arm คือระบบเอกซเรย์ฟลูออโรสโคปีแบบเคลื่อนที่ที่ทรงพลังและอเนกประสงค์ ให้ภาพวินิจฉัยคุณภาพสูงแบบเรียลไทม์ เหมาะสำหรับขั้นตอนการผ่าตัดและหัตถการที่หลากหลาย ด้วยการออกแบบที่กะทัดรัดและใช้งานง่าย ช่วยเพิ่มประสิทธิภาพการทำงานในสภาพแวดล้อมทางคลินิก',
    },
    partnerId: 'fujifilm',
    categoryId: 'radiology',
  },
  {
    id: 'vinno-ultimus-9v',
    name: 'VINNO Ultimus 9V Ultrasound System',
    image: '/images/products/3-Vinno-9V.jpg',
    description: 'เทคโนโลยีอัลตราซาวด์ล้ำสมัยเพื่อภาพที่เหนือกว่าและความมั่นใจในการวินิจฉัย.',
    link: '/products/vinno-ultimus-9v',
    details: {
      overview: 'เครื่องสแกน CT ของเรามอบความสามารถในการถ่ายภาพขั้นสูง โดยให้ภาพตัดขวางความละเอียดสูงเพื่อการวินิจฉัยที่แม่นยำและมั่นใจ.',
      keyFeatures: [
        'เวลาสแกนรวดเร็วพร้อมความรู้สึกไม่สบายของผู้ป่วยน้อยที่สุด.',
        'การสร้างภาพใหม่ซ้ำซ้อนขั้นสูงเพื่อลดปริมาณรังสีและปรับปรุงคุณภาพของภาพ.',
        'การออกแบบช่องเปิดกว้างเพื่อความสะดวกสบายและการเข้าถึงของผู้ป่วย.',
        'การใช้งานทางคลินิกที่ครอบคลุม เช่น หทัยวิทยา, ประสาทวิทยา และมะเร็งวิทยา.',
      ],
      applications: [],
      sectionsContent: [],
      category: 'เครื่องสแกน CT',
      client: 'โรงพยาบาลเอกชน',
      projectDate: '10 เมษายน 2568',
      projectUrl: 'https://www.vinno.com/ultimus-9v',
      longDescription: 'Vinno Ultimus 9V เป็นเครื่องอัลตราซาวด์ประสิทธิภาพสูง (ตามชื่อไฟล์ Vinno-9V.jpg) ที่มอบคุณภาพภาพที่ยอดเยี่ยมและคุณสมบัติขั้นสูงสำหรับการวินิจฉัยที่แม่นยำ',
    },
    partnerId: 'mbits',
    categoryId: 'radiology',
  },
  {
    id: 'mri-system',
    name: 'Magnetic Resonance Imaging (MRI)',
    image: '/images/products/4-VIVIX-1717.jpg',
    description: 'เครื่อง MRI ล้ำสมัยที่ให้ภาพความละเอียดสูงของเนื้อเยื่ออ่อนและอวัยวะต่างๆ.',
    link: '/products/mri-system',
    details: {
      overview: 'สัมผัสประสบการณ์ความคมชัดในการวินิจฉัยที่ไม่มีใครเทียบได้ด้วยเครื่อง MRI ล้ำสมัยของเรา ซึ่งออกแบบมาสำหรับการถ่ายภาพเนื้อเยื่ออ่อนและอวัยวะที่มีรายละเอียดโดยไม่ต้องสัมผัสรังสี.',
      keyFeatures: [
        'คอนทราสต์และความละเอียดของภาพที่ยอดเยี่ยมสำหรับการวินิจฉัยที่ซับซ้อน.',
        'เทคโนโลยี Shimming ขั้นสูงเพื่อความสม่ำเสมอของสนามแม่เหล็ก.',
        'เทคโนโลยีการสแกนที่เงียบเพื่อความสะดวกสบายของผู้ป่วยที่เพิ่มขึ้น.',
        'คอยล์ที่หลากหลายสำหรับการศึกษาทางกายวิภาคต่างๆ.',
      ],
      applications: [],
      sectionsContent: [],
      category: 'เครื่อง MRI',
      client: 'ศูนย์วินิจฉัยทางการแพทย์',
      projectDate: '01 พฤษภาคม 2568',
      projectUrl: 'https://www.example.com/mri',
      longDescription: 'เครื่อง MRI ล้ำสมัยนี้ช่วยให้แพทย์สามารถวินิจฉัยโรคได้แม่นยำยิ่งขึ้นด้วยภาพที่มีรายละเอียดสูงของเนื้อเยื่ออ่อนและอวัยวะต่างๆ โดยไม่มีการสัมผัสรังสี ทำให้เป็นเครื่องมือที่มีคุณค่าในการดูแลผู้ป่วย',
    },
    partnerId: 'mindray',
    categoryId: 'radiology',
  },
  {
    id: 'ultrasound-system',
    name: 'Ultrasound Systems - VIVIX 1417',
    image: '/images/products/5-VIVIX-1417.jpg',
    description: 'อุปกรณ์อัลตราซาวด์อเนกประสงค์สำหรับการถ่ายภาพแบบเรียลไทม์ในความเชี่ยวชาญทางการแพทย์ต่างๆ.',
    link: '/products/ultrasound-system',
    details: {
      overview: 'ระบบอัลตราซาวด์อเนกประสงค์ของเรานำเสนอโซลูชันการถ่ายภาพแบบเรียลไทม์สำหรับการแพทย์ที่หลากหลาย ตั้งแต่การถ่ายภาพทั่วไปไปจนถึงหทัยวิทยาและสูติศาสตร์.',
      keyFeatures: [
        'Transducer ความถี่สูงเพื่อคุณภาพของภาพที่ยอดเยี่ยม.',
        'ส่วนต่อประสานผู้ใช้ที่ใช้งานง่ายสำหรับการตรวจที่มีประสิทธิภาพ.',
        'มีดีไซน์แบบพกพาและกะทัดรัดสำหรับการถ่ายภาพข้างเตียง.',
        'โหมด Doppler ขั้นสูงสำหรับการประเมินหลอดเลือดที่ครอบคลุม.',
      ],
      applications: [],
      sectionsContent: [],
      category: 'ระบบอัลตราซาวด์',
      client: 'คลินิกและโรงพยาบาล',
      projectDate: '20 เมษายน 2568',
      projectUrl: 'https://www.example.com/ultrasound',
      longDescription: 'ระบบอัลตราซาวด์อเนกประสงค์นี้ช่วยให้แพทย์สามารถถ่ายภาพแบบเรียลไทม์ได้อย่างแม่นยำในหลากหลายความเชี่ยวชาญทางการแพทย์ ตั้งแต่การวินิจฉัยทั่วไปไปจนถึงการใช้งานที่ซับซ้อน ช่วยเพิ่มประสิทธิภาพการดูแลผู้ป่วย',
    },
    partnerId: 'ge',
    categoryId: 'radiology',
  },
  {
    id: 'endoscopy-equipment',
    name: 'Endoscopy Equipment - Octave',
    image: '/images/products/6-Octave.jpg',
    description: 'เครื่องมือส่องกล้องที่มีความแม่นยำสำหรับขั้นตอนการผ่าตัดแบบรุกล้ำน้อยที่สุดและการมองเห็นภายในที่แม่นยำ.',
    link: '/products/endoscopy-equipment',
    details: {
      overview: 'เครื่องมือส่องกล้องที่มีความแม่นยำของเราได้รับการออกแบบมาเพื่ออำนวยความสะดวกในขั้นตอนการผ่าตัดแบบรุกล้ำน้อยที่สุด ให้การมองเห็นภายในที่แม่นยำเพื่อผลการวินิจฉัยและการรักษาที่เหนือกว่า.',
      keyFeatures: [
        'เซ็นเซอร์ภาพความละเอียดสูงเพื่อการมองเห็นที่ชัดเจน.',
        'กล้องที่ยืดหยุ่นและเคลื่อนที่ได้ง่ายสำหรับการนำทางที่ง่ายดาย.',
        'แหล่งกำเนิดแสงในตัวและระบบชลประทาน.',
        'การออกแบบที่ถูกหลักสรีรศาสตร์เพื่อความสะดวกสบายของแพทย์ในระหว่างขั้นตอนที่ยาวนาน.',
      ],
      applications: [],
      sectionsContent: [],
      category: 'อุปกรณ์ส่องกล้อง',
      client: 'คลินิกเฉพาะทาง',
      projectDate: '01 มีนาคม 2568',
      projectUrl: 'https://www.example.com/endoscopy',
      longDescription: 'อุปกรณ์ส่องกล้องนี้ให้การมองเห็นภายในร่างกายที่แม่นยำและเครื่องมือที่จำเป็นสำหรับการวินิจฉัยและการรักษาที่รวดเร็วและมีประสิทธิภาพ ช่วยลดการรุกรานและเพิ่มความสะดวกสบายให้กับผู้ป่วยและแพทย์',
    },
    partnerId: 'vieworks',
    categoryId: 'radiology',
  },
  {
    id: 'vinno-d650',
    name: 'Vinno D650 Ultrasound System',
    image: '/images/products/7-Vinno-D650.jpg',
    description: 'ระบบอัลตราซาวด์แบบเข็นระดับพรีเมียมสำหรับการถ่ายภาพวินิจฉัยที่ครอบคลุม.',
    link: '/products/vinno-d650',
    details: {
      overview: 'Vinno D650 เป็นระบบอัลตราซาวด์แบบเข็นระดับพรีเมียมที่ออกแบบมาสำหรับการถ่ายภาพวินิจฉัยที่ครอบคลุม ให้คุณภาพของภาพที่ยอดเยี่ยมและคุณสมบัติขั้นสูงสำหรับการใช้งานทางคลินิกที่หลากหลาย.',
      keyFeatures: [
        'เทคโนโลยีหัวตรวจ Pure Wave: เพิ่มประสิทธิภาพการทะลุทะลวงและความละเอียดสำหรับผู้ป่วยที่ท้าทาย.',
        'VFusion: ปรับปรุงคุณภาพของภาพด้วยการผสมภาพแบบ Spatial.',
        'VFusion/VSpeckle: อัลกอริทึมขั้นสูงสำหรับการลดสัญญาณรบกวนและกำหนดขอบเขต.',
        'เครื่องมือเวิร์กโฟลว์อัจฉริยะ: ปรับปรุงการตรวจและลดความเมื่อยล้าของผู้ปฏิบัติงาน.',
        'หัวตรวจครบวงจร: รองรับการถ่ายภาพทั่วไป, สูติกรรม/นรีเวชวิทยา, หทัยวิทยา และอื่นๆ.',
      ],
      applications: ['ช่องท้อง', 'สูติกรรม & นรีเวชวิทยา', 'หัวใจ', 'ส่วนเล็กๆ', 'หลอดเลือด'],
      sectionsContent: [
        {
          title: 'ความสามารถของระบบขั้นสูง',
          type: 'grid',
          gridItems: [
            {
              title: 'คุณสมบัติขั้นสูง:',
              items: [
                'แพ็คเกจการวัดอัตโนมัติ',
                'Elastography สำหรับการประเมินความแข็งของเนื้อเยื่อ',
                'ความสามารถในการถ่ายภาพ 4D',
              ],
            },
            {
              title: 'การใช้งานทางคลินิก:',
              items: [
                'ช่องท้อง',
                'สูติกรรม & นรีเวชวิทยา',
                'หัวใจ',
                'ส่วนเล็กๆ',
                'หลอดเลือด',
              ],
            },
          ],
        },
        {
          title: 'สรุป',
          type: 'paragraph',
          content: 'Vinno D650 เป็นตัวเลือกที่เหมาะสำหรับแผนกที่มีงานยุ่งที่ต้องการโซลูชันอัลตราซาวด์ที่มีประสิทธิภาพสูงและเชื่อถือได้.',
        },
      ],
      category: 'ระบบอัลตราซาวด์',
      client: 'โรงพยาบาลขนาดกลาง',
      projectDate: '05 มีนาคม 2568',
      projectUrl: 'https://www.vinno.com/d650',
      longDescription: 'VINNO D650 เป็นระบบอัลตราซาวด์แบบรถเข็นที่ออกแบบมาเพื่อมอบประสิทธิภาพที่เหนือกว่าและคุณสมบัติขั้นสูงสำหรับการวินิจฉัยที่ครอบคลุม ด้วยแพลตฟอร์มที่ยืดหยุ่นและอินเทอร์เฟซที่ใช้งานง่าย จึงเหมาะสำหรับแผนกต่างๆ เช่น สูติศาสตร์, รังสีวิทยา, และโรคหัวใจ',
    },
    partnerId: 'synapse',
    categoryId: 'it-solutions',
  },
  {
    id: 'vinno-v5', // Corrected slug
    name: 'Vinno V5 Ultrasound System',
    image: '/images/products/8-Vinno-V5.jpg',
    description: 'เครื่องอัลตราซาวด์กะทัดรัดและอเนกประสงค์ เหมาะสำหรับสถานพยาบาลที่หลากหลาย.',
    link: '/products/vinno-v5', // Corrected path
    details: {
      overview: 'Vinno V5 เป็นระบบอัลตราซาวด์ที่กะทัดรัดและอเนกประสงค์ เหมาะสำหรับสถานพยาบาลที่พื้นที่จำกัดแต่ต้องการการถ่ายภาพคุณภาพสูง อินเทอร์เฟซที่ใช้งานง่ายและคุณสมบัติที่แข็งแกร่งทำให้เป็นตัวเลือกที่เชื่อถือได้สำหรับการตรวจที่หลากหลาย.',
      keyFeatures: [
        'น้ำหนักเบาและง่ายต่อการเคลื่อนย้าย.',
        'หน้าจอแสดงผลความละเอียดสูงเพื่อการมองเห็นภาพที่ชัดเจน.',
        'ขั้นตอนการทำงานที่ง่ายขึ้นด้วยค่าที่ตั้งไว้ล่วงหน้าอัจฉริยะ.',
        'รองรับหัวตรวจที่หลากหลายสำหรับการใช้งานที่แตกต่างกัน.',
      ],
      applications: [],
      sectionsContent: [
        {
          title: 'ประสิทธิภาพและการทำงาน',
          type: 'paragraph',
          content: 'ค้นพบประสิทธิภาพและการทำงานของ Vinno V5 สำหรับการปฏิบัติงานของคุณ.',
        },
      ],
      category: 'ระบบอัลตราซาวด์พกพา',
      client: 'คลินิกขนาดเล็ก',
      projectDate: '10 เมษายน 2568',
      projectUrl: 'https://www.vinno.com/v5',
      longDescription: 'VINNO V5 เป็นเครื่องอัลตราซาวด์แบบพกพาที่ผสมผสานประสิทธิภาพเข้ากับการออกแบบที่กะทัดรัด เหมาะสำหรับสถานการณ์ที่ต้องการความคล่องตัวสูง เช่น การตรวจนอกสถานที่ หรือในพื้นที่จำกัด มอบภาพคุณภาพสูงและฟังก์ชันที่จำเป็นสำหรับการวินิจฉัยที่แม่นยำ',
    },
    partnerId: 'samsung',
    categoryId: 'it-solutions',
  },
  {
    id: 'vinno-e20', // Corrected slug
    name: 'Vinno E20 Ultrasound System',
    image: '/images/products/9-Vinno-E20.jpg',
    description: 'ระบบอัลตราซาวด์ขั้นสูงที่ออกแบบมาเพื่อประสิทธิภาพสูงและใช้งานง่าย.',
    link: '/products/vinno-e20', // Corrected path
    details: {
      overview: 'Vinno E20 เป็นระบบอัลตราซาวด์ขั้นสูงที่ขึ้นชื่อเรื่องประสิทธิภาพสูงและใช้งานง่ายเป็นพิเศษ โดยผสานรวมเทคโนโลยีที่ล้ำสมัยเพื่อมอบภาพวินิจฉัยที่แม่นยำ เสริมสร้างความมั่นใจให้กับแพทย์.',
      keyFeatures: [
        'เทคโนโลยี Xcen: เพื่อเพิ่มประสิทธิภาพการทะลุทะลวงและความละเอียด.',
        'เทคโนโลยี VFusion และ VSpeckle: เพื่อปรับปรุงความคมชัดของภาพและลดสิ่งแปลกปลอม.',
        'อินเทอร์เฟซหน้าจอสัมผัสที่ใช้งานง่ายสำหรับการทำงานที่ไม่ต้องใช้ความพยายาม.',
        'แพ็คเกจการวัดและการวิเคราะห์ที่ครอบคลุม.',
      ],
      applications: [],
      sectionsContent: [
        {
          title: 'การกำหนดมาตรฐานใหม่',
          type: 'paragraph',
          content: 'Vinno E20 กำหนดมาตรฐานใหม่สำหรับการวินิจฉัยด้วยอัลตราซาวด์ที่มีประสิทธิภาพและแม่นยำ.',
        },
      ],
      category: 'ระบบอัลตราซาวด์',
      client: 'โรงพยาบาลและคลินิก',
      projectDate: '20 พฤษภาคม 2568',
      projectUrl: 'https://www.vinno.com/e20',
      longDescription: 'VINNO E20 เป็นระบบอัลตราซาวด์ที่ล้ำสมัยซึ่งโดดเด่นด้วยการผสมผสานประสิทธิภาพที่แข็งแกร่งเข้ากับอินเทอร์เฟซที่ใช้งานง่าย มอบภาพวินิจฉัยคุณภาพสูงและฟังก์ชันที่หลากหลายเพื่อตอบสนองความต้องการที่เปลี่ยนแปลงไปของเวชปฏิบัติสมัยใหม่',
    },
    partnerId: 'ge',
    categoryId: 'it-solutions',
  },
  {
    id: 'vinno-d300', // Corrected slug
    name: 'Vinno D300 Ultrasound System',
    image: '/images/products/10-Vinno-D300.jpg', // FIX: Corrected image path
    description: 'ระบบอัลตราซาวด์ที่เชื่อถือได้และมีประสิทธิภาพสำหรับความต้องการในการวินิจฉัยในชีวิตประจำวัน.',
    link: '/products/vinno-d300', // Corrected path
    details: {
      overview: 'Vinno D300 เป็นระบบอัลตราซาวด์ที่เชื่อถือได้และมีประสิทธิภาพซึ่งออกแบบมาเพื่อตอบสนองความต้องการในการวินิจฉัยในชีวิตประจำวัน โดยผสมผสานประสิทธิภาพที่แข็งแกร่งเข้ากับความสะดวกในการใช้งาน ทำให้เป็นตัวเลือกที่ยอดเยี่ยมสำหรับสถานพยาบาลที่หลากหลาย.',
      keyFeatures: [
        'คุณภาพของภาพที่มั่นคงสำหรับการวินิจฉัยที่มั่นใจ.',
        'ส่วนต่อประสานผู้ใช้ที่เป็นมิตรสำหรับการเรียนรู้และการใช้งานที่รวดเร็ว.',
        'การออกแบบที่ทนทานเพื่อความน่าเชื่อถือในระยะยาว.',
        'โซลูชันที่คุ้มค่าโดยไม่ลดทอนคุณสมบัติที่จำเป็น.',
      ],
      applications: [],
      sectionsContent: [
        {
          title: 'โซลูชันที่เชื่อถือได้',
          type: 'paragraph',
          content: 'สำหรับโซลูชันอัลตราซาวด์ที่เชื่อถือได้และให้ผลลัพธ์ที่สม่ำเสมอ เลือก Vinno D300.',
        },
      ],
      category: 'ระบบอัลตราซาวด์',
      client: 'คลินิกทั่วไป',
      projectDate: '01 มิถุนายน 2568',
      projectUrl: 'https://www.vinno.com/d300',
      longDescription: 'VINNO D300 เป็นระบบอัลตราซาวด์ที่ออกแบบมาเพื่อความน่าเชื่อถือและประสิทธิภาพในการวินิจฉัยประจำวัน มอบภาพคุณภาพสูงและฟังก์ชันการใช้งานที่จำเป็นในแพ็คเกจที่ใช้งานง่าย เหมาะสำหรับคลินิกและโรงพยาบาลที่ต้องการโซลูชั่นอัลตราซาวด์ที่คุ้มค่า',
    },
    partnerId: 'vinno',
    categoryId: 'it-solutions',
  },
];

// ******** นี่คือ partners array ********
export const partners = [
    { id: 'all', name: 'ทั้งหมด', logo: '/images/logos_partner/all_logo.png' }, // สำหรับแสดงทั้งหมด
    { id: 'fujifilm', name: 'Fujifilm', logo: '/images/logos_partner/fujifilm_logo.png' },
    { id: 'mbits', name: 'Mbits', logo: '/images/logos_partner/mbits_logo.png' },
    { id: 'mindray', name: 'Mindray', logo: '/images/logos_partner/mindray_logo.png' },
    { id: 'samsung', name: 'Samsung', logo: '/images/logos_partner/samsung_logo.png' },
    { id: 'synapse', name: 'Synapse', logo: '/images/logos_partner/synapse_logo.png' },
    { id: 'vieworks', name: 'Vieworks', logo: '/images/logos_partner/vieworks_logo.png' },
    { id: 'vinno', name: 'VINNO Healthcare', logo: '/images/logos_partner/vinno_logo.png' }, // เพิ่ม VINNO
    { id: 'ge', name: 'GE Healthcare', logo: '/images/logos_partner/ge_logo.png' }, // เพิ่ม GE
    // เพิ่ม partner อื่นๆ ที่คุณมี
];

// ******** นี่คือ categories array ********
export const categories: CategoryType[] = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'radiology', name: 'Radiology & Imaging Systems' },
    { id: 'it-solutions', name: 'Health Care IT Solutions' },
    // เพิ่มหมวดหมู่อื่นๆ ที่คุณมี
];