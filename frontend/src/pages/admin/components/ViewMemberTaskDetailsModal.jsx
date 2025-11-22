import React from "react";

function ViewMemberTaskDetailsModal({ task, onClose }) {

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: "500px" }}>

        <h5 className="mb-3">Task Details – {task.taskName}</h5>

        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Start Date:</strong> {formatDate(task.startDate)}</p>

        <p><strong>Assigned Today:</strong> 
          {task.dailyAssignments.length > 0 
            ? task.dailyAssignments[task.dailyAssignments.length - 1].memberName
            : "Not assigned"}
        </p>

        <hr />

        <h6>Previous Assignments</h6>

        <ul className="list-group" style={{ maxHeight: "250px", overflowY: "auto" }}>
          {task.dailyAssignments.length === 0 ? (
            <li className="list-group-item">No assignment history.</li>
          ) : (
            task.dailyAssignments.map((a, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <span>{formatDate(a.date)}</span>
                <span>{a.memberName}</span>
                <span
                  className={`badge ${
                    a.status === "Completed"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {a.status}
                </span>
              </li>
            ))
          )}
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

export default ViewMemberTaskDetailsModal;
