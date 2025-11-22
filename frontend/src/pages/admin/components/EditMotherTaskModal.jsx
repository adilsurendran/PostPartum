

// import React, { useState } from "react";

// function EditMotherTaskModal({ task, onClose, onSave }) {
//   const [form, setForm] = useState({
//     taskName: task.taskName,
//     description: task.description,
//     dateFrom: task.dateFrom,
//     dateTo: task.dateTo,
//     time: task.time   // <-- NEW TIME FIELD
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedTask = {
//       ...task,
//       ...form, // includes time, dateFrom, dateTo, etc.
//     };

//     onSave(updatedTask);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <h5>Edit Mother Task</h5>

//         <form onSubmit={handleSubmit}>
//           {/* Task Name */}
//           <div className="mb-2">
//             <label>Task Name</label>
//             <input
//               className="form-control"
//               name="taskName"
//               value={form.taskName}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Description */}
//           <div className="mb-2">
//             <label>Description</label>
//             <textarea
//               className="form-control"
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Date From */}
//           <div className="mb-2">
//             <label>Date From</label>
//             <input
//               type="date"
//               className="form-control"
//               name="dateFrom"
//               value={form.dateFrom}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Date To */}
//           <div className="mb-2">
//             <label>Date To</label>
//             <input
//               type="date"
//               className="form-control"
//               name="dateTo"
//               value={form.dateTo}
//               onChange={handleChange}
//             />
//           </div>

//           {/* TIME FIELD */}
//           <div className="mb-2">
//             <label>Time</label>
//             <input
//               type="time"
//               className="form-control"
//               name="time"
//               value={form.time}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="d-flex justify-content-end mt-3">
//             <button
//               type="button"
//               className="btn btn-sm btn-secondary me-2"
//               onClick={onClose}
//             >
//               Cancel
//             </button>

//             <button type="submit" className="btn btn-sm btn-primary">
//               Save Changes
//             </button>
//           </div>
//         </form>

//       </div>
//     </div>
//   );
// }

// export default EditMotherTaskModal;


import React, { useState } from "react";

function EditMotherTaskModal({ task, onClose, onSave }) {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    taskName: task.taskName,
    description: task.description,
    dateFrom: task.dateFrom,
    dateTo: task.dateTo,
    time: task.time
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // VALIDATION
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

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, ...form });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h5>Edit Mother Task</h5>
        <form onSubmit={handleSubmit}>

          <div className="mb-2">
            <label>Task Name</label>
            <input className="form-control" name="taskName" value={form.taskName} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label>Description</label>
            <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label>Date From</label>
            <input
              type="date"
              className="form-control"
              name="dateFrom"
              value={form.dateFrom}
              onChange={handleChange}
              min={today}
            />
          </div>

          <div className="mb-2">
            <label>Date To</label>
            <input
              type="date"
              className="form-control"
              name="dateTo"
              value={form.dateTo}
              onChange={handleChange}
              min={form.dateFrom || today}
            />
          </div>

          <div className="mb-2">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={form.time}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button type="button" className="btn btn-sm btn-secondary me-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditMotherTaskModal;
