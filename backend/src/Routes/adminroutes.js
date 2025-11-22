import express from "express";
import { addMemberTask, addMotherTask, assignMemberTomorrow, deleteMemberTask, deleteMotherTask, getAvailableMembers, getMemberTasks, getMotherTasks, updateMotherTask } from "../Controllers/admincontroller.js";

const adminrouter = express.Router();

adminrouter.post("/addtask", addMotherTask)
adminrouter.get("/get-mother-tasks", getMotherTasks);
adminrouter.put("/update-mother-task/:id", updateMotherTask);
adminrouter.delete("/delete-mother-task/:id", deleteMotherTask);
adminrouter.post("/add-member-task", addMemberTask);
adminrouter.get("/get-member-tasks", getMemberTasks);
adminrouter.get("/available-members", getAvailableMembers);
// adminrouter.patch("/assign-member-today/:taskId", assignMemberToday);
adminrouter.patch("/assign-member-tomorrow/:taskId", assignMemberTomorrow);
adminrouter.delete("/delete-member-task/:id", deleteMemberTask);





export default adminrouter;