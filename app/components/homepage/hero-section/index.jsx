"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import AnimationLottie from "../../helper/animation-lottie";
import codingAnimation from "../../../assets/lottie/coding.json";

function HeroSection() {
  const socialLinks = [
    { href: personalData.github, icon: BsGithub },
    { href: personalData.linkedIn, icon: BsLinkedin },
    { href: personalData.facebook, icon: FaFacebook },
    { href: personalData.Insta, icon: FaInstagram },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 md:py-20 lg:py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-yellow-400/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Mobile Layout - Stacked with animation behind */}
        <div className="relative lg:hidden">
          {/* Lottie Animation - Background on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 flex justify-center items-center pointer-events-none"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-yellow-400/10 rounded-full blur-3xl" />
              <AnimationLottie animationPath={codingAnimation} />
            </div>
          </motion.div>

          {/* Content - Overlaid on mobile */}
          <div className="relative z-10 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-medium backdrop-blur-sm">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4"
            >
              Hi, I'm{" "}
              <span className="text-yellow-400 break-words">{personalData.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-4"
            >
              <p className="text-lg sm:text-xl text-gray-400">
                A Professional{" "}
                <span className="text-yellow-400 font-semibold">
                  {personalData.designation}
                </span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-gray-500 mb-6 max-w-lg leading-relaxed text-sm sm:text-base"
            >
              Building modern web &amp; mobile applications with clean code and great user experiences.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300 text-sm sm:text-base"
              >
                Contact Me
                <RiContactsFill size={18} />
              </Link>

              <Link
                href={personalData.resume}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400/10 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
              >
                Get Resume
                <MdDownload size={18} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Hi, I'm{" "}
              <span className="text-yellow-400 break-words">{personalData.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-2xl text-gray-400">
                A Professional{" "}
                <span className="text-yellow-400 font-semibold">
                  {personalData.designation}
                </span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-gray-500 mb-8 max-w-lg leading-relaxed"
            >
              Building modern web &amp; mobile applications with clean code and great user experiences.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex items-center gap-4 mb-8"
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300"
                  >
                    <social.icon size={20} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300"
              >
                Contact Me
                <RiContactsFill size={18} />
              </Link>

              <Link
                href={personalData.resume}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400/10 transition-all duration-300"
              >
                Get Resume
                <MdDownload size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-yellow-400/10 rounded-full blur-3xl" />
              <AnimationLottie animationPath={codingAnimation} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
