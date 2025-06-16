"use client"

import { motion } from "framer-motion"
import { slideUp } from "@/utility/animation"
import Image from "next/image"
import { IconDefinition, faTwitter, faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Leader = () => {

  const Img1 = "/images/avatar/portrait-beautiful-young-woman-standing-grey-wall.jpg"
  const Img2 = "/images/avatar/portrait-young-beautiful-woman-gesticulating.jpg"
  const Img3 = "/images/avatar/studio-portrait-emotional-happy-funny.jpg"
  const Img4 = "/images/avatar/portrait-young-redhead-bearded-male.jpg"

  interface SocialLink {
    icon: IconDefinition;
    url: string;
  }

  interface LeaderData {
    id: number;
    img: string;
    title: string;
    place: string;
    url: SocialLink[];
    delay: number;
  }

  const leaderData: LeaderData[] = [
    {
      id: 1,
      img: Img1,
      title: "Kajohn Uamsiri",
      place: "Managing Director",
      url: [
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, // <-- กำหนดเป็นอ็อบเจกต์ไอคอนที่ import มา
      { icon: faFacebookF, url: "https://facebook.com/kajohn" },
      { icon: faInstagram, url: "https://instagram.com/kajohn" },
      { icon: faLinkedinIn, url: "https://linkedin.com/in/kajohn" },
    ],
      delay: 0.2
    },
    {
      id: 2,
      img: Img2,
      title: "Asorn Taprig",
      place: "General Manager",
      url: [
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, // <-- กำหนดเป็นอ็อบเจกต์ไอคอนที่ import มา
      { icon: faFacebookF, url: "https://facebook.com/kajohn" },
      { icon: faInstagram, url: "https://instagram.com/kajohn" },
      { icon: faLinkedinIn, url: "https://linkedin.com/in/kajohn" },
    ],
      delay: 0.3
    },
    {
      id: 3,
      img: Img3,
      title: "Warong Tocharoenchai",
      place: "Services Manager",
      url: [
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, // <-- กำหนดเป็นอ็อบเจกต์ไอคอนที่ import มา
      { icon: faFacebookF, url: "https://facebook.com/kajohn" },
      { icon: faInstagram, url: "https://instagram.com/kajohn" },
      { icon: faLinkedinIn, url: "https://linkedin.com/in/kajohn" },
    ],
      delay: 0.4
    },
    {
      id: 4,
      img: Img4,
      title: "Navarat Bunnag",
      place: "Sales Manager",
      url: [
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, // <-- กำหนดเป็นอ็อบเจกต์ไอคอนที่ import มา
      { icon: faFacebookF, url: "https://facebook.com/kajohn" },
      { icon: faInstagram, url: "https://instagram.com/kajohn" },
      { icon: faLinkedinIn, url: "https://linkedin.com/in/kajohn" },
    ],
      delay: 0.5
    },
  ]

  return (
    <>
      <section className="container py-8 space-y-6" id="explore">
        {/* header section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 1,
            duration: 0.5
          }}
          className="text-center md:max-w-[650px] mx-auto space-y-4"
        >
          <h1 className="text-2xl md:text-4xl">TEAM LEADERS</h1>
        </motion.div>

        {/* card section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 xl:px-14">
          {leaderData.map((item) => (
            <motion.div
              variants={slideUp(item.delay)}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
              className="relative"
              key={item.id}
            >
              {/* section img */}
              <Image
                className="object-cover h-[400px] w-[350px]"
                src={item.img}
                alt="img"
                width={400}
                height={400}
              />

              <div className="absolute w-full bottom-0 inset-0 bg-brandDark/15">
                <div className="h-full space-y-1 flex flex-col justify-end items-center">
                  <div className="flex flex-col items-center bg-black p-2 bg-opacity-50 backdrop-blur-sm w-full">
                    <h3 className="text-white text-2xl tracking-wider">{item.title}</h3>
                    <h3 className="text-white uppercase tracking-wider">{item.place}</h3>
                    <div className="flex space-x-3 mt-2"> {/* เพิ่ม flex และ space-x เพื่อจัดเรียงไอคอน */}
                      {item.url.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-400 text-xl"
                        >
                          <FontAwesomeIcon
                            icon={social.icon}
                            className="bg-white/20 rounded-full p-2 w-5 h-4 flex items-center justify-center"/>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          ))}
        </div>
      </section>
    </>
  )
}

export default Leader