// components/Leader/Leader.tsx
"use client"

import { motion } from "framer-motion"
import { slideUp } from "@/utility/animation"
import Image from "next/image"
import { IconDefinition, faTwitter, faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Leader = () => {

  const Img1 = "/images/leads/lead1.jpg"
  const Img2 = "/images/leads/lead2.jpg"
  const Img3 = "/images/leads/lead3.jpg"
  const Img4 = "/images/leads/lead4.jpg"

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
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, 
      { icon: faFacebookF, url: "https://facebook.com/kajohn" },
      { icon: faInstagram, url: "https://instagram.com/kajohn" },
      { icon: faLinkedinIn, url: "https://linkedin.com/in/kajohn" },
    ],
      delay: 0.2
    },
    {
      id: 2,
      img: Img2,
      title: "Adisorn Taprig",
      place: "General Manager",
      url: [
      { icon: faTwitter, url: "https://twitter.com/kajohn" },
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
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, 
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
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, 
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
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 1.2 }}
          className="text-center text-4xl my-12 uppercase text-gray-800"
        >
          Team Leaders
        </motion.h2>

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
                    <motion.h3
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.6
                      }}
                      className="text-white text-2xl tracking-wider">{item.title}
                    </motion.h3>
                    <motion.h3
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.6
                      }}
                      className="text-white uppercase tracking-wider">{item.place}</motion.h3>
                    <div className="flex space-x-3 mt-2"> {/* เพิ่ม flex และ space-x เพื่อจัดเรียงไอคอน */}
                      {item.url.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="text-white hover:text-blue-400 text-xl"
                        >
                          <FontAwesomeIcon
                            icon={social.icon}
                            className="bg-white/20 rounded-full p-2 w-5 h-4 flex items-center justify-center"/>
                        </motion.a>
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