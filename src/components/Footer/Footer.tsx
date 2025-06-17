// components/Footer.tsx
"use client"

import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaLinkedin, FaEnvelope } from "react-icons/fa"
import { FaMapLocation } from "react-icons/fa6"
import { motion } from "framer-motion"

import companyLogo from "/public/images/LOGO-JF-White.png" // Ensure this is a white logo for the dark background

export const Footer = () => {
  return (
    <>
      <div className="bg-blue-950 pt-12 pb-6 text-white">

        {/* Adjust px- value for mobile responsiveness */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20"> {/* Changed px-20 to px-4 for mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"> {/* Added md:gap-12 for better spacing on wider screens */}
            {/* Company Details */}
            <CompanyDetails />
            {/* Links Details */}
            <FooterLinks />
            {/* Social Details */}
            <SocialMedia />
          </div>
        </div>

        <p className="text-white text-center mt-8 pt-6 border-t border-gray-600/50 justify-center text-sm">&copy; 2025 J.F.Advance Med Co.,Ltd.. All Rights Reserved.</p> {/* text-sm for copyright */}
      </div>
    </>
  )
}

function CompanyDetails() {
  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.6
      }}
      className="space-y-6 text-center md:text-left"> {/* Center text on mobile, left align on md+ */}
        {/* Logo should ideally be centered on mobile too, if not a full width block */}
        <img
          src={companyLogo.src}
          alt="Company Logo"
          className="w-40 h-auto object-contain mx-auto md:mx-0" // Centered on mobile, left on md+
        />
        <div className="space-y-4 text-sm"> {/* Increased space-y and reduced text size for mobile */}

          <p className="flex items-center justify-center md:justify-start gap-4"> {/* Center on mobile, start on md+ */}
            <FaPhone className="text-xl"/>
            +99 1234567890
          </p>

          <p className="flex items-start justify-center md:justify-start gap-4"> {/* items-start for multi-line text alignment */}
            <FaMapLocation className="text-3xl"/>
            2521/33-36 Ladprao Road, Khlongchaokhunsing, Wangthonglang, Bangkok 10310, Thailand
          </p>
          <p className="flex items-center justify-center md:justify-start gap-4">
            <FaEnvelope className="text-xl"/>
            sales@jfav.co.th
          </p>

        </div>
      </motion.div>
    </>
  )
}

function FooterLinks() {
  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.6
      }}
      className="space-y-6 text-center md:text-left"> {/* Center text on mobile, left align on md+ */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Changed to 1 column on mobile, 2 on md+ */}
          {/* first col section */}
          <div>
            <h1 className="text-xl font-bold tracking-wider mb-4 mx-auto md:mx-0">Useful Links</h1> {/* Removed mx-auto for desktop, added for mobile */}
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">Home</li>
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">About Us</li>
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">Services</li>
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">Terms of Service</li>
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">Privacy Policy</li>
            </ul>
          </div>

          {/* second col section */}
          <div className="mt-8 md:mt-0"> {/* Add margin top on mobile to separate columns when stacked */}
            <h2 className="text-xl font-bold tracking-wider mb-4">Our Services</h2>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">Web Design</li>
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">Web Development</li>
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">Product Management</li>
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">Marketing</li>
              <li className="cursor-pointer hover:text-gray-300 transition-colors duration-200">Graphic Design</li>
            </ul>
          </div>

        </div>
      </motion.div>
    </>
  )
}

function SocialMedia() {
  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        duration: 0.6
      }}
      className="space-y-6 text-center md:text-left"> {/* Center text on mobile, left align on md+ */}
        <h1 className="text-xl font-bold tracking-wider">Follow Us</h1>

        {/* Icon section */}
        <div className="flex items-center justify-center md:justify-start gap-4"> {/* Center on mobile, start on md+ */}
          <FaFacebook className="text-3xl hover:scale-110 transition-all duration-300 cursor-pointer"/>
          <FaInstagram className="text-3xl hover:scale-110 transition-all duration-300 cursor-pointer"/>
          <FaTwitter className="text-3xl hover:scale-110 transition-all duration-300 cursor-pointer"/>
          <FaLinkedin className="text-3xl hover:scale-110 transition-all duration-300 cursor-pointer"/>
        </div>
      </motion.div>
    </>
  )
}