// components/Hero/Hero.tsx
"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const images = [
  "/images/hero/hero_bg5.jpg",
  "/images/hero/hero_bg2.jpg",
  "/images/hero/hero_bg3.jpg",
]

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // เอฟเฟกต์เปลี่ยนภาพพื้นหลังทุก ๆ 5 วินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    // ทำความสะอาดเมื่อคอมโพเนนต์ถูก unmount
    return () => clearInterval(timer)
  }, [])

  // สไตล์สำหรับพื้นหลังที่มีภาพ ใช้ CSS inline styles เพื่อกำหนดภาพพื้นหลังและการเปลี่ยน
  const bgImage: React.CSSProperties = {
    backgroundImage: `url('${images[currentImageIndex]}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    transition: "background-image 1s ease-in-out",
  }

  return (
    <>
      <section className="min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex justify-center items-center" style={bgImage}>
        {/* พื้นหลังที่มีภาพ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10" />

        {/* เนื้อหาที่อยู่บนพื้นหลัง */}
        <motion.div
          key={currentImageIndex} // ใช้ key เพื่อให้ Framer Motion รู้ว่าต้องเปลี่ยนภาพเมื่อ index เปลี่ยน
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="container relative z-20 text-center space-y-8"
        >
          {/* <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-white text-5xl sm:text-7xl md:text-8xl font-bold tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] [text-shadow:_3px_3px_6px_rgba(0_0_0_/_50%)] transition-all duration-300 hover:scale-[1.02]"
          >
            JF Advanced Med
          </motion.h1> */}
        </motion.div>
      </section>
    </>
  )
}

export default Hero