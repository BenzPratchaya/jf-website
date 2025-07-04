import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import LogoPartner from "@/components/LogoSlide/LogoPartner";
import LogoHospital from "@/components/LogoSlide/LogoHospital";
import Leader from "@/components/Leader/Leader";
import Contact from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import LatestProduct from "@/components/Product/LatestProduct";

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden text-gray-800">
        <Navbar />
        <Hero />
        <About />
        <LogoPartner />
        <LatestProduct />
        <LogoHospital />
        <Leader />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
