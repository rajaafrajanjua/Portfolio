"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import AnimationLottie from "../../helper/animation-lottie";
import developmentAnimation from "../../../assets/lottie/development.json";

function AboutSection() {
  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "20+", label: "Projects Done" },
    { value: "10+", label: "Happy Clients" },
  ];

  return (
    <div id="about" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 text-sm font-medium tracking-widest uppercase">
            Get To Know
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
            About <span className="text-yellow-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-yellow-400/10 rounded-3xl blur-2xl" />
              <div className="relative bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6">
                <AnimationLottie animationPath={developmentAnimation} />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8">
              {personalData.description}
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
              {[
                { label: "Name", value: personalData.name },
                { label: "Email", value: personalData.email },
                { label: "Location", value: personalData.address },
                { label: "Available", value: "Freelance & Full-time" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ x: 5 }}
                  className="p-3 md:p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <p className="text-yellow-400 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-white text-xs sm:text-sm truncate">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-3 sm:p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 block">
                    {stat.value}
                  </span>
                  <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
