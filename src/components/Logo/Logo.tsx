"use client"

import { motion } from "framer-motion"

const Footer = () => {

  const techStack = [
    { imageUrl: "/images/logo/chula_logo.png", alt: "Chulalongkorn University Logo" },
    { imageUrl: "/images/logo/cmu_logo.png", alt: "Chiang Mai University Logo" },
    { imageUrl: "/images/logo/cph_logo.png", alt: "CPH Logo" },
    { imageUrl: "/images/logo/kku_logo.png", alt: "Khon Kaen University Logo" },
    { imageUrl: "/images/logo/lph_logo.png", alt: "LPH Logo" },
    { imageUrl: "/images/logo/MU_logo.png", alt: "Mahidol University Logo" },
    { imageUrl: "/images/logo/NTV_logo.png", alt: "NTV Logo" },
    { imageUrl: "/images/logo/paolo_spk_logo.png", alt: "Paolo Hospital Samut Prakan Logo" },
    { imageUrl: "/images/logo/pcmc_logo.png", alt: "PCMC Logo" },
    { imageUrl: "/images/logo/pednat_logo.png", alt: "Pednat Logo" },
    { imageUrl: "/images/logo/PIH_logo.png", alt: "PIH Logo" },
    { imageUrl: "/images/logo/pr9_logo.png", alt: "PR9 Logo" },
    { imageUrl: "/images/logo/psu_logo.png", alt: "Prince of Songkla University Logo" },
    { imageUrl: "/images/logo/pyt_logo.png", alt: "PYT Logo" },
    { imageUrl: "/images/logo/qsm_logo.png", alt: "QSM Logo" },
    { imageUrl: "/images/logo/rjh_logo.png", alt: "RJH Logo" },
    { imageUrl: "/images/logo/rm_logo.png", alt: "RM Logo" },
    { imageUrl: "/images/logo/siph_logo.png", alt: "Siph Logo" },
    { imageUrl: "/images/logo/siriraj_logo.png", alt: "Siriraj Hospital Logo" },
    { imageUrl: "/images/logo/smsk_logo.png", alt: "SMSK Logo" },
  ];

  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900/90 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* icon zone */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="my-12 overflow-hidden relative" // เพิ่ม relative
          >
            {/* Div สำหรับการเลื่อนต่อเนื่อง */}
            <div
              className="flex whitespace-nowrap animate-scroll-left" // เพิ่มคลาส animate-scroll-left
              style={{ animationDuration: '60s' }} // ปรับความเร็วตามต้องการ
            >
              {[...techStack, ...techStack].map((item, index) => ( // ทำซ้ำ array 2 ครั้ง
                <div
                  className="inline-flex items-center justify-center mx-4 flex-shrink-0" // ใช้ inline-flex และ mx-4 แทน gap-8
                  key={index}
                  style={{ width: '120px', height: '120px' }} // กำหนดขนาดที่แน่นอน
                >
                  <img
                    src={item.imageUrl}
                    alt={item.alt || `Logo ${index}`} // เพิ่ม alt attribute
                    className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300" // ปรับขนาดและ transition
                  />
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </motion.footer>
    </>
  )
}

export default Footer