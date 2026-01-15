"use client";

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// Categorize skills
const skillCategories = {
  "Frontend": ["HTML", "CSS", "Javascript", "Typescript", "React", "Bootstrap", "MaterialUI"],
  "Mobile": ["React Native", "Flutter", "Dart"],
  "Backend": ["PHP", "Laravel", "Rest API", "Firebase"],
  "Database": ["MySQL", "Room Database"],
  "Tools": ["Git", "Figma", "Google play Console", "Google Admob", "Google Adsence"],
};

function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = activeCategory === "all" 
    ? skillsData 
    : skillCategories[activeCategory] || skillsData;

  return (
    <div id="skills" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium mb-4">
            🚀 My Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Technical <span className="text-yellow-400">Skills</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-yellow-400 text-black"
                : "bg-zinc-900 text-gray-400 border border-zinc-800 hover:border-yellow-400/50 hover:text-yellow-400"
            }`}
          >
            All Skills
          </button>
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-yellow-400 text-black"
                  : "bg-zinc-900 text-gray-400 border border-zinc-800 hover:border-yellow-400/50 hover:text-yellow-400"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
        >
          {filteredSkills.map((skill, id) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, delay: id * 0.02 }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow Effect - Rounded Rectangle */}
              <div className={`absolute -inset-2 bg-yellow-400/20 rounded-2xl blur-xl transition-opacity duration-200 ${hoveredSkill === skill ? 'opacity-100' : 'opacity-0'}`} />
              
              <div className="relative h-full p-3 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-yellow-400/50 backdrop-blur-sm transition-all duration-200 overflow-hidden">
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 transition-opacity duration-200 ${hoveredSkill === skill ? 'opacity-100' : 'opacity-0'}`} />

                {/* Content */}
                <div className="relative flex flex-col items-center">
                  {/* Icon Container */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4">
                    {/* Hover Ring - Rounded Rectangle to match icon box */}
                    <div className={`absolute -inset-1 border-2 border-yellow-400/50 rounded-xl transition-all duration-200 ${hoveredSkill === skill ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`} />
                    
                    <div className="w-full h-full rounded-xl bg-zinc-800/50 p-3 flex items-center justify-center group-hover:bg-yellow-400/10 transition-colors duration-200">
                      <Image
                        src={skillsImage(skill)?.src}
                        alt={skill}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-gray-300 text-xs sm:text-sm md:text-base font-medium text-center group-hover:text-yellow-400 transition-colors duration-200">
                    {skill}
                  </h3>

                  {/* Progress Bar */}
                  <div className="w-full mt-3 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300 ${hoveredSkill === skill ? 'w-[85%]' : 'w-0'}`}
                    />
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-400/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { value: "20+", label: "Technologies", icon: "💻" },
            { value: "2+", label: "Years Experience", icon: "📅" },
            { value: "20+", label: "Projects Built", icon: "🚀" },
            { value: "100%", label: "Dedication", icon: "🔥" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5, borderColor: "rgba(251,191,36,0.5)" }}
              className="p-3 sm:p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center backdrop-blur-sm transition-all duration-200"
            >
              <span className="text-xl sm:text-2xl mb-1 sm:mb-2 block">{stat.icon}</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 block">
                {stat.value}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Skills;
