"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  showScrollIndicator?: boolean;
  persistVisible?: boolean;
};

export function AnimatedSection({
  children,
  className = "",
  showScrollIndicator = false,
  persistVisible = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useScrollContainer();
  const { scrollYProgress } = useScroll({
    container: containerRef ?? undefined,
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.7, 0.85], persistVisible ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.7, 0.85], persistVisible ? [0.95, 1, 1, 1] : [0.95, 1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.7, 0.85], persistVisible ? [60, 0, 0, 0] : [60, 0, 0, -100]);
  const blur = useTransform(scrollYProgress, [0.7, 0.85], persistVisible ? [0, 0] : [0, 8]);

  return (
    <motion.div
      ref={ref}
      className={`relative min-h-screen ${className}`}
      style={{
        opacity,
        scale,
        y,
        filter: useTransform(blur, (value) => `blur(${value}px)`),
      }}
    >
      {children}
      {showScrollIndicator ? (
        <motion.div
          className="absolute bottom-1 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex h-8 w-5 justify-center rounded-full border-2 border-muted-foreground/20 bg-background/50 pt-1.5 backdrop-blur-sm">
            <motion.div
              className="h-1 w-1 rounded-full bg-muted-foreground/60"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
