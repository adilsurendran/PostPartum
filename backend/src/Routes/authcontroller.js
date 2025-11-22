import express from "express";
import { loginController } from "../Controllers/authcontroller.js";

const authrouter = express.Router();

authrouter.post("/",loginController)

export default authrouter;