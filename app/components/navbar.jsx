"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-lg border-b border-yellow-500/20"
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between py-3 sm:py-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="relative group">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold text-yellow-400">
                Raja Afra Janjua
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-3/4 transition-all duration-300" />
                </Link>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/#contact"
                className="ml-4 px-5 py-2 text-sm font-medium text-black bg-yellow-400 rounded-full hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
              >
                Hire Me
              </Link>
            </motion.li>
          </ul>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-yellow-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </motion.button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <ul className="flex flex-col gap-2 pb-4">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all duration-300"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="block mx-4 mt-2 px-5 py-3 text-center text-black bg-yellow-400 rounded-full font-medium"
              >
                Hire Me
              </Link>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
