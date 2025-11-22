
// import { useState } from "react";
// import axios from "axios";

// function MotherTaskModal({ onClose, onSave }) {
//   const [form, setForm] = useState({
//     taskName: "",
//     description: "",
//     dateFrom: "",
//     dateTo: "",
//     time: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:8000/admin/addtask", form);

//       if (res.data.success) {
//         onSave(res.data.task);
//         onClose();
//       } else {
//         alert("Error creating task");
//       }

//     } catch (error) {
//       console.error("Error saving task:", error);
//       alert("Server error while saving task");
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <h5>New Mother Task</h5>
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
//             <label>Date From</label>
//             <input
//               type="date"
//               className="form-control"
//               name="dateFrom"
//               value={form.dateFrom}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-2">
//             <label>Date To</label>
//             <input
//               type="date"
//               className="form-control"
//               name="dateTo"
//               value={form.dateTo}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* NEW TIME FIELD */}
//           <div className="mb-2">
//             <label>Time</label>
//             <input
//               type="time"
//               className="form-control"
//               name="time"
//               value={form.time}
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

// export default MotherTaskModal;


import { useState } from "react";
import axios from "axios";

function MotherTaskModal({ onClose, onSave }) {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    taskName: "",
    description: "",
    dateFrom: "",
    dateTo: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Date validation:
    if (name === "dateFrom") {
      if (value < today) {
        alert("Date From cannot be in the past!");
        return;
      }
      if (form.dateTo && value > form.dateTo) {
        alert("Date From cannot be after Date To");
        return;
      }
    }

    if (name === "dateTo") {
      if (value < form.dateFrom) {
        alert("Date To cannot be before Date From");
        return;
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/admin/addtask", form);

      if (res.data.success) {
        onSave(res.data.task);
        onClose();
      } else {
        alert("Error creating task");
      }

    } catch (error) {
      console.error("Error saving task:", error);
      alert("Server error while saving task");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h5>New Mother Task</h5>
        <form onSubmit={handleSubmit}>

          {/* Task Name */}
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

          {/* Description */}
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

          {/* Date From */}
          <div className="mb-2">
            <label>Date From</label>
            <input
              type="date"
              className="form-control"
              name="dateFrom"
              value={form.dateFrom}
              onChange={handleChange}
              min={today}             // ⬅ validation
              required
            />
          </div>

          {/* Date To */}
          <div className="mb-2">
            <label>Date To</label>
            <input
              type="date"
              className="form-control"
              name="dateTo"
              value={form.dateTo}
              onChange={handleChange}
              min={form.dateFrom || today} // ⬅ validation
              required
            />
          </div>

          {/* TIME FIELD */}
          <div className="mb-2">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>

          {/* Buttons */}
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

export default MotherTaskModal;
