import React, { useEffect, useState } from "react";
import axios from "axios";

function MemberTodayTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current member name from localStorage (adjust to your login structure)
  const storedMember = JSON.parse(localStorage.getItem("member") || "{}");
  const memberName = storedMember.name; // make sure this matches what you store

  console.log(memberName);
  

  useEffect(() => {
    if (memberName) {
      loadTodayTasks();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [memberName]);

  const loadTodayTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/member/today-tasks", {
        params: { memberName },
      });

      if (res.data.success) {
        setTasks(res.data.tasks);
      }
    } catch (err) {
      console.error("Error loading member today tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (taskId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/member/update-today-status/${taskId}`,
        { memberName, status: "Completed" }
      );

      if (res.data.success) {
        // reload list
        await loadTodayTasks();
      } else {
        alert(res.data.message || "Failed to update");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Server error");
    }
  };

  if (!memberName) {
    return (
      <div className="content-box">
        <h3>Today's Tasks</h3>
        <p>Member information not found. Please login again.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="content-box">
        <h3>Today's Tasks</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="content-box">
      <h3>Today's Tasks for {memberName}</h3>

      {tasks.length === 0 ? (
        <p>No tasks assigned to you for today.</p>
      ) : (
        <ul className="list-group mt-3">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <strong>{task.taskName}</strong>
                  <br />
                  <small>{task.description}</small>
                  <br />
                  <small>Start Date: {task.startDate}</small>
                </div>
                <div>
                  {task.todayStatus === "Completed" ? (
                    <span className="badge bg-success">Completed</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => markCompleted(task._id)}
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MemberTodayTasks;
