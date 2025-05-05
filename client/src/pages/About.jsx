import React from "react";
import MenuBar from "../components/MenuBar";
import TouristMenuBar from "../components/TouristMenuBar";


const About = () => {
  return (
    <div>
        <TouristMenuBar/>
    <div className="about-page d-flex justify-content-center align-items-center text-center" style={{ minHeight: "100vh", padding: "2rem" }}>
      <div style={{ maxWidth: "800px" }}>
        <h2 className="mb-4">Who Are We?</h2>
        <p>
          Jadwill is a travel platform that lets tourists book one-day experiences curated by locals. Whether venturing into secret spots or cultural hotspots, we make travel more personal, social, and rewarding, bringing people together through unique local adventures.
        </p>
        <p>
          Jaddwill connects travelers with local guides to create authentic, immersive, and culture-rich experiences. Our mission is to make travel more engaging and meaningful while supporting sustainable tourism and empowering local communities.
        </p>

        <h3 className="mt-5">Mission</h3>
        <p>
        Jaddwill connects travelers with local guides to create authentic, immersive, and culture-rich experiences. Our mission is to make travel more engaging and meaningful while supporting sustainable tourism and empowering local communities.
        </p>

        <h3 className="mt-4">Vision</h3>
        <p>
          We envision a world where every traveler explores like a local and connects beyond borders. Aligned with Vision 2030, Jadwill promotes economic growth, cultural exchange, and responsible tourism, making travel more inclusive and community-driven.
        </p>
      </div>
    </div>
    </div>
  );
};

export default About;
