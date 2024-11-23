import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Test Controller
export const test = (req, res) => {
  return res.send("Hello From Test!");
};

// Sign-Up Controller
export const signupController = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;

    if (!username || !email || !password || !address || !phone) {
      return res.status(400).send({
        success: false,
        message: "All fields are required!",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send({
        success: false,
        message: "User already exists, please login.",
      });
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    await newUser.save();

    console.log("Saved user:", newUser);
    
    return res.status(201).send({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required!",
      });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT token
    const token = await jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "4d" }
    );

    const { password: pass, ...userDetails } = validUser._doc; // Destructure to remove password from the response

    res
      .cookie("X_TTMS_access_token", token, {
        httpOnly: true,
        maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days in milliseconds
      })
      .status(200)
      .send({
        success: true,
        message: "Login successful!",
        user: userDetails,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Logout Controller
export const logOutController = (req, res) => {
  try {
    res.clearCookie("X_TTMS_access_token");
    res.status(200).send({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).send({
      success: false,
      message: "Error occurred during logout.",
    });
  }
};
