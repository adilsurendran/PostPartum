function MemberTaskTab({ tasks, onDelete, onAssignTomorrow, onEdit, onView }) {
  return (
    <div>
      <h5 className="mb-3">Member – Cyclic Tasks</h5>
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Assigned to</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No cyclic tasks found.
              </td>
            </tr>
          )}

          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td>{task.startDate}</td>
              <td>{task.yesterdayAssignedMember || "Not assigned"}</td>
              <td>
                <button
    className="btn btn-sm btn-outline-info me-2"
    onClick={() => onView(task)}
  >
    View Details
  </button>
                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() => onAssignTomorrow(task)}
                >
                  Assign Tommorow Member
                </button>
                {/* <button className="btn btn-sm btn-outline-primary me-2">
                  Edit
                </button> */}
                {/* <button
  className="btn btn-sm btn-outline-primary me-2"
  onClick={() => onEdit(task)}
>
  Edit
</button> */}

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
export default MemberTaskTab;