// components/About/About.tsx
"use client"

import { motion } from "framer-motion"

const About = () => {

  const aboutImage = "/images/banner.jpg"

  return (
    <>
      <section id="about" className="container py-20 mt-10">
      {/* ใช้ flexbox เพื่อจัดวางเนื้อหาในแนวนอนและแนวตั้ง */}
      {/* flex-col สำหรับมือถือ และ flex-row สำหรับหน้าจอขนาดกลางขึ้นไป */}
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 p-4">
        {/* ฝั่งซ้าย: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.6
          }}
          className="text-center md:text-left md:w-1/2 space-y-4 mb-8 md:mb-0"
        >
          <h1 className="text-2xl md:text-4xl font-medium">WHY JF ADVANCE MED</h1>
          <p>J.F. Advanced caused by the appreciation of the benefits and opportunities. Business Medical At the time the company was established (in the year.. 2537) there is no company that is. Thailand is a leading supplier Nationality And medical services for the X-ray department and the Company is a major change in the year.. Since 2544</p>
          <a href="#" className="text-blue-600 hover:underline">Read More</a>
        </motion.div>

        {/* ฝั่งขวา: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.6
          }}
          className="md:w-1/2 flex justify-center items-center" 
        >
          <img
            src={aboutImage}
            alt="aboutImage"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>
      </div>
      </section>
    </>
  )
}

export default About;