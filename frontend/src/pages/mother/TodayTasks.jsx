import React, { useEffect, useState } from "react";
import axios from "axios";

function TodayTasks() {
  const [tasks, setTasks] = useState([]);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    loadTodayTasks();
  }, []);

  const loadTodayTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/mother/today-tasks");
      if (res.data.success) {
        setTasks(res.data.tasks);
        console.log(res.data.tasks);
        
      }
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  };

  const markCompleted = async (taskId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/mother/update-today-status/${taskId}`
      );

      if (res.data.success) {
        loadTodayTasks();
      } else {
        alert("Failed to update task");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="content-box">
      <h3>Today's Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks scheduled for today.</p>
      ) : (
        <ul className="list-group mt-3">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <div>
                  <strong>{task.taskName}</strong> <br />
                  <small>{task.description}</small> <br />
                  <small>Time: {task.time}</small>
                </div>

                <div>
                  {task.statusToday === "Completed" ? (
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

export default TodayTasks;
