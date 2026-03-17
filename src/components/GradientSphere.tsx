"use client";

import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";

type GradientSphereProps = {
  size?: number;
  isSpeaking?: boolean;
  isHovered?: boolean;
  mouseX?: MotionValue<number> | number;
  mouseY?: MotionValue<number> | number;
  className?: string;
};

const orbitRings = [
  { className: "-inset-[5%]", border: "rgba(251, 191, 36, 0.18)", duration: 22 },
  { className: "-inset-[9%]", border: "rgba(196, 0, 255, 0.14)", duration: 28 },
];

const accentArcs = [
  {
    className: "-bottom-[8%] left-[2%] h-[24%] w-[40%]",
    borderColor: "rgba(251, 191, 36, 0.34)",
    rotate: -20,
  },
  {
    className: "-bottom-[10%] right-[4%] h-[22%] w-[36%]",
    borderColor: "rgba(196, 0, 255, 0.28)",
    rotate: 18,
  },
  {
    className: "-top-[4%] right-[10%] h-[14%] w-[22%]",
    borderColor: "rgba(103, 232, 249, 0.18)",
    rotate: 24,
  },
];

export function GradientSphere({
  size = 380,
  isSpeaking = false,
  isHovered = false,
  className,
}: GradientSphereProps) {
  return (
    <motion.div
      className={`relative cursor-pointer overflow-visible ${className ?? ""}`}
      style={{ height: size, width: size }}
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.18) 0%, rgba(255,220,140,0.22) 12%, rgba(86,39,94,0.92) 36%, rgba(55,27,54,0.98) 64%, rgba(24,14,31,1) 100%)",
          boxShadow:
            "0 0 0 10px rgba(255,255,255,0.8), 0 0 0 18px rgba(251, 191, 36, 0.12), 0 35px 80px rgba(249,115,22,0.14), 0 12px 34px rgba(45, 12, 42, 0.24)",
        }}
        animate={{
          scale: isSpeaking ? [1, 1.03, 1] : isHovered ? 1.02 : 1,
        }}
        transition={{
          duration: isSpeaking ? 0.7 : 0.35,
          ease: "easeInOut",
          repeat: isSpeaking ? Infinity : 0,
        }}
      >
        <div className="absolute inset-[1.8%] rounded-full border border-white/80" />
        <div className="absolute inset-[7.5%] rounded-full border border-orange-200/20" />
        <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.12),transparent_28%)]" />
        <div
          className="absolute inset-[8%] rounded-full opacity-90"
          style={{
            background:
              "conic-gradient(from 210deg at 52% 50%, rgba(38,12,39,0.82), rgba(93,44,66,0.18), rgba(74,39,110,0.55), rgba(58,23,44,0.9), rgba(38,12,39,0.82))",
            clipPath: "ellipse(44% 54% at 42% 50%)",
          }}
        />
        <div
          className="absolute inset-[18%] rounded-full opacity-75"
          style={{
            background:
              "linear-gradient(140deg, rgba(255,255,255,0.08), rgba(251, 191, 36, 0.05) 35%, rgba(24,14,31,0.55) 100%)",
            clipPath: "polygon(0 0, 70% 14%, 100% 68%, 26% 100%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute -inset-[8%] rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.16) 0%, rgba(196,0,255,0.14) 35%, rgba(249,115,22,0.12) 52%, transparent 72%)",
        }}
        animate={{
          opacity: [0.45, 0.72, 0.45],
          scale: [0.96, 1.02, 0.96],
        }}
        transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
      />

      {orbitRings.map((ring) => (
        <motion.div
          key={ring.className}
          className={`absolute rounded-full ${ring.className}`}
          style={{ border: `1px solid ${ring.border}` }}
          animate={{ rotate: 360 }}
          transition={{ duration: ring.duration, ease: "linear", repeat: Infinity }}
        />
      ))}

      {accentArcs.map((arc) => (
        <motion.div
          key={arc.className}
          className={`absolute rounded-full border-b border-l border-transparent ${arc.className}`}
          style={{
            borderColor: arc.borderColor,
            transform: `rotate(${arc.rotate}deg)`,
          }}
          animate={{ opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0">
        {[
          "left-[3%] top-[72%]",
          "left-[8%] top-[82%]",
          "left-[0%] top-[78%]",
          "right-[2%] top-[76%]",
          "right-[8%] top-[84%]",
          "right-[13%] top-[80%]",
        ].map((position, index) => (
          <motion.span
            key={position}
            className={`absolute h-[7%] w-px rounded-full bg-gradient-to-b from-transparent via-[#e879f9] to-transparent ${position}`}
            animate={{ opacity: [0.15, 0.6, 0.15], y: [0, 3, 0] }}
            transition={{ duration: 1.8, delay: index * 0.12, ease: "easeInOut", repeat: Infinity }}
          />
        ))}
      </div>

      {isSpeaking ? (
        <div className="absolute bottom-[4%] left-1/2 flex -translate-x-1/2 items-end gap-[3px]">
          {Array.from({ length: 7 }).map((_, index) => (
            <motion.div
              key={index}
              className="rounded-full bg-gradient-to-b from-[#67e8f9] via-[#F8B529] to-[#C400FF]"
              style={{ width: index === 3 ? 4 : 3 }}
              animate={{
                height: [8, index === 3 ? 24 : 16 + (index % 3) * 2, 8],
                opacity: [0.55, 1, 0.55],
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
