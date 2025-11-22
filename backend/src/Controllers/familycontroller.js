import LOGIN from "../Models/login.js";
import bcrypt from "bcrypt";
import MEMBER from "../Models/member.js";

export const registerMember = async (req, res) => {
  try {
    const {
      name,
      phoneNo,
      relationship,
      email,
      password
    } = req.body;

    // 1️⃣ Check if email or phone already exists in Mother/Member collection
    const existingMember = await MEMBER.findOne({
      $or: [{ email }, { phoneNo }],
    });

    if (existingMember) {
      return res.status(400).json({
        message: "Member with given email or phone already exists.",
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
      role: "member",  // DIFFERENT ROLE
    });
    await login.save();

    const loginId = login._id;

    // 5️⃣ Create Member record
    const member = new MEMBER({
      name,
      phoneNo,
      relationship,
      email,
      password: hashedPassword,
      commonKey: loginId
    });

    await member.save();

    res.status(201).json({
      success: true,
      message: "Family member registered successfully!",
      member,
    });

  } catch (error) {
    console.error("Member registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
3