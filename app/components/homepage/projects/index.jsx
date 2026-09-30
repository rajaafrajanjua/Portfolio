"use client";

import { projectsData } from "@/utils/data/projects-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiExternalLink, FiEye } from "react-icons/fi";
import ProjectModal from "./project-modal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProjects = projectsData.filter((p) => p.featured);
  const regularProjects = projectsData.filter((p) => !p.featured);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <div className="py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium mb-4">
            💼 Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Featured <span className="text-yellow-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Featured Projects — 1 col on mobile, 3 cols on lg+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm h-full flex flex-col">
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={`/${project.feature}`}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

                  {/* Featured Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-yellow-400 rounded-full text-black text-[10px] font-bold shadow-lg">
                      ⭐ Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-yellow-400 transition-colors duration-300 truncate">
                    {project.name}
                  </h3>

                  <p className="text-gray-400 text-xs mb-3 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tools.slice(0, 3).map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] bg-zinc-800 text-yellow-400 rounded-full border border-yellow-400/20"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] bg-zinc-800 text-gray-500 rounded-full">
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mt-auto">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300 text-xs flex-1"
                      >
                        Visit Live
                        <FiExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={() => openModal(project)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-800 text-white font-semibold rounded-full hover:bg-zinc-700 border border-zinc-700 hover:border-yellow-400/50 transition-all duration-300 text-xs flex-1"
                    >
                      View Details
                      <FiEye className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            More <span className="text-yellow-400">Projects</span>
          </h3>
          <div className="w-16 h-1 bg-yellow-400/50 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {regularProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-lg sm:rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm cursor-pointer"
              onClick={() => openModal(project)}
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={`/${project.feature}`}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                  <button className="p-3 bg-yellow-400 rounded-full text-black hover:scale-110 transition-transform">
                    <FiEye className="w-5 h-5" />
                  </button>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 bg-zinc-800 rounded-full text-white hover:scale-110 transition-transform border border-zinc-600"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Role Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 text-[10px] font-medium bg-black/50 text-yellow-400 rounded backdrop-blur-sm">
                    {project.role}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors mb-1.5 sm:mb-2 truncate">
                  {project.name}
                </h4>
                
                <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {project.tools.slice(0, 3).map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs bg-zinc-800 text-gray-400 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs text-gray-600">
                      +{project.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Gradient Line */}
              <div className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Projects;
