"use client";

import { useContent } from "@/lib/content-context";
import { motion, AnimatePresence } from "framer-motion";

export default function ContentGate({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useContent();

  return (
    <AnimatePresence mode="wait">
      {!isLoaded ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] bg-[#080808] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-gold/30 border-t-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              className="text-gold/60 text-sm tracking-[0.3em] font-light"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              游光
            </motion.p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
