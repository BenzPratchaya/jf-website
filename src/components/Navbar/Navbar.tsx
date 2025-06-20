// components/Navbar/Navbar.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { slideBottom } from "@/utility/animation"
import { motion, AnimatePresence } from "framer-motion"
import { FaBars, FaTimes } from 'react-icons/fa';
import React from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const MotionLink = motion(Link);
  const companyLogo = "/images/LOGO-JF.png"
  const navItemClasses = "whitespace-nowrap hover:underline text-base md:text-lg lg:text-xl p-2 font-light";

  // Animation variants for the mobile menu itself (slide from right)
  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "tween", duration: 0.3 } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.3 } }
  };

  // Animation variants for menu items (staggered fade-in)
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  return (
    <nav className="container h-16 sm:h-18 md:h-20 w-screen flex items-center justify-center relative z-50 bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="container flex items-center justify-between w-full h-full px-4">
        {/* Logo Section (Left Side) */}
        <MotionLink
          variants={slideBottom(0.1)}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          href={"/"}
          onClick={() => setIsOpen(false)} // Close menu on logo click
        >
          <Image
            className="w-[125px] sm:w-[135px] md:w-[140px] lg:w-[150px] h-auto object-contain"
            priority={true}
            src={companyLogo}
            alt="J.F.Advance Med Co.,Ltd. Logo"
            width={150}
            height={50}
          ></Image>
        </MotionLink>

        {/* Desktop Navigation Links Section (Right Side) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-800">
          <MotionLink variants={slideBottom(0.2)} initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navItemClasses} href={"/"}>Home</MotionLink>
          <MotionLink variants={slideBottom(0.3)} initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navItemClasses} href={"/#about"}>About</MotionLink> {/* Updated href */}
          <MotionLink variants={slideBottom(0.4)} initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navItemClasses} href={"/#services"}>Services</MotionLink> {/* Updated href */}
          <MotionLink variants={slideBottom(0.5)} initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navItemClasses} href={"/#products"}>Products</MotionLink> {/* Product to /products page */}
          <MotionLink variants={slideBottom(0.5)} initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navItemClasses} href={"/partner"}>Partner</MotionLink> {/* Partner to /partner page */}
          <MotionLink variants={slideBottom(0.6)} initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navItemClasses} href={"/#solution"}>Solution</MotionLink> {/* Updated href */}
          <MotionLink variants={slideBottom(0.7)} initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navItemClasses} href={"/#contact"}>Contact</MotionLink> {/* Updated href */}
        </div>

        {/* Mobile Menu Button (Hamburger Icon / Close Icon) */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} className={`text-3xl focus:outline-none ${isOpen ? 'text-white' : 'text-gray-800'}`}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 h-screen w-screen bg-blue-950 bg-opacity-90 flex flex-col items-center justify-center space-y-8 z-40 md:hidden"
          >
            <motion.ul className="space-y-6 text-2xl"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/#about" },
                { name: "Services", href: "/#services" },
                { name: "Product", href: "/#products" },
                { name: "Solution", href: "/#solution" },
                { name: "Contact", href: "/#contact" },
              ].map((item, index) => (
                <motion.li key={item.name} variants={listItemVariants} onClick={toggleMenu}>
                  <Link href={item.href} className="block text-center text-white hover:text-gray-300 transition-colors">
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar