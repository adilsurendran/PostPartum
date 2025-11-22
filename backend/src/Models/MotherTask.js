import mongoose from "mongoose";

const dailyStatusSchema = new mongoose.Schema({
  date: { type: String, required: true },
  status: { type: String, default: "Pending" } // Pending | Completed
});

const motherTaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String, required: true },
  dateFrom: { type: String, required: true },
  dateTo: { type: String, required: true },
  time: { type: String, required: true },
  dailyStatus: [dailyStatusSchema],   // Array of dates from-to
  statusToday: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model("MotherTask", motherTaskSchema);
