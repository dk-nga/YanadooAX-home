"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroMetricsMarquee } from "@/components/HeroMetricsMarquee";
import { InteractiveDemoSection } from "@/components/InteractiveDemoSection";
import { useLanguage } from "@/contexts/LanguageContext";

import step1Image from "@/assets/step1-discover.png";
import step2Image from "@/assets/step2-design.png";
import step3Image from "@/assets/step3-build.png";
import step4Image from "@/assets/step4-stick.png";

const getSteps = (t: (key: string) => string) => [
  {
    number: "01",
    title: "Discover",
    subtitle: t("ax.step1.subtitle"),
    tagline: t("ax.step1.tagline"),
    color: "#C400FF",
    image: step1Image.src,
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
    title: "Design",
    subtitle: t("ax.step2.subtitle"),
    tagline: t("ax.step2.tagline"),
    color: "#282640",
    image: step2Image.src,
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
    title: "Build Together",
    subtitle: "Co-Building & Live Implementation",
    tagline: t("ax.step3.tagline"),
    color: "#FF6B35",
    image: step3Image.src,
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
    title: "Make It Stick",
    subtitle: t("ax.step4.subtitle"),
    tagline: t("ax.step4.tagline"),
    color: "#10B981",
    image: step4Image.src,
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
  title: string;
  subtitle: string;
  tagline: string;
  color: string;
  image: string;
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

// Testimonial tabs component - selectable by role
const TestimonialSlider = ({ testimonials }: { testimonials: TestimonialType[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const activeTestimonial = testimonials[activeIndex];
  
  return (
    <motion.div 
      ref={ref}
      className="w-full mb-8 md:mb-16 px-2 md:px-0"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div 
        className="relative overflow-hidden rounded-2xl border border-stone-300/70 bg-white/92 shadow-[0_30px_90px_rgba(24,24,33,0.08)] backdrop-blur-sm md:rounded-3xl"
        initial={{ y: 60, rotateX: 5 }}
        animate={isInView ? { y: 0, rotateX: 0 } : { y: 60, rotateX: 5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ transformPerspective: 1000 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,181,41,0.08),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(196,0,255,0.08),transparent_24%)]" />

        <div className="relative z-10 border-b border-stone-200/80 px-4 py-4 md:px-8 md:py-5">
          <div className="flex flex-wrap gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeIndex === index
                    ? "border-transparent bg-[linear-gradient(135deg,#282640,#C400FF)] text-white shadow-[0_12px_24px_rgba(95,63,156,0.24)]"
                    : "border-stone-200 bg-white text-foreground/75 hover:border-[#C400FF]/20 hover:text-[#6b33c7]"
                }`}
              >
                {item.role}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="relative px-5 py-8 md:px-8 md:py-12 lg:pr-10">
            <motion.div 
              className="absolute left-5 top-5 md:left-8 md:top-7"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CurlyQuote className="w-5 h-5 md:w-16 md:h-16 text-[#C400FF]/30" isOpen={true} />
            </motion.div>
            
            <div className="relative z-10 min-h-[220px] pt-8 md:min-h-[260px] md:pt-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col justify-center"
                >
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[#C400FF]/15 bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#6b33c7] uppercase">
                      {activeTestimonial.role}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {activeTestimonial.company} · {activeTestimonial.employeeCount}
                    </span>
                  </div>

                  <h3 className="mb-1 text-xl font-black leading-tight text-foreground md:mb-2 md:text-3xl lg:text-4xl">
                    {activeTestimonial.title}
                  </h3>
                  <p className="mb-4 bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-base font-bold text-transparent md:text-xl">
                    {activeTestimonial.subtitle}
                  </p>
                  
                  <p className="max-w-3xl text-sm leading-relaxed text-foreground/72 md:text-lg md:leading-9">
                    {activeTestimonial.quote}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <motion.div 
              className="absolute bottom-3 right-4 md:bottom-5 md:right-6"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <CurlyQuote className="w-6 h-6 md:w-16 md:h-16 text-[#282640]/30" isOpen={false} />
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden border-l border-stone-200/80 bg-[linear-gradient(180deg,#faf9fc,#f6f3fb)] p-6 lg:flex"
            initial={{ opacity: 0, y: 40, x: 20 }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 40, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#f5f5f7] shadow-[0_22px_50px_rgba(40,38,64,0.14)]">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#e8e8ec] border-b border-[#d1d1d6]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-[#6e6e73] font-medium">
                    {activeTestimonial.company}
                  </span>
                </div>
                <div className="w-[52px]" />
              </div>
              
              <div className="h-[180px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeIndex}
                    src={activeTestimonial.image} 
                    alt={activeTestimonial.company}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>
              
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
                      <p className="font-bold text-foreground text-sm">{activeTestimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{activeTestimonial.employeeCount}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                        {activeTestimonial.company.slice(0, 2)}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="border-t border-stone-200/80 bg-[linear-gradient(180deg,#ffffff,#faf8fd)] px-4 py-4 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 overflow-hidden rounded-xl flex-shrink-0 md:h-14 md:w-14">
              <img 
                src={activeTestimonial.image} 
                alt={activeTestimonial.company}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">{activeTestimonial.role}</p>
              <p className="text-xs text-muted-foreground">
                {activeTestimonial.company} · {activeTestimonial.employeeCount}
              </p>
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

const DiscoverySprintSection = ({
  steps,
  activeIndex,
  onSelect,
}: {
  steps: StepType[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const activeStep = steps[activeIndex];
  const firstColumn = activeStep.expandedContent.details.slice(0, 2);
  const secondColumn = activeStep.expandedContent.details.slice(2);

  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-background pb-16 pt-6 md:pb-24 md:pt-12"
    >
      <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="discoveryCurve" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8B529" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#C400FF" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -100 160 Q 420 60 820 220 T 1500 140"
          stroke="url(#discoveryCurve)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute left-[-120px] top-8 h-64 w-64 rounded-full bg-[#F8B529]/10 blur-3xl" />
      <div className="absolute right-[-100px] top-24 h-72 w-72 rounded-full bg-[#C400FF]/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-8 text-center md:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C400FF]/15 bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 px-4 py-2">
              <span className="text-sm font-bold text-[#C400FF]">{t("ax.discovery.badge")}</span>
            </div>
            <h3 className="text-[1.45rem] font-black leading-tight text-foreground md:text-4xl">
              <span className="whitespace-nowrap">{t("ax.discovery.title")}</span>
            </h3>
            <p className="mx-auto mt-3 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("ax.discovery.subtitle")}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 md:mb-8 md:grid-cols-4">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => onSelect(index)}
                  className={`group relative min-w-0 overflow-hidden rounded-[24px] border bg-white/80 p-4 text-left shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C400FF]/40 md:rounded-[28px] md:p-5 ${
                    isActive
                      ? "border-stone-300/80 shadow-[0_24px_60px_rgba(98,88,139,0.12)]"
                      : "border-stone-200/80 hover:-translate-y-1 hover:border-stone-300/80"
                  }`}
                  aria-pressed={isActive}
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${step.color}10 0%, rgba(255,255,255,0.9) 55%, rgba(255,255,255,0.98) 100%)`,
                    }}
                  />
                  <div className="relative z-10">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold tracking-[0.24em] text-muted-foreground">
                          STEP {step.number}
                        </p>
                        <p
                          className="mt-1 text-lg font-bold"
                          style={{ color: isActive ? step.color : "hsl(var(--foreground))" }}
                        >
                          {step.title}
                        </p>
                      </div>
                      <span
                        className="mt-1 inline-flex h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: isActive ? step.color : "rgba(120,120,140,0.24)" }}
                      />
                    </div>

                    <div className="relative flex h-36 items-end justify-center overflow-hidden rounded-[22px] border border-stone-200/80 bg-[#fcfbfa]">
                      <div
                        className="absolute inset-y-0 right-0 w-1/2"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, transparent 10%, ${step.color}20 100%)`
                            : "linear-gradient(135deg, transparent 10%, rgba(120,120,140,0.08) 100%)",
                        }}
                      />
                      <img
                        src={step.image}
                        alt={step.subtitle}
                        className={`relative z-10 h-28 w-auto object-contain transition-transform duration-300 ${
                          isActive ? "scale-105" : "scale-100 opacity-85"
                        }`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[32px] border border-stone-300/70 bg-white/90 shadow-[0_30px_90px_rgba(24,24,33,0.06)] backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.number}
                className="grid gap-0 lg:grid-cols-[1.05fr_1fr]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="relative overflow-hidden border-b border-stone-200/80 p-7 md:p-10 lg:border-b-0 lg:border-r">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${activeStep.color}08 0%, rgba(255,255,255,0.92) 48%, rgba(255,255,255,1) 100%)`,
                    }}
                  />
                  <div className="absolute right-[-44px] top-6 h-40 w-40 rounded-full border border-stone-300/40" />
                  <div className="absolute bottom-[-70px] left-[-30px] h-40 w-40 rounded-full bg-[#f7f4fb]" />

                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-3">
                      <span
                        className="rounded-full px-3 py-1 text-xs font-bold tracking-[0.2em]"
                        style={{ backgroundColor: `${activeStep.color}14`, color: activeStep.color }}
                      >
                        STEP {activeStep.number}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">{activeStep.title}</span>
                    </div>

                    <h3 className="max-w-md whitespace-pre-line text-3xl font-black leading-[1.05] text-foreground md:text-5xl">
                      {activeStep.subtitle}
                    </h3>

                    <p className="mt-5 max-w-lg whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
                      {activeStep.expandedContent.subtitle}
                    </p>

                    <p className="mt-4 max-w-lg whitespace-pre-line text-sm leading-relaxed text-foreground/70 md:text-base">
                      {activeStep.tagline}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className="rounded-xl border px-5 py-3 text-sm font-semibold shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                        style={{
                          borderColor: `${activeStep.color}45`,
                          color: "hsl(var(--foreground))",
                          backgroundColor: `${activeStep.color}08`,
                        }}
                      >
                        {activeStep.expandedContent.outputs[0]}
                      </button>
                      <div className="flex flex-wrap gap-2">
                        {activeStep.expandedContent.outputs.slice(1).map((output) => (
                          <span
                            key={output}
                            className="rounded-full border px-3 py-1.5 text-xs font-medium"
                            style={{
                              borderColor: `${activeStep.color}30`,
                              color: activeStep.color,
                              backgroundColor: `${activeStep.color}0D`,
                            }}
                          >
                            {output}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid content-start gap-0 p-7 md:p-10">
                  {[
                    { title: firstColumn[0], body: firstColumn.slice(1).join(" ") },
                    {
                      title: secondColumn[0] ?? activeStep.expandedContent.outputs[1],
                      body:
                        secondColumn.slice(1).join(" ") ||
                        activeStep.expandedContent.outputs.join(" · "),
                    },
                  ].map((item, index) => (
                    <div
                      key={`${activeStep.number}-${index}`}
                      className={`py-5 ${index === 0 ? "border-b border-stone-200/80" : ""}`}
                    >
                      <h4 className="text-2xl font-bold leading-tight text-foreground">{item.title}</h4>
                      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AXSystemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

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
      <div className="relative flex min-h-screen flex-col items-center overflow-hidden overflow-x-hidden pb-24 md:pb-28">
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
            viewport={{ once: true, amount: 0.3 }}
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
              {t("ax.intro.title1")}
              {t("ax.intro.title2")}
              <br className="lg:hidden" />
              <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">{t("ax.intro.title3")}</span>
              {t("ax.intro.title4")}
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
              className="mb-6 grid gap-4 md:mb-8 md:grid-cols-2"
              variants={itemVariants}
            >
              <article className="group relative overflow-hidden rounded-3xl border border-stone-300/65 bg-white p-3 shadow-[0_24px_60px_rgba(40,38,64,0.08)]">
                <div className="relative overflow-hidden rounded-[1.35rem] border border-stone-200/80 bg-stone-50">
                  <img
                    src="/example-a.png"
                    alt="영상 팀 효율화 사례"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-[linear-gradient(135deg,#F8B529,#C400FF)] px-3.5 py-1.5 text-sm font-bold text-white shadow-lg">
                    8명 → 1명
                  </div>
                </div>
                <div className="px-1 pb-1 pt-4 text-left">
                  <p className="text-sm font-semibold tracking-[0.12em] text-[#C400FF]">AI 쇼츠 콘텐츠 자동생성</p>
                  <h3 className="mt-2 text-lg font-black text-foreground md:text-xl">영상 제작 팀 운영 인력 87.5% 절감</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">반복 편집과 제작 흐름을 AX로 재설계해 8명이 하던 운영을 1명이 관리하는 구조로 바꿨습니다.</p>
                </div>
              </article>

              <article className="group relative overflow-hidden rounded-3xl border border-stone-300/65 bg-white p-3 shadow-[0_24px_60px_rgba(40,38,64,0.08)]">
                <div className="relative overflow-hidden rounded-[1.35rem] border border-stone-200/80 bg-stone-50">
                  <img
                    src="/example-b.png"
                    alt="촬영 화보 이미지 리드 타임 단축 사례"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-[linear-gradient(135deg,#F8B529,#C400FF)] px-3.5 py-1.5 text-sm font-bold text-white shadow-lg">
                    리드 타임 -90.6%
                  </div>
                </div>
                <div className="px-1 pb-1 pt-4 text-left">
                  <p className="text-sm font-semibold tracking-[0.12em] text-[#C400FF]">AI 이미지 생성</p>
                  <h3 className="mt-2 text-lg font-black text-foreground md:text-xl">촬영 화보 이미지 리드 타임 약 90.6% 감소</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">시안 정리, 선별, 후속 제작 연결을 자동화해 화보 이미지 처리 시간을 대폭 줄였습니다.</p>
                </div>
              </article>
            </motion.div>
          </motion.div>
        </div>
        
        <HeroMetricsMarquee className="relative z-20 mt-10 md:mt-12" />

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

      <InteractiveDemoSection />

      {/* Part 2: Unified discovery sprint section */}
      <DiscoverySprintSection
        steps={steps}
        activeIndex={activeStepIndex}
        onSelect={setActiveStepIndex}
      />

      {/* Part 3: Differentiators + Testimonials + Impact */}
      <div className="relative flex min-h-screen items-center overflow-hidden overflow-x-hidden py-24">
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
                    <h3 className="mb-2 whitespace-pre-line text-base font-bold leading-snug text-foreground md:text-lg">
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
