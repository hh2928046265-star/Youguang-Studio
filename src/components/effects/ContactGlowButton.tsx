"use client";

import { motion } from "framer-motion";

interface ContactGlowButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

export default function ContactGlowButton({ label = "Contact Me", href = "#contact", className = "" }: ContactGlowButtonProps) {
  return (
    <motion.a
      href={href}
      className={"relative inline-flex items-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base " + className}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B99A5B 37%, #D4B978 72%, #5C3A00 100%)",
        boxShadow: "0px 4px 4px rgba(185, 154, 91, 0.25), 4px 4px 12px rgba(185, 154, 91, 0.15) inset",
        outline: "2px solid #fff",
        outlineOffset: "-3px",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {label}
    </motion.a>
  );
}
