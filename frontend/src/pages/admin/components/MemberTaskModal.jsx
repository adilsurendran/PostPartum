
// import { useState } from "react";
// import axios from "axios";

// function MemberTaskModal({ onClose, onSave }) {
//   const [form, setForm] = useState({
//     taskName: "",
//     description: "",
//     startDate: "",
//   });

//   // Get today's date in yyyy-mm-dd
//   const today = new Date().toISOString().split("T")[0];

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // ❗ Validation: Start date should not be before today
//     if (name === "startDate" && value < today) {
//       alert("Start date cannot be in the past!");
//       return;
//     }

//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/admin/add-member-task",
//         form
//       );

//       if (res.data.success) {
//         onSave(res.data.task);
//         onClose();
//       } else {
//         alert("Failed to add task");
//       }

//     } catch (error) {
//       console.error("Error adding member task:", error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <h5>New Member Cyclic Task</h5>
//         <form onSubmit={handleSubmit}>

//           <div className="mb-2">
//             <label>Task Name</label>
//             <input
//               className="form-control"
//               name="taskName"
//               value={form.taskName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-2">
//             <label>Description</label>
//             <textarea
//               className="form-control"
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-2">
//             <label>Start Date</label>
//             <input
//               type="date"
//               min={today}          // ❗ Disables past days in calendar
//               className="form-control"
//               name="startDate"
//               value={form.startDate}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="d-flex justify-content-end mt-3">
//             <button
//               type="button"
//               className="btn btn-sm btn-secondary me-2"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-sm btn-primary">
//               Save Task
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default MemberTaskModal;


import { useState, useEffect } from "react";
import axios from "axios";

function MemberTaskModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    taskName: "",
    description: "",
    startDate: "",
    assignedMember: ""
  });

  const [availableMembers, setAvailableMembers] = useState([]);

  // 📌 Get today yyyy-mm-dd
  const today = new Date().toISOString().split("T")[0];

  // Load available members
  useEffect(() => {
    loadAvailableMembers();
  }, []);

  const loadAvailableMembers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/available-members");
      if (res.data.success) setAvailableMembers(res.data.members);
    } catch (err) {
      console.error("Error loading members:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent past start date
    if (name === "startDate" && value < today) {
      alert("Start date cannot be in the past!");
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/admin/add-member-task",
        form
      );

      if (res.data.success) {
        onSave(res.data.task);
        onClose();
      } else {
        alert("Failed to add task");
      }

    } catch (error) {
      console.error("Error adding member task:", error);
      alert("Server error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h5>New Member Cyclic Task</h5>

        <form onSubmit={handleSubmit}>

          <div className="mb-2">
            <label>Task Name</label>
            <input
              className="form-control"
              name="taskName"
              value={form.taskName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Start Date</label>
            <input
              type="date"
              min={today}
              className="form-control"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* NEW — Select Today's Member */}
          <div className="mb-2">
            <label>Assign Today's Member</label>
            <select
              name="assignedMember"
              className="form-control"
              value={form.assignedMember}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Member --</option>
              {availableMembers.map((m) => (
                <option key={m._id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button type="button" className="btn btn-sm btn-secondary me-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default MemberTaskModal;
