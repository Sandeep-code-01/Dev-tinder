const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");

const {
  validateSignUpData,
  validateEditProfileData,
} = require("./utils/validate");

const app = express();

app.use(express.json());


// ==================== SIGNUP ====================

app.post("/signup", async (req, res) => {
  try {
    // Validate signup data
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


// ==================== UPDATE USER ====================

app.patch("/user", async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).json({
        message: "Email query parameter is required",
      });
    }

    // Validate PATCH data
    validateEditProfileData(req);

    // Find user
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update first name
    if (req.body.firstName !== undefined) {
      user.firstName = req.body.firstName;
    }

    // Update last name
    if (req.body.lastName !== undefined) {
      user.lastName = req.body.lastName;
    }

    // Update password with hashing
    if (req.body.password !== undefined) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


// ==================== DATABASE CONNECTION ====================

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });