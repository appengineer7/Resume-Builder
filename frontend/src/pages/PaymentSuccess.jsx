import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Download, Save, Printer } from "lucide-react";
import { toast } from "react-toastify";
import { verifySession, getCurrentUser } from "../services/api.js";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const handleVerification = async () => {
      if (!sessionId) {
        toast.error("Invalid payment session. Please try again.");
        navigate("/builder");
        return;
      }

      try {
        const verifyRes = await verifySession(sessionId);
        if (verifyRes.paid && verifyRes.isPremium) {
          const userRes = await getCurrentUser();
          if (userRes.data?.isPremium) {
            setIsPremium(true);
            toast.success("Payment successful! You've unlocked premium exports.", {
              position: "top-right",
              autoClose: 4000,
              theme: "colored",
            });
          } else {
            toast.warning("Payment verified, but premium status update failed. Please refresh.", {
              position: "top-right",
              autoClose: 4000,
              theme: "colored",
            });
          }
        } else {
          toast.error("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(`Verification error: ${error.message}`);
      } finally {
        setIsVerifying(false);
      }
    };

    handleVerification();
  }, [sessionId, navigate]);

  const handleGoToBuilder = () => {
    navigate("/builder");
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            Verifying Payment...
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your premium access has been activated. You can now download high-quality PDF, PNG, and print your resume.
          </p>
        </div>

        {isPremium && (
          <motion.div
            className="space-y-3 p-4 bg-green-50 rounded-2xl border border-green-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm font-medium text-green-800 flex items-center justify-center gap-2">
              ✅ Premium Unlocked
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs text-green-700">
              <div className="flex flex-col items-center">
                <Download size={12} />
                <span>PDF Export</span>
              </div>
              <div className="flex flex-col items-center">
                <Save size={12} />
                <span>PNG Export</span>
              </div>
              <div className="flex flex-col items-center">
                <Printer size={12} />
                <span>Print</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={handleGoToBuilder}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          Go to Resume Builder
          <ArrowRight size={18} />
        </motion.button>

        <p className="text-xs text-gray-500">
          Redirecting in 5 seconds... or click above to continue.
        </p>
      </motion.div>

      {/* Auto-redirect after 5 seconds */}
      {isPremium && !isVerifying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          onAnimationComplete={() => handleGoToBuilder()}
        />
      )}
    </div>
  );
};

export default PaymentSuccess;