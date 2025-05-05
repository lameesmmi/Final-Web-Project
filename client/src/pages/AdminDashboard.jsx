import React from "react";
import AdminMenuBar from "../components/AdminMenuBar";
import AdminTopActivities from "../components/AdminTopActivities";
import Notifications from "../components/Notification";
import ActivitiesPerMonth from "../components/ActivitiesPerMonth";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen text-gray-800">
      {/* Top Navigation */}
      <AdminMenuBar />

      {/* Main content */}
      <main className="py-5">
        <div className="container">
          {/* Row 1: Activities Per Month + Top Activities */}
          <div className="row justify-content-center g-4 mb-4">
            <div className="col-md-6">
              <h2 className="text-center mb-3">Earning Per Month</h2>
              <ActivitiesPerMonth />
            </div>
            <div className="col-md-6">
              <h2 className="text-center mb-3">Top Attended Activities</h2>
              <div className="d-flex justify-content-center">
                <AdminTopActivities />
              </div>
            </div>
          </div>

          {/* Row 2: Notifications */}
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <h2 className="text-center mb-3">Notifications</h2>
              <Notifications />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
