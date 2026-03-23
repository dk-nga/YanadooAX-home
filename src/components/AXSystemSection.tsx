"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, Compass, Users2, Rocket, ArrowRight, ChevronDown } from "lucide-react";
import { HeroMetricsMarquee } from "@/components/HeroMetricsMarquee";
import { useLanguage } from "@/contexts/LanguageContext";

import step1Image from "@/assets/step1-discover.png";
import step2Image from "@/assets/step2-design.png";
import step3Image from "@/assets/step3-build.png";
import step4Image from "@/assets/step4-stick.png";

const step3dImages = [step1Image.src, step2Image.src, step3Image.src, step4Image.src];

const getSteps = (t: (key: string) => string) => [
  {
    number: "01",
    stepLabel: "STEP",
    icon: Search,
    title: "Discover",
    subtitle: t("ax.step1.subtitle"),
    tagline: t("ax.step1.tagline"),
    description: t("ax.step1.subtitle"),
    color: "#C400FF",
    expandedContent: {
      subtitle: t("ax.step1.expandedSubtitle"),
      details: [
        t("ax.step1.detail1"),
        t("ax.step1.detail2"),
        t("ax.step1.detail3"),
        t("ax.step1.detail4"),
      ],
      outputs: [t("ax.step1.output1"), t("ax.step1.output2"), t("ax.step1.output3")],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop"
    }
  },
  {
    number: "02",
    stepLabel: "STEP",
    icon: Compass,
    title: "Design",
    subtitle: t("ax.step2.subtitle"),
    tagline: t("ax.step2.tagline"),
    description: t("ax.step2.subtitle"),
    color: "#282640",
    expandedContent: {
      subtitle: t("ax.step2.expandedSubtitle"),
      details: [
        t("ax.step2.detail1"),
        t("ax.step2.detail2"),
        t("ax.step2.detail3"),
        t("ax.step2.detail4"),
      ],
      outputs: [t("ax.step2.output1"), t("ax.step2.output2"), t("ax.step2.output3")],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
    }
  },
  {
    number: "03",
    stepLabel: "STEP",
    icon: Users2,
    title: "Build Together",
    subtitle: "Co-Building & Live Implementation",
    tagline: t("ax.step3.tagline"),
    description: t("ax.step3.subtitle"),
    color: "#FF6B35",
    expandedContent: {
      subtitle: t("ax.step3.expandedSubtitle"),
      details: [
        t("ax.step3.detail1"),
        t("ax.step3.detail2"),
        t("ax.step3.detail3"),
        t("ax.step3.detail4"),
      ],
      outputs: [t("ax.step3.output1"), t("ax.step3.output2")],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop"
    }
  },
  {
    number: "04",
    stepLabel: "STEP",
    icon: Rocket,
    title: "Make It Stick",
    subtitle: t("ax.step4.subtitle"),
    tagline: t("ax.step4.tagline"),
    description: t("ax.step4.subtitle"),
    color: "#10B981",
    expandedContent: {
      subtitle: t("ax.step4.expandedSubtitle"),
      details: [
        t("ax.step4.detail1"),
        t("ax.step4.detail2"),
        t("ax.step4.detail3"),
      ],
      outputs: [t("ax.step4.output1"), t("ax.step4.output2")],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop"
    }
  },
];

const getTestimonials = (t: (key: string) => string) => [
  {
    id: 1,
    title: t("ax.testimonial1.title"),
    subtitle: t("ax.testimonial1.subtitle"),
    quote: t("ax.testimonial1.quote"),
    role: t("ax.testimonial1.role"),
    company: t("ax.testimonial1.company"),
    employeeCount: t("ax.testimonial1.employees"),
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: t("ax.testimonial2.title"),
    subtitle: t("ax.testimonial2.subtitle"),
    quote: t("ax.testimonial2.quote"),
    role: t("ax.testimonial2.role"),
    company: t("ax.testimonial2.company"),
    employeeCount: t("ax.testimonial2.employees"),
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: t("ax.testimonial3.title"),
    subtitle: t("ax.testimonial3.subtitle"),
    quote: t("ax.testimonial3.quote"),
    role: t("ax.testimonial3.role"),
    company: t("ax.testimonial3.company"),
    employeeCount: t("ax.testimonial3.employees"),
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: t("ax.testimonial4.title"),
    subtitle: t("ax.testimonial4.subtitle"),
    quote: t("ax.testimonial4.quote"),
    role: t("ax.testimonial4.role"),
    company: t("ax.testimonial4.company"),
    employeeCount: t("ax.testimonial4.employees"),
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
  },
];

// Step type definition
type StepType = {
  number: string;
  stepLabel: string;
  icon: typeof Search;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  color: string;
  expandedContent: {
    subtitle: string;
    details: string[];
    outputs: string[];
    image: string;
  };
};

// Testimonial type definition
type TestimonialType = {
  id: number;
  title: string;
  subtitle: string;
  quote: string;
  role: string;
  company: string;
  employeeCount: string;
  image: string;
};

// Counter component for animated numbers
const Counter = ({ value, suffix = "", isInView }: { value: number; suffix?: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * value);
        
        setCount(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);
  
  return <span>{count}{suffix}</span>;
};

// Curly Quote SVG Component
const CurlyQuote = ({ className, isOpen = true }: { className?: string; isOpen?: boolean }) => (
  <svg 
    viewBox="0 0 40 40" 
    className={className}
    fill="currentColor"
    style={{ transform: isOpen ? 'none' : 'rotate(180deg)' }}
  >
    <path d="M12 28c-3.3 0-6-2.7-6-6 0-5.5 4.5-10 10-10v4c-3.3 0-6 2.7-6 6h4c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2zm16 0c-3.3 0-6-2.7-6-6 0-5.5 4.5-10 10-10v4c-3.3 0-6 2.7-6 6h4c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2z"/>
  </svg>
);

// Testimonial Slider Component - Full width case study style with fixed height
const TestimonialSlider = ({ testimonials }: { testimonials: TestimonialType[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <motion.div 
      ref={ref}
      className="w-full mb-8 md:mb-16 px-2 md:px-0"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Full-width dark container with slide-up hanging effect */}
      <motion.div 
        className="relative bg-foreground rounded-2xl md:rounded-3xl overflow-hidden"
        initial={{ y: 60, rotateX: 5 }}
        animate={isInView ? { y: 0, rotateX: 0 } : { y: 60, rotateX: 5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ transformPerspective: 1000 }}
      >
        <div className="flex h-full">
          {/* Left side - Number selector (inside container) */}
          <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 md:gap-2 z-20">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[9px] md:text-xs font-bold transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-gradient-to-r from-[#F8B529] to-[#C400FF] text-white'
                    : 'bg-background/20 text-background/60 hover:bg-background/30'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
          
          {/* Center - Quote content (fixed height container) */}
          <div className="flex-1 pl-9 md:pl-24 pr-3 md:pr-8 lg:pr-[300px] py-4 md:py-16 flex flex-col justify-center relative">
            {/* Quote decoration - top curly quote */}
            <motion.div 
              className="absolute top-2 left-9 md:left-24"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CurlyQuote className="w-5 h-5 md:w-16 md:h-16 text-[#C400FF]/30" isOpen={true} />
            </motion.div>
            
            {/* Fixed height content area */}
            <div className="relative z-10 min-h-[140px] md:h-[220px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  {/* Title & Subtitle */}
                  <h3 className="text-sm md:text-2xl lg:text-3xl font-black text-background mb-0.5 md:mb-2 leading-tight">
                    {testimonials[activeIndex].title}
                  </h3>
                  <p className="text-xs md:text-xl font-bold bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent mb-2 md:mb-4">
                    {testimonials[activeIndex].subtitle}
                  </p>
                  
                  {/* Full quote - fixed height with line clamp */}
                  <p className="text-background/70 text-[10px] md:text-base leading-relaxed line-clamp-3 md:line-clamp-4 max-w-2xl">
                    {testimonials[activeIndex].quote}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Quote decoration - bottom curly quote */}
            <motion.div 
              className="absolute bottom-2 right-3 md:right-[300px]"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <CurlyQuote className="w-6 h-6 md:w-16 md:h-16 text-[#282640]/30" isOpen={false} />
            </motion.div>
          </div>
          
          {/* Right side - Mac-style window card */}
          <motion.div 
            className="hidden lg:flex absolute right-12 top-8 w-[320px] z-10"
            initial={{ opacity: 0, y: 40, x: 20 }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 40, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full bg-[#f5f5f7] rounded-xl shadow-2xl overflow-hidden">
              {/* Mac-style title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#e8e8ec] border-b border-[#d1d1d6]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-[#6e6e73] font-medium">
                    {testimonials[activeIndex].company}
                  </span>
                </div>
                <div className="w-[52px]" /> {/* Spacer for symmetry */}
              </div>
              
              {/* Image content */}
              <div className="h-[180px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeIndex}
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].company}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>
              
              {/* Company info footer */}
              <div className="p-4 bg-white border-t border-[#e8e8ec]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-bold text-foreground text-sm">{testimonials[activeIndex].role}</p>
                      <p className="text-xs text-muted-foreground">{testimonials[activeIndex].employeeCount}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                        {testimonials[activeIndex].company.slice(0, 2)}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Mobile company info - more compact */}
        <div className="lg:hidden px-3 py-2.5 md:p-5 bg-background border-t border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={testimonials[activeIndex].image} 
                alt={testimonials[activeIndex].company}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-foreground text-[11px] md:text-sm">{testimonials[activeIndex].role}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">{testimonials[activeIndex].employeeCount}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Stats Counter Component - Glassmorphism bubble effect
const StatsCounter = ({ impacts }: { impacts: { value: string; label: string }[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const parseValue = (value: string) => {
    const numMatch = value.match(/(\d+)/);
    const suffix = value.replace(/\d+/, '');
    return {
      num: numMatch ? parseInt(numMatch[1], 10) : 0,
      suffix,
    };
  };
  
  return (
    <motion.div
      ref={ref}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="grid grid-cols-3 gap-2 md:gap-8">
        {impacts.map((impact, index) => {
          const { num, suffix } = parseValue(impact.value);
          return (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Glassmorphism bubble container */}
              <div className="relative p-3 md:p-10 rounded-2xl md:rounded-3xl text-center overflow-hidden backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-[0_8px_32px_rgba(141,54,235,0.1)] hover:shadow-[0_8px_32px_rgba(141,54,235,0.2)] transition-all duration-300">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8B529]/5 via-transparent to-[#C400FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Bubble highlight */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#F8B529]/10 to-[#C400FF]/10 rounded-full blur-2xl" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-2xl md:text-6xl font-black mb-1 md:mb-2 bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                    <Counter value={num} suffix={suffix} isInView={isInView} />
                  </div>
                  <div className="text-[10px] md:text-base text-muted-foreground font-medium whitespace-nowrap">{impact.label}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Floating gradient orb
const FloatingOrb = ({ color, size, position }: { color: string; size: string; position: string }) => (
  <motion.div
    className={`absolute ${position} ${size} rounded-full blur-3xl opacity-20 pointer-events-none`}
    style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.25, 0.15],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Row step card for mobile (4 rows on one screen) with background image
const RowStepCard = ({ step, index }: { step: StepType; index: number }) => {
  return (
    <div className="relative rounded-xl overflow-hidden mx-2">
      {/* Background image */}
      {step3dImages[index] && (
        <div className="absolute inset-0">
          <img 
            src={step3dImages[index]!} 
            alt=""
            className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 object-contain opacity-15"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3 py-3 px-3">
        {/* Left: Small icon */}
        {step3dImages[index] && (
          <img 
            src={step3dImages[index]!} 
            alt={step.title} 
            className="w-12 h-12 object-contain flex-shrink-0"
          />
        )}
        
        {/* Right: Content */}
        <div className="flex-1 min-w-0">
          {/* Title badge */}
          <span 
            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1"
            style={{ backgroundColor: `${step.color}20`, color: step.color }}
          >
            {step.title}
          </span>

          {/* Main title */}
          <h3 className="text-sm font-bold leading-tight text-foreground line-clamp-1 mb-0.5">
            {step.description.split('\n')[0]}
          </h3>

          {/* Details - inline */}
          <p className="text-muted-foreground text-[10px] leading-snug line-clamp-2">
            {step.expandedContent.details.slice(0, 2).join(' · ')}
          </p>

          {/* Outputs tags */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {step.expandedContent.outputs.slice(0, 2).map((output, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded-full text-[9px] font-medium border"
                style={{ 
                  borderColor: `${step.color}40`,
                  color: step.color,
                  backgroundColor: `${step.color}10`
                }}
              >
                {output}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile: All 4 steps in vertical rows on one screen
const MobileAllSteps = ({ steps }: { steps: StepType[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="h-screen w-full flex flex-col relative overflow-hidden snap-start snap-always md:hidden"
      style={{ backgroundColor: 'hsl(var(--background))' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated decorative background curves - same as Part 1 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mobileCurveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C400FF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#282640" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -50 300 Q 200 100 400 200 T 800 150"
          stroke="url(#mobileCurveGradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.path
          d="M -50 500 Q 250 350 450 400 T 850 350"
          stroke="url(#mobileCurveGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        />
      </svg>
      
      {/* Floating orbs */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#C400FF]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#282640]/10 blur-3xl pointer-events-none" />

      {/* All 4 step cards stacked vertically with arrows between */}
      <div className="flex-1 flex flex-col justify-center pt-14 pb-6 px-2 relative z-10">
        {steps.map((step, index) => (
          <div key={step.number}>
            <RowStepCard step={step} index={index} />
            {/* Double down arrow between cards */}
            {index < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center text-muted-foreground/40">
                  <ChevronDown className="w-4 h-4 -mb-2" />
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <div className="flex h-6 w-4 justify-center rounded-full border-2 border-slate-300/70 bg-white/20 pt-1">
          <motion.div 
            className="h-1 w-1 rounded-full bg-slate-400/70"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Full-screen step component with clean, minimal design (Desktop only)
const FullScreenStep = ({ step, index }: { step: StepType; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  
  // Alternate direction: even indices come from left, odd from right
  const isFromRight = index % 2 !== 0;
  
  return (
    <div 
      ref={ref}
      className="h-screen w-full hidden md:flex items-center relative overflow-hidden snap-start snap-always"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      {/* Large background step number - positioned behind content */}
      <div 
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
      >
        <div className="flex items-baseline gap-2 md:gap-4" style={{ color: 'hsl(var(--foreground)/0.06)' }}>
          <span className="text-[150px] md:text-[250px] lg:text-[350px] font-black leading-none tracking-tighter">
            {step.number}
          </span>
          <span className="text-[40px] md:text-[70px] lg:text-[100px] font-bold tracking-[0.1em]">
            STEP
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-20 items-center`}>
          {/* Content side */}
          <motion.div
            className={isFromRight ? 'lg:order-1' : 'lg:order-1'}
            initial={{ opacity: 0, x: isFromRight ? -60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isFromRight ? -60 : -60 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* 3D Icon Image or regular icon */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {step3dImages[index] ? (
                <img 
                  src={step3dImages[index]!} 
                  alt={step.title} 
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl border-2 border-foreground/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-foreground/60" />
                </div>
              )}
            </motion.div>

            {/* Title badge */}
            <motion.div 
              className="mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold"
                style={{ backgroundColor: `${step.color}15`, color: step.color }}
              >
                {step.title}
              </span>
            </motion.div>
            
            {/* Main title */}
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 leading-[1.1] text-foreground whitespace-pre-line"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {step.description}
            </motion.h2>

            {/* Tagline */}
            <motion.p 
              className={`text-muted-foreground mb-6 italic whitespace-pre-line ${
                step.tagline.length > 40 ? 'text-sm md:text-base lg:text-lg' : 'text-base md:text-lg lg:text-xl'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              &quot;{step.tagline}&quot;
            </motion.p>
            
            {/* Details */}
            <motion.div 
              className="space-y-2 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {step.expandedContent.details.slice(0, 3).map((detail, idx) => (
                <p key={idx} className="text-base md:text-lg leading-relaxed">
                  {detail}
                </p>
              ))}
            </motion.div>

            {/* Outputs tags */}
            <motion.div 
              className="flex flex-wrap gap-2 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {step.expandedContent.outputs.map((output, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ 
                    borderColor: `${step.color}40`,
                    color: step.color,
                    backgroundColor: `${step.color}08`
                  }}
                >
                  {output}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Image side */}
          <motion.div
            className={isFromRight ? 'lg:order-2' : 'lg:order-2'}
            initial={{ opacity: 0, x: isFromRight ? 60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isFromRight ? 60 : 60 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              <img 
                src={step.expandedContent.image}
                alt={step.title}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover grayscale"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Step indicator dots - right side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500`}
            style={{ 
              backgroundColor: i === index ? step.color : 'hsl(var(--muted-foreground)/0.2)',
              transform: i === index ? 'scale(1.5)' : 'scale(1)'
            }}
          />
        ))}
      </div>

      {/* Scroll indicator - show on all steps including last */}
      <motion.div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="flex h-8 w-5 justify-center rounded-full border-2 border-slate-300/70 bg-white/20 pt-1.5">
          <motion.div 
            className="h-1 w-1 rounded-full bg-slate-400/70"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

const AXSystemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Translated differentiators
  const translatedDifferentiators = [
    {
      title: t("ax.diff1.title"),
      subtitle: t("ax.diff1.subtitle"),
      description: t("ax.diff1.desc"),
    },
    {
      title: t("ax.diff2.title"),
      subtitle: t("ax.diff2.subtitle"),
      description: t("ax.diff2.desc"),
    },
    {
      title: t("ax.diff3.title"),
      subtitle: t("ax.diff3.subtitle"),
      description: t("ax.diff3.desc"),
    },
  ];

  // Translated impacts
  const impacts = [
    { value: t("ax.impact1.value"), label: t("ax.impact1.label") },
    { value: t("ax.impact2.value"), label: t("ax.impact2.label") },
    { value: t("ax.impact3.value"), label: t("ax.impact3.label") },
  ];

  // Generate translated steps
  const steps = getSteps(t);
  
  // Generate translated testimonials
  const testimonials = getTestimonials(t);

  return (
    <section ref={sectionRef} id="partners" className="relative bg-background">
      {/* Part 1: Framework Introduction */}
      <div className="relative flex min-h-screen items-center overflow-hidden overflow-x-hidden pb-32 snap-start snap-always md:pb-40">
        {/* Animated decorative background curves */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C400FF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#282640" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -100 600 Q 400 200 800 400 T 1600 300"
            stroke="url(#curveGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathLength: 1, pathOffset: [0, 1] }}
            transition={{ pathLength: { duration: 2 }, pathOffset: { duration: 20, repeat: Infinity, ease: "linear" } }}
          />
          <motion.path
            d="M -100 700 Q 500 400 900 500 T 1700 400"
            stroke="url(#curveGradient)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathLength: 1, pathOffset: [0, -1] }}
            transition={{ pathLength: { duration: 2, delay: 0.5 }, pathOffset: { duration: 25, repeat: Infinity, ease: "linear" } }}
          />
          <motion.path
            d="M 1600 100 Q 1200 300 800 200 T 0 400"
            stroke="url(#curveGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathLength: 1, pathOffset: [0, 1] }}
            transition={{ pathLength: { duration: 2, delay: 1 }, pathOffset: { duration: 30, repeat: Infinity, ease: "linear" } }}
          />
        </svg>
        
        {/* Floating orbs */}
        <FloatingOrb color="#C400FF" size="w-[500px] h-[500px]" position="-top-48 -right-48" />
        <FloatingOrb color="#282640" size="w-[400px] h-[400px]" position="-bottom-32 -left-32" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 overflow-hidden">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            {/* Framework badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 border border-[#C400FF]/20 mb-6"
              variants={itemVariants}
            >
              <span className="text-[#C400FF] font-bold text-sm">Yanadoo AX Framework™</span>
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">{t("ax.intro.title1")}</span>{t("ax.intro.title2")}{" "}
              <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-lg bg-gradient-to-r from-[#F8B529] to-[#C400FF] text-white">{t("ax.intro.title3")}</span>{t("ax.intro.title4")}
            </motion.h2>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto whitespace-pre-line"
              variants={itemVariants}
            >
              {t("ax.intro.subtitle")}
            </motion.p>

            {/* Process flow preview */}
            <motion.div 
              className="flex justify-center items-center gap-1 sm:gap-2 md:gap-4 mb-8"
              variants={itemVariants}
            >
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div 
                    className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl font-semibold text-[10px] sm:text-xs md:text-base transition-all hover:scale-105 whitespace-nowrap"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    {step.title}
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mx-0.5 sm:mx-1 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div 
              className="relative overflow-hidden rounded-3xl border border-stone-300/65 bg-gradient-to-br from-[#F8B529]/5 via-background to-[#C400FF]/5 p-6 md:p-8"
              variants={itemVariants}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F8B529]/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#282640]/10 to-transparent rounded-tr-full" />
              
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-center font-medium leading-relaxed relative z-10">
                <span className="font-bold text-foreground">{t("ax.intro.box1")}</span>{t("ax.intro.box2")}{" "}
                <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent font-bold">{t("ax.intro.box3")}</span> {t("ax.intro.box4")}
                <br className="hidden md:block" /><span className="md:hidden"> </span>
                {t("ax.intro.box5")}
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        <HeroMetricsMarquee className="absolute inset-x-0 bottom-10 z-20 pb-0 md:bottom-12" />

        {/* Scroll indicator - moved outside container, at absolute bottom */}
        <motion.div 
          className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="flex h-8 w-5 justify-center rounded-full border-2 border-slate-300/70 bg-white/20 pt-1.5">
            <motion.div 
              className="h-1 w-1 rounded-full bg-slate-400/70"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Part 2: Full-screen scroll snap 4 steps */}
      {/* Mobile: All 4 steps on one screen */}
      <MobileAllSteps steps={steps} />
      
      {/* Desktop: Individual full-screen steps */}
      {steps.map((step, index) => (
        <FullScreenStep 
          key={step.number} 
          step={step} 
          index={index}
        />
      ))}

      {/* Part 3: Differentiators + Testimonials + Impact */}
      <div className="min-h-screen flex items-center py-24 relative overflow-hidden overflow-x-hidden snap-start snap-always">
        {/* Background decorations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C400FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#282640" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <circle cx="10%" cy="20%" r="200" fill="url(#lineGrad)" />
          <circle cx="90%" cy="80%" r="150" fill="url(#lineGrad)" />
        </svg>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-8 overflow-hidden">
          {/* Title - compact */}
          <motion.div
            className="text-center mb-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            <motion.h2 
              className="text-lg sm:text-3xl md:text-4xl font-black mb-3 leading-tight whitespace-nowrap"
              variants={itemVariants}
            >
              {t("ax.part3.title1")}{" "}
              <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">{t("ax.part3.title2")}</span>{t("ax.part3.title3")}
            </motion.h2>
            <motion.p 
              className="text-base text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {t("ax.part3.subtitle1")}<br />
              {t("ax.part3.subtitle2")}
            </motion.p>
          </motion.div>

          {/* 상단 철학 카드 3개 - Compact style */}
          <motion.div 
            className="max-w-5xl mx-auto mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {translatedDifferentiators.map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-stone-300/65 bg-background p-5 transition-all duration-500 hover:border-[#C400FF]/18 md:p-6"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F8B529]/5 via-transparent to-[#C400FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Decorative arc */}
                  <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full border border-stone-400/8 transition-colors duration-500 group-hover:border-[#C400FF]/10" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Number indicator */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F8B529] via-[#C400FF] to-[#C400FF] flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-[#C400FF]/25">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-[#F8B529]/18 to-transparent" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold mb-2 leading-snug text-foreground">
                      {item.title}
                    </h3>
                    
                    {/* Subtitle & Description */}
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                      <span className="text-foreground/80 font-medium">{item.subtitle}</span>
                      <br />
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 한 줄 카피 with arrows */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-4">
              {t("ax.changing")}
            </p>
            {/* Double chevron arrows - 3D style */}
            <motion.div 
              className="flex flex-col items-center -space-y-3"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-7 h-7 text-[#C400FF]/40" strokeWidth={2.5} />
              <ChevronDown className="w-7 h-7 text-[#282640]/25" strokeWidth={2} />
            </motion.div>
          </motion.div>

          {/* 슬라이드: 사례/후기 3개 */}
          <TestimonialSlider testimonials={testimonials} />

          {/* 하단 KPI 4개 */}
          <StatsCounter impacts={impacts} />
        </div>
      </div>
    </section>
  );
};

export { AXSystemSection };

export default AXSystemSection;
