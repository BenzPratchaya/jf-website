// components/Hero/Hero.tsx
"use client"

import { motion } from "framer-motion"

 const bgImage: React.CSSProperties = {
    backgroundImage: "url('/images/slides/hero-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    backgroundAttachment: "fixed",
  }


const Hero = () => {
  return (
    <>
      <section style={bgImage} className="min-h-[600px] md:min-h-[700px] lg:min-h-[900px] flex justify-center items-center bg-fixed" >
        {/* Overlay ไล่สีดำโปร่งแสง */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10" />

        {/* hero text section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="container relative z-20 text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-white text-5xl sm:text-7xl md:text-8xl font-bold tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] [text-shadow:_3px_3px_6px_rgba(0_0_0_/_50%)] transition-all duration-300 hover:scale-[1.02]"
          >
            JF Advanced Med
          </motion.h1>
        </motion.div>

      </section>
    </>
  )
}

export default Hero