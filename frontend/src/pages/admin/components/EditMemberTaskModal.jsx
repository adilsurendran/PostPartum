import React, { useState } from "react";

function EditMemberTaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState({
    taskName: task.taskName,
    description: task.description,
    startDate: task.startDate
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      ...form
    };

    onSave(updatedTask);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h5>Edit Member Task</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Task Name</label>
            <input
              className="form-control"
              name="taskName"
              value={form.taskName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={form.startDate}
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

export default EditMemberTaskModal;
