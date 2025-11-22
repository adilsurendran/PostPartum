function MotherTaskTab({ tasks, onDelete, onEdit, onViewStatus }) {
  return (
    <div>
      <h5 className="mb-3">Mother – Current Tasks</h5>
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Time</th>
            <th>Status Today</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No tasks found.
              </td>
            </tr>
          )}

          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td>{task.dateFrom}</td>
              <td>{task.dateTo}</td>
              <td>{task.time}</td>
              <td>{task.statusToday || "Pending"}</td>
              <td>
                {/* <button className="btn btn-sm btn-outline-secondary me-2">
                  View Status
                </button> */}
                <button
  className="btn btn-sm btn-outline-secondary me-2"
  onClick={() => onViewStatus(task)}
>
  View Status
</button>

                {/* <button className="btn btn-sm btn-outline-primary me-2">
                  Edit
                </button> */}

                <button
  className="btn btn-sm btn-outline-primary me-2"
  onClick={() => onEdit(task)}
>
  Edit
</button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MotherTaskTab;