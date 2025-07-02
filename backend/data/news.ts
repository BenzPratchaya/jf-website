// src/data/news.ts

export type NewsContentBlock = { // Type สำหรับ Content Block
  ncb_title?: string; // ชื่อหัวข้อ (สำหรับ type 'heading')
  ncb_type: 'paragraph' | 'image' | 'heading' | 'list'; // ประเภทของบล็อกเนื้อหา
  ncb_content?: string; // สำหรับ type 'paragraph' หรือ 'heading'
  ncb_image?: string; // สำหรับ type 'image' (Path ของรูปภาพ)
  ncb_items?: string[]; // สำหรับ type 'list'
  ncb_level?: 'h2' | 'h3'; // สำหรับ type 'heading' (ระดับของหัวข้อ)
};

export type NewsItemDetails = {
  nid_contentBlocks: NewsContentBlock[]; // รายการของ Content Block ที่ประกอบด้วยเนื้อหาของข่าว
  nid_author?: string; // ชื่อผู้เขียนข่าว
};

export type NewsItemType = { // Type สำหรับข่าวแต่ละรายการ
  nit_id: string; // รหัสข่าว (เช่น 'news1', 'news2', ...)
  nit_image: string; // รูปภาพหลักของข่าว (สำหรับหน้า List)
  nit_category: string; // เช่น 'JF', 'Event', 'Upnit_date'
  nit_date: string; // เช่น '23 JUNE 2025'
  nit_title: string; // ชื่อข่าว (สำหรับหน้า List)
  nit_description: string; // คำอธิบายสั้นๆ
  nit_link: string; // ลิงก์ไปยังหน้ารายละเอียดข่าว (เช่น '/news/news1')
  nit_details: NewsItemDetails; // รายละเอียดของข่าวที่ประกอบด้วย Content Block
};

export const newsItems: NewsItemType[] = [
  {
    nit_id: 'news1',
    nit_image: '/images/news/picnews1.jpg',
    nit_category: 'Event', nit_date: '23 JUNE 2025',
    nit_title: 'ในหลวง-พระราชินี พระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์(AI)',
    nit_description: 'ในหลวง-พระราชินี พระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์(AI) ให้แก่ " รพ.สมุทรสาคร"...',
    nit_link: '/news/news1',
    nit_details: {
      nid_contentBlocks: [
        { ncb_type: 'paragraph', ncb_content: '<strong>23 มิถุนายน 2568</strong> — พระบาทสมเด็จพระเจ้าอยู่หัวและสมเด็จพระนางเจ้าฯ พระบรมราชินี ทรงพระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์ (AI) แก่โรงพยาบาลสมุทรสาคร...' },
        { ncb_type: 'paragraph', ncb_content: 'บริษัท เจ.เอฟ. แอดวาน เมด จำกัด มีความภาคภูมิใจเป็นอย่างยิ่งที่ได้เป็นส่วนหนึ่งในการติดตั้งเครื่องมือและระบบอันทันสมัยนี้...' },
        { ncb_type: 'image', ncb_image: '/images/news/picnews1_1.jpg' }, 
        { ncb_type: 'paragraph', ncb_content: 'โครงการนี้แสดงถึงพระมหากรุณาธิคุณอันหาที่สุดมิได้ และความมุ่งมั่นของทุกภาคส่วน...' },
        { ncb_type: 'heading', ncb_level: 'h3', ncb_content: 'ความสำคัญของเทคโนโลยีนี้' },
        { ncb_type: 'list', ncb_items: ['การวินิจฉัยรวดเร็วและแม่นยำด้วย AI', 'ลดความเสี่ยงจากการเคลื่อนย้ายผู้ป่วย', 'เพิ่มประสิทธิภาพการทำงานของบุคลากรทางการแพทย์'] },
      ],
      nid_author: 'JF Advance Med',
    },
  },
  {
    nit_id: 'news2', nit_image: '/images/news/picnews2.jpg', nit_category: 'JF', nit_date: '20 JUNE 2025',
    nit_title: 'JF Advance Med ร่วมลงนาม MOU พัฒนาระบบ AI สำหรับโรงพยาบาล',
    nit_description: 'บริษัท เจ.เอฟ. แอดวาน เมด จำกัด ร่วมลงนามบันทึกข้อตกลงความร่วมมือว่าด้วยการพัฒนาระบบปัญญาประดิษฐ์ A.I. Technology สำหรับใช้ในโรงพยาบาล เพื่อยกระดับการวินิจฉัยทางการแพทย์.',
    nit_link: '/news/news2',
    nit_details: {
      nid_contentBlocks: [
        { ncb_type: 'paragraph', ncb_content: '<strong>20 มิถุนายน 2568</strong> — บริษัท เจ.เอฟ. แอดวาน เมด จำกัด ได้ร่วมลงนามบันทึกข้อตกลงความร่วมมือ (MOU) กับคณะแพทยศาสตร์ศิริราชพยาบาล...' },
        { ncb_type: 'image', ncb_image: '/images/news/picnews2.jpg' }, 
        { ncb_type: 'paragraph', ncb_content: 'ความร่วมมือนี้มีวัตถุประสงค์เพื่อสร้างองค์ความรู้ แลกเปลี่ยนประสบการณ์...' },
      ],
      nid_author: 'Siriraj & JF Advance Med', 
    }
  },
  {
    nit_id: 'news3', nit_image: '/images/news/picnews3.jpg', nit_category: 'JF', nit_date: '18 JUNE 2025',
    nit_title: 'ร่วมลงนามบันทึกข้อตกลงความร่วมมือว่าด้วยการพัฒนาระบบปัญญาประดิษฐ์ A.I. Technology สำหรับใช้ในโรงพยาบาล (เพิ่มเติม)',
    nit_description: 'คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล โดยภาควิชารังสีวิทยา ร่วมลงนามบันทึกข้อตกลงความร่วมมือ...',
    nit_link: '/news/news3',
    nit_details: {
      nid_contentBlocks: [
        { ncb_type: 'paragraph', ncb_content: '<p>คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล โดยภาควิชารังสีวิทยา ร่วมลงนามบันทึกข้อตกลงความร่วมมือว่าด้วยการพัฒนาระบบปัญญาประดิษฐ์ A.I. Technology สำหรับใช้ในโรงพยาบาล ระหว่างบริษัทฟูจิฟิล์ม (ประเทศไทย) จำกัด, บริษัท เจ. เอฟ. แอดวาน เมด จำกัด,  บริษัท Lunit จำกัด  สาธารณรัฐเกาหลี  เพื่อให้เกิดความร่วมมือด้านวิชาการพัฒนาสร้างองค์ความรู้ แลกเปลี่ยนความรู้ และประสบการณ์ ระหว่างบุคลากร ในด้านการพัฒนาระบบ ปัญญาประดิษฐ์ เพื่อการอ่านผลภาพทางการแพทย์ (Medical Image) และสร้างรายงานทางการแพทย์เบื้องต้นอย่างถูกต้อง และแม่นยำ โดยครอบคลุมการประมวลผลข้อมูลแผ่นฟิล์มเอกซเรย์ทรวงอก (Chest X-ray) และประมวลผลข้อมูลแผ่นฟิล์มเอกซเรย์เต้านม (Mammography)  ซึ่งจัดขึ้นเมื่อวันศุกร์ที่ 25 กันยายน 2563 เวลา 10.00 -11.00 น. ณ ห้องประชุม 1 ตึกอำนวยการ ชั้น 3 โรงพยาบาลศิริราช</p>' },
        { ncb_type: 'image', ncb_image: '/images/news/picnews3_1.jpg' },
      ],
      nid_author: 'JF Advance Med', 
    }
  },
  {
    nit_id: 'news4', nit_image: '/images/news/picnews4.jpg', nit_category: 'Event', nit_date: '16 JUNE 2025',
    nit_title: 'โครงการ ตู้ปันสุข “เพราะเราเกิดบนผืนแผ่นดินเดียวกัน” ',
    nit_description: 'โครงการ ตู้ปันสุข “เพราะเราเกิดบนผืนแผ่นดินเดียวกัน” บริษัท เจ. เอฟ. แอดวาน เมด จำกัด (JF Advance med) ในยามวิกฤตโควิด-19 ...',
    nit_link: '/news/news4',
    nit_details: {
      nid_contentBlocks: [
        { ncb_type: 'paragraph', ncb_content: '<p>ในยามวิกฤตโควิด-19 ผู้คนต่างลำบากมากขึ้น ทั้งตกงาน ว่างงาน รายได้ลดลง ต่างดิ้นรนเพื่อความอยู่รอด ทั้งนี้ด้วยความตั้งใจทั้งแรงกายแรงใจของทุกคนในบริษัทฯ อยากร่วมแบ่งปันและช่วยเหลือสังคม และเพื่อนร่วมชาติ จึงขอเป็นอีกหนึ่งกำลังใจ แบ่งปัน แบ่งอิ่ม เท่าที่พวกเราทำกันไหว จึงเกิดโครงการนี้ขึ้น</p>' },
        { ncb_type: 'image', ncb_image: '/images/news/picnews4_1.jpg' },
        { ncb_type: 'paragraph', ncb_content: '<p>พวกเรามีความตั้งใจทำตู้ปันสุข จำนวน 30 ตู้ วางประจำ 30 จุด และเติมอาหารแห้ง อาทิ มาม่า ข้าวสาร ปลากระป๋อง ไข่ไก่ แมสป้องกันโควิด เติมครบตลอด 30 วัน วันละ 2 รอบ เช้า-เย็น</p>' },
        { ncb_type: 'paragraph', ncb_content: '<p>และสิ่งที่หวังของโครงการนี้คือ อยากให้สังคมเกิดการแบ่งปันในยามวิกฤตนี้ เช่นกัน ขอให้ท่าน “หยิบแต่พอดี ถ้าท่านมีใส่ให้เพิ่มเติม” สังคมในยามวิกฤตนี้ จะอยู่รอดได้ เมื่อทุกคนแบ่งปันกัน รักกัน สามัคคีกัน และเห็นอกเห็นใจกัน</p>' },
      ],
      nid_author: 'JF Advance Med', 
    }
  },
  {
    nit_id: 'news5', nit_image: '/images/news/picnews5.jpg', nit_category: 'JF', nit_date: '10 JUNE 2025',
    nit_title: 'คณะสัตวแพทยศาสตร์และสัตววิทยาประยุกต์ ราชวิทยาลัยจุฬาภรณ์ที่ไว้วางใจและเชื่อมั่นในคุณภาพของ JF โดยได้ส่งมอบเครื่องเอกซเรย์ดิจิตอลแบบหูหิ้ว',
    nit_description: '#เอกซเรย์ดิจิตอลที่ได้รับการตอบรับเป็นอย่างดี อีกหนึ่งความภาคภูมิใจของการส่งมอบงาน...',
    nit_link: '/news/news5',
    nit_details: {
      nid_contentBlocks: [
        { ncb_type: 'paragraph', ncb_content: '<p>อีกหนึ่งความภาคภูมิใจของการส่งมอบงาน คณะสัตวแพทยศาสตร์และสัตววิทยาประยุกต์ ราชวิทยาลัยจุฬาภรณ์ ที่ไว้วางใจและเชื่อมั่นในคุณภาพของ JF โดยได้ส่งมอบ</p>' },
        { ncb_type: 'image', ncb_image: '/images/news/picnews5_1.jpg' },
        { ncb_type: 'heading', ncb_level: 'h3', ncb_content: 'เครื่องเอกซเรย์แบบหูหิ้ว' },
        { ncb_type: 'list', ncb_items: ['ใช้งานง่าย รวดเร็ว สะดวกและทันสมัย', 'สำหรับถ่ายเอกซเรย์นอกสถานที่ ที่ง่ายขึ้น', 'ช่วยในการวินิจฉัยได้อย่างมีประสิทธิภาพ', 'ขุมพลังเอกซเรย์ ที่พร้อมลุยทุกงาน'] },
        { ncb_type: 'paragraph', ncb_content: '<p>ทั้งนี้เพื่อประโยชน์ในการรักษาสัตว์ป่วย JF พร้อมที่จะพัฒนาอุปกรณ์และเครื่องมือให้ทันสมัย และต่อเนื่องอยู่ตลอดเวลา JF ขอเป็นส่วนหนึ่งในการบริการด้วยคุณภาพ ที่มีความตั้งใจและใส่ใจ ในการดูแลสัตวแพทย์ทุกท่าน เพื่อช่วยให้สัตวแพทย์ทำงานได้อย่างสะดวก ก่อให้เกิดประโยชน์สูงสุดในการรักษาสัตว์ป่วย J.F.Advance Med Co.,Ltd.  ผู้นำเทคโนโลยีคุณภาพที่ลูกค้าเชื่อมั่นและไว้วางใจ</p>' },
      ],
      nid_author: 'JF Advance Med.', 
    }
  },
  {
    nit_id: 'news6', nit_image: '/images/news/picnews6.jpg', nit_category: 'Event', nit_date: '05 JUNE 2025',
    nit_title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้ เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง',
    nit_description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    nit_link: '/news/news6',
    nit_details: {
      nid_contentBlocks: [{ ncb_type: 'paragraph', ncb_content: '<p>รายละเอียดเต็มของข่าว 6...</p>' }],
      nid_author: 'JF Advance Med', 
    }
  },
  {
    nit_id: 'news7', nit_image: '/images/news/picnews6.jpg', nit_category: 'Event', nit_date: '05 JUNE 2025',
    nit_title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้ เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง (สำเนา)',
    nit_description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    nit_link: '/news/news7',
    nit_details: {
      nid_contentBlocks: [{ ncb_type: 'paragraph', ncb_content: '<p>รายละเอียดเต็มของข่าว 7...</p>' }],
      nid_author: 'JF Advance Med', 
    }
  },
  {
    nit_id: 'news8', nit_image: '/images/news/picnews6.jpg', nit_category: 'Event', nit_date: '05 JUNE 2025',
    nit_title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้ เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง (สำเนา 2)',
    nit_description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    nit_link: '/news/news8',
    nit_details: {
      nid_contentBlocks: [{ ncb_type: 'paragraph', ncb_content: '<p>รายละเอียดเต็มของข่าว 8...</p>' }],
      nid_author: 'JF Advance Med', 
    }
  },
  {
    nit_id: 'news9', nit_image: '/images/news/picnews6.jpg', nit_category: 'Event', nit_date: '05 JUNE 2025',
    nit_title: 'JF ขอขอบพระคุณ รพ.สมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้ เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง (สำเนา 3)',
    nit_description: 'JF ขอขอบพระคุณ โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย ที่เลือกใช้เครื่องเอกซเรย์ระบบดิจิตอล ยี่ห้อ Samsung รุ่น GC85A จำนวน 3 เครื่อง อีกหนึ่งความภาคภูมิใจ ...',
    nit_link: '/news/news9',
    nit_details: {
      nid_contentBlocks: [{ ncb_type: 'paragraph', ncb_content: '<p>รายละเอียดเต็มของข่าว 9...</p>' }],
      nid_author: 'JF Advance Med', 
    }
  },
];