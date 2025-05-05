// Path: src/pages/TourGuideHome.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import ImageBlock from "../components/ImageBlock";
import FeatureCard from "../components/FeatureCard";
import HowItWorks from "../components/HowItWorks";
import Activity from "../components/Activity";
import CardSlider from "../components/CardSlider";
import axios from "../api/axiosInstance";

const heroImagePath = "hero9.png";

const services = [
  {
    icon: "bi-geo-alt",
    title: "Local Expertise",
    description:
      "Discover hidden gems and authentic experiences guided by locals who truly know their city. With Jaddwill, you're not just visiting — you're exploring through the eyes of someone who lives there.",
  },
  {
    icon: "bi-sliders",
    title: "Personalized Trips",
    description:
      "Every traveler is unique — your journey should be too. Jaddwill matches you with personalized experiences based on your interests, pace, and travel style. No cookie-cutter tours, just your kind of adventure.",
  },
  {
    icon: "bi-people",
    title: "Supporting Local Communities",
    description:
      "Your travel choices make a difference. By booking through Jaddwill, you directly support local guides, artisans, and small businesses — helping communities thrive while you explore with purpose.",
  },
];

const TourGuideHome = () => {
  const navigate = useNavigate();
  const [randomActivities, setRandomActivities] = useState([]);

  const navLinks = [
    { label: "Home", path: "/TourGuideHome" },
    { label: "About", path: "/TourGuideAbout" },
    { label: "Profile", path: "/GuideAccount" },
    { label: "Dashboard", path: "/GuideDashboard" },
    { label: "Tour Center", path: "/TourCenter" },
    { label: "Logout", path: "/Home" },
  ];

  const handleNavClick = (path) => {
    if (path === "/Logout") {
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (confirmed) {
        navigate("/Home");
      }
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get("/activities");
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setRandomActivities(selected);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <MenuBar links={navLinks} handleNavClick={handleNavClick} />

      <section>
        <ImageBlock
          image={heroImagePath}
          title="Meet, Explore, and Experience"
          subtitle="The Saudi Way!"
        />
      </section>

      <section className="py-5 bg-light">
        <FeatureCard title="What Makes Us Different" services={services} />
      </section>

      <section className="py-5">
        <HowItWorks />
      </section>

      <section className="text-center py-5 bg-light">
        <h2 className="mb-5">Explore Saudi Like Never Before!</h2>
        <CardSlider>
          {randomActivities.map((activity) => (
            <Activity
              key={activity._id}
              activity={activity}
              customLink={`/ViewActivity/${activity._id}`}
            />
          ))}
        </CardSlider>
      </section>
    </div>
  );
};

export default TourGuideHome;
