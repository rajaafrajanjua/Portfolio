"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { FiX, FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Get all images from the project
  const projectImages = project
    ? Object.keys(project)
        .filter((key) => key.startsWith("image") && project[key])
        .map((key) => project[key])
    : [];

  // Reset image index when project changes
  useEffect(() => {
    if (project) {
      setSelectedImageIndex(0);
    }
  }, [project]);

  const nextImage = useCallback(() => {
    if (projectImages.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % projectImages.length);
    }
  }, [projectImages.length]);

  const prevImage = useCallback(() => {
    if (projectImages.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
    }
  }, [projectImages.length]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, nextImage, prevImage]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClose}
            className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 sm:p-3 bg-zinc-800 rounded-full text-white hover:bg-yellow-400 hover:text-black transition-all duration-200"
          >
            <FiX size={20} className="sm:w-6 sm:h-6" />
          </motion.button>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[85vh] sm:max-h-[85vh] bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-800 overflow-hidden mx-2 sm:mx-4 mt-24 sm:mt-20 mb-4"
          >
            <div className="overflow-y-auto max-h-[85vh] sm:max-h-[85vh] custom-scrollbar">
              {/* Header Image */}
              <div className="relative h-48 sm:h-64 md:h-80">
                <Image
                  src={`/${project.feature}`}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <span className="inline-block px-2 sm:px-3 py-1 bg-yellow-400 text-black text-[10px] sm:text-xs font-bold rounded-full mb-2 sm:mb-3">
                    {project.role}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {project.name}
                  </h2>
                </div>

                {/* Live Site Button */}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 left-2 sm:top-4 sm:left-4 inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all text-xs sm:text-sm"
                  >
                    Visit Live
                    <FiExternalLink size={14} className="sm:w-4 sm:h-4" />
                  </a>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Description */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                    About This Project
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-4 py-1 sm:py-2 bg-zinc-800 text-yellow-400 rounded-lg text-xs sm:text-sm border border-yellow-400/20 hover:border-yellow-400/50 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                {projectImages.length > 0 && (
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                      Screenshots ({projectImages.length})
                    </h3>
                    
                    {/* Main Image Viewer */}
                    <div className="relative mb-3 sm:mb-4 bg-zinc-800 rounded-lg sm:rounded-xl overflow-hidden">
                      <div className="relative aspect-[9/16] max-h-[350px] sm:max-h-[500px] mx-auto">
                        <Image
                          src={`/${projectImages[selectedImageIndex]}`}
                          alt={`${project.name} screenshot ${selectedImageIndex + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      
                      {/* Navigation Arrows */}
                      {projectImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/50 hover:bg-yellow-400 text-white hover:text-black rounded-full transition-all"
                          >
                            <FiChevronLeft size={20} className="sm:w-6 sm:h-6" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/50 hover:bg-yellow-400 text-white hover:text-black rounded-full transition-all"
                          >
                            <FiChevronRight size={20} className="sm:w-6 sm:h-6" />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-0.5 sm:py-1 bg-black/50 rounded-full text-white text-xs sm:text-sm">
                        {selectedImageIndex + 1} / {projectImages.length}
                      </div>
                    </div>

                    {/* Thumbnails */}
                    {projectImages.length > 1 && (
                      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2">
                        {projectImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative w-12 h-18 sm:w-16 sm:h-24 flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImageIndex === idx
                                ? "border-yellow-400"
                                : "border-zinc-700 hover:border-zinc-500"
                            }`}
                          >
                            <Image
                              src={`/${img}`}
                              alt={`Thumbnail ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 sm:py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 border border-zinc-700 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <FiX size={18} />
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
