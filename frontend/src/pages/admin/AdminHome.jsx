import React, { useState } from "react";
import { FaTasks, FaUsersCog, FaCalendarCheck, FaHeartbeat, FaBell, FaUserShield } from "react-icons/fa";
import AdminManageTasks from "./AdminManageTasks";

function AdminHome() {
  const [activeSection, setActiveSection] = useState("manageTasks"); // DEFAULT VIEW

  // Dummy Pages Based on Selection
  const renderContent = () => {
    switch (activeSection) {
    //   case "manageTasks":
    //     return (
    //       <div className="content-box">
    //         <h3>Add & Manage Tasks</h3>
    //         <p>This is a dummy page for creating and managing tasks.</p>
    //         <ul>
    //           <li>➕ Add New Task</li>
    //           <li>✏️ Edit Existing Tasks</li>
    //           <li>🗑️ Delete Tasks</li>
    //         </ul>
    //       </div>
    //     );
case "manageTasks":
  return <AdminManageTasks />;

      case "monitorFamily":
        return (
          <div className="content-box">
            <h3>Family Task Monitoring</h3>
            <p>Dummy page to view and track family members' task progress.</p>
          </div>
        );

      case "doctorSchedule":
        return (
          <div className="content-box">
            <h3>Doctor Checkup Schedule</h3>
            <p>Manage and view doctor appointments for mothers. (Dummy page)</p>
          </div>
        );

      case "motherHealth":
        return (
          <div className="content-box">
            <h3>Mothers Health Status</h3>
            <p>Dummy page showing health updates of mothers.</p>
          </div>
        );

      case "alerts":
        return (
          <div className="content-box">
            <h3>Alert Views</h3>
            <p>Dummy page displaying emergency alerts, warnings & notifications.</p>
          </div>
        );

      case "familyStatus":
        return (
          <div className="content-box">
            <h3>Family Status</h3>
            <p>Dummy page to view approval & activity status of families.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* Dashboard Grid */}
      <div className="grid-container">
        
        <div className="card" onClick={() => setActiveSection("manageTasks")}>
          <FaTasks className="card-icon" />
          <p>Add & Manage Tasks</p>
        </div>

        <div className="card" onClick={() => setActiveSection("monitorFamily")}>
          <FaUsersCog className="card-icon" />
          <p>Monitor Family Tasks</p>
        </div>

        <div className="card" onClick={() => setActiveSection("doctorSchedule")}>
          <FaCalendarCheck className="card-icon" />
          <p>Doctor Checkup Schedule</p>
        </div>

        <div className="card" onClick={() => setActiveSection("motherHealth")}>
          <FaHeartbeat className="card-icon" />
          <p>Mothers Health Status</p>
        </div>

        <div className="card" onClick={() => setActiveSection("alerts")}>
          <FaBell className="card-icon" />
          <p>Alert Views</p>
        </div>

        <div className="card" onClick={() => setActiveSection("familyStatus")}>
          <FaUserShield className="card-icon" />
          <p>Family Status</p>
        </div>

      </div>

      {/* Content Section */}
      <div className="content-wrapper">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminHome;
