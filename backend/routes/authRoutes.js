import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

router.use(authMiddleware);

router.post("/logout", authController.logout);
router.get("/current-user", authController.getCurrentUser);
router.get("/me", authController.getCurrentUser);

export default router;