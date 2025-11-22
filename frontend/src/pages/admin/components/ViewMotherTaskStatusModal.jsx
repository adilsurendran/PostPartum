// import React from "react";

// function ViewMotherTaskStatusModal({ task, onClose }) {
  
//   // Format function for nice date display
//   const formatDate = (d) => {
//     return new Date(d).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric"
//     });
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box" style={{ maxWidth: "500px" }}>

//         <h5 className="mb-3">
//           Task Status – {task.taskName}
//         </h5>

//         <p><strong>Date From:</strong> {formatDate(task.dateFrom)}</p>
//         <p><strong>Today:</strong> {formatDate(new Date())}</p>

//         <hr />

//         <h6>Status by Day</h6>

//         <ul className="list-group" style={{ maxHeight: "300px", overflowY: "auto" }}>
//           {task.dailyStatus.map((day, index) => (
//             <li key={index} className="list-group-item d-flex justify-content-between">
//               <span>{formatDate(day.date)}</span>
//               <span
//                 className={`badge ${
//                   day.status === "Completed"
//                     ? "bg-success"
//                     : "bg-warning text-dark"
//                 }`}
//               >
//                 {day.status}
//               </span>
//             </li>
//           ))}
//         </ul>

//         <div className="d-flex justify-content-end mt-3">
//           <button className="btn btn-sm btn-secondary" onClick={onClose}>
//             Close
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default ViewMotherTaskStatusModal;

import React from "react";

function ViewMotherTaskStatusModal({ task, onClose }) {

  // Format function for nice date display
  const formatDate = (d) => {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  // Generate all dates from dateFrom → today
  const generateDates = () => {
    const dates = [];
    let current = new Date(task.dateFrom);
    const today = new Date();

    while (current <= today) {
      dates.push({
        date: new Date(current),
        status:
          formatDate(current) === formatDate(today)
            ? task.statusToday || "Pending"
            : "Pending",        // past days always "Pending"
      });

      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const dateList = generateDates();

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: "500px" }}>

        <h5 className="mb-3">
          Task Status – {task.taskName}
        </h5>

        <p><strong>Date From:</strong> {formatDate(task.dateFrom)}</p>
        <p><strong>Today:</strong> {formatDate(new Date())}</p>

        <hr />

        <h6>Status by Day</h6>

        <ul className="list-group" style={{ maxHeight: "300px", overflowY: "auto" }}>
          {dateList.map((d, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span>{formatDate(d.date)}</span>
              <span
                className={`badge ${
                  d.status === "Completed"
                    ? "bg-success"
                    : "bg-warning text-dark"
                }`}
              >
                {d.status}
              </span>
            </li>
          ))}
        </ul>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-sm btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default ViewMotherTaskStatusModal;
