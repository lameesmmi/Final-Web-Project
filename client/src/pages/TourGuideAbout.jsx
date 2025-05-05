// Path: src/pages/TourGuideAbout.jsx

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for Logout behavior
import MenuBar from "../components/MenuBar"; // Use MenuBar (not TouristMenuBar)

const TourGuideAbout = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Same navigation links as GuideProfile and TourCenter (with label "TourGuideHome")
  const navLinks = [
    { label: "Home", path: "/TourGuideHome" },
    { label: "About", path: "/TourGuideAbout" },
    { label: "Profile", path: "/GuideAccount" },
    { label: "Dashboard", path: "/GuideDashboard" },
    { label: "Tour Center", path: "/TourCenter" },
    { label: "Logout", path: "/Home" }, // Placeholder for Logout behavior
  ];

  // Handle clicks on the menu
  const handleNavClick = (path) => {
    if (path === "/Logout") {
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (confirmed) {
        navigate("/Home"); // Redirect to Home after confirming logout
      }
      // Otherwise do nothing
    } else {
      navigate(path); // Navigate normally
    }
  };

  return (
    <div>
      {/* Updated MenuBar with proper links and Logout behavior */}
      <MenuBar links={navLinks} handleNavClick={handleNavClick} />

      {/* About Page Content */}
      <div className="about-page d-flex justify-content-center align-items-center text-center" style={{ minHeight: "100vh", padding: "2rem" }}>
        <div style={{ maxWidth: "800px" }}>
          <h2 className="mb-4">Who Are We?</h2>
          <p>
            Jaddwill is a travel platform that lets tourists book one-day experiences curated by locals. Whether venturing into secret spots or cultural hotspots, we make travel more personal, social, and rewarding, bringing people together through unique local adventures.
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
            We envision a world where every traveler explores like a local and connects beyond borders. Aligned with Vision 2030, Jaddwill promotes economic growth, cultural exchange, and responsible tourism, making travel more inclusive and community-driven.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourGuideAbout;
