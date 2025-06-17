// components/LogoPartner.tsx
"use client"

import React from "react"
import { motion, Variants } from "framer-motion"

import fujifilmLogo from "/public/images/logos_partner/fujifilm_logo.png"
import mbitsLogo from "/public/images/logos_partner/mbits_logo.png"
import mindrayLogo from "/public/images/logos_partner/mindray_logo.png"
import samsungLogo from "/public/images/logos_partner/samsung_logo.png" 
import synapseLogo from "/public/images/logos_partner/synapse_logo.png"
import vieworksLogo from "/public/images/logos_partner/vieworks_logo.png" 


const LogoPartner = () => {

  type StackLogoType = {
    stack: string;
    logoSrc: string;
    altText: string;
    className: string; // Tailwind classes for sizing and other styles
    variants: Variants
  }

  const iconVariants = (duration: number): Variants => ({
    initial: { y: -10 },
    animate: {
      y: [10, -10],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "reverse" as const,
      }
    }
  })

  const StackLogos: StackLogoType[] = [
    {
      stack: "Fujifilm",
      logoSrc: fujifilmLogo.src,
      altText: "Fujifilm Logo", // Updated altText
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain", // Responsive sizes
      variants: iconVariants(2),
    },
    {
      stack: "Mbits",
      logoSrc: mbitsLogo.src,
      altText: "Mbits Logo", // Updated altText
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(3),
    },
    {
      stack: "Mindray",
      logoSrc: mindrayLogo.src,
      altText: "Mindray Logo", // Updated altText
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(5),
    },
    {
      stack: "Samsung",
      logoSrc: samsungLogo.src,
      altText: "Samsung Logo", // Updated altText
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(2),
    },
    {
      stack: "Synapse",
      logoSrc: synapseLogo.src,
      altText: "Synapse Logo", // Updated altText
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(3),
    },
    {
      stack: "Vieworks",
      logoSrc: vieworksLogo.src,
      altText: "Vieworks Logo", // Updated altText
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(5),
    },
  ];

  return (
    <>
      <div className="pb-24 bg-gradient-to-b from-white to-gray-100"> {/* Added dark mode background */}
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 1.2 }}
          className="text-center text-3xl sm:text-4xl my-12 uppercase text-gray-800" // Adjusted text size, margin, and added dark mode text
        >
          Partnership
        </motion.h2>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 px-4"> {/* Responsive gap and padding */}
          {StackLogos.map((item, index) => (
            <motion.div
              variants={item.variants}
              initial="initial"
              animate="animate"
              className="flex items-center justify-center p-2" // Added padding around each logo if needed
              key={index}
            >
              <img
                src={item.logoSrc}
                alt={item.altText}
                className={item.className}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default LogoPartner