
// import React, { useState } from "react";
// import { FaListUl, FaSync, FaUserCheck, FaBell } from "react-icons/fa";
// import { MdEmergencyShare } from "react-icons/md";

// function MemberHome() {
//   const [activeSection, setActiveSection] = useState("cyclicTasks"); // DEFAULT VIEW

//   // Dummy content function
//   const renderContent = () => {
//     switch (activeSection) {
//       case "cyclicTasks":
//         return (
//           <div className="content-box">
//             <h3>Cyclic Tasks</h3>
//             <p>This is a dummy page for viewing your cyclic tasks.</p>
//             <ul>
//               <li>✔ Morning Checkup</li>
//               <li>✔ Medication Reminder</li>
//               <li>✔ Diet Monitoring</li>
//             </ul>
//           </div>
//         );

//       case "updateStatus":
//         return (
//           <div className="content-box">
//             <h3>Update Task Status</h3>
//             <p>Dummy page to update status of assigned tasks.</p>
//           </div>
//         );

//       case "availability":
//         return (
//           <div className="content-box">
//             <h3>Availability Status</h3>
//             <p>You can set your availability here. (Dummy page)</p>
//           </div>
//         );

//       case "alerts":
//         return (
//           <div className="content-box">
//             <h3>Mother Condition Alerts</h3>
//             <p>Dummy page showing alerts related to mother’s health.</p>
//           </div>
//         );

//       case "sos":
//         return (
//           <div className="content-box">
//             <h3>Emergency Support</h3>
//             <p>Emergency triggered! (Dummy page)</p>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="member-container">
//       <h2 className="member-title">Family Member Dashboard</h2>

//       <div className="quote-box">
//         <p className="quote-text">
//           “Together we protect, support, and care for our mothers.”
//         </p>
//       </div>

//       {/* Dashboard Grid */}
//       <div className="grid-container">

//         <div className="card" onClick={() => setActiveSection("cyclicTasks")}>
//           <FaListUl className="card-icon" />
//           <p>View Cyclic Tasks</p>
//         </div>

//         <div className="card" onClick={() => setActiveSection("updateStatus")}>
//           <FaSync className="card-icon" />
//           <p>Update Task Status</p>
//         </div>

//         <div className="card" onClick={() => setActiveSection("availability")}>
//           <FaUserCheck className="card-icon" />
//           <p>Availability Status</p>
//         </div>

//         <div className="card" onClick={() => setActiveSection("alerts")}>
//           <FaBell className="card-icon" />
//           <p>Mother Condition Alerts</p>
//         </div>

//         <div className="card sos-card" onClick={() => setActiveSection("sos")}>
//           <MdEmergencyShare className="card-icon" />
//           <p>Emergency Support</p>
//         </div>

//       </div>

//       {/* Dummy Content Appears Here */}
//       <div className="content-wrapper">
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default MemberHome;


import React, { useState } from "react";
import { FaListUl, FaSync, FaUserCheck, FaBell } from "react-icons/fa";
import { MdEmergencyShare } from "react-icons/md";
import MemberTodayTasks from "./MemberTodayTasks";
// import MemberTodayTasks from "./MemberTodayTasks";   // <-- ADD THIS

function MemberHome() {
  const [activeSection, setActiveSection] = useState("todayTasks"); // DEFAULT: Today Tasks

  const renderContent = () => {
    switch (activeSection) {
      
      case "todayTasks":
        return <MemberTodayTasks />;  // <-- NEW PAGE
      
      case "cyclicTasks":
        return (
          <div className="content-box">
            <h3>Cyclic Tasks</h3>
            <p>This is a dummy page for viewing your cyclic tasks.</p>
            <ul>
              <li>✔ Morning Checkup</li>
              <li>✔ Medication Reminder</li>
              <li>✔ Diet Monitoring</li>
            </ul>
          </div>
        );

      case "updateStatus":
        return (
          <div className="content-box">
            <h3>Update Task Status</h3>
            <p>Dummy page to update status of assigned tasks.</p>
          </div>
        );

      case "availability":
        return (
          <div className="content-box">
            <h3>Availability Status</h3>
            <p>You can set your availability here. (Dummy page)</p>
          </div>
        );

      case "alerts":
        return (
          <div className="content-box">
            <h3>Mother Condition Alerts</h3>
            <p>Dummy page showing alerts related to mother’s health.</p>
          </div>
        );

      case "sos":
        return (
          <div className="content-box">
            <h3>Emergency Support</h3>
            <p>Emergency triggered! (Dummy page)</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="member-container">
      <h2 className="member-title">Family Member Dashboard</h2>

      <div className="quote-box">
        <p className="quote-text">
          “Together we protect, support, and care for our mothers.”
        </p>
      </div>

      <div className="grid-container">

        {/* ✔ NEW CARD ADDED */}
        <div className="card" onClick={() => setActiveSection("todayTasks")}>
          <FaListUl className="card-icon" />
          <p>Today's Tasks</p>
        </div>

        <div className="card" onClick={() => setActiveSection("cyclicTasks")}>
          <FaListUl className="card-icon" />
          <p>View Cyclic Tasks</p>
        </div>

        <div className="card" onClick={() => setActiveSection("updateStatus")}>
          <FaSync className="card-icon" />
          <p>Update Task Status</p>
        </div>

        <div className="card" onClick={() => setActiveSection("availability")}>
          <FaUserCheck className="card-icon" />
          <p>Availability Status</p>
        </div>

        <div className="card" onClick={() => setActiveSection("alerts")}>
          <FaBell className="card-icon" />
          <p>Mother Condition Alerts</p>
        </div>

        <div className="card sos-card" onClick={() => setActiveSection("sos")}>
          <MdEmergencyShare className="card-icon" />
          <p>Emergency Support</p>
        </div>

      </div>

      <div className="content-wrapper">{renderContent()}</div>
    </div>
  );
}

export default MemberHome;
