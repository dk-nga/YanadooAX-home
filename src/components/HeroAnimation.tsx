"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroAnimation({
  onAnimationComplete,
}: {
  onAnimationComplete?: () => void;
}) {
  const [phase, setPhase] = useState<"bounce" | "zoom" | "complete">("bounce");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("zoom"), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "zoom") {
      return;
    }

    const timer = setTimeout(() => {
      setPhase("complete");
      onAnimationComplete?.();
    }, 800);

    return () => clearTimeout(timer);
  }, [onAnimationComplete, phase]);

  return (
    <AnimatePresence>
      {phase !== "complete" ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={
              phase === "bounce"
                ? { rotateZ: [-3, 3, -3], x: [-50, 50, -50] }
                : { opacity: [1, 0], scale: [1, 15] }
            }
            transition={
              phase === "bounce"
                ? { duration: 1.5, ease: "easeInOut", repeat: Infinity }
                : { duration: 0.8, ease: "easeIn" }
            }
          >
            <div className="relative">
              <motion.h1
                className="relative z-10 select-none text-[10rem] font-black leading-none tracking-tighter md:text-[16rem]"
                style={{ fontStyle: "italic" }}
              >
                <span style={{ color: "hsl(220, 20%, 15%)" }}>A</span>
                <span
                  style={{
                    color: "#C400FF",
                    textShadow: "0 0 24px rgba(248,181,41,0.18)",
                  }}
                >
                  X
                </span>
              </motion.h1>
              <motion.h1
                className="pointer-events-none absolute inset-0 select-none text-[10rem] font-black leading-none tracking-tighter md:text-[16rem]"
                style={{ color: "hsl(190, 100%, 60%)", fontStyle: "italic", mixBlendMode: "multiply" }}
                animate={{ opacity: [0.5, 0.3, 0.5], x: [-5, 5, -5], y: [2, -2, 2] }}
                transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity }}
              >
                AX
              </motion.h1>
              <motion.h1
                className="pointer-events-none absolute inset-0 select-none text-[10rem] font-black leading-none tracking-tighter md:text-[16rem]"
                style={{ color: "hsl(330, 100%, 60%)", fontStyle: "italic", mixBlendMode: "multiply" }}
                animate={{ opacity: [0.5, 0.3, 0.5], x: [5, -5, 5], y: [-2, 2, -2] }}
                transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity }}
              >
                AX
              </motion.h1>

              <motion.div
                className="absolute top-full left-0 right-0"
                style={{
                  height: "80%",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 100%)",
                  transform: "scaleY(-0.4) translateY(-20px)",
                  filter: "blur(8px)",
                }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default HeroAnimation;
