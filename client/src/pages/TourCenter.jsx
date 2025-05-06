// // // Path: src/pages/TourCenter.jsx

// // // Importing required libraries and components
// // import React from "react";
// // import { useNavigate } from "react-router-dom"; // Added for navigation functionality
// // import MenuBar from "../components/MenuBar";
// // import CalendarView from "../components/CalendarView"; // Displays the calendar
// // import "./GuideDashboard.css"; // Common styles
// // import "./TourCenter.css"; // Page-specific styles
// // import CardSlider from "../components/CardSlider"; // Slider for activities
// // import Activity from "../components/Activity"; // Activity card
// // import GuideTourSlider from "../components/GuideTourSlider";

// // const TourCenter = () => {
// //   const navigate = useNavigate(); // Hook to programmatically navigate

// //   // Navigation links for the menu bar
// //   const navLinks = [
// //     { label: "Home", path: "/TourGuideHome" },
// //     { label: "About", path: "/TourGuideAbout" },
// //     { label: "Profile", path: "/GuideAccount" },
// //     { label: "Dashboard", path: "/GuideDashboard" },
// //     { label: "Tour Center", path: "/TourCenter" },
// //     { label: "Logout", path: "/Home" }, // Placeholder path for logout handling
// //   ];

// //   // Handle click on navigation links
// //   const handleNavClick = (path) => {
// //     if (path === "/Logout") {
// //       // If user clicks "Logout", show confirmation message
// //       const confirmed = window.confirm("Are you sure you want to logout?");
// //       if (confirmed) {
// //         navigate("/Home"); // If confirmed, redirect to Home page
// //       }
// //       // If cancelled, stay on the same page
// //     } else {
// //       // For all other links, navigate normally
// //       navigate(path);
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* Menu bar with dynamic links and logout behavior */}
// //       <MenuBar
// //         links={navLinks.map(link => ({
// //           ...link,
// //           onClick: () => handleNavClick(link.path) // Attach click handler
// //         }))}
// //       />

// //       <main className="tour-center-main">
// //         {/* Top section: Your Tour On */}
// //         <section className="tour-section">
// //           <p className="section-title">Your Tour On</p>

// //           {/* Dropdown to choose a tour date */}
// //           <select className="tour-date-select">
// //             <option>Choose a date</option>
// //             {/* Future enhancement: populate dynamically */}
// //           </select>

// //           {/* Slider to display available activities */}
// //           <div>
// //             <GuideTourSlider />
// //           </div>

// //           {/* Buttons for managing tours */}
// //           <div className="tour-controls">
// //             <button className="tour-action-btn">Add event/s</button>
// //             <button className="tour-action-btn">Select</button>
// //             <button className="tour-action-btn">Delete event/s</button>
// //           </div>
// //         </section>

// //         {/* Bottom section: Calendar View */}
// //         <section>
// //           <p className="section-title">Calendar View</p>
// //           <CalendarView />
// //         </section>
// //       </main>
// //     </div>
// //   );
// // };

// // export default TourCenter;

// // Importing required libraries and components
// // import React from "react";
// // import { useNavigate } from "react-router-dom"; // Added for navigation functionality
// // import MenuBar from "../components/MenuBar";
// // import CalendarView from "../components/CalendarView"; // Displays the calendar
// // import "./GuideDashboard.css"; // Common styles
// // import "./TourCenter.css"; // Page-specific styles
// // import CardSlider from "../components/CardSlider"; // Slider for activities
// // import Activity from "../components/Activity"; // Activity card
// // import GuideTourSlider from "../components/GuideTourSlider";

// // const TourCenter = () => {
// //   const navigate = useNavigate(); // Hook to programmatically navigate

// //   // Navigation links for the menu bar
// //   const navLinks = [
// //     { label: "Home", path: "/TourGuideHome" },
// //     { label: "About", path: "/TourGuideAbout" },
// //     { label: "Profile", path: "/GuideAccount" },
// //     { label: "Dashboard", path: "/GuideDashboard" },
// //     { label: "Tour Center", path: "/TourCenter" },
// //     { label: "Logout", path: "/Home" }, // Placeholder path for logout handling
// //   ];

// //   // Handle click on navigation links
// //   const handleNavClick = (path) => {
// //     if (path === "/Logout") {
// //       const confirmed = window.confirm("Are you sure you want to logout?");
// //       if (confirmed) {
// //         navigate("/Home");
// //       }
// //     } else {
// //       navigate(path);
// //     }
// //   };

// //   // ✅ List of months to populate dropdown
// //   const months = [
// //     "January", "February", "March", "April", "May", "June",
// //     "July", "August", "September", "October", "November", "December"
// //   ];

// //   return (
// //     <div>
// //       {/* Menu bar with dynamic links and logout behavior */}
// //       <MenuBar
// //         links={navLinks.map(link => ({
// //           ...link,
// //           onClick: () => handleNavClick(link.path) // Attach click handler
// //         }))}
// //       />

// //       <main className="tour-center-main">
// //         {/* Top section: Your Tour On */}
// //         <section className="tour-section">
// //           <p className="section-title">Your Tour On</p>

// //           {/* ✅ Dropdown changed to "Choose a month" with all 12 months */}
// //           <select className="tour-date-select">
// //             <option value="">Choose a month</option>
// //             {months.map((month) => (
// //               <option key={month} value={month}>{month}</option>
// //             ))}
// //           </select>

// //           {/* Slider to display available activities */}
// //           <div>
// //             <GuideTourSlider />
// //           </div>

// //           {/* Buttons for managing tours */}
// //           <div className="tour-controls">
// //             <button className="tour-action-btn">Add a tour</button>
// //             <button className="tour-action-btn">Select</button>
// //             <button className="tour-action-btn">Delete a tour</button>
// //           </div>
// //         </section>

// //         {/* Bottom section: Calendar View */}
// //         <section>
// //           <p className="section-title">Calendar View</p>
// //           <CalendarView />
// //         </section>
// //       </main>
// //     </div>
// //   );
// // };

// // export default TourCenter;


// import React from "react";
// import { useNavigate } from "react-router-dom"; // Added for navigation functionality
// import MenuBar from "../components/MenuBar";
// import CalendarView from "../components/CalendarView"; // Displays the calendar
// import "./GuideDashboard.css"; // Common styles
// import "./TourCenter.css"; // Page-specific styles
// import CardSlider from "../components/CardSlider"; // Slider for activities
// import Activity from "../components/Activity"; // Activity card
// import GuideTourSlider from "../components/GuideTourSlider";

// const TourCenter = () => {
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   // Navigation links for the menu bar
//   const navLinks = [
//     { label: "Home", path: "/TourGuideHome" },
//     { label: "About", path: "/TourGuideAbout" },
//     { label: "Profile", path: "/GuideAccount" },
//     { label: "Dashboard", path: "/GuideDashboard" },
//     { label: "Tour Center", path: "/TourCenter" },
//     { label: "Logout", path: "/Home" }, // Placeholder path for logout handling
//   ];

//   // Handle click on navigation links
//   const handleNavClick = (path) => {
//     if (path === "/Logout") {
//       const confirmed = window.confirm("Are you sure you want to logout?");
//       if (confirmed) {
//         navigate("/Home");
//       }
//     } else {
//       navigate(path);
//     }
//   };

//   // ✅ List of months to populate dropdown
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   return (
//     <div>
//       {/* Menu bar with dynamic links and logout behavior */}
//       <MenuBar
//         links={navLinks.map(link => ({
//           ...link,
//           onClick: () => handleNavClick(link.path) // Attach click handler
//         }))}
//       />

//       <main className="tour-center-main">
//         {/* Top section: Your Tour On */}
//         <section className="tour-section">
//           <p className="section-title">Your Tour On</p>

//           {/* ✅ Dropdown changed to "Choose a month" with all 12 months */}
//           <select className="tour-date-select">
//             <option value="">Choose a month</option>
//             {months.map((month) => (
//               <option key={month} value={month}>{month}</option>
//             ))}
//           </select>

//           {/* Slider to display available activities */}
//           <div>
//             <GuideTourSlider />
//           </div>

//           {/* Buttons for managing tours */}
//           <div className="tour-controls">
//             <button className="tour-action-btn">Add a tour</button>
//             <button className="tour-action-btn">Select</button>
//             <button className="tour-action-btn">Delete a tour</button>
//           </div>
//         </section>

//         {/* Bottom section: Calendar View */}
//         <section>
//           <p className="section-title">Calendar View</p>
//           <CalendarView />
//         </section>
//       </main>
//     </div>
//   );
// };

// export default TourCenter;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import CalendarView from "../components/CalendarView";
import "./GuideDashboard.css";
import "./TourCenter.css";
import CardSlider from "../components/CardSlider";
import Activity from "../components/Activity";
import GuideTourSlider from "../components/GuideTourSlider";

const TourCenter = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(""); // Track selected month

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

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div>
      <MenuBar
        links={navLinks.map(link => ({
          ...link,
          onClick: () => handleNavClick(link.path)
        }))}
      />

      <main className="tour-center-main">
        <section className="tour-section">
          <p className="section-title">Your Tour On</p>

          {/* Month Dropdown */}
          <select
            className="tour-date-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Choose a month</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          {/* ✅ Only show the tour slider if June is selected */}
          {selectedMonth && selectedMonth === "June" && (
            <div>
              <GuideTourSlider />
            </div>
          )}

          <div className="tour-controls">
            <button className="tour-action-btn">Add a tour</button>
            <button className="tour-action-btn">Select</button>
            <button className="tour-action-btn">Delete a tour</button>
          </div>
        </section>

        <section>
          <p className="section-title">Calendar View</p>
          <CalendarView />
        </section>
      </main>
    </div>
  );
};

export default TourCenter;
