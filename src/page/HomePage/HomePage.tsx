import React from "react";
import Header from "../../layouts/Header/Header";
import Hero from "../../components/HomeComponent/Hero/HeroComponent";
import Features from "../../components/HomeComponent/Features/FeatureComponent";
import Contact from "../../components/HomeComponent/Contact/ContactComponent";
import Footer from "../../layouts/Footer/Footer";
import ScrollToTopButton from "../../components/Common/ScrollToTopButton";

const Homepage: React.FC = () => {
  return (
    <div className="overflow-hidden relative">
      <Header />
      <Hero />
      <Features />
      <Contact />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Homepage;