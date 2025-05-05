import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import UserProfileCard from '../components/UserProfileCard';
import MenuBar from '../components/MenuBar';
import ImageBlock from '../components/ImageBlock';



const TourGuides = () => {
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);

  const navLinks = [
    { label: "Home", path: "/Home" },
    { label: "About", path: "/About" },
    { label: "Where To?", path: "/WhereTo" },
    { label: "Find a Local", path: "/TourGuides" },
    { label: "My Plan", path: "/MyPlan" },
    { label: "Wishlist", path: "/MyWishlist" },
    { label: "Login", path: "/" },
  ];

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await axios.get('guideProfile');
        setGuides(res.data);
      } catch (err) {
        console.error('Failed to fetch guide profiles:', err);
      }
    };

    fetchGuides();
  }, []);

  // Format username slug into display name
  const formatName = (username) =>
    username.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div>
      <MenuBar links={navLinks} />

      <div className="container-fluid p-0">
        <ImageBlock
          image="https://media.istockphoto.com/id/950368234/vector/riyadh-city-skyline-silhouette-background.jpg?s=612x612&w=0&k=20&c=k-2_v7rGQgF9DJ99cEcz1t986DU4DYF_lD1BbJN-etw="
          title="Meet Your Local Guide"
          subtitle="Discover the city through the eyes of a Saudi local!"
        />
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          {guides.map((guide, idx) => (
            <div key={idx} className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
              <UserProfileCard
                image={guide.image}
                name={formatName(guide.username)}
                bio={guide.shortDescription}
                onClick={() => navigate(`/guide/${guide.username}`)}
                matchPath={`/guide/${guide.username}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourGuides;
