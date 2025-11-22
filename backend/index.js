// import mongoose from "mongoose";
// import express from "express";
// import cors from "cors";



// mongoose.connect("mongodb://localhost:27017/PostPartum")
// .then(()=>{
//     console.log("Database Connected");
// })
// .catch((e)=>{
//     console.log(e); 
// })

// const app = express()
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({origin:"*"}))
// app.listen(8000,()=>{console.log("Server Started running port 8000");
// })

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import motherroutes from "./src/Routes/motherroutes.js";
import authrouter from "./src/Routes/authcontroller.js";
import familyroutes from "./src/Routes/familyroutes.js";
import adminrouter from "./src/Routes/adminroutes.js";

dotenv.config();

connectDB(); 

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}))

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/mother", motherroutes)
app.use("/member", familyroutes)
app.use("/login", authrouter)
app.use("/admin", adminrouter)