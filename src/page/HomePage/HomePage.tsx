import React from "react";
import Header from "../../layouts/Header";
import Hero from "../../components/HomeComponent/Hero/HeroComponent";
import Features from "../../components/HomeComponent/Features/FeatureComponent";
import Contact from "../../components/HomeComponent/Contact/ContactComponent";

const Homepage: React.FC = () => {
  return (
    <div className="overflow-hidden relative">
      <Header />
      <Hero />
      <Features />
      <Contact />
    </div>
  );
};

export default Homepage;