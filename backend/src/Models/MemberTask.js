import mongoose from "mongoose";

const dailyAssignmentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  memberName: { type: String, required: true },
  status: { type: String, default: "Pending" }
});

const memberTaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },

  yesterdayAssignedMember: { type: String, default: "" },

  dailyAssignments: [dailyAssignmentSchema],

}, { timestamps: true });

export default mongoose.model("MemberTask", memberTaskSchema);
