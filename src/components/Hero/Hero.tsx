"use client"

import { motion } from "framer-motion"
import { MdOutlineTravelExplore } from "react-icons/md"

const Hero = () => {
  return (
    <>
      <section className="min-h-[900px] flex justify-center items-center">
        {/* radial gradient section */}
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

          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="text-2xl sm:text-3xl md:text-4xl text-white/90 font-light tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.02]"
          >
            Create by, BenzPratchaya.
          </motion.p> */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            className="inline-flex justify-center items-center border-2 border-white/80 rounded-full w-12 h-12 backdrop-blur-sm bg-white/10 hover:scale-110 hover:bg-white/20"
          >
            <MdOutlineTravelExplore className="text-3xl" />
          </motion.div>
        </motion.div>

      </section>
    </>
  )
}

export default Hero