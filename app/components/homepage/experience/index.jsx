"use client";

import { experiences } from "@/utils/data/experience";
import { motion } from "framer-motion";
import { BsBriefcase } from "react-icons/bs";
import AnimationLottie from "../../helper/animation-lottie";
import codeAnimation from "../../../assets/lottie/code.json";

function Experience() {
  return (
    <div id="experience" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 text-sm font-medium tracking-widest uppercase">
            Career Path
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
            Work <span className="text-yellow-400">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Timeline */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-yellow-400/50 to-transparent" />
              
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
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
                      {exp.duration}
                    </motion.span>
                    
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 rounded-xl bg-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300"
                      >
                        <BsBriefcase size={24} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-gray-400">{exp.company}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -inset-4 bg-yellow-400/5 rounded-3xl blur-2xl"
              />
              <AnimationLottie animationPath={codeAnimation} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
