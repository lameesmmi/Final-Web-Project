import React from "react";
import TouristMenuBar from "../components/TouristMenuBar";
import ReachOutForm from "../components/ReachOutForm";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';



const ContactTourGuide = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const location = useLocation();
  const guideName = location.state?.guideName || 'Your Guide';

  return (
    <>
      <TouristMenuBar />
      <ReachOutForm guideName={guideName} />
    </>
  );
};

export default ContactTourGuide;
