import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import LogoPartner from "@/components/LogoPartner/LogoPartner";
import LogoHospital from "@/components/LogoHospital/LogoHospital";
import Leader from "@/components/Leader/Leader";
import Product from "@/components/Product/Product";
import Contact from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { products } from "@/data/products";

export default function Home() {


  return (
    <>
      <div className="overflow-x-hidden text-gray-800">
        <Navbar />
        <Hero />
        <About />
        <LogoPartner /> 
        <Product productsToShow={products} />
        <LogoHospital />
        <Leader />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
