function AssignMemberModal({ onClose, members, onAssignTomorrow }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h5>Assign Member for Tommorow</h5>
        <p>Select an available member:</p>
        <ul className="list-group mb-3">
          {members.map(m => (
            <li
              key={m._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {m.name}
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => onAssignTomorrow(m)}
              >
                Assign
              </button>
            </li>
          ))}
        </ul>

        <div className="d-flex justify-content-end">
          <button
            className="btn btn-sm btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignMemberModal;