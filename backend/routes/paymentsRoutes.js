import express from "express";
import {
  createCheckoutSession,
  verifySession,
  stripeWebhook,
} from "../controllers/paymentsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
router.get("/verify-session", verifySession);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router; 
