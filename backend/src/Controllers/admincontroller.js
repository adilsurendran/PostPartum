import MEMBER from "../Models/member.js";
import MemberTask from "../Models/MemberTask.js";
import MotherTask from "../Models/MotherTask.js";

// Single function definition - remove the duplicate
function generateDailyStatus(from, to) {
  const dates = [];
  let start = new Date(from);
  const end = new Date(to);

  while (start <= end) {
    const formatted = start.toISOString().split("T")[0];
    dates.push({ date: formatted, status: "Pending" });
    start.setDate(start.getDate() + 1);
  }
  return dates;
}

export const addMotherTask = async (req, res) => {
  try {
    const { taskName, description, dateFrom, dateTo, time } = req.body;

    const dailyStatus = generateDailyStatus(dateFrom, dateTo);

    const newTask = new MotherTask({
      taskName,
      description,
      dateFrom,
      dateTo,
      time,
      dailyStatus,
      statusToday: "Pending",
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Mother task created successfully",
      task: newTask,
    });

  } catch (error) {
    console.error("Error adding mother task:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// GET ALL MOTHER TASKS
export const getMotherTasks = async (req, res) => {
  try {
    const tasks = await MotherTask.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {
    console.error("Error fetching mother tasks:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching tasks",
    });
  }
};

export const updateMotherTask = async (req, res) => {
  console.log(req);
  
  try {
    const { id } = req.params;
    const { taskName, description, dateFrom, dateTo, time } = req.body;

    let dailyStatus = undefined; 

    // If date range changed → rebuild dailyStatus array
    if (dateFrom && dateTo) {
      dailyStatus = generateDailyStatus(dateFrom, dateTo);
    }

    const updatedTask = await MotherTask.findByIdAndUpdate(
      id,
      {
        taskName,
        description,
        dateFrom,
        dateTo,
        time,
        ...(dailyStatus && { dailyStatus }) // only update if changed
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Mother task updated successfully",
      task: updatedTask
    });

  } catch (error) {
    console.error("Error updating mother task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating task"
    });
  }
};


export const deleteMotherTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await MotherTask.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mother task deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting task"
    });
  }
};


export const addMemberTask = async (req, res) => {
  try {
    const { taskName, description, startDate, assignedMember } = req.body;

    if (!taskName || !description || !startDate || !assignedMember) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including assignedMember",
      });
    }

    const today = new Date().toISOString().slice(0, 10);

    const newTask = new MemberTask({
      taskName,
      description,
      startDate,
      yesterdayAssignedMember: assignedMember,   // ⬅ ADD THIS
      dailyAssignments: [
        {
          date: today,
          memberName: assignedMember,
          status: "Pending",
        }
      ]
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Member task created successfully",
      task: newTask
    });

  } catch (error) {
    console.error("Add member task error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating task",
    });
  }
};

export const getMemberTasks = async (req, res) => {
  try {
    const tasks = await MemberTask.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {
    console.error("Get member tasks error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching member tasks",
    });
  }
};


export const getAvailableMembers = async (req, res) => {
  try {
    const members = await MEMBER.find({ isAvailable: true });

    res.status(200).json({
      success: true,
      members
    });

  } catch (error) {
    console.error("Get available members error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching members"
    });
  }
};


export const assignMemberTomorrow = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { memberName } = req.body;

    if (!memberName) {
      return res.status(400).json({
        success: false,
        message: "memberName is required",
      });
    }

    // ------ Calculate TOMORROW ------
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tomorrowDateStr = tomorrow.toISOString().slice(0, 10);

    // ------ Find the task first ------
    const task = await MemberTask.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // ------ CHECK IF TOMORROW ALREADY ASSIGNED ------
    const alreadyAssigned = task.dailyAssignments.some(
      (a) => a.date === tomorrowDateStr
    );

    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: "Task already assigned to a member for tomorrow",
      });
    }

    // ------ NOW Add Tomorrow Assignment ------
    task.dailyAssignments.push({
      date: tomorrowDateStr,
      memberName,
      status: "Pending",
    });

    task.yesterdayAssignedMember = memberName;

    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      message: "Member assigned for tomorrow",
      task: updatedTask,
    });

  } catch (error) {
    console.error("Assign tomorrow error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error assigning member",
    });
  }
};


export const deleteMemberTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await MemberTask.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Member task deleted successfully",
      task: deletedTask,
    });

  } catch (error) {
    console.error("Delete member task error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting member task",
    });
  }
};
