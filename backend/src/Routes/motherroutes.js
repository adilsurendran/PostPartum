import express from "express"
import { getTodayTasks, registerMother, updateTodayStatus } from "../Controllers/mothercontroller.js";

const motherroutes = express.Router()

motherroutes.post("/register",registerMother)
motherroutes.get("/today-tasks",getTodayTasks)
motherroutes.patch("/update-today-status/:taskId",updateTodayStatus)

export default motherroutes;