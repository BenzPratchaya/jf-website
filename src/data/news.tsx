// src/data/news.ts

export type NewsContentBlock = { // Type สำหรับ Content Block
  title?: string;
  type: 'paragraph' | 'image' | 'heading' | 'list'; // ประเภทของบล็อกเนื้อหา
  content?: string; // สำหรับ type 'paragraph' หรือ 'heading'
  imageUrl?: string; // สำหรับ type 'image' (Path ของรูปภาพ)
  items?: string[]; // สำหรับ type 'list'
  level?: 'h2' | 'h3'; // สำหรับ type 'heading' (ระดับของหัวข้อ)
};

export type NewsItemDetails = {
  contentBlocks: NewsContentBlock[];
  author?: string;
  relatedLinks?: { text: string; url: string }[];
};

export type NewsItemType = {
  id: string;
  imageUrl: string; // รูปภาพหลักของข่าว (สำหรับหน้า List)
  category: string; // เช่น 'JF', 'Event', 'Update'
  date: string; // เช่น '23 JUNE 2025'
  title: string;
  description: string; // คำอธิบายสั้นๆ
  link: string; // ลิงก์ไปยังหน้ารายละเอียดข่าว (เช่น '/news/news1')
  details: NewsItemDetails;
};

export const newsItems: NewsItemType[] = [
  {
    id: 'news1',
    imageUrl: '/images/news/picnews1.jpg',
    category: 'Event', date: '23 JUNE 2025',
    title: 'ในหลวง-พระราชินี พระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์(AI)',
    description: 'ในหลวง-พระราชินี พระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์(AI) ให้แก่ " รพ.สมุทรสาคร"...',
    link: '/news/news1',
    details: {
      contentBlocks: [
        { type: 'paragraph', content: '<strong>23 มิถุนายน 2568</strong> — พระบาทสมเด็จพระเจ้าอยู่หัวและสมเด็จพระนางเจ้าฯ พระบรมราชินี ทรงพระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์ (AI) แก่โรงพยาบาลสมุทรสาคร...' },
        { type: 'paragraph', content: 'บริษัท เจ.เอฟ. แอดวาน เมด จำกัด มีความภาคภูมิใจเป็นอย่างยิ่งที่ได้เป็นส่วนหนึ่งในการติดตั้งเครื่องมือและระบบอันทันสมัยนี้...' },
        { type: 'image', imageUrl: '/images/news/picnews1_1.jpg' }, 
        { type: 'paragraph', content: 'โครงการนี้แสดงถึงพระมหากรุณาธิคุณอันหาที่สุดมิได้ และความมุ่งมั่นของทุกภาคส่วน...' },
        { type: 'heading', level: 'h3', content: 'ความสำคัญของเทคโนโลยีนี้' },
        { type: 'list', items: ['การวินิจฉัยรวดเร็วและแม่นยำด้วย AI', 'ลดความเสี่ยงจากการเคลื่อนย้ายผู้ป่วย', 'เพิ่มประสิทธิภาพการทำงานของบุคลากรทางการแพทย์'] },
      ],
      author: 'JF Advance Med', relatedLinks: [{ text: 'อ่านข่าวเพิ่มเติมจาก JF Advance Med', url: 'https://www.example.com' }],
    },
  },
  {
    id: 'news2', imageUrl: '/images/news/picnews2.jpg', category: 'JF', date: '20 JUNE 2025',
    title: 'JF Advance Med ร่วมลงนาม MOU พัฒนาระบบ AI สำหรับโรงพยาบาล',
    description: 'บริษัท เจ.เอฟ. แอดวาน เมด จำกัด ร่วมลงนามบันทึกข้อตกลงความร่วมมือว่าด้วยการพัฒนาระบบปัญญาประดิษฐ์ A.I. Technology สำหรับใช้ในโรงพยาบาล เพื่อยกระดับการวินิจฉัยทางการแพทย์.',
    link: '/news/news2',
    details: {
      contentBlocks: [
        { type: 'paragraph', content: '<strong>20 มิถุนายน 2568</strong> — บริษัท เจ.เอฟ. แอดวาน เมด จำกัด ได้ร่วมลงนามบันทึกข้อตกลงความร่วมมือ (MOU) กับคณะแพทยศาสตร์ศิริราชพยาบาล...' },
        { type: 'image', imageUrl: '/images/news/picnews2.jpg' }, 
        { type: 'paragraph', content: 'ความร่วมมือนี้มีวัตถุประสงค์เพื่อสร้างองค์ความรู้ แลกเปลี่ยนประสบการณ์...' },
      ],
      author: 'Siriraj & JF Advance Med', relatedLinks: [{ text: 'อ่านข่าวเพิ่มเติมจาก JF Advance Med', url: 'https://www.example.com' }],
    }
  },
  {
    id: 'news3', imageUrl: '/images/news/picnews3.jpg', category: 'JF', date: '18 JUNE 2025',
    title: 'ร่วมลงนามบันทึกข้อตกลงความร่วมมือว่าด้วยการพัฒนาระบบปัญญาประดิษฐ์ A.I. Technology สำหรับใช้ในโรงพยาบาล (เพิ่มเติม)',
    description: 'คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล โดยภาควิชารังสีวิทยา ร่วมลงนามบันทึกข้อตกลงความร่วมมือ...',
    link: '/news/news3',
    details: {
      contentBlocks: [
        { type: 'paragraph', content: '<p>คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล โดยภาควิชารังสีวิทยา ร่วมลงนามบันทึกข้อตกลงความร่วมมือว่าด้วยการพัฒนาระบบปัญญาประดิษฐ์ A.I. Technology สำหรับใช้ในโรงพยาบาล ระหว่างบริษัทฟูจิฟิล์ม (ประเทศไทย) จำกัด, บริษัท เจ. เอฟ. แอดวาน เมด จำกัด,  บริษัท Lunit จำกัด  สาธารณรัฐเกาหลี  เพื่อให้เกิดความร่วมมือด้านวิชาการพัฒนาสร้างองค์ความรู้ แลกเปลี่ยนความรู้ และประสบการณ์ ระหว่างบุคลากร ในด้านการพัฒนาระบบ ปัญญาประดิษฐ์ เพื่อการอ่านผลภาพทางการแพทย์ (Medical Image) และสร้างรายงานทางการแพทย์เบื้องต้นอย่างถูกต้อง และแม่นยำ โดยครอบคลุมการประมวลผลข้อมูลแผ่นฟิล์มเอกซเรย์ทรวงอก (Chest X-ray) และประมวลผลข้อมูลแผ่นฟิล์มเอกซเรย์เต้านม (Mammography)  ซึ่งจัดขึ้นเมื่อวันศุกร์ที่ 25 กันยายน 2563 เวลา 10.00 -11.00 น. ณ ห้องประชุม 1 ตึกอำนวยการ ชั้น 3 โรงพยาบาลศิริราช</p>' },
        { type: 'image', imageUrl: '/images/news/picnews3_1.jpg' },
      ],
      author: 'JF Advance Med', relatedLinks: [{ text: 'อ่านข่าวเพิ่มเติมจาก JF Advance Med', url: 'https://www.example.com' }],
    }
  },
  {
    id: 'news4', imageUrl: '/images/news/picnews4.jpg', category: 'Event', date: '16 JUNE 2025',
    title: 'โครงการ ตู้ปันสุข “เพราะเราเกิดบนผืนแผ่นดินเดียวกัน” ',
    description: 'โครงการ ตู้ปันสุข “เพราะเราเกิดบนผืนแผ่นดินเดียวกัน” บริษัท เจ. เอฟ. แอดวาน เมด จำกัด (JF Advance med) ในยามวิกฤตโควิด-19 ...',
    link: '/news/news4',
    details: {
      contentBlocks: [
        { type: 'paragraph', content: '<p>ในยามวิกฤตโควิด-19 ผู้คนต่างลำบากมากขึ้น ทั้งตกงาน ว่างงาน รายได้ลดลง ต่างดิ้นรนเพื่อความอยู่รอด ทั้งนี้ด้วยความตั้งใจทั้งแรงกายแรงใจของทุกคนในบริษัทฯ อยากร่วมแบ่งปันและช่วยเหลือสังคม และเพื่อนร่วมชาติ จึงขอเป็นอีกหนึ่งกำลังใจ แบ่งปัน แบ่งอิ่ม เท่าที่พวกเราทำกันไหว จึงเกิดโครงการนี้ขึ้น</p>' },
        { type: 'image', imageUrl: '/images/news/picnews4_1.jpg' },
        { type: 'paragraph', content: '<p>พวกเรามีความตั้งใจทำตู้ปันสุข จำนวน 30 ตู้ วางประจำ 30 จุด และเติมอาหารแห้ง อาทิ มาม่า ข้าวสาร ปลากระป๋อง ไข่ไก่ แมสป้องกันโควิด เติมครบตลอด 30 วัน วันละ 2 รอบ เช้า-เย็น</p>' },
        { type: 'paragraph', content: '<p>และสิ่งที่หวังของโครงการนี้คือ อยากให้สังคมเกิดการแบ่งปันในยามวิกฤตนี้ เช่นกัน ขอให้ท่าน “หยิบแต่พอดี ถ้าท่านมีใส่ให้เพิ่มเติม” สังคมในยามวิกฤตนี้ จะอยู่รอดได้ เมื่อทุกคนแบ่งปันกัน รักกัน สามัคคีกัน และเห็นอกเห็นใจกัน</p>' },
      ],
      author: 'JF Advance Med', relatedLinks: [{ text: 'อ่านข่าวเพิ่มเติมจาก JF Advance Med', url: 'https://www.example.com' }],
    }
  },
  {
    id: 'news5', imageUrl: '/images/news/picnews5.jpg', category: 'JF', date: '10 JUNE 2025',
    title: 'คณะสัตวแพทยศาสตร์และสัตววิทยาประยุกต์ ราชวิทยาลัยจุฬาภรณ์ที่ไว้วางใจและเชื่อมั่นในคุณภาพของ JF โดยได้ส่งมอบเครื่องเอกซเรย์ดิจิตอลแบบหูหิ้ว',
    description: '#เอกซเรย์ดิจิตอลที่ได้รับการตอบรับเป็นอย่างดี อีกหนึ่งความภาคภูมิใจของการส่งมอบงาน...',
    link: '/news/news5',
    details: {
      contentBlocks: [
        { type: 'paragraph', content: '<p>อีกหนึ่งความภาคภูมิใจของการส่งมอบงาน คณะสัตวแพทยศาสตร์และสัตววิทยาประยุกต์ ราชวิทยาลัยจุฬาภรณ์ ที่ไว้วางใจและเชื่อมั่นในคุณภาพของ JF โดยได้ส่งมอบ</p>' },
        { type: 'image', imageUrl: '/images/news/picnews5_1.jpg' },
        { type: 'heading', level: 'h3', content: 'เครื่องเอกซเรย์แบบหูหิ้ว' },
        { type: 'list', items: ['ใช้งานง่าย รวดเร็ว สะดวกและทันสมัย', 'สำหรับถ่ายเอกซเรย์นอกสถานที่ ที่ง่ายขึ้น', 'ช่วยในการวินิจฉัยได้อย่างมีประสิทธิภาพ', 'ขุมพลังเอกซเรย์ ที่พร้อมลุยทุกงาน'] },
        { type: 'paragraph', content: '<p>ทั้งนี้เพื่อประโยชน์ในการรักษาสัตว์ป่วย JF พร้อมที่จะพัฒนาอุปกรณ์และเครื่องมือให้ทันสมัย และต่อเนื่องอยู่ตลอดเวลา JF ขอเป็นส่วนหนึ่งในการบริการด้วยคุณภาพ ที่มีความตั้งใจและใส่ใจ ในการดูแลสัตวแพทย์ทุกท่าน เพื่อช่วยให้สัตวแพทย์ทำงานได้อย่างสะดวก ก่อให้เกิดประโยชน์สูงสุดในการรักษาสัตว์ป่วย J.F.Advance Med Co.,Ltd.  ผู้นำเทคโนโลยีคุณภาพที่ลูกค้าเชื่อมั่นและไว้วางใจ</p>' },
      ],
      author: 'JF Advance Med.', relatedLinks: [],
    }
  },
  {
    id: 'news6', imageUrl: '/images/news/picnews6.jpg', category: 'Event', date: '05 JUNE 2025',
    title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้ เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง',
    description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    link: '/news/news6',
    details: {
      contentBlocks: [{ type: 'paragraph', content: '<p>รายละเอียดเต็มของข่าว 6...</p>' }],
      author: 'JF Advance Med', relatedLinks: [],
    }
  },
  {
    id: 'news7', imageUrl: '/images/news/picnews6.jpg', category: 'Event', date: '05 JUNE 2025',
    title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้ เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง (สำเนา)',
    description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    link: '/news/news7',
    details: {
      contentBlocks: [{ type: 'paragraph', content: '<p>รายละเอียดเต็มของข่าว 7...</p>' }],
      author: 'JF Advance Med', relatedLinks: [],
    }
  },
  {
    id: 'news8', imageUrl: '/images/news/picnews6.jpg', category: 'Event', date: '05 JUNE 2025',
    title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้ เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง (สำเนา 2)',
    description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    link: '/news/news8',
    details: {
      contentBlocks: [{ type: 'paragraph', content: '<p>รายละเอียดเต็มของข่าว 8...</p>' }],
      author: 'JF Advance Med', relatedLinks: [],
    }
  },
  {
    id: 'news9', imageUrl: '/images/news/picnews6.jpg', category: 'Event', date: '05 JUNE 2025',
    title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้ เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง (สำเนา 3)',
    description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    link: '/news/news9',
    details: {
      contentBlocks: [{ type: 'paragraph', content: '<p>รายละเอียดเต็มของข่าว 9...</p>' }],
      author: 'JF Advance Med', relatedLinks: [],
    }
  },
];