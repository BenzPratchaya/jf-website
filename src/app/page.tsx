import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Leader from "@/components/Leader/Leader";
import About from "@/components/About/About";
import LogoHospital from "@/components/LogoHospital/LogoHospital";
import LogoPartner from "@/components/LogoPartner/LogoPartner";
import Product from "@/components/Product/Product";
import { Footer } from "@/components/Footer/Footer";
import Contact from "@/components/Contact/Contact";

export default function Home() {

  const bgImage: React.CSSProperties = {
    backgroundImage: "url('/images/slides/hero-bg.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  }

  return (
    <>
      <div className="overflow-x-hidden bg-branDark text-gray-800">
        {/* foreground Content */}
        <Navbar />
        <div style={bgImage}>
          <Hero />
        </div> 
        <About />
        <LogoPartner /> 
        <Product />
        <LogoHospital />
        <Leader />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
