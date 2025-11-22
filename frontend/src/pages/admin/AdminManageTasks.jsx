import React, { useState } from "react";
import MotherTaskTab from "./components/MotherTaskTab";
import MemberTaskTab from "./components/MemberTaskTab";
import MotherTaskModal from "./components/MotherTaskModal";
import MemberTaskModal from "./components/MemberTaskModal";
import AssignMemberModal from "./components/AssignMemberModal";
import EditMemberTaskModal from "./components/EditMemberTaskModal";
import EditMotherTaskModal from "./components/EditMotherTaskModal";
import { useEffect } from "react";
import axios from "axios";
import ViewMotherTaskStatusModal from "./components/ViewMotherTaskStatusModal";
import ViewMemberTaskDetailsModal from "./components/ViewMemberTaskDetailsModal";

// Mother & Member tabs are separate components:
function AdminManageTasks() {
  const [activeTab, setActiveTab] = useState("mother"); // 'mother' | 'member'
  const [showMotherModal, setShowMotherModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMemberTask, setSelectedMemberTask] = useState(null);

  const [editTask, setEditTask] = useState(null);   // holds task being edited
const [editType, setEditType] = useState(null);   // "mother" or "member"

const [viewStatusTask, setViewStatusTask] = useState(null);
const [viewMemberTask, setViewMemberTask] = useState(null);




  // 🔹 Mother tasks (dummy, but structured like backend data)
  const [motherTasks, setMotherTasks] = useState([]);

useEffect(() => {
  loadMotherTasks();
}, []);

const loadMotherTasks = async () => {
  try {
    const res = await axios.get("http://localhost:8000/admin/get-mother-tasks");

    if (res.data.success) {
      setMotherTasks(res.data.tasks);
    }

  } catch (error) {
    console.error("Error loading mother tasks:", error);
  }
};


  // 🔹 Member cyclic tasks
  const [memberTasks, setMemberTasks] = useState([]);
  useEffect(() => {
  loadMemberTasks();
}, []);

const loadMemberTasks = async () => {
  try {
    const res = await axios.get("http://localhost:8000/admin/get-member-tasks");
    // console.log(res);
    

    if (res.data.success) {
      setMemberTasks(res.data.tasks);
    }

  } catch (error) {
    console.error("Error loading member tasks:", error);
  }
};



  // 🔹 Dummy available members (for Assign modal)
const [availableMembers, setAvailableMembers] = useState([]);

useEffect(() => {
  loadAvailableMembers();
}, []);


const loadAvailableMembers = async () => {
  try {
    const res = await axios.get("http://localhost:8000/admin/available-members");

    if (res.data.success) {
      setAvailableMembers(res.data.members);
    }

  } catch (error) {
    console.error("Error loading available members:", error);
  }
};

  // ----- Mother Task handlers -----
  const handleAddMotherTask = (task) => {
    // TODO: call backend POST /api/admin/mother-tasks
    // setMotherTasks(prev => [...prev, { ...task, _id: Date.now().toString() }]);
    loadMotherTasks();
    setShowMotherModal(false);
  };

  // const handleDeleteMotherTask = (id) => {
  //   // TODO: call backend DELETE /api/admin/mother-tasks/:id
  //   setMotherTasks(prev => prev.filter(t => t._id !== id));
  // };
  const handleDeleteMotherTask = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8000/admin/delete-mother-task/${id}`);

    if (res.data.success) {
      // Remove from UI
      setMotherTasks(prev => prev.filter(t => t._id !== id));
    } else {
      alert("Failed to delete task");
    }

  } catch (error) {
    console.error("Delete error:", error);
    alert("Server error while deleting");
  }
};


  // ----- Member Task handlers -----
  // const handleAddMemberTask = (task) => {
  //   // TODO: backend POST /api/admin/member-tasks
  //   setMemberTasks(prev => [...prev, { ...task, _id: Date.now().toString() }]);
  //   setShowMemberModal(false);
  // };
//   const handleAddMemberTask = (taskFromDB) => {
//   setMemberTasks(prev => [...prev, taskFromDB]);   // use real DB data
//   setShowMemberModal(false);
// };

const handleAddMemberTask = () => {
  loadMemberTasks();
  setShowMemberModal(false);
};

  // const handleDeleteMemberTask = (id) => {
  //   // TODO: backend DELETE /api/admin/member-tasks/:id
  //   setMemberTasks(prev => prev.filter(t => t._id !== id));
  // };

  const handleDeleteMemberTask = async (id) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/admin/delete-member-task/${id}`
    );

    if (res.data.success) {
      setMemberTasks(prev => prev.filter(t => t._id !== id)); // Remove from UI
    } else {
      alert("Failed to delete member task");
    }

  } catch (error) {
    console.error("Delete error:", error);
    alert("Server error while deleting task");
  }
};


  const handleOpenAssignMember = (task) => {
    setSelectedMemberTask(task);
    setShowAssignModal(true);
  };

  // const handleAssignMemberToday = (member) => {
  //   if (!selectedMemberTask) return;

  //   // TODO: backend PATCH /api/admin/member-tasks/:id/assign
  //   setMemberTasks(prev =>
  //     prev.map(t => {
  //       if (t._id !== selectedMemberTask._id) return t;
  //       const today = new Date().toISOString().slice(0, 10);
  //       const updatedAssignments = [
  //         ...t.dailyAssignments,
  //         { date: today, memberName: member.name, status: "Pending" },
  //       ];
  //       return {
  //         ...t,
  //         dailyAssignments: updatedAssignments,
  //         yesterdayAssignedMember: member.name, // simple dummy update
  //       };
  //     })
  //   );

  //   setShowAssignModal(false);
  //   setSelectedMemberTask(null);
  // };
// const handleAssignMemberToday = async (member) => {
//   if (!selectedMemberTask) return;

//   try {
//     const res = await axios.patch(
//       `http://localhost:8000/admin/assign-member-today/${selectedMemberTask._id}`,
//       { memberName: member.name }
//     );

//     if (res.data.success) {
//       // Update UI using returned task
//       setMemberTasks(prev =>
//         prev.map(t => (t._id === res.data.task._id ? res.data.task : t))
//       );
//     } else {
//       alert("Failed to assign member");
//     }

//   } catch (error) {
//     console.error("Assign error:", error);
//     alert("Server error assigning member");
//   }

//   setShowAssignModal(false);
//   setSelectedMemberTask(null);
// };
const handleAssignMemberTomorrow = async (member) => {
  if (!selectedMemberTask) return;

  try {
    const res = await axios.patch(
      `http://localhost:8000/admin/assign-member-tomorrow/${selectedMemberTask._id}`,
      { memberName: member.name }
    );

    if (res.data.success) {
      setMemberTasks(prev =>
        prev.map(t => (t._id === res.data.task._id ? res.data.task : t))
      );
    } else {
      alert("Failed to assign member");
    }

  } catch (error) {
    console.error("Assign error:", error);
    alert("Server error assigning member");
  }

  setShowAssignModal(false);
  setSelectedMemberTask(null);
};


  return (
    <div className="content-box">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Add & Manage Tasks</h3>

        {/* Add Task Button changes based on active tab */}
        {activeTab === "mother" ? (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowMotherModal(true)}
          >
            + Add Mother Task
          </button>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowMemberModal(true)}
          >
            + Add Member Task
          </button>
        )}
      </div>

      {/* Toggle bar tabs */}
      <div className="tab-bar mb-3">
        <button
          className={`tab-btn ${activeTab === "mother" ? "active" : ""}`}
          onClick={() => setActiveTab("mother")}
        >
          Mother Tasks
        </button>
        <button
          className={`tab-btn ${activeTab === "member" ? "active" : ""}`}
          onClick={() => setActiveTab("member")}
        >
          Member Tasks
        </button>
      </div>

      

      {/* Tab Content */}
      {activeTab === "mother" ? (
//         <MotherTaskTab
//   tasks={motherTasks}
//   onDelete={handleDeleteMotherTask}
//   onEdit={(task) => {
//     setEditType("mother");
//     setEditTask(task);
//   }}
// />
<MotherTaskTab
  tasks={motherTasks}
  onDelete={handleDeleteMotherTask}
  onEdit={(task) => { setEditType("mother"); setEditTask(task); }}
  onViewStatus={(task) => setViewStatusTask(task)}
/>

      ) : (
      <MemberTaskTab
  tasks={memberTasks}
  onDelete={handleDeleteMemberTask}
  onEdit={(task) => {
    setEditType("member");
    setEditTask(task);
  }}
  onAssignTomorrow={handleOpenAssignMember}
  onView={(task) => setViewMemberTask(task)} 
/>
      )}

      {/* Modals */}
      {showMotherModal && (
        <MotherTaskModal
          onClose={() => setShowMotherModal(false)}
          onSave={handleAddMotherTask}
        />
      )}

      {showMemberModal && (
        <MemberTaskModal
          onClose={() => setShowMemberModal(false)}
          onSave={handleAddMemberTask}
        />
      )}

      {showAssignModal && (
        <AssignMemberModal
          onClose={() => setShowAssignModal(false)}
          members={availableMembers}
          // onAssign={handleAssignMemberToday}
          onAssignTomorrow={handleAssignMemberTomorrow}

        />
      )}

      {viewStatusTask && (
  <ViewMotherTaskStatusModal
    task={viewStatusTask}
    onClose={() => setViewStatusTask(null)}
  />
)}

{viewMemberTask && (
  <ViewMemberTaskDetailsModal
    task={viewMemberTask}
    onClose={() => setViewMemberTask(null)}
  />
)}



      {editTask && editType === "mother" && (
  // <EditMotherTaskModal
  //   task={editTask}
  //   onClose={() => setEditTask(null)}
  //   onSave={(updatedTask) => {
  //     setMotherTasks(prev =>
  //       prev.map(t => (t._id === updatedTask._id ? updatedTask : t))
  //     );
  //     setEditTask(null);
  //   }}
  // />
  <EditMotherTaskModal
  task={editTask}
  onClose={() => setEditTask(null)}
  onSave={async (updatedTask) => {

    try {
      const res = await axios.put(
        `http://localhost:8000/admin/update-mother-task/${updatedTask._id}`,
        updatedTask
      );

      if (res.data.success) {
        // Refresh full list from DB
        await loadMotherTasks();

        setEditTask(null);
      } else {
        alert("Failed to update task");
      }

    } catch (error) {
      console.error("Update error:", error);
      alert("Server error while updating");
    }
  }}
/>

)}

{editTask && editType === "member" && (
  <EditMemberTaskModal
    task={editTask}
    onClose={() => setEditTask(null)}
    onSave={(updatedTask) => {
      setMemberTasks(prev =>
        prev.map(t => (t._id === updatedTask._id ? updatedTask : t))
      );
      setEditTask(null);
    }}
  />
)}

    </div>
  );
}

export default AdminManageTasks;