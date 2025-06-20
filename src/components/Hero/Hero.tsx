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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds (5000 milliseconds)

    return () => clearInterval(timer) // Clean up the interval on component unmount
  }, [])

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
        {/* radial gradient section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10" />

        {/* hero text section */}
        <motion.div
          key={currentImageIndex} // Use key to re-trigger animations when image changes
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