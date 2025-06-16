"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const Journal = () => {

  const Img5 = "/assets/5.jpg"
  const Img6 = "/assets/6.jpg"

  interface JournalData {
    id: number;
    img: string;
    title: string;
    about: string;
    date: string;
    url: string;
    delay: number;
  }

  const journalData: JournalData[] = [
    {
      id: 1,
      img: Img5,
      title: "Canyon of Ubon",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, unde.",
      date: "May 22, 2025",
      url: "#",
      delay: 0.1,
    },
    {
      id: 1,
      img: Img6,
      title: "Sea of Krabi",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, unde.",
      date: "May 22, 2025",
      url: "#",
      delay: 0.2,
    },
  ]

  return (
    <>
      <section className="container py-20 mt-20">

      {/* header section */}
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 p-4 shadow-sm"> {/* เพิ่ม div นี้เป็น Flex container */}
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
          <h1 className="text-2xl md:text-4xl">WHY JF ADVANCE MED</h1>
          <p>J.F. Advanced caused by the appreciation of the benefits and opportunities. Business Medical At the time the company was established (in the year.. 2537) there is no company that is. Thailand is a leading supplier Nationality And medical services for the X-ray department and the Company is a major change in the year.. Since 2544</p>
          <a href="#" className="text-blue-600 hover:underline"> Read More</a>
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
            src="/images/banner.jpg" 
            alt="JF Advance Med"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>
      </div>

        {/* card section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-14 place-items-center">
          {journalData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: item.delay,
                duration: 0.4
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 188, 212, 0.5"
              }}
              className="w-[300px] h-[430px] md:w-[360px] md:h-[440px] lg:w-[460px] lg:h-[460px] xl:w-[540px] xl:h-[400px] overflow-hidden bg-white shadow-lg"
              key={index}>
              <div className="overflow-hidden relative">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="w-full h-[250px] object-cover"
                />
              </div>

              {/* text section */}
              <div className="p-6 text-center space-y-2">
                <p className="text-sm uppercase text-gray-500">{item.date}</p>
                <p className="text-xl font-semibold text-gray-800">{item.title}</p>
                <p className="text-gray-600">{item.about}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Journal