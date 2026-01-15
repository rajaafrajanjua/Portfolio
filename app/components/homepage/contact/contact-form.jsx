"use client";

import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { TbMailForward, TbUser, TbMail, TbMessage } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    focused: { scale: 1.02, borderColor: "rgba(251, 191, 36, 0.5)" },
    unfocused: { scale: 1, borderColor: "rgba(39, 39, 42, 1)" },
  };

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h3 className="text-2xl font-bold text-white mb-2">
          Send me a <span className="text-yellow-400">Message</span>
        </h3>
        <p className="text-gray-500 text-sm">
          Have a project in mind? Let&apos;s work together to bring your ideas to life.
        </p>
      </motion.div>

      <form onSubmit={handleSendMail} className="space-y-5">
        {/* Name Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Your Name
          </label>
          <motion.div
            variants={inputVariants}
            animate={focused === "name" ? "focused" : "unfocused"}
            className="relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <TbUser size={20} className={focused === "name" || userInput.name ? "text-yellow-400" : ""} />
            </div>
            <input
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 focus:bg-zinc-900 transition-all duration-300"
              type="text"
              placeholder="John Doe"
              maxLength="100"
              required
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onFocus={() => setFocused("name")}
              onBlur={() => {
                setFocused(null);
                checkRequired();
              }}
              value={userInput.name}
            />
          </motion.div>
        </motion.div>

        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Your Email
          </label>
          <motion.div
            variants={inputVariants}
            animate={focused === "email" ? "focused" : "unfocused"}
            className="relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <TbMail size={20} className={focused === "email" || userInput.email ? "text-yellow-400" : ""} />
            </div>
            <input
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 focus:bg-zinc-900 transition-all duration-300"
              type="email"
              placeholder="john@example.com"
              maxLength="100"
              required
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onFocus={() => setFocused("email")}
              onBlur={() => {
                setFocused(null);
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
          </motion.div>
          {error.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 mt-2 flex items-center gap-1"
            >
              <span className="w-1 h-1 bg-red-400 rounded-full" />
              Please provide a valid email!
            </motion.p>
          )}
        </motion.div>

        {/* Message Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Your Message
          </label>
          <motion.div
            variants={inputVariants}
            animate={focused === "message" ? "focused" : "unfocused"}
            className="relative"
          >
            <div className="absolute left-4 top-4 text-gray-500">
              <TbMessage size={20} className={focused === "message" || userInput.message ? "text-yellow-400" : ""} />
            </div>
            <textarea
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 focus:bg-zinc-900 transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
              maxLength="500"
              required
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onFocus={() => setFocused("message")}
              onBlur={() => {
                setFocused(null);
                checkRequired();
              }}
              rows="5"
              value={userInput.message}
            />
          </motion.div>
          <p className="text-xs text-gray-600 mt-2 text-right">
            {userInput.message.length}/500
          </p>
        </motion.div>

        {/* Error Message */}
        {error.required && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-red-400 text-center py-2 px-4 bg-red-400/10 rounded-lg border border-red-400/20"
          >
            All fields are required!
          </motion.p>
        )}

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(251, 191, 36, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-yellow-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <TbMailForward size={22} />
                </motion.span>
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
}

export default ContactForm;
