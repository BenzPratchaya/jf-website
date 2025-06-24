// components/Contact/Contact.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1.2 }}
        className="text-center text-4xl my-16 uppercase text-gray-800"
      >
        Contact Us
      </motion.h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: Our Address Card & Map */}
          <div className="space-y-8 flex flex-col"> {/* Added flex flex-col to make content fill column height */}
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center group flex-grow" // flex-grow to make this card fill space
            >
              <div className="text-blue-950 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Our Address</h3>
              <p className="text-sm text-gray-600 mb-auto">
                J.F.Advance Med Co.,Ltd. 2521/33-26 Ladprao Road, Khlongchaokhunsing, Wangthonglang, Bangkok 10310, Thailand
              </p>
              <p className="text-sm text-gray-700 t-2">Tel: +66 2514-0314-7 / FAX: +66 2514-0328</p>
            </motion.div>

            {/* Google Map Embed */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.548602640745!2d100.60831667455936!3d13.787170896474692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29dfa553d2875%3A0xc8eb628a884b0c61!2sJ.F.%20Advance%20Med!5e1!3m2!1sth!2sth!4v1750135770407!5m2!1sth!2sth"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="J.F.Advance Med Co.,Ltd. Location Map"
              ></iframe>
            </motion.div>
          </div>

          {/* Right Column: Email, Call Us & Contact Form */}
          <div className="space-y-8 flex flex-col"> {/* Added flex flex-col */}
            {/* Email & Call Us Cards - Now grouped here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch flex-grow"> {/* IMPORTANT: items-stretch and flex-grow */}
              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center group flex-grow" // flex-grow
              >
                <div className="text-blue-950 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Email Us</h3>
                <p className="text-sm text-gray-600 mb-auto">
                  <a href="mailto:sales@jfaw.co.th" className="hover:underline text-blue-600">sales@jfav.co.th</a>
                </p>
              </motion.div>

              {/* Call Us Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center group flex-grow" // flex-grow
              >
                <div className="text-blue-950 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaPhoneAlt />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 ">Call Us</h3>
                <p className="text-sm text-gray-600 mb-auto"> {/* mb-auto */}
                  <a href="tel:+6625140314" className="hover:underline text-blue-600">+66 2514-0314-7</a>
                </p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                />
                <textarea
                  placeholder="Message"
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent resize-y"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-md bg-blue-950 text-white font-semibold hover:bg-blue-800 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;