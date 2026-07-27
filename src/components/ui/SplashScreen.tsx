"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-ivory flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink tracking-wider mb-3">
              游光 Studio
            </h1>
            <p className="text-stone text-sm tracking-[0.3em] uppercase">
              Zhou You Visual Creation
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
