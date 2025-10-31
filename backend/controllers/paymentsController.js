import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const { amount = 19900, currency = "inr" } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: "Premium Resume Export (PDF/PNG/Print)" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "premium_export",
        userId: user.id,
      },
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const verifySession = async (req, res) => {
  const { session_id } = req.query;
  if (!session_id) return res.status(400).json({ error: "Missing session_id" });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.json({ paid: false, isPremium: false });
    }

    const userId = session.metadata?.userId;
    if (!userId || session.metadata?.type !== "premium_export") {
      return res.json({ paid: true, isPremium: false });
    }

    const expiryTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days expire plan 2 * 60 * 1000
    const user = await User.findByIdAndUpdate(
      userId,
      { isPremium: true, premiumExpiresAt: expiryTime },
      { new: true }
    ).select("isPremium premiumExpiresAt");

    res.json({
      paid: true,
      isPremium: user.isPremium,
      expiresAt: user.premiumExpiresAt,
    });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.metadata?.type === "premium_export" && session.metadata?.userId) {
      await User.findByIdAndUpdate(session.metadata.userId, { isPremium: true });
    }
  }

  res.json({ received: true });
};