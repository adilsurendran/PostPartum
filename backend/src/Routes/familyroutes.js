import express from "express";
import { registerMember } from "../Controllers/familycontroller.js";

const familyroutes = express.Router()

familyroutes.post("/register", registerMember)

export default familyroutes;