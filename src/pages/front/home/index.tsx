import React from "react";

import HeroSection from "./hero-section";
import IntroScrollMouse from "./intro-scroll-mouse";

const Home = () => {
  return (
    <div className="relative grid h-[calc(100vh-64px)] place-content-center">
      <HeroSection />
      <div
        className={`absolute inset-x-0 bottom-8 grid place-content-center md:bottom-12`}
      >
        <IntroScrollMouse />
      </div>
    </div>
  );
};

export default Home;
