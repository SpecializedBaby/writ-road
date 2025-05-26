import Services from "@/components/Services";
import BookTrip from "@/components/BookTrip";
import Testimonials from "@/components/Testimonials";
import Destinations from "@/components/Destinations";
import Hero from "@/components/Hero";
import PartnerLogos from "@/components/PartnerLogos";
import Subscribe from "@/components/Subscribe";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
      <div className="min-h-screen overflow-hidden">
          <Navbar/>
          <Hero/>
          <Services/>
          <Destinations/>
          <BookTrip/>
          <Testimonials/>
          <PartnerLogos/>
          <Subscribe/>
          <Footer/>
      </div>
  );
}
