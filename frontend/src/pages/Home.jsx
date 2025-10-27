import React from "react";
import HeroSection from "../Components/home/section/HeroSection";
import HealthSection from "../Components/home/section/HealthSection";
import Stories from "../Components/home/section/Stories";
import BusinessSection from "../Components/home/section/BusinessSection";
import WorldSection from "../Components/home/section/WorldSection";
import ArtsSection from "../Components/home/section/ArtsSection";
import ContributeSection from "../Components/home/section/ContributeSection";
import SciencePoliticsSection from "../Components/home/section/SciencePoliticsSection";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10 space-y-10">
      <div>
        <HeroSection />
      </div>

      <div>
        <HealthSection />
      </div>

      <div>
        <Stories />
      </div>

      <div>
        <BusinessSection />
      </div>

      <div>
        <ContributeSection />
      </div>

      <div>
        <SciencePoliticsSection />
      </div>

      <div>
        <WorldSection />
      </div>

      <div>
        <ArtsSection />
      </div>
    </div>
  );
};

export default Home;
