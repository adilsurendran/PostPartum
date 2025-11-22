// import React from "react";
// import { FaTasks, FaBell, FaSync, FaRobot, FaQuoteLeft } from "react-icons/fa";
// import { MdEmergencyShare } from "react-icons/md";

// function MotherHome() {
//   return (
//     <div className="mother-container">
//       <h2 className="mother-title">Mother Dashboard</h2>

//       {/* Motivational Quote */}
//       <div className="quote-box">
//         <FaQuoteLeft className="quote-icon" />
//         <p className="quote-text">
//           “You are stronger than you think, and braver than you feel.”
//         </p>
//       </div>

//       {/* Dashboard Grid */}
//       <div className="grid-container">

//         <div className="card" onClick={() => alert("Receive Task Clicked")}>
//           <FaTasks className="card-icon" />
//           <p>Receive Task</p>
//         </div>

//         <div className="card" onClick={() => alert("Task Notifications Clicked")}>
//           <FaBell className="card-icon" />
//           <p>Task Notification</p>
//         </div>

//         <div className="card" onClick={() => alert("Update Task Status Clicked")}>
//           <FaSync className="card-icon" />
//           <p>Update Task Status</p>
//         </div>

//         <div className="card sos-card" onClick={() => alert("SOS Triggered!")}>
//           <MdEmergencyShare className="card-icon" />
//           <p>Emergency SOS</p>
//         </div>

//         <div className="card" onClick={() => alert("Chatbot Coming Soon")}>
//           <FaRobot className="card-icon" />
//           <p>Chatbot Support</p>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default MotherHome;


import React, { useState } from "react";
import { FaTasks, FaBell, FaSync, FaRobot, FaQuoteLeft } from "react-icons/fa";
import { MdEmergencyShare } from "react-icons/md";
import TodayTasks from "./TodayTasks";

function MotherHome() {
  const [activeSection, setActiveSection] = useState("receiveTask"); // Default section

  // Dummy content sections
  const renderContent = () => {
    switch (activeSection) {
      case "receiveTask":
        return <TodayTasks />;

      case "taskNotification":
        return (
          <div className="content-box">
            <h3>Task Notifications</h3>
            <p>Your latest task alerts will show here. (Dummy page)</p>
          </div>
        );

      case "updateTaskStatus":
        return (
          <div className="content-box">
            <h3>Update Task Status</h3>
            <p>You can update task progress here. (Dummy page)</p>
          </div>
        );

      case "sos":
        return (
          <div className="content-box">
            <h3>Emergency SOS</h3>
            <p>Emergency request triggered! (Dummy page)</p>
          </div>
        );

      case "chatbot":
        return (
          <div className="content-box">
            <h3>Chatbot Support</h3>
            <p>Your assistant chatbot will be available here. (Dummy page)</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mother-container">
      <h2 className="mother-title">Mother Dashboard</h2>

      {/* Motivational Quote */}
      <div className="quote-box">
        <FaQuoteLeft className="quote-icon" />
        <p className="quote-text">
          “You are stronger than you think, and braver than you feel.”
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid-container">

        <div className="card" onClick={() => setActiveSection("receiveTask")}>
          <FaTasks className="card-icon" />
          <p>Receive Task</p>
        </div>

        <div className="card" onClick={() => setActiveSection("taskNotification")}>
          <FaBell className="card-icon" />
          <p>Task Notification</p>
        </div>

        <div className="card" onClick={() => setActiveSection("updateTaskStatus")}>
          <FaSync className="card-icon" />
          <p>Update Task Status</p>
        </div>

        <div className="card sos-card" onClick={() => setActiveSection("sos")}>
          <MdEmergencyShare className="card-icon" />
          <p>Emergency SOS</p>
        </div>

        <div className="card" onClick={() => setActiveSection("chatbot")}>
          <FaRobot className="card-icon" />
          <p>Chatbot Support</p>
        </div>

      </div>

      {/* Dummy Content Area */}
      <div className="content-wrapper">{renderContent()}</div>
    </div>
  );
}

export default MotherHome;
