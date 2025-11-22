
import LOGIN from "../Models/login.js";
import MOTHER from "../Models/mother.js";
import bcrypt from "bcrypt";
import MotherTask from "../Models/MotherTask.js";

export const registerMother = async (req, res) => {
  try {
    const {
      name,
      age,
      height,
      weight,
      deliveryType,
      deliveryDate,
      address,
      emergencyContactName,
      emergencyContactPhone,
      phoneNo,
      email,
      password,
    } = req.body;

    // 1️⃣ Check if email or phone already exists
    const existingMother = await MOTHER.findOne({
      $or: [{ email }, { phoneNo }],
    });

    if (existingMother) {
      return res.status(400).json({
        message: "Mother with given email or phone already exists.",
      });
    }

    // 2️⃣ Check if login exists
    const existingLogin = await LOGIN.findOne({ username: email });
    if (existingLogin) {
      return res.status(400).json({
        message: "Login with this email already exists.",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create Login record
    const login = new LOGIN({
      username: email,
      password: hashedPassword,
      role: "mother",
    });
    await login.save(); 

    const loginId = login._id


    // 5️⃣ Create Mother record
    const mother = new MOTHER({
      name,
      age,
      height,
      weight,
      deliveryType,
      deliveryDate,
      address,
      emergencyContactName,
      emergencyContactPhone,
      phoneNo,
      email,
      password: hashedPassword, // store hashed password 
      commonKey: loginId
    });

    await mother.save();

    res.status(201).json({
      message: "Mother registered successfully!",
      mother,
    });

  } catch (error) {
    console.error("Mother registration error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



export const getTodayTasks = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const tasks = await MotherTask.find({
      dateFrom: { $lte: today },
      dateTo: { $gte: today }
    });

    res.json({ success: true, tasks });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// UPDATE MOTHER TASK - Today's status
export const updateTodayStatus = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await MotherTask.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    const today = new Date().toISOString().slice(0, 10);

    // Update statusToday
    task.statusToday = "Completed";

    // Also update dailyStatus array
    const dayEntry = task.dailyStatus.find(d => d.date === today);
    if (dayEntry) {
      dayEntry.status = "Completed";
    }

    await task.save();

    res.json({ success: true, message: "Task Updated", task });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
