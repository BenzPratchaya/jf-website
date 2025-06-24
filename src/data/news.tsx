// src/data/news.ts

export type NewsItemDetails = {
  fullContent: string; // เนื้อหาข่าวฉบับเต็ม
  author?: string; // **KEY CHANGE: เพิ่มผู้เขียน**
  mainImageAlt?: string; // **KEY CHANGE: เพิ่ม Alt Text สำหรับรูปหลักในหน้ารายละเอียด (ถ้าต่างจาก title)**
  galleryImages?: string[]; // **KEY CHANGE: เพิ่มรูปภาพสำหรับแกลเลอรีในข่าว**
  relatedLinks?: { text: string; url: string }[]; // ลิงก์ที่เกี่ยวข้อง
};

export type NewsItemType = {
  id: string; // **ต้องเป็น slug ที่ใช้ใน URL (เช่น 'news1')**
  imageUrl: string;
  category: string; // เช่น 'JF', 'Event', 'Update'
  date: string; // เช่น '23 JUNE 2025'
  title: string;
  description: string; // คำอธิบายสั้นๆ
  link: string; // **ต้องตรงกับ id (เช่น '/news/news1')**
  details: NewsItemDetails;
};

export const newsItems: NewsItemType[] = [
  {
    id: 'news1',
    imageUrl: '/images/news/picnews.png',
    category: 'Event',
    date: '23 JUNE 2025',
    title: 'ในหลวง-พระราชินี พระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์(AI)',
    description: 'ในหลวง-พระราชินี พระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์(AI) ให้แก่ " รพ.สมุทรสาคร" นำไปประจำการที่  รพ.ภาคสนามศูนย์ห่วงใยคนสาคร บริษัท J.F.Advance Med  มีความภูมิใจที่ได้เป็นส่วนหนึ่งในการติดตั้งเครื่องและระบบเพื่อให้บริการแก่ผู้ป่วยในช่วงภาวะวิกฤติ Covid-19',
    link: '/news/news1',
    details: {
      fullContent: `
        <p><strong>23 มิถุนายน 2568</strong> — พระบาทสมเด็จพระเจ้าอยู่หัวและสมเด็จพระนางเจ้าฯ พระบรมราชินี ทรงพระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์ (AI) แก่โรงพยาบาลสมุทรสาคร ซึ่งนำไปประจำการ ณ โรงพยาบาลภาคสนามศูนย์ห่วงใยคนสาคร.</p>
        <p>บริษัท เจ.เอฟ. แอดวาน เมด จำกัด มีความภาคภูมิใจเป็นอย่างยิ่งที่ได้เป็นส่วนหนึ่งในการติดตั้งเครื่องมือและระบบอันทันสมัยนี้ เพื่อให้บริการทางการแพทย์แก่ผู้ป่วยในช่วงวิกฤตการณ์การแพร่ระบาดของโรคโควิด-19.</p>
        <p>โครงการนี้แสดงถึงพระมหากรุณาธิคุณอันหาที่สุดมิได้ และความมุ่งมั่นของทุกภาคส่วนในการร่วมมือกันเพื่อดูแลสุขภาพของประชาชนในช่วงเวลาที่ยากลำบาก.</p>
      `,
      author: 'JF Advance Med Team', // **KEY CHANGE: ตัวอย่างข้อมูลสำหรับ author**
      mainImageAlt: 'ในหลวงและพระราชินี พระราชทานเครื่องเอกซเรย์', // **KEY CHANGE: ตัวอย่างข้อมูล alt text รูปหลัก**
      galleryImages: [],
      relatedLinks: [
        { text: 'อ่านข่าวเพิ่มเติมจาก รพ.สมุทรสาคร', url: 'https://www.example.com/sa-hospital-news' },
      ],
    },
  },
  {
    id: 'news2',
    imageUrl: '/images/news/picnews2.png',
    category: 'JF',
    date: '20 JUNE 2025',
    title: 'JF Advance Med ร่วมลงนาม MOU พัฒนาระบบ AI สำหรับโรงพยาบาล',
    description: 'บริษัท เจ.เอฟ. แอดวาน เมด จำกัด ร่วมลงนามบันทึกข้อตกลงความร่วมมือว่าด้วยการพัฒนาระบบปัญญาประดิษฐ์ A.I. Technology สำหรับใช้ในโรงพยาบาล เพื่อยกระดับการวินิจฉัยทางการแพทย์.',
    link: '/news/news2',
    details: {
      fullContent: `
        <p><strong>20 มิถุนายน 2568</strong> — บริษัท เจ.เอฟ. แอดวาน เมด จำกัด ได้ร่วมลงนามบันทึกข้อตกลงความร่วมมือ (MOU) กับคณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล และบริษัทชั้นนำอื่นๆ ในการพัฒนาระบบปัญญาประดิษฐ์ (AI) สำหรับใช้ในโรงพยาบาล.</p>
        <p>ความร่วมมือนี้มีวัตถุประสงค์เพื่อสร้างองค์ความรู้ แลกเปลี่ยนประสบการณ์ และพัฒนา AI ในการอ่านผลภาพทางการแพทย์ (Medical Image) เช่น ภาพเอกซเรย์ทรวงอก (Chest X-ray) และภาพเอกซเรย์เต้านม (Mammography) เพื่อให้การวินิจฉัยแม่นยำและรวดเร็วยิ่งขึ้น.</p>
        <p>พิธีลงนามจัดขึ้นเมื่อวันศุกร์ที่ 25 กันยายน 2563 ณ โรงพยาบาลศิริราช ซึ่งเป็นก้าวสำคัญในการนำเทคโนโลยี AI มาประยุกต์ใช้ในวงการแพทย์ของประเทศไทย.</p>
      `,
      author: 'Siriraj & JF Team',
      mainImageAlt: 'พิธีลงนาม MOU พัฒนาระบบ AI',
      galleryImages: [], // ไม่มีรูปภาพในแกลเลอรีสำหรับข่าวนี้
      relatedLinks: [
        { text: 'ข้อมูลเพิ่มเติมเกี่ยวกับความร่วมมือ AI', url: 'https://www.example.com/jf-ai-mou' },
      ],
    },
  },
  {
    id: 'news3',
    imageUrl: '/images/news/picnews3.jpg',
    category: 'JF',
    date: '18 JUNE 2025',
    title: 'ร่วมลงนามบันทึกข้อตกลงความร่วมมือว่าด้วยการพัฒนาระบบปัญญาประดิษฐ์ A.I. Technology สำหรับใช้ในโรงพยาบาล (เพิ่มเติม)',
    description: 'คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล โดยภาควิชารังสีวิทยา ร่วมลงนามบันทึกข้อตกลงความร่วมมือ...',
    link: '/news/news3',
    details: {
      fullContent: `<p>รายละเอียดเต็มของข่าว 3...</p>`,
      author: 'JF Comm Team',
      mainImageAlt: 'การลงนาม AI Technology',
      galleryImages: [ // **KEY CHANGE: ตัวอย่างข้อมูลรูปภาพใน Gallery**
        '/images/news/gallery/picnews.png', // ต้องมีรูปนี้
        '/images/news/gallery/picnews2.png', // ต้องมีรูปนี้
        '/images/news/gallery/picnews3.jpg', // ต้องมีรูปนี้
      ],
      relatedLinks: [{ text: 'ดูข้อมูลเพิ่มเติม', url: 'https://www.example.com/news3' }],
    }
  },
  {
    id: 'news4',
    imageUrl: '/images/news/picnews4.jpg',
    category: 'Event',
    date: '16 JUNE 2025',
    title: 'โครงการ ตู้ปันสุข “เพราะเราเกิดบนผืนแผ่นดินเดียวกัน”',
    description: 'โครงการ ตู้ปันสุข “เพราะเราเกิดบนผืนแผ่นดินเดียวกัน” บริษัท เจ. เอฟ. แอดวาน เมด จำกัด (JF Advance med) ในยามวิกฤตโควิด-19 ...',
    link: '/news/news4',
    details: {
      fullContent: `<p>รายละเอียดเต็มของข่าว 4...</p>`,
      author: 'JF CSR Team',
      mainImageAlt: 'กิจกรรมตู้ปันสุข',
      galleryImages: [ // **KEY CHANGE: ตัวอย่างข้อมูลรูปภาพใน Gallery**
        '/images/news/gallery/picnews.png', // ต้องมีรูปนี้
        '/images/news/gallery/picnews2.png', // ต้องมีรูปนี้
        '/images/news/gallery/picnews3.jpg', // ต้องมีรูปนี้
      ],
      relatedLinks: [],
    }
  },
  {
    id: 'news5',
    imageUrl: '/images/news/picnews5.jpg',
    category: 'JF',
    date: '10 JUNE 2025',
    title: 'คณะสัตวแพทยศาสตร์และสัตววิทยาประยุกต์ ราชวิทยาลัยจุฬาภรณ์ที่ไว้วางใจและเชื่อมั่นในคุณภาพของ JF โดยได้ส่งมอบเครื่องเอกซเรย์ดิจิตอลแบบหูหิ้ว',
    description: '#เอกซเรย์ดิจิตอลที่ได้รับการตอบรับเป็นอย่างดี อีกหนึ่งความภาคภูมิใจของการส่งมอบงาน คณะสัตวแพทยศาสตร์และสัตววิทยาประยุกต์...',
    link: '/news/news5',
    details: {
      fullContent: `<p>รายละเอียดเต็มของข่าว 5...</p>`,
      author: 'JF Sales Dept.',
      mainImageAlt: 'การส่งมอบเครื่องเอกซเรย์',
      galleryImages: [ // **KEY CHANGE: ตัวอย่างข้อมูลรูปภาพใน Gallery**
        '/images/news/gallery/picnews.png', // ต้องมีรูปนี้
        '/images/news/gallery/picnews2.png', // ต้องมีรูปนี้
        '/images/news/gallery/picnews3.jpg', // ต้องมีรูปนี้
      ],
      relatedLinks: [],
    }
  },
  {
    id: 'news6',
    imageUrl: '/images/news/picnews6.jpg',
    category: 'Event',
    date: '05 JUNE 2025',
    title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา ที่เลือกใช้ เครื่องเอกซเรย์ Samsung GC85A',
    description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    link: '/news/news6',
    details: {
      fullContent: `<p>รายละเอียดเต็มของข่าว 6...</p>`,
      author: 'JF Customer Service',
      mainImageAlt: 'การติดตั้งเครื่องเอกซเรย์ Samsung',
      galleryImages: ['/images/news/gallery/news6-gallery1.jpg', '/images/news/gallery/news6-gallery2.jpg'],
      relatedLinks: [],
    }
  },
  {
    id: 'news7',
    imageUrl: '/images/news/picnews6.jpg',
    category: 'Event',
    date: '05 JUNE 2025',
    title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย (สำเนา 1)',
    description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    link: '/news/news7',
    details: {
      fullContent: `<p>รายละเอียดเต็มของข่าว 7...</p>`,
      author: 'JF Customer Service',
      mainImageAlt: 'การติดตั้งเครื่องเอกซเรย์ Samsung (สำเนา 1)',
      galleryImages: [],
      relatedLinks: [],
    }
  },
  {
    id: 'news8',
    imageUrl: '/images/news/picnews6.jpg',
    category: 'Event',
    date: '05 JUNE 2025',
    title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย (สำเนา 2)',
    description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    link: '/news/news8',
    details: {
      fullContent: `<p>รายละเอียดเต็มของข่าว 8...</p>`,
      author: 'JF Customer Service',
      mainImageAlt: 'การติดตั้งเครื่องเอกซเรย์ Samsung (สำเนา 2)',
      galleryImages: [],
      relatedLinks: [],
    }
  },
  {
    id: 'news9',
    imageUrl: '/images/news/picnews6.jpg',
    category: 'Event',
    date: '05 JUNE 2025',
    title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้ เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง (สำเนา 3)',
    description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    link: '/news/news9',
    details: {
      fullContent: `<p>รายละเอียดเต็มของข่าว 9...</p>`,
      author: 'JF Customer Service',
      mainImageAlt: 'การติดตั้งเครื่องเอกซเรย์ Samsung (สำเนา 3)',
      galleryImages: [],
      relatedLinks: [],
    }
  },
];