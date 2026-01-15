"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaHeart, FaCode } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const socialLinks = [
  { href: personalData.github, icon: BsGithub, label: "GitHub" },
  { href: personalData.linkedIn, icon: BsLinkedin, label: "LinkedIn" },
  { href: personalData.facebook, icon: FaFacebook, label: "Facebook" },
  { href: personalData.Insta, icon: FaInstagram, label: "Instagram" },
];

const quickLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const services = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "API Development",
  "Consulting",
];

function Footer() {
  return (
    <footer className="relative bg-black border-t border-zinc-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.1),transparent_70%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 sm:py-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Link href="/" className="inline-block group mb-4">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">
                  <FaCode className="text-black text-lg" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  Raja Afra Janjua
                </span>
              </motion.div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Full Stack Developer crafting beautiful digital experiences. Turning ideas into reality with clean code and creative solutions.
            </p>
            
            {/* Newsletter Mini */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2.5 bg-yellow-400 text-black font-medium rounded-lg text-sm hover:bg-yellow-300 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-yellow-400 transition-all duration-300" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  className="text-gray-500 text-sm flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              Connect
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    aria-label={social.label}
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 text-gray-500 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <p className="text-gray-500">
                <span className="text-gray-400">Email:</span>{" "}
                <a href={`mailto:${personalData.email}`} className="hover:text-yellow-400 transition-colors">
                  {personalData.email}
                </a>
              </p>
              <p className="text-gray-500">
                <span className="text-gray-400">Location:</span> {personalData.address}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900">
        <div className="container mx-auto px-4 py-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 text-sm flex items-center justify-center gap-1.5 flex-wrap"
          >
            © {new Date().getFullYear()} Raja Afra Janjua. Made with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="text-red-500" size={12} />
            </motion.span>
            and lots of ☕
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
