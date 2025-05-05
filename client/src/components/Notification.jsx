import React from "react";

const Notifications = () => {
  const sampleNotifications = [
    "10 new accounts are waiting for approval",
    "@userX deleted their account",
    "2 users added new complaints",
  ];

  return (
    <div className="rounded-2xl shadow-md p-4 bg-white w-100">
      <div className="space-y-3">
        {sampleNotifications.map((note, index) => (
          <div
            key={index}
            className="bg-gray-100 hover:bg-gray-200 transition-colors p-4 rounded-lg text-sm text-gray-700 shadow-sm"
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
