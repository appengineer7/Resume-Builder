import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already in use",
        statusCode: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isPremium: process.env.TEST_PREMIUM_MODE === 'true',
      premiumExpiresAt: process.env.TEST_PREMIUM_MODE === 'true' ? new Date(Date.now() + 30*24*60*60*1000) : undefined,
    });

    res.status(200).json({
      status: "success",
      message: "Signup successfully!...",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPremium: user.isPremium,
        premiumExpiresAt: user.premiumExpiresAt,
      },
    });
  } catch (error) {
    console.error("User SignUp Failed", error);
    res.status(500).json({
      status: "error",
      message: "Signup failed",
      error: error.message,
      statusCode: 500,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPremium: user.isPremium,
      },
      statusCode: 200,
    });
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({
      status: "error",
      message: "Login failed",
      error: error.message,
      statusCode: 500,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Email is required",
        statusCode: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Email not registered",
        statusCode: 404,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Resume Builder <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Hello ${user.name},</p>
             <p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>This link will expire in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    // console.log(`Password reset link would be sent to: ${email}`);
    res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email!.",
    });
  } catch (error) {
    console.error("Forgot Password Error: ", error);
    res.status(500).json({
      status: "error",
      message: "Failed to process request",
      error: error.message,
      statusCode: 500,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params; 

    if (!token || !newPassword) {
      return res.status(400).json({
        status: "error",
        message: "Token and new password are required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        statusCode: 404,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password reset successfully!...",
    });
  } catch (error) {
    console.error("Reset Password Error: ", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to reset password",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ status: "success", message: "Logged out successfully", statusCode: 200 });
  } catch (error) {
    console.error("Logout Error: ", error);
    return res.status(500).json({
      status: "error",
      message: "Logout failed",
      error: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "No token provided",
        statusCode: 401,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password, includes isPremium

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        statusCode: 404,
      });
    }

    const now = new Date();
    const hasActivePremium =
      user.isPremium && user.premiumExpiresAt && now < user.premiumExpiresAt;
    if (!hasActivePremium && user.isPremium) {
      user.isPremium = false;
      await user.save();
    }

    res.status(200).json({
      status: "success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPremium: hasActivePremium,
        premiumExpiresAt: user.premiumExpiresAt,
      },
      statusCode: 200,
    });
  } catch (error) {
    console.error("Get Current User Error: ", error);
    res.status(401).json({
      status: "error",
      message: "Invalid or expired token",
      error: error.message,
      statusCode: 401,
    });
  }
};


export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
  getCurrentUser
};