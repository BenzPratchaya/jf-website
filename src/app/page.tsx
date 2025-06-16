import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Leader from "@/components/Leader/Leader";
import Journal from "@/components/Journal/Journal";
import Logo from "@/components/Logo/Logo";

export default function Home() {

  const bgImage: React.CSSProperties = {
    backgroundImage: "url('/images/slide/hero-bg.jpg')",
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
        <Journal />
        <Logo />
        <Leader />
      </div>
    </>
  );
}
