import LOGIN from "../Models/login.js";
import MEMBER from "../Models/member.js";
import MOTHER from "../Models/mother.js";
// import FAMILY from "../Models/family.js";  // only if you have family members
import bcrypt from "bcrypt";

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Check login exists
    const loginUser = await LOGIN.findOne({ username });

    if (!loginUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // 3️⃣ Successful → Return role & user details
    let fullDetails = null;
    let status = true; // default for mother/admin

    if (loginUser.role === "mother") {
      fullDetails = await MOTHER.findOne({ email: username });

    } 
    else if (loginUser.role === "member") {
      // Optional: For family role
      fullDetails = await MEMBER.findOne({ email: username });

      // If you need status check:
      status = fullDetails?.status || false;
    }

    // 4️⃣ Send response
    res.json({
      success: true,
      role: loginUser.role,
      status,
      fulldetails: fullDetails,
      message: "Login successful",
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
