import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance"; // ✅ Use axios instance
import CalendarComponent from "../components/CalendarComponent";
import GuideReviews from "../components/GuideReviews";
import TourStatistics from "../components/TourStatistics";
import GuideTopTours from "../components/GuideTopTours";
import MenuBar from "../components/MenuBar";
import Activity from "../components/Activity";
import CardSlider from "../components/CardSlider";
import EarningPerMonth from "../components/EarningPerMonth";
import "./GuideDashboard.css";
import GuideTourSlider from '../components/GuideTourSlider';

const GuideDashboard = () => {
  const navLinks = [
    { label: "Home", path: "/TourGuideHome" },
    { label: "About", path: "/TourGuideAbout" },
    { label: "Profile", path: "/GuideAccount" },
    { label: "Dashboard", path: "/GuideDashboard" },
    { label: "Tour Center", path: "/TourCenter" },
    { label: "Logout", path: "/Home" },
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [activitiesForSelectedDate, setActivitiesForSelectedDate] = useState([]);
  const [tours, setTours] = useState([]);

  // const handleDateChange = async (dateStr) => {
  //   setSelectedDate(dateStr);
  //   const matchingTours = tours.filter(tour => {
  //     const formattedTourDate = new Date(tour.date).toISOString().split('T')[0];
  //     return formattedTourDate === dateStr;
  //   });

  //   if (matchingTours.length === 0) {
  //     setActivitiesForSelectedDate([]);
  //     return;
  //   }

  //   const allEventIds = matchingTours.flatMap(t => t.eventIds);

  //   try {
  //     const res = await axios.get(`/activities/byIds`, {
  //       params: { ids: allEventIds.join(',') }
  //     });
  //     setActivitiesForSelectedDate(res.data);
  //   } catch (err) {
  //     console.error("Error fetching activities for selected date:", err);
  //   }
  // };

  const handleDateChange = async (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  
    try {
      const res = await axios.get('/activities', {
        params: { date: formattedDate }
      });
      setActivitiesForSelectedDate(res.data);
    } catch (err) {
      console.error('❌ Error fetching activities:', err.response?.data || err.message);
      setActivitiesForSelectedDate([]);
    }
  };
  

  useEffect(() => {
    const guideId = localStorage.getItem('guideId');
    if (!guideId) return;

    axios
      .get(`/tours/guide/id/${guideId}`)
      .then((res) => setTours(res.data))
      .catch((err) => console.error("Error fetching tours:", err));
  }, []);

  return (
    <div>
      <MenuBar links={navLinks} />
      <div className="min-vh-100">
        <main className="d-flex flex-column" style={{ padding: "3rem 2rem", gap: "5rem" }}>
          {/* Row 1: Calendar + Sliders */}
          <div className="flex flex-col lg:flex-row flex-wrap gap-12 w-full" id="dashboardRow1">
            <div className="w-full lg:w-1/3 min-w-[300px]">
              <CalendarComponent onDateChange={handleDateChange} />
            </div>

            <div className="w-full lg:w-2/3 min-w-[300px]">
              <p className="section-title">Happening on this day</p>
              <CardSlider>
                {activitiesForSelectedDate.length > 0 ? (
                  activitiesForSelectedDate.map((activity, index) => (
                    <Activity key={index} activity={activity} />
                  ))
                ) : (
                  <p style={{ paddingLeft: '2rem' }}>No activities on this day.</p>
                )}
              </CardSlider>

              <p className="section-title mt-5">Happening on this month</p>
              <GuideTourSlider />
            </div>
          </div>

          {/* Row 2: Stats + Reviews */}
          <div className="container-fluid" id="dashboardRow2">
            <div className="row ms-lg-5">
              <div className="col-12 col-lg-5 d-flex flex-column">
                <p className="section-title">How many?</p>
                <TourStatistics />
              </div>
              <div className="col-12 col-lg-5 d-flex flex-column">
                <p className="section-title ms-lg-5">Reviews</p>
                <div className="ms-lg-5">
                  <GuideReviews />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Earnings + Top Tours */}
          <div className="container-fluid" id="dashboardRow3">
            <div className="row align-items-start ms-lg-5">
              <div className="col-12 col-lg-5 ">
                <p className="section-title">Earning / Month</p>
                <div style={{ width: "100%" }}>
                  <EarningPerMonth />
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <p className="section-title ms-lg-5">Top 3 Attended Tours</p>
                <div style={{ width: "100%" }} className="ms-lg-5">
                  <GuideTopTours />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GuideDashboard;
