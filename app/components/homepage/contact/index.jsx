"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from "./contact-form";

function ContactSection() {
  const contactInfo = [
    { icon: MdAlternateEmail, value: personalData.email, label: "Email", href: `mailto:${personalData.email}` },
    { icon: IoMdCall, value: personalData.phone, label: "Phone", href: `tel:${personalData.phone}` },
    { icon: CiLocationOn, value: personalData.address, label: "Location", href: "#" },
  ];

  const socialLinks = [
    { icon: IoLogoGithub, href: personalData.github, label: "GitHub", color: "hover:bg-gray-700" },
    { icon: BiLogoLinkedin, href: personalData.linkedIn, label: "LinkedIn", color: "hover:bg-blue-600" },
    { icon: FaInstagram, href: personalData.Insta, label: "Instagram", color: "hover:bg-pink-600" },
    { icon: FaFacebook, href: personalData.facebook, label: "Facebook", color: "hover:bg-blue-500" },
    { icon: FaWhatsapp, href: `https://wa.me/${personalData.phone?.replace(/[^0-9]/g, '')}`, label: "WhatsApp", color: "hover:bg-green-500" },
  ];

  return (
    <div id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.3, 1, 1.3],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium mb-4"
          >
            💬 Let's Talk
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Get In <span className="text-yellow-400">Touch</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Form - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl sm:rounded-3xl blur-xl"
              />
              <div className="relative bg-zinc-900/90 rounded-xl sm:rounded-2xl border border-zinc-800 p-4 sm:p-6 md:p-8 backdrop-blur-xl">
                <ContactForm />
              </div>
            </div>
          </motion.div>

          {/* Contact Info - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4 sm:space-y-6 order-1 lg:order-2"
          >
            {/* Contact Cards */}
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-yellow-400/50 transition-all duration-300 group backdrop-blur-sm cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300 flex-shrink-0"
                >
                  <item.icon size={22} className="sm:w-6 sm:h-6" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1">{item.label}</p>
                  <p className="text-white font-medium text-sm sm:text-base truncate group-hover:text-yellow-400 transition-colors">
                    {item.value}
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="text-yellow-400 hidden sm:block"
                >
                  →
                </motion.div>
              </motion.a>
            ))}

            {/* Social Links Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm"
            >
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect on Social</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      target="_blank"
                      href={social.href}
                      aria-label={social.label}
                      className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-zinc-800 text-gray-400 hover:text-white ${social.color} transition-all duration-300`}
                    >
                      <social.icon size={18} className="sm:w-5 sm:h-5" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border border-yellow-400/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                />
                <span className="text-green-400 font-medium text-xs sm:text-sm">Available for work</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                I'm currently open to freelance projects and full-time opportunities. Let's build something amazing together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
