"use client";

import { educations } from "@/utils/data/educations";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import AnimationLottie from "../../helper/animation-lottie";
import studyAnimation from "../../../assets/lottie/study.json";

function Education() {
  return (
    <div id="education" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-yellow-400/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-yellow-400/5 rounded-full"
      />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 text-sm font-medium tracking-widest uppercase">
            Academic Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
            My <span className="text-yellow-400">Education</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-4 bg-yellow-400/5 rounded-3xl blur-2xl"
              />
              <AnimationLottie animationPath={studyAnimation} />
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-yellow-400/50 to-transparent" />
              
              {educations.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative pl-10 pb-10 last:pb-0"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                    className="absolute left-0 top-1 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/30"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="w-2 h-2 rounded-full bg-black"
                    />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 10, borderColor: "rgba(251,191,36,0.5)" }}
                    className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm transition-all duration-300 group"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="inline-block px-4 py-1.5 text-xs font-semibold text-yellow-400 bg-yellow-400/10 rounded-full mb-4 border border-yellow-400/20"
                    >
                      {edu.duration}
                    </motion.span>
                    
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 rounded-xl bg-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300"
                      >
                        <FaGraduationCap size={24} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                          {edu.title}
                        </h3>
                        <p className="text-gray-400">{edu.institution}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
