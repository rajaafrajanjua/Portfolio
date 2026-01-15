"use client";

import { projectsData } from "@/utils/data/projects-data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiExternalLink, FiX } from "react-icons/fi";
import { useParams } from "next/navigation";

export default function ProjectDetails() {
  const params = useParams();
  const { index } = params;
  const [selectedImage, setSelectedImage] = useState(null);

  const project = projectsData.find((p) => p.id === Number(index));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all"
          >
            <FiArrowLeft />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Get all images from the project
  const projectImages = Object.keys(project)
    .filter((key) => key.startsWith("image") && project[key])
    .map((key) => project[key]);

  return (
    <div className="py-8 min-h-screen">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors group"
        >
          <motion.span
            whileHover={{ x: -5 }}
            className="flex items-center gap-2"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </motion.span>
        </Link>
      </motion.div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium mb-4"
        >
          {project.role}
        </motion.span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {project.name}
        </h1>
        <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full" />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        {/* Feature Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-10 rounded-2xl overflow-hidden border border-zinc-800 group"
        >
          <div className="relative aspect-video">
            <Image
              src={`/${project.feature}`}
              alt={project.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          {/* Live Site Button */}
          {project.url && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-6 right-6 inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all shadow-lg"
            >
              Visit Live Site
              <FiExternalLink />
            </motion.a>
          )}
        </motion.div>

        {/* Description & Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              About This Project
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  className="px-3 py-1.5 bg-zinc-800 text-yellow-400 rounded-lg text-sm border border-yellow-400/20 hover:border-yellow-400/50 transition-colors"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Project Gallery */}
        {projectImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              Project Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {projectImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setSelectedImage(img)}
                  className="relative aspect-[9/16] rounded-xl overflow-hidden border border-zinc-800 hover:border-yellow-400/50 cursor-pointer group"
                >
                  <Image
                    src={`/${img}`}
                    alt={`${project.name} screenshot ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                      View
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400/10 transition-all"
          >
            <FiArrowLeft />
            View All Projects
          </Link>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 bg-zinc-800 rounded-full text-white hover:bg-yellow-400 hover:text-black transition-all"
          >
            <FiX size={24} />
          </motion.button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-md max-h-[80vh] rounded-2xl overflow-hidden"
          >
            <Image
              src={`/${selectedImage}`}
              alt="Project screenshot"
              width={400}
              height={800}
              className="object-contain max-h-[80vh] w-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
