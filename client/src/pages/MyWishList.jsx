import React, { useEffect, useState } from "react";
import TouristMenuBar from "../components/TouristMenuBar";
import CardSlider from "../components/CardSlider";
import Activity from "../components/Activity";
import axios from "../api/axiosInstance";

const MyWishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const touristId = localStorage.getItem('touristId');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`/tourists/${touristId}/wishlist`);
        setWishlist(res.data);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    if (touristId) fetchWishlist();
  }, [touristId]);

  const handleUnlike = (activityId) => {
    setWishlist(prev => prev.filter(item => item._id !== activityId));
  };

  return (
    <div>
      <TouristMenuBar />
      <div className="container mt-5 text-center">
        <h2>My Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>No activities added to your wishlist yet.</p>
        ) : (
          <CardSlider>
            {wishlist.map(item => (
              <Activity
                key={item._id}
                activity={item}
                customLink={`/ViewActivity/${item._id}`}
                onUnlike={handleUnlike}
              />
            ))}
          </CardSlider>
        )}
      </div>
    </div>
  );
};

export default MyWishList;
