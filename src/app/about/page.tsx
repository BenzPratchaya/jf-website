// components/Contact/Contact.tsx
"use client";

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import About from '@/components/About/About';
import Leader from '@/components/Leader/Leader';
import { Footer } from '@/components/Footer/Footer';

const AboutPage = () => {
  return (
    <>
        <Navbar />
        <About />
        <Leader />
        <Footer />
    </>
  );
};

export default AboutPage;