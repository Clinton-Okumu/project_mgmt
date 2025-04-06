import Navbar from "../components/Navbar";
import Hero from "../components/Hero.jsx"
import Features from "../components/Features";
import ComparisonSection from "../components/ComparisonSection.jsx";
import WhyChooseSection from "../components/ChooseSection.jsx";
import Footer from "../components/Footer.jsx";
import Reviews from "../components/Testimonials.jsx";

const Home = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <Features />
      <ComparisonSection />
      <WhyChooseSection />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
