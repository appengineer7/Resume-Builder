import React from "react";
import { motion } from "framer-motion";
import { XCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleGoToBuilder = () => {
    navigate("/builder");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <XCircle className="w-12 h-12 text-red-600" />
        </motion.div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 mb-6">
            No worries! Your payment was cancelled. You can try again anytime.
          </p>
        </div>

        <motion.button
          onClick={handleGoToBuilder}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          Back to Resume Builder
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;