// Path: src/App.js

// Import global styles
import './App.css';

// Import component files
import DropdownMenu from './components/DropdownMenu';
import CalendarComponent from './components/CalendarComponent';


// Import React and routing tools
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import WhereTo from './pages/WhereTo';
import Payment from './pages/Payment';
import AdminComplaints from './pages/AdminComplaints';
import ExploreActivities from './pages/ExploreActivities';
import ViewActivity from './pages/ViewActivity';
import TourGuides from './pages/TourGuides';
import GuideProfile from './pages/GuideProfile';
import GuideDashboard from "./pages/GuideDashboard";
import About from './pages/About';
import MyWishList from "./pages/MyWishList";
import MyPlan from './pages/MyPlan';
import TourCenter from './pages/TourCenter';
import CreateAccount from './pages/CreateAccount';
import CreateActivityProviderAccount from './pages/CreateActivityProviderAccount';
import CreateTourGuideAccount from './pages/CreateTourGuideAccount';
import CreateTouristAccount from './pages/CreateTouristAccount';
import ForgetPassword from './pages/ForgetPassword';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Reservations from './pages/Reservations';
import Profile from './pages/Profile';
import EventsHistory from './pages/EventsHistory';
import EventDetails from './pages/EventDetails';
import PendingRegistrations from './pages/PendingRegistrations';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import UserManagementPage from './pages/UserManagement';
import ActivityDetails from './pages/ActivityDatails';
import TourDetails from './pages/TourDetails';
import AdminDashboard from './pages/AdminDashboard';
import { Navigate } from 'react-router-dom';
import PendingActivity from './pages/PendingActivity';
import TourGuideHome from './pages/TourGuideHome';
import TourGuideAbout from './pages/TourGuideAbout';
import ContactTourGuide from './pages/ContactTourGuide';
import GuideAccount from './pages/GuidAccount';
import TourGuideViewActivity from './pages/TourGuideViewActivity';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/AdminComplaints" element={< AdminComplaints/>} />
        <Route path="/WhereTo" element={<WhereTo />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ExploreActivities" element={<ExploreActivities/>}/>
        <Route path="/ViewActivity/:id" element={<ViewActivity />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/TourGuides" element={<TourGuides />} />
        <Route path="/guide/:guideName" element={<GuideProfile />} />
        <Route path="/GuideDashboard" element={<GuideDashboard />} />
        <Route path="/About" element={<About />} />
        <Route path="/MyWishList" element={<MyWishList />} />
        <Route path="/MyPlan" element={<MyPlan />} />
        <Route path="/MyPlan/:id" element={<MyPlan />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/EventDetails/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path='/ActivityDetails/:id' element={<ActivityDetails />} />
        <Route path='/TourDetails/:id' element={<TourDetails />} />
        <Route path="/TourCenter" element={<TourCenter />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/CreateActivityProviderAccount" element={<CreateActivityProviderAccount />} />
        <Route path="/CreateTourGuideAccount" element={<CreateTourGuideAccount />} />
        <Route path="/CreateTouristAccount" element={<CreateTouristAccount />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/UserManagement" element={<UserManagementPage/>} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/eventshistory" element={<EventsHistory />} />
        <Route path="/events-history/:eventId" element={<EventDetails />} />
        <Route path="/pending-registrations" element={<PendingRegistrations />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/PendingActivity" element={<PendingActivity />} />
        <Route path="/GuideProfile" element={<GuideProfile />} />
        <Route path="/TourGuideHome" element={<TourGuideHome />} />
        <Route path="/TourGuideAbout" element={<TourGuideAbout />} />
        <Route path="/ContactTourGuide" element={< ContactTourGuide/>} />
        <Route path="/GuideAccount" element={<GuideAccount />} />
        <Route path="/TourGuideViewActivity" element={<TourGuideViewActivity />} />
      </Routes>
    </div>
  );
}

export default App;
