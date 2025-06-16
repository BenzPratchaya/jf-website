"use client"

import Link from "next/link"
import Image from "next/image"
import { slideBottom } from "@/utility/animation"
import { motion } from "framer-motion"

const Navbar = () => {

  const Logo = "/images/LOGO-JF.png"

  const MotionLink = motion(Link);

  return (
    <nav className="h-20 sm:h-24 md:h-28 w-screen flex items-center justify-center relative z-20 bg-black bg-opacity-5 backdrop-blur-xs">
      <div className="container flex items-center justify-around w-full h-full md:text-lg lg-text-2xl">

        <MotionLink
          variants={slideBottom(0)}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className="hover:underline"
          href={"#"}
        >
          Home
        </MotionLink>
        <MotionLink
          variants={slideBottom(0.2)}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className="hover:underline"
          href={"#"}
        >
          About Us
        </MotionLink>
        <MotionLink
          variants={slideBottom(0.5)}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className="hover:underline"
          href={"#"}
        >
          Services
        </MotionLink>
        <MotionLink
          variants={slideBottom(0.4)}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          rel="preload"
          as="image"
          href={"#"}
        >
          <Image
            className="w-[125px] sm:w-[135px] md:w-[140px] lg:w-[150px]"
            priority={false}
            src={Logo}
            alt="Logo center"
            width={100}
            height={100}
          ></Image>
        </MotionLink>
        <MotionLink
          variants={slideBottom(0.6)}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className="hover:underline"
          href={"#"}
        >
          Product
        </MotionLink>
        <MotionLink
          variants={slideBottom(0.6)}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className="hover:underline"
          href={"#"}
        >
          Solution
        </MotionLink>
        <MotionLink
          variants={slideBottom(0.6)}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className="hover:underline"
          href={"#"}
        >
          Contact
        </MotionLink>

      </div>
    </nav>
  )
}

export default Navbar