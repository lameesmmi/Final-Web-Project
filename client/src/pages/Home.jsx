import React, { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import ImageBlock from "../components/ImageBlock";
import FeatureCard from "../components/FeatureCard";
import HowItWorks from "../components/HowItWorks";
import Activity from "../components/Activity";
import CardSlider from "../components/CardSlider";
import TouristMenuBar from "../components/TouristMenuBar";
import axios from "../api/axiosInstance";

const heroImagePath = "https://media.istockphoto.com/id/950368234/vector/riyadh-city-skyline-silhouette-background.jpg?s=612x612&w=0&k=20&c=k-2_v7rGQgF9DJ99cEcz1t986DU4DYF_lD1BbJN-etw=";

const services = [
  {
    icon: "bi-geo-alt",
    title: "Local Expertise",
    description:
      "Discover hidden gems and authentic experiences guided by locals who truly know their city.",
  },
  {
    icon: "bi-sliders",
    title: "Personalized Trips",
    description:
      "Jaddwill matches you with personalized experiences based on your interests.",
  },
  {
    icon: "bi-people",
    title: "Supporting Local Communities",
    description:
      "By booking through Jaddwill, you directly support local guides and small businesses.",
  },
];

const Home = () => {
  const [randomActivities, setRandomActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get("/activities");
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5); // get 5 random activities
        setRandomActivities(selected);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <TouristMenuBar />

      {/* Hero */}
      <section>
        <ImageBlock
          image={heroImagePath}
          title="Meet, Explore, and Experience"
          subtitle="The Saudi Way!"
        />
      </section>

      {/* Features */}
      <section className="py-5 bg-light">
        <FeatureCard title="What Makes Us Different" services={services} />
      </section>

      {/* How It Works */}
      <section className="py-5">
        <HowItWorks />
      </section>

      {/* Random Activities */}
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

export default Home;
