"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, BarChart3, Building2, ChevronLeft, ChevronRight, Clock3, Compass, PenTool, TrendingUp, Users } from "lucide-react";
import { HeroMetricsMarquee } from "@/components/HeroMetricsMarquee";
import { InteractiveDemoSection } from "@/components/InteractiveDemoSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "@/i18n/navigation";

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

const getRoleCases = (t: (key: string) => string) => [
  {
    id: 1,
    role: t("ax.roleCases.case1.role"),
    metric: t("ax.roleCases.case1.metric"),
    title: t("ax.roleCases.case1.title"),
    description: t("ax.roleCases.case1.description"),
    highlights: [t("ax.roleCases.case1.highlight1"), t("ax.roleCases.case1.highlight2")],
    icon: "design",
  },
  {
    id: 2,
    role: t("ax.roleCases.case2.role"),
    metric: t("ax.roleCases.case2.metric"),
    title: t("ax.roleCases.case2.title"),
    description: t("ax.roleCases.case2.description"),
    highlights: [t("ax.roleCases.case2.highlight1"), t("ax.roleCases.case2.highlight2")],
    icon: "ops",
  },
  {
    id: 3,
    role: t("ax.roleCases.case3.role"),
    metric: t("ax.roleCases.case3.metric"),
    title: t("ax.roleCases.case3.title"),
    description: t("ax.roleCases.case3.description"),
    highlights: [t("ax.roleCases.case3.highlight1"), t("ax.roleCases.case3.highlight2")],
    icon: "marketing",
  },
  {
    id: 4,
    role: t("ax.roleCases.case4.role"),
    metric: t("ax.roleCases.case4.metric"),
    title: t("ax.roleCases.case4.title"),
    description: t("ax.roleCases.case4.description"),
    highlights: [t("ax.roleCases.case4.highlight1"), t("ax.roleCases.case4.highlight2")],
    icon: "sales",
  },
  {
    id: 5,
    role: t("ax.roleCases.case5.role"),
    metric: t("ax.roleCases.case5.metric"),
    title: t("ax.roleCases.case5.title"),
    description: t("ax.roleCases.case5.description"),
    highlights: [t("ax.roleCases.case5.highlight1"), t("ax.roleCases.case5.highlight2")],
    icon: "exec",
  },
];

const getIndustryCases = (t: (key: string) => string) => [
  {
    id: 1,
    industry: t("ax.industryCases.case1.industry"),
    metric: t("ax.industryCases.case1.metric"),
    title: t("ax.industryCases.case1.title"),
    description: t("ax.industryCases.case1.description"),
    highlights: [
      t("ax.industryCases.case1.highlight1"),
      t("ax.industryCases.case1.highlight2"),
    ],
  },
  {
    id: 2,
    industry: t("ax.industryCases.case2.industry"),
    metric: t("ax.industryCases.case2.metric"),
    title: t("ax.industryCases.case2.title"),
    description: t("ax.industryCases.case2.description"),
    highlights: [
      t("ax.industryCases.case2.highlight1"),
      t("ax.industryCases.case2.highlight2"),
    ],
  },
  {
    id: 3,
    industry: t("ax.industryCases.case3.industry"),
    metric: t("ax.industryCases.case3.metric"),
    title: t("ax.industryCases.case3.title"),
    description: t("ax.industryCases.case3.description"),
    highlights: [
      t("ax.industryCases.case3.highlight1"),
      t("ax.industryCases.case3.highlight2"),
    ],
  },
  {
    id: 4,
    industry: t("ax.industryCases.case4.industry"),
    metric: t("ax.industryCases.case4.metric"),
    title: t("ax.industryCases.case4.title"),
    description: t("ax.industryCases.case4.description"),
    highlights: [
      t("ax.industryCases.case4.highlight1"),
      t("ax.industryCases.case4.highlight2"),
    ],
  },
];

const getVerifiedResults = (t: (key: string) => string) => ({
  featured: {
    eyebrow: t("ax.verifiedResults.featured.eyebrow"),
    tag: t("ax.verifiedResults.featured.tag"),
    title: t("ax.verifiedResults.featured.title"),
    problemLabel: t("ax.verifiedResults.featured.problemLabel"),
    problem: t("ax.verifiedResults.featured.problem"),
    solutionLabel: t("ax.verifiedResults.featured.solutionLabel"),
    solution: t("ax.verifiedResults.featured.solution"),
    stats: [
      {
        value: t("ax.verifiedResults.featured.stat1.value"),
        label: t("ax.verifiedResults.featured.stat1.label"),
      },
      {
        value: t("ax.verifiedResults.featured.stat2.value"),
        label: t("ax.verifiedResults.featured.stat2.label"),
      },
      {
        value: t("ax.verifiedResults.featured.stat3.value"),
        label: t("ax.verifiedResults.featured.stat3.label"),
      },
      {
        value: t("ax.verifiedResults.featured.stat4.value"),
        label: t("ax.verifiedResults.featured.stat4.label"),
      },
    ],
  },
  cards: [
    {
      badge: t("ax.verifiedResults.card1.badge"),
      team: t("ax.verifiedResults.card1.team"),
      title: t("ax.verifiedResults.card1.title"),
      negative: t("ax.verifiedResults.card1.negative"),
      positive: t("ax.verifiedResults.card1.positive"),
      stat1Value: t("ax.verifiedResults.card1.stat1.value"),
      stat1Label: t("ax.verifiedResults.card1.stat1.label"),
      stat2Value: t("ax.verifiedResults.card1.stat2.value"),
      stat2Label: t("ax.verifiedResults.card1.stat2.label"),
      detail: { productDemo: true },
    },
    {
      badge: t("ax.verifiedResults.card2.badge"),
      team: t("ax.verifiedResults.card2.team"),
      title: t("ax.verifiedResults.card2.title"),
      negative: t("ax.verifiedResults.card2.negative"),
      positive: t("ax.verifiedResults.card2.positive"),
      stat1Value: t("ax.verifiedResults.card2.stat1.value"),
      stat1Label: t("ax.verifiedResults.card2.stat1.label"),
      stat2Value: t("ax.verifiedResults.card2.stat2.value"),
      stat2Label: t("ax.verifiedResults.card2.stat2.label"),
      detail: {
        problem: t("ax.verifiedResults.card2.detail.problem"),
        solution: t("ax.verifiedResults.card2.detail.solution"),
        stack: t("ax.verifiedResults.card2.detail.stack"),
        workflow: [
          t("ax.verifiedResults.card2.detail.workflow.0"),
          t("ax.verifiedResults.card2.detail.workflow.1"),
          t("ax.verifiedResults.card2.detail.workflow.2"),
          t("ax.verifiedResults.card2.detail.workflow.3"),
        ],
        expand: t("ax.verifiedResults.card2.detail.expand"),
      },
    },
    {
      badge: t("ax.verifiedResults.card3.badge"),
      team: t("ax.verifiedResults.card3.team"),
      title: t("ax.verifiedResults.card3.title"),
      negative: t("ax.verifiedResults.card3.negative"),
      positive: t("ax.verifiedResults.card3.positive"),
      stat1Value: t("ax.verifiedResults.card3.stat1.value"),
      stat1Label: t("ax.verifiedResults.card3.stat1.label"),
      stat2Value: t("ax.verifiedResults.card3.stat2.value"),
      stat2Label: t("ax.verifiedResults.card3.stat2.label"),
      detail: { contractDemo: true },
    },
    {
      badge: t("ax.verifiedResults.card4.badge"),
      team: t("ax.verifiedResults.card4.team"),
      title: t("ax.verifiedResults.card4.title"),
      negative: t("ax.verifiedResults.card4.negative"),
      positive: t("ax.verifiedResults.card4.positive"),
      stat1Value: t("ax.verifiedResults.card4.stat1.value"),
      stat1Label: t("ax.verifiedResults.card4.stat1.label"),
      stat2Value: t("ax.verifiedResults.card4.stat2.value"),
      stat2Label: t("ax.verifiedResults.card4.stat2.label"),
      detail: {
        problem: t("ax.verifiedResults.card4.detail.problem"),
        solution: t("ax.verifiedResults.card4.detail.solution"),
        stack: t("ax.verifiedResults.card4.detail.stack"),
        workflow: [
          t("ax.verifiedResults.card4.detail.workflow.0"),
          t("ax.verifiedResults.card4.detail.workflow.1"),
          t("ax.verifiedResults.card4.detail.workflow.2"),
          t("ax.verifiedResults.card4.detail.workflow.3"),
        ],
        expand: t("ax.verifiedResults.card4.detail.expand"),
      },
    },
    {
      badge: t("ax.verifiedResults.card5.badge"),
      team: t("ax.verifiedResults.card5.team"),
      title: t("ax.verifiedResults.card5.title"),
      negative: t("ax.verifiedResults.card5.negative"),
      positive: t("ax.verifiedResults.card5.positive"),
      stat1Value: t("ax.verifiedResults.card5.stat1.value"),
      stat1Label: t("ax.verifiedResults.card5.stat1.label"),
      stat2Value: t("ax.verifiedResults.card5.stat2.value"),
      stat2Label: t("ax.verifiedResults.card5.stat2.label"),
      detail: {
        chatMode: true,
        persona: t("ax.verifiedResults.card5.detail.persona"),
        messages: [0, 1, 2, 3, 4, 5].map((i) => ({
          role: i % 2 === 0 ? "user" : "ai",
          text: t(`ax.verifiedResults.card5.detail.messages.${i}.text`),
        })) as { role: "user" | "ai"; text: string }[],
      },
    },
    {
      badge: t("ax.verifiedResults.card6.badge"),
      team: t("ax.verifiedResults.card6.team"),
      title: t("ax.verifiedResults.card6.title"),
      negative: t("ax.verifiedResults.card6.negative"),
      positive: t("ax.verifiedResults.card6.positive"),
      stat1Value: t("ax.verifiedResults.card6.stat1.value"),
      stat1Label: t("ax.verifiedResults.card6.stat1.label"),
      stat2Value: t("ax.verifiedResults.card6.stat2.value"),
      stat2Label: t("ax.verifiedResults.card6.stat2.label"),
      detail: { financeDemo: true },
    },
  ],
  visualProofs: [
    {
      image: "/example-a.png",
      alt: t("ax.verifiedResults.visual1.alt"),
      metric: t("ax.verifiedResults.visual1.metric"),
      label: t("ax.verifiedResults.visual1.label"),
      title: t("ax.verifiedResults.visual1.title"),
      description: t("ax.verifiedResults.visual1.description"),
    },
    {
      image: "/example-b.png",
      alt: t("ax.verifiedResults.visual2.alt"),
      metric: t("ax.verifiedResults.visual2.metric"),
      label: t("ax.verifiedResults.visual2.label"),
      title: t("ax.verifiedResults.visual2.title"),
      description: t("ax.verifiedResults.visual2.description"),
    },
  ],
});

type DemoScenarioId = "support" | "content" | "report" | "marketing" | "sales";

type ProblemCardType = {
  id: number;
  title: string;
  description: string;
  icon: typeof Clock3;
  scenarioId: DemoScenarioId;
  iconClassName: string;
};

const getProblemCards = (t: (key: string) => string): ProblemCardType[] => [
  {
    id: 1,
    title: t("ax.problems.card1.title"),
    description: t("ax.problems.card1.description"),
    icon: TrendingUp,
    scenarioId: "report",
    iconClassName: "text-[#5f7fd6]",
  },
  {
    id: 2,
    title: t("ax.problems.card2.title"),
    description: t("ax.problems.card2.description"),
    icon: Users,
    scenarioId: "support",
    iconClassName: "text-[#7396c4]",
  },
  {
    id: 3,
    title: t("ax.problems.card3.title"),
    description: t("ax.problems.card3.description"),
    icon: Clock3,
    scenarioId: "support",
    iconClassName: "text-[#6b7b93]",
  },
  {
    id: 4,
    title: t("ax.problems.card4.title"),
    description: t("ax.problems.card4.description"),
    icon: Building2,
    scenarioId: "content",
    iconClassName: "text-[#d9892f]",
  },
  {
    id: 5,
    title: t("ax.problems.card5.title"),
    description: t("ax.problems.card5.description"),
    icon: Compass,
    scenarioId: "marketing",
    iconClassName: "text-[#d66552]",
  },
  {
    id: 6,
    title: t("ax.problems.card6.title"),
    description: t("ax.problems.card6.description"),
    icon: BarChart3,
    scenarioId: "report",
    iconClassName: "text-[#d6a12e]",
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

type IndustryCaseType = {
  id: number;
  industry: string;
  metric: string;
  title: string;
  description: string;
  highlights: string[];
};

type VerifiedVisualProofType = {
  image: string;
  alt: string;
  metric: string;
  label: string;
  title: string;
  description: string;
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

const INDUSTRY_ICONS: Record<string, string> = {
  "게임": "🎮", "이커머스": "🛍️", "제조": "🏭", "교육": "🎓",
};

const IndustryCasesSection = ({ cases }: { cases: IndustryCaseType[] }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeTab, setActiveTab] = useState<string>("전체");

  const tabs = ["전체", ...cases.map((c) => c.industry)];
  const filtered = activeTab === "전체" ? cases : cases.filter((c) => c.industry === activeTab);

  return (
    <motion.div
      ref={ref}
      id="industry"
      className="mx-auto mb-10 max-w-6xl md:mb-14"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 헤더 */}
      <div className="mb-6 md:mb-8">
        <span className="text-xs font-bold tracking-widest text-[#C400FF]">{t("ax.industryCases.badge")}</span>
        <h3 className="mt-2 text-2xl font-black leading-tight text-foreground md:text-4xl">
          {t("ax.industryCases.title")}
        </h3>
        <p className="mt-2 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground md:text-base">
          {t("ax.industryCases.subtitle")}
        </p>
      </div>

      {/* 카테고리 탭 */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? "border-[#C400FF] bg-[#C400FF] text-white shadow-[0_4px_16px_rgba(196,0,255,0.3)]"
                : "border-stone-200 bg-white text-stone-500 hover:border-[#C400FF]/40 hover:text-[#C400FF]"
            }`}
          >
            {tab !== "전체" && <span>{INDUSTRY_ICONS[tab] ?? "📌"}</span>}
            {tab}
          </button>
        ))}
      </div>

      {/* 카드 그리드 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className={`grid gap-5 ${activeTab === "전체" ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-1 xl:grid-cols-1"}`}
        >
          {filtered.map((item) => (
            <article
              key={item.id}
              className={`relative overflow-hidden rounded-[24px] border border-stone-200 bg-white p-6 shadow-sm ${
                activeTab !== "전체" ? "flex gap-8 md:p-8" : ""
              }`}
            >
              {/* 배경 그라디언트 */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,181,41,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(196,0,255,0.05),transparent_30%)]" />

              {/* 업종 아이콘 (확장 시 왼쪽 고정) */}
              {activeTab !== "전체" && (
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F8B529]/15 to-[#C400FF]/15 text-3xl">
                  {INDUSTRY_ICONS[item.industry] ?? "📌"}
                </div>
              )}

              <div className="relative z-10 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {activeTab === "전체" && (
                    <span className="text-lg">{INDUSTRY_ICONS[item.industry] ?? "📌"}</span>
                  )}
                  <span className="rounded-full border border-[#C400FF]/20 bg-[#f8f0ff] px-3 py-0.5 text-xs font-bold text-[#6b33c7]">
                    {item.industry}
                  </span>
                  <span className="ml-auto bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-sm font-black text-transparent">
                    {item.metric}
                  </span>
                </div>

                <h4 className={`font-black leading-tight text-foreground ${activeTab !== "전체" ? "text-2xl md:text-3xl" : "text-lg"}`}>
                  {item.title}
                </h4>
                <p className={`mt-2 leading-relaxed text-stone-500 ${activeTab !== "전체" ? "text-base" : "text-sm"}`}>
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.highlights.map((h) => (
                    <span key={h} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

type RoleCaseType = {
  id: number;
  role: string;
  metric: string;
  title: string;
  description: string;
  highlights: string[];
  icon: string;
};

const ROLE_CONFIG: Record<string, { icon: string; accent: string; bg: string }> = {
  design:    { icon: "🎨", accent: "#F8B529", bg: "rgba(248,181,41,0.08)" },
  ops:       { icon: "⚙️", accent: "#282640", bg: "rgba(40,38,64,0.06)" },
  marketing: { icon: "📣", accent: "#C400FF", bg: "rgba(196,0,255,0.07)" },
  sales:     { icon: "💼", accent: "#10b981", bg: "rgba(16,185,129,0.07)" },
  exec:      { icon: "🧭", accent: "#6366f1", bg: "rgba(99,102,241,0.07)" },
};

const RoleCasesSection = ({ cases }: { cases: RoleCaseType[] }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeRole, setActiveRole] = useState<number>(cases[0]?.id ?? 1);

  const active = cases.find((c) => c.id === activeRole) ?? cases[0];
  const cfg = active ? (ROLE_CONFIG[active.icon] ?? ROLE_CONFIG.ops) : ROLE_CONFIG.ops;

  return (
    <motion.div
      ref={ref}
      id="role"
      className="mx-auto mb-10 max-w-6xl md:mb-14"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 헤더 */}
      <div className="mb-6 md:mb-8">
        <span className="text-xs font-bold tracking-widest text-[#282640]/60">{t("ax.roleCases.badge")}</span>
        <h3 className="mt-2 text-2xl font-black leading-tight text-foreground md:text-4xl">
          {t("ax.roleCases.title")}
        </h3>
        <p className="mt-2 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground md:text-base">
          {t("ax.roleCases.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        {/* 왼쪽: 직무 탭 목록 */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:overflow-x-auto sm:pb-1 lg:flex-col lg:pb-0">
          {cases.map((item) => {
            const c = ROLE_CONFIG[item.icon] ?? ROLE_CONFIG.ops;
            const isActive = item.id === activeRole;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRole(item.id)}
                className={`flex w-full items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-all duration-200 sm:shrink-0 sm:w-auto lg:w-full ${
                  isActive
                    ? "border-transparent text-white shadow-lg"
                    : "border-stone-200 bg-white text-stone-500 hover:border-stone-300"
                }`}
                style={isActive ? { background: `linear-gradient(135deg, ${c.accent}ee, ${c.accent}99)` } : {}}
              >
                <span className="text-xl">{c.icon}</span>
                <span className="text-sm font-bold">{item.role}</span>
                {isActive && (
                  <span className="ml-auto text-xs font-black opacity-90">{item.metric}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 오른쪽: 선택된 직무 상세 */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-[24px] border border-stone-200 p-6 md:p-8"
              style={{ background: cfg.bg }}
            >
              {/* 배경 accent */}
              <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full opacity-20 blur-3xl"
                style={{ background: cfg.accent }} />

              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                    style={{ background: `${cfg.accent}18` }}>
                    {cfg.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: cfg.accent }}>{active.role}</span>
                      <span className="rounded-full px-2.5 py-0.5 text-xs font-black text-white"
                        style={{ background: cfg.accent }}>{active.metric}</span>
                    </div>
                  </div>
                </div>

                <h4 className="text-xl font-black leading-tight text-foreground md:text-2xl lg:text-3xl">
                  {active.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 md:text-base">
                  {active.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {active.highlights.map((h) => (
                    <span key={h}
                      className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                      style={{ borderColor: `${cfg.accent}30`, color: cfg.accent, background: `${cfg.accent}0d` }}>
                      {h}
                    </span>
                  ))}
                </div>

                {/* 경영팀 특별 카드 */}
                {active.icon === "exec" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="mt-6 space-y-3"
                  >
                    {/* 전파 프레임워크 */}
                    <div className="rounded-2xl border border-indigo-100 bg-white p-5">
                      <p className="mb-3 text-xs font-bold tracking-widest text-indigo-400">AI 문화 전파 프레임워크</p>
                      <div className="flex items-center gap-1">
                        {[
                          { step: "01", label: "암묵지 포착", desc: "상위 직원 패턴 분석" },
                          { step: "02", label: "자산화", desc: "프롬프트·SOP 변환" },
                          { step: "03", label: "전사 확산", desc: "AI-Q 등급 체계" },
                        ].map(({ step, label, desc }, i) => (
                          <div key={step} className="flex flex-1 items-center gap-1">
                            <div className="flex-1 rounded-xl bg-indigo-50 p-3 text-center">
                              <span className="text-[10px] font-black text-indigo-300">{step}</span>
                              <p className="mt-0.5 text-xs font-bold text-indigo-700">{label}</p>
                              <p className="mt-0.5 text-[10px] leading-tight text-indigo-400">{desc}</p>
                            </div>
                            {i < 2 && <span className="shrink-0 text-indigo-200">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI-Q 등급 시각화 */}
                    <div className="rounded-2xl border border-indigo-100 bg-white p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-bold tracking-widest text-indigo-400">AI-Q 등급 체계</p>
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-500">
                          패션/유통 7개 팀 실증
                        </span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { grade: "S", label: "AI를 업무 구조로 활용, 타부서 확산 가능", bar: 100, color: "#6366f1", bg: "#eef2ff", users: 2 },
                          { grade: "A", label: "대부분 업무에 AI 적용, 생산성 개선 명확", bar: 78,  color: "#8b5cf6", bg: "#f5f3ff", users: 5 },
                          { grade: "B", label: "일부 활용, 코칭으로 성장 가능",            bar: 52,  color: "#a78bfa", bg: "#faf5ff", users: 12 },
                          { grade: "C", label: "기초 단계, 교육·환경 조성 필요",            bar: 28,  color: "#c4b5fd", bg: "#fdf4ff", users: 8 },
                        ].map(({ grade, label, bar, color, bg, users }, i) => (
                          <div key={grade} className="flex items-center gap-3">
                            {/* 등급 배지 */}
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black text-white"
                              style={{ background: color }}
                            >
                              {grade}
                            </span>
                            <div className="flex-1">
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-[11px] text-stone-500">{label}</span>
                                <span className="text-[10px] font-semibold text-stone-400">{users}명</span>
                              </div>
                              {/* 진행 바 */}
                              <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: bg }}>
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ background: color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${bar}%` }}
                                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-[10px] text-stone-400">
                        ※ 12주 프로그램 후 S·A 등급 비율 25% → 67%로 향상
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CasesBridgeSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="mx-auto mb-14 max-w-4xl"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="overflow-hidden rounded-[28px] border border-stone-200/80 bg-white/80 shadow-[0_12px_48px_rgba(24,24,33,0.07)] backdrop-blur-sm">
        <div className="px-7 py-7 text-center md:px-12 md:py-10">
          <p className="mb-1 text-sm font-bold uppercase tracking-[0.2em] text-[#C400FF]">CASE LIBRARY</p>
          <h3 className="text-xl font-black text-foreground md:text-3xl">{t("ax.casesBridge.title")}</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            {t("ax.casesBridge.subtitle")}
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/cases"
              className="group flex items-center gap-2 rounded-full border border-[#282640]/20 bg-[#282640] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#282640]/90 hover:shadow-md"
            >
              <Building2 className="h-4 w-4" />
              {t("ax.casesBridge.industryBtn")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/cases"
              className="group flex items-center gap-2 rounded-full border border-[#C400FF]/30 bg-white px-6 py-3 text-sm font-bold text-[#282640] shadow-sm transition-all hover:border-[#C400FF]/60 hover:shadow-md"
            >
              <Users className="h-4 w-4 text-[#C400FF]" />
              {t("ax.casesBridge.roleBtn")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

type ResultCard = ReturnType<typeof getVerifiedResults>["cards"][number];

// ── 채팅 데모 모달 ──────────────────────────────────────────────
// ── 계약서 자동화 흐름 데모 모달 ─────────────────────────────────
const CONTRACT_FORM_FIELDS = [
  { label: "성명", value: "김지수" },
  { label: "직책", value: "시니어 디자이너" },
  { label: "입사일", value: "2025.10.01" },
  { label: "계약기간", value: "1년 (자동 갱신)" },
  { label: "급여", value: "연 5,200만원" },
];

const CONTRACT_LINES = [
  "근로계약서",
  "",
  "사용자: (주)야나두AX  |  근로자: 김지수",
  "직책: 시니어 디자이너",
  "계약기간: 2025.10.01 ~ 2026.09.30",
  "급여: 연 52,000,000원",
  "",
  "제1조(근무장소) 본사 및 원격근무 병행",
  "제2조(업무내용) UI/UX 디자인 업무 전반",
  "제3조(근무시간) 09:00~18:00, 주 40시간",
  "...",
  "서명란: ___________ (인)",
];

const STEPS = [
  { id: "form",    icon: "📋", label: "폼 입력",      time: "0초" },
  { id: "gen",     icon: "⚡", label: "계약서 생성",  time: "3초" },
  { id: "sign",    icon: "✉️", label: "서명 링크 발송", time: "4초" },
  { id: "archive", icon: "📁", label: "문서 자동 보관", time: "5분 후" },
];

const ContractAutoDemoModal = ({ onClose }: { onClose: () => void }) => {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [formFields, setFormFields] = useState(0);
  const [contractLines, setContractLines] = useState(0);
  const [emailVisible, setEmailVisible] = useState(false);
  const [archiveDone, setArchiveDone] = useState(false);

  const run = () => {
    setPhase("running");
    setActiveStep(0);
    setFormFields(0);
    setContractLines(0);
    setEmailVisible(false);
    setArchiveDone(false);

    // Step 0: Form fields appear
    CONTRACT_FORM_FIELDS.forEach((_, i) =>
      setTimeout(() => setFormFields(i + 1), 200 + i * 280)
    );

    // Step 1: Contract generation
    const genStart = 200 + CONTRACT_FORM_FIELDS.length * 280 + 400;
    setTimeout(() => setActiveStep(1), genStart);
    CONTRACT_LINES.forEach((_, i) =>
      setTimeout(() => setContractLines(i + 1), genStart + 300 + i * 120)
    );

    // Step 2: Email
    const emailStart = genStart + 300 + CONTRACT_LINES.length * 120 + 300;
    setTimeout(() => { setActiveStep(2); setEmailVisible(true); }, emailStart);

    // Step 3: Archive + done
    setTimeout(() => { setActiveStep(3); setArchiveDone(true); }, emailStart + 900);
    setTimeout(() => setPhase("done"), emailStart + 1600);
  };

  const BEFORE = ["담당자가 Word 수동 작성", "서명 요청 이메일 개별 발송", "반려·재발송 반복", "서류 폴더 수동 보관", "처리까지 평균 2~3일"];
  const AFTER  = ["폼 입력 한 번으로 완료", "계약서 자동 생성 (3초)", "전자서명 링크 자동 발송", "완료 즉시 Drive 자동 분류", "처리까지 5분"];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[24px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.2)]"
          style={{ maxHeight: "90vh" }}
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between border-b border-black/8 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-gradient-to-r from-[#282640] to-[#6366f1] px-3 py-1 text-[11px] font-bold text-white">
                HR · 계약 자동화
              </span>
              {phase === "done" && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-xs font-bold text-emerald-600">✓ 5분 내 처리 완료</motion.span>
              )}
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100">✕</button>
          </div>

          <div className="overflow-y-auto">
            {/* Before / After 비교 (항상 표시) */}
            <div className="grid grid-cols-1 gap-0 border-b border-black/6 sm:grid-cols-2">
              <div className="border-r border-black/6 p-4">
                <p className="mb-2 text-xs font-bold tracking-widest text-rose-400">BEFORE · 수동</p>
                <div className="space-y-1.5">
                  {BEFORE.map((t) => (
                    <div key={t} className="flex items-start gap-2 text-xs text-slate-500">
                      <span className="mt-0.5 text-rose-300">✕</span>{t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <p className="mb-2 text-xs font-bold tracking-widest text-emerald-500">AFTER · AI 자동화</p>
                <div className="space-y-1.5">
                  {AFTER.map((t) => (
                    <div key={t} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="mt-0.5 text-emerald-400">✓</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 스텝 인디케이터 */}
            <div className="flex border-b border-black/6">
              {STEPS.map((s, i) => (
                <div key={s.id}
                  className={`flex flex-1 flex-col items-center gap-1 py-3 text-center transition-colors ${
                    activeStep === i ? "bg-[#6366f1]/5" : activeStep > i ? "bg-emerald-50" : ""
                  }`}>
                  <span className="text-base">{s.icon}</span>
                  <span className={`text-[11px] font-bold ${
                    activeStep === i ? "text-[#6366f1]" : activeStep > i ? "text-emerald-600" : "text-slate-300"
                  }`}>{s.label}</span>
                  <span className="text-[10px] text-slate-300">{s.time}</span>
                  {activeStep > i && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="text-xs text-emerald-500 font-bold">✓</motion.span>
                  )}
                </div>
              ))}
            </div>

            {/* 메인 애니메이션 영역 */}
            <div className="grid min-h-[200px] grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-0">
              {/* 왼쪽: 폼 → 계약서 */}
              <div className="border-r border-black/6 pr-4">
                {(activeStep === 0 || phase === "idle") && (
                  <div>
                    <p className="mb-3 text-[10px] font-bold tracking-widest text-slate-400">근로계약 입력 폼</p>
                    <div className="space-y-2">
                      {CONTRACT_FORM_FIELDS.slice(0, Math.max(formFields, phase === "idle" ? CONTRACT_FORM_FIELDS.length : 0)).map((f) => (
                        <motion.div key={f.label}
                          initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                        >
                          <span className="w-16 shrink-0 text-[10px] font-semibold text-slate-400">{f.label}</span>
                          <span className="text-xs font-medium text-slate-700">{f.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep >= 1 && (
                  <div>
                    <p className="mb-2 text-[10px] font-bold tracking-widest text-slate-400">생성된 계약서 미리보기</p>
                    <div className="rounded-xl border border-slate-200 bg-white p-3 font-mono text-[10px] leading-5 text-slate-600 shadow-sm">
                      {CONTRACT_LINES.slice(0, contractLines).map((line, i) => (
                        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className={line === "" ? "h-2" : line === "근로계약서" ? "font-black text-center text-xs text-slate-800 mb-1" : ""}>
                          {line}
                        </motion.div>
                      ))}
                      {activeStep === 1 && contractLines < CONTRACT_LINES.length && (
                        <motion.span className="inline-block h-3 w-0.5 bg-[#6366f1]"
                          animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 오른쪽: 이메일 발송 → 보관 */}
              <div className="pl-4">
                {/* 이메일 카드 */}
                {emailVisible && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-base">✉️</span>
                      <span className="text-xs font-bold text-indigo-700">서명 요청 메일 자동 발송</span>
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}
                        className="ml-auto rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">발송됨</motion.span>
                    </div>
                    <div className="space-y-1 text-[11px] text-indigo-600">
                      <div>To: jisoo.kim@company.com</div>
                      <div>제목: [계약서 서명 요청] 근로계약서_김지수</div>
                      <div className="mt-2 rounded-lg bg-white px-3 py-2 text-slate-500">
                        안녕하세요, 김지수님.<br />
                        근로계약서 서명을 요청드립니다.<br />
                        <span className="text-[#6366f1] underline">→ 서명하기 링크</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Drive 보관 */}
                {archiveDone && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-base">📁</span>
                      <span className="text-xs font-bold text-emerald-700">Drive 자동 분류·보관</span>
                    </div>
                    <div className="space-y-1.5">
                      {["📄 근로계약서_김지수_2025.pdf", "📄 서명완료_타임스탬프.pdf", "📊 계약 현황 시트 자동 업데이트"].map((f) => (
                        <motion.div key={f} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                          {f}
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2">
                      <span className="text-emerald-500 font-black text-xs">⏱</span>
                      <span className="text-xs font-bold text-slate-600">총 처리 시간: <span className="text-emerald-600">5분</span></span>
                      <span className="ml-auto text-[10px] text-slate-400 line-through">기존 2~3일</span>
                    </div>
                  </motion.div>
                )}

                {!emailVisible && !archiveDone && phase !== "done" && (
                  <div className="flex h-full items-center justify-center text-slate-200 text-4xl">
                    📋
                  </div>
                )}
              </div>
            </div>

            {/* 실행 버튼 */}
            {phase === "idle" && (
              <div className="border-t border-black/6 px-6 py-4">
                <button onClick={run}
                  className="w-full rounded-xl bg-gradient-to-r from-[#282640] to-[#6366f1] py-3 text-sm font-bold text-white hover:opacity-90">
                  ▶ 자동화 프로세스 실행
                </button>
              </div>
            )}

            {phase === "done" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="border-t border-black/6 px-6 py-4">
                <div className="rounded-xl bg-emerald-50 py-3 text-center">
                  <p className="text-sm font-bold text-emerald-700">✓ 계약 처리 완료 · 수작업 95% 제거</p>
                  <p className="mt-1 text-xs text-emerald-500">폼 입력 → 계약서 생성 → 서명 발송 → 보관까지 완전 자동</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── 재무 대시보드 + Q&A 챗봇 데모 모달 ────────────────────────────
const FINANCE_KPI = [
  { id: "revenue",  label: "매출액",      value: "₩2.84B",  sub: "전분기 +8.2%",  color: "#F8B529" },
  { id: "ebitda",   label: "EBITDA",     value: "₩420M",   sub: "전분기 +16.7%", color: "#C400FF" },
  { id: "margin",   label: "영업이익률",  value: "18.2%",   sub: "업종 평균 +4.1%p", color: "#4ade80" },
  { id: "cashflow", label: "영업 현금흐름", value: "₩380M", sub: "잉여 현금 건전", color: "#60a5fa" },
];

const QUARTERLY = [
  { q: "1Q", v: 62 },
  { q: "2Q", v: 75 },
  { q: "3Q", v: 100 },
];

const FINANCE_CHAT: { role: "user" | "ai"; text: string; highlight?: string }[] = [
  { role: "user", text: "이번 분기 EBITDA 얼마예요?" },
  { role: "ai",   text: "3분기 EBITDA는 **₩420M**입니다.\n전 분기(₩360M) 대비 **+16.7%** 증가했습니다.", highlight: "ebitda" },
  { role: "user", text: "영업이익률은요?" },
  { role: "ai",   text: "현재 영업이익률은 **18.2%**입니다.\n업종 평균(14.1%) 대비 **+4.1%p** 높은 수준입니다.", highlight: "margin" },
  { role: "user", text: "현금흐름 상태 요약해줘" },
  { role: "ai",   text: "영업 현금흐름 **₩380M**으로 건전합니다.\n잉여 현금 확보로 투자 여력 충분한 상태입니다.", highlight: "cashflow" },
];

function renderChatText(text: string) {
  return text.split(/(\*\*.*?\*\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-black text-white">{part.slice(2, -2)}</strong>
    ) : <span key={i}>{part}</span>
  );
}

const FinanceDashboardDemoModal = ({ onClose }: { onClose: () => void }) => {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [activeKpi, setActiveKpi] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible >= FINANCE_CHAT.length) return;
    const msg = FINANCE_CHAT[visible];
    const delay = msg.role === "user" ? 600 : 400;
    const t = setTimeout(() => {
      if (msg.role === "ai") setTyping(true);
      const t2 = setTimeout(() => {
        setTyping(false);
        if (msg.highlight) setActiveKpi(msg.highlight);
        setVisible((v) => v + 1);
        setTimeout(() => setActiveKpi(null), 1800);
      }, msg.role === "ai" ? 1100 : 250);
      return () => clearTimeout(t2);
    }, delay);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visible, typing]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-[24px] bg-[#0e0f1a] text-white shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
          style={{ maxHeight: "90vh" }}
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-3.5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-gradient-to-r from-[#F8B529] to-[#C400FF] px-3 py-1 text-[11px] font-bold">재무 · 리포트 AX</span>
              <span className="text-xs text-white/30">Financial QA Agent</span>
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-white/40 hover:bg-white/10">✕</button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden sm:flex-row">
            {/* ── 왼쪽: 대시보드 ── */}
            <div className="flex shrink-0 flex-col gap-3 overflow-y-auto border-b border-white/8 p-4 sm:w-[46%] sm:border-b-0 sm:border-r">
              <p className="text-[10px] font-bold tracking-widest text-white/30">LIVE DASHBOARD · 3Q</p>

              {/* KPI 카드 4개 */}
              <div className="grid grid-cols-2 gap-2">
                {FINANCE_KPI.map((kpi) => (
                  <motion.div
                    key={kpi.id}
                    animate={activeKpi === kpi.id
                      ? { scale: 1.04, borderColor: kpi.color, backgroundColor: `${kpi.color}18` }
                      : { scale: 1, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)" }
                    }
                    transition={{ duration: 0.3 }}
                    className="rounded-xl border p-3"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <p className="text-[10px] text-white/40">{kpi.label}</p>
                    <p className="mt-1 text-base font-black" style={{ color: activeKpi === kpi.id ? kpi.color : "#fff" }}>
                      {kpi.value}
                    </p>
                    <p className="mt-0.5 text-[10px]" style={{ color: kpi.color }}>{kpi.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* 분기별 매출 미니 차트 */}
              <div className="rounded-xl border border-white/8 bg-white/3 p-3">
                <p className="mb-3 text-[10px] text-white/30">분기별 매출 추이</p>
                <div className="flex items-end justify-around gap-2" style={{ height: 70 }}>
                  {QUARTERLY.map((q, i) => (
                    <div key={q.q} className="flex flex-col items-center gap-1.5">
                      <div className="relative flex w-10 flex-col justify-end overflow-hidden rounded-t-md bg-white/5" style={{ height: 60 }}>
                        <motion.div
                          className="w-full rounded-t-md"
                          style={{ background: i === 2 ? "linear-gradient(to top, #F8B529, #C400FF)" : "rgba(255,255,255,0.15)" }}
                          initial={{ height: 0 }}
                          animate={{ height: `${q.v}%` }}
                          transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-[10px] text-white/40">{q.q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 보고서 링크 더미 */}
              <div className="space-y-1.5">
                {["3Q 재무제표.pdf", "EBITDA 분석 리포트.xlsx", "현금흐름 요약.pdf"].map((f, i) => (
                  <div key={f} className="flex items-center gap-2 rounded-lg border border-white/6 bg-white/3 px-3 py-2">
                    <span className="text-[10px] text-[#F8B529]">📄</span>
                    <span className="flex-1 text-[11px] text-white/60">{f}</span>
                    {activeKpi && i === 0 && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="rounded-full bg-[#C400FF]/20 px-1.5 py-0.5 text-[9px] text-[#C400FF]">참조됨</motion.span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── 오른쪽: 채팅 ── */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
                {FINANCE_CHAT.slice(0, visible).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F8B529] to-[#C400FF] text-[9px] font-black">
                        AX
                      </div>
                    )}
                    <div className={`max-w-[82%] whitespace-pre-line rounded-[16px] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-[#282640] text-white/90"
                        : "rounded-tl-sm border border-white/10 bg-white/8 text-white/75"
                    }`}>
                      {msg.role === "ai" ? renderChatText(msg.text) : msg.text}
                    </div>
                  </motion.div>
                ))}

                {typing && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F8B529] to-[#C400FF] text-[9px] font-black">AX</div>
                    <div className="flex gap-1 rounded-[16px] rounded-tl-sm border border-white/10 bg-white/8 px-4 py-3">
                      {[0,1,2].map((j) => (
                        <motion.span key={j} className="h-1.5 w-1.5 rounded-full bg-white/40"
                          animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, repeat: Infinity, delay: j * 0.15 }} />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* 더미 입력창 */}
              <div className="flex items-center gap-2 border-t border-white/8 px-4 py-3">
                <div className="flex-1 rounded-full bg-white/8 px-4 py-2 text-xs text-white/25">재무 지표를 자연어로 질문하세요...</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#F8B529] to-[#C400FF]">
                  <span className="text-xs text-white font-bold">↑</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── 트래픽 440% 성장 + 키워드 분석 데모 모달 ──────────────────────
const MONTHS = [
  { label: "1개월차", month: "10월", traffic: 100, threads: 100, revenue: 100 },
  { label: "2개월차", month: "11월", traffic: 218, threads: 640, revenue: 340 },
  { label: "3개월차", month: "12월", traffic: 441, threads: 2680, revenue: 1200 },
];

const KEYWORDS = [
  { kw: "AI 콘텐츠 자동화", score: 94, channel: "Threads" },
  { kw: "SNS 소재 검증", score: 88, channel: "Reels" },
  { kw: "멀티채널 배포", score: 85, channel: "Newsletter" },
  { kw: "AI 이미지 생성", score: 81, channel: "Shorts" },
  { kw: "브랜드 페르소나", score: 76, channel: "Threads" },
  { kw: "콘텐츠 리퍼포징", score: 72, channel: "Reels" },
  { kw: "자동 스케줄링", score: 68, channel: "Newsletter" },
];

const TrafficGrowthDemoModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);           // 0=idle, 1=month1, 2=month2, 3=month3
  const [kwVisible, setKwVisible] = useState(0); // 키워드 등장 수
  const [phase, setPhase] = useState<"chart" | "keywords" | "done">("chart");

  useEffect(() => {
    if (step === 0) return;
    if (step <= 3) {
      const t = setTimeout(() => setStep((s) => s + 1), 900);
      return () => clearTimeout(t);
    }
    // 차트 완료 → 키워드 페이즈
    const t = setTimeout(() => setPhase("keywords"), 600);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (phase !== "keywords") return;
    if (kwVisible >= KEYWORDS.length) { setPhase("done"); return; }
    const t = setTimeout(() => setKwVisible((v) => v + 1), 220);
    return () => clearTimeout(t);
  }, [phase, kwVisible]);

  const start = () => setStep(1);

  const barH = (pct: number, max: number) => `${Math.round((pct / max) * 100)}%`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[24px] bg-[#0e0f1a] text-white shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
          style={{ maxHeight: "90vh" }}
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-gradient-to-r from-[#F8B529] to-[#C400FF] px-3 py-1 text-[11px] font-bold text-white">
                S사 · 마케팅 AX
              </span>
              {phase === "done" && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-[#F8B529]">
                  +440.5% 달성 ✓
                </motion.span>
              )}
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-white/40 hover:bg-white/10">✕</button>
          </div>

          <div className="overflow-y-auto px-6 py-5">
            {/* ── 3개월 트래픽 차트 ── */}
            <p className="mb-4 text-xs font-bold tracking-widest text-white/40">3개월 트래픽 성장 추이</p>

            <div className="mb-6 flex items-end justify-center gap-6">
              {MONTHS.map((m, i) => {
                const show = step > i;
                const maxTraffic = 441;
                return (
                  <div key={m.month} className="flex flex-col items-center gap-2">
                    {/* 3개 바 묶음 */}
                    <div className="flex items-end gap-1" style={{ height: 140 }}>
                      {/* 트래픽 */}
                      <div className="relative flex w-8 flex-col items-center justify-end overflow-hidden rounded-t-lg bg-white/5" style={{ height: "100%" }}>
                        <motion.div
                          className="w-full rounded-t-lg bg-gradient-to-t from-[#F8B529] to-[#ffdc7a]"
                          initial={{ height: 0 }}
                          animate={{ height: show ? barH(m.traffic, maxTraffic) : 0 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                      {/* Threads */}
                      <div className="relative flex w-8 flex-col items-center justify-end overflow-hidden rounded-t-lg bg-white/5" style={{ height: "100%" }}>
                        <motion.div
                          className="w-full rounded-t-lg bg-gradient-to-t from-[#C400FF] to-[#e06dff]"
                          initial={{ height: 0 }}
                          animate={{ height: show ? barH(Math.min(m.threads, maxTraffic * 6), maxTraffic * 6) : 0 }}
                          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                        />
                      </div>
                    </div>
                    {/* 수치 */}
                    {show && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                        <p className="text-[11px] font-black text-[#F8B529]">
                          {i === 2 ? "+440.5%" : `+${m.traffic - 100}%`}
                        </p>
                        <p className="text-[10px] text-white/40">{m.month} {m.label}</p>
                      </motion.div>
                    )}
                    {!show && <div className="h-8 w-16 rounded-lg bg-white/5" />}
                  </div>
                );
              })}
            </div>

            {/* 범례 */}
            <div className="mb-5 flex items-center justify-center gap-4 text-[11px] text-white/50">
              <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-[#F8B529]" />전체 트래픽</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-[#C400FF]" />Threads</span>
            </div>

            {/* 최종 수치 카드 */}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="mb-6 grid grid-cols-4 gap-2"
              >
                {[
                  { v: "+440.5%", l: "전체 트래픽", c: "#F8B529" },
                  { v: "+2,580.7%", l: "Threads", c: "#C400FF" },
                  { v: "×12", l: "매출 J-Curve", c: "#4ade80" },
                  { v: "50%↓", l: "제작시간", c: "#60a5fa" },
                ].map(({ v, l, c }) => (
                  <div key={l} className="rounded-xl border border-white/8 bg-white/5 px-3 py-3 text-center">
                    <p className="text-lg font-black" style={{ color: c }}>{v}</p>
                    <p className="mt-1 text-[10px] text-white/45">{l}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* ── 키워드 레퍼런스 분석 ── */}
            {(phase === "keywords" || phase === "done") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="mb-3 text-xs font-bold tracking-widest text-white/40">
                  AI 키워드 레퍼런스 분석
                </p>
                <div className="space-y-2">
                  {KEYWORDS.slice(0, kwVisible).map((kw, i) => (
                    <motion.div
                      key={kw.kw}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-2.5"
                    >
                      <span className="w-4 text-center text-xs font-bold text-white/30">{i + 1}</span>
                      <span className="flex-1 text-sm font-semibold text-white/85">{kw.kw}</span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/50">
                        {kw.channel}
                      </span>
                      {/* 스코어 바 */}
                      <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#F8B529] to-[#C400FF]"
                          initial={{ width: 0 }}
                          animate={{ width: `${kw.score}%` }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs font-bold text-[#F8B529]">{kw.score}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 시작 버튼 */}
            {step === 0 && (
              <button
                onClick={start}
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#F8B529] to-[#C400FF] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                ▶ 3개월 성장 데이터 재생
              </button>
            )}

            {phase === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-[#F8B529]/20 bg-[#F8B529]/8 px-4 py-3 text-center"
              >
                <p className="text-sm font-bold text-[#F8B529]">✓ AI 콘텐츠 자동화 파이프라인 구축 완료</p>
                <p className="mt-1 text-xs text-white/45">콘텐츠 제작 50%↓ · 트래픽 440.5%↑ · 매출 J-Curve ×12</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── 상세페이지 자동 생성 데모 모달 ──────────────────────────────
const PRODUCT_INFO = [
  { label: "상품명", value: "멀티 폴STR PRT" },
  { label: "색  상", value: "모스 핑크(14)/터쿼이즈그린(81)" },
  { label: "사이즈", value: "095/100/105/110/115" },
  { label: "소  재", value: "겉감:폴리에스터 96.00%,폴리우레탄 4.00%" },
  { label: "성  별", value: "남성" },
  { label: "시  즌", value: "여름" },
  { label: "제조국", value: "미안마" },
  { label: "세  탁", value: "세탁전문점 or 드라이클리닝 권장" },
  { label: "제조일", value: "20250901" },
];

const SIZE_ROWS = [
  { size: "095", data: ["44.5", "106", "101", "106", "23", "38", "35.5", "71.5"] },
  { size: "100", data: ["46", "111", "106", "111", "23.5", "39.5", "36.5", "73"] },
  { size: "105", data: ["47.5", "116", "111", "116", "24", "41", "37.5", "74.5"] },
  { size: "110", data: ["49.5", "123", "118", "123", "24.5", "43", "39", "76"] },
  { size: "115", data: ["51.5", "130", "125", "130", "25", "45", "40.5", "77.5"] },
];

const SIZE_HEADERS = ["사이즈", "어깨", "가슴둘레", "허리둘레", "밑단둘레", "소매장", "소매통", "소매단", "기장"];

// 스트라이프 의류 이미지 (Unsplash)
const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&q=80",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&q=80",
];

const ProductPageDemoModal = ({ onClose }: { onClose: () => void }) => {
  const [phase, setPhase] = useState<"input" | "generating" | "done">("input");
  const [infoRows, setInfoRows] = useState(0);
  const [sizeRows, setSizeRows] = useState(0);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const startGeneration = () => {
    setPhase("generating");
    setInfoRows(0);
    setSizeRows(0);
    setProgress(0);
    setCount(0);
    setImagesLoaded(0);

    // 이미지 먼저 로드 (순차)
    PRODUCT_IMAGES.forEach((_, i) => {
      setTimeout(() => setImagesLoaded(i + 1), 200 + i * 350);
    });

    // product info rows, one every 180ms
    PRODUCT_INFO.forEach((_, i) => {
      setTimeout(() => setInfoRows(i + 1), 300 + i * 180);
    });

    // progress bar
    const total = PRODUCT_INFO.length * 180 + 300;
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 3, 100));
    }, 60);

    // size rows after info is done
    const sizeStart = total + 200;
    SIZE_ROWS.forEach((_, i) => {
      setTimeout(() => setSizeRows(i + 1), sizeStart + i * 200);
    });

    // count-up
    const countStart = sizeStart;
    setTimeout(() => {
      const interval = setInterval(() => {
        setCount((c) => {
          if (c >= 200) { clearInterval(interval); return 200; }
          return c + 7;
        });
      }, 30);
    }, countStart);

    // done
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setPhase("done");
    }, sizeStart + SIZE_ROWS.length * 200 + 400);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.24)]"
          style={{ maxHeight: "90vh" }}
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between border-b border-black/8 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-gradient-to-r from-[#F8B529] to-[#C400FF] px-3 py-1 text-[11px] font-bold text-white">
                AI 상세페이지 자동 생성
              </span>
              {phase === "generating" && (
                <span className="text-xs font-semibold text-[#C400FF]">
                  생성 중 {count}건 처리됨
                </span>
              )}
              {phase === "done" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-xs font-bold text-emerald-600"
                >
                  ✓ 완료 · {count}건 생성
                </motion.span>
              )}
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100">✕</button>
          </div>

          {/* 프로그레스 바 */}
          {phase !== "input" && (
            <div className="h-1 w-full bg-slate-100">
              <motion.div
                className="h-full bg-gradient-to-r from-[#F8B529] to-[#C400FF]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="overflow-y-auto px-5 py-5">
            {/* 입력 프롬프트 */}
            <div className="mb-5 rounded-xl border border-dashed border-[#C400FF]/30 bg-[#fdf6ff] p-4">
              <p className="mb-2 text-[11px] font-bold tracking-widest text-[#C400FF]">AI 입력값</p>
              <p className="font-mono text-xs leading-6 text-slate-600">
                상품명: 멀티 폴STR PRT | 색상: 모스핑크/터쿼이즈그린<br />
                사이즈: 095~115 | 소재: 폴리에스터96% | 성별: 남성 | 시즌: 여름
              </p>
            </div>

            {phase === "input" && (
              <button
                onClick={startGeneration}
                className="w-full rounded-xl bg-gradient-to-r from-[#282640] to-[#C400FF] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                ▶ 상세페이지 자동 생성 시작
              </button>
            )}

            {/* 상품 이미지 */}
            {phase !== "input" && (
              <div className="mb-5">
                <p className="mb-2 text-[11px] font-bold tracking-widest text-slate-400">상품 이미지</p>
                <div className="flex gap-2">
                  {PRODUCT_IMAGES.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-28 w-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                    >
                      {/* 스켈레톤 */}
                      {imagesLoaded <= i && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100"
                          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      {/* 실제 이미지 */}
                      {imagesLoaded > i && (
                        <motion.img
                          src={src}
                          alt={`상품 이미지 ${i + 1}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="h-full w-full object-cover"
                        />
                      )}
                      {imagesLoaded > i && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-1 top-1 rounded-full bg-emerald-500 p-0.5 text-[9px] text-white"
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>
                  ))}
                  {/* 빈 슬롯 */}
                  {[0,1].map((i) => (
                    <div key={`empty-${i}`} className="h-28 w-24 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                      <span className="text-lg text-slate-300">+</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 상품 상세정보 */}
            {infoRows > 0 && (
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-4 w-1 rounded-full bg-slate-800" />
                  <span className="text-sm font-bold text-slate-800">상품 상세정보</span>
                </div>
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {PRODUCT_INFO.slice(0, infoRows).map((row, i) => (
                      <motion.tr
                        key={row.label}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-b border-slate-100"
                      >
                        <td className="w-24 py-2.5 pr-4 text-right font-bold text-slate-700">{row.label}</td>
                        <td className="py-2.5 text-slate-600">
                          {i === infoRows - 1 && phase === "generating" ? (
                            <span className="inline-flex items-center gap-1">
                              {row.value}
                              <motion.span
                                className="inline-block h-3.5 w-0.5 bg-[#C400FF]"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                              />
                            </span>
                          ) : row.value}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 사이즈 정보 */}
            {sizeRows > 0 && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-1 rounded-full bg-slate-800" />
                    <span className="text-sm font-bold text-slate-800">사이즈 정보</span>
                  </div>
                  <span className="text-xs text-slate-400">단위 : cm</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        {SIZE_HEADERS.map((h) => (
                          <th key={h} className="pb-2 pr-3 text-center font-bold text-slate-700 first:text-left">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_ROWS.slice(0, sizeRows).map((row) => (
                        <motion.tr
                          key={row.size}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-b border-slate-100"
                        >
                          <td className="py-2.5 font-bold text-slate-800">{row.size}</td>
                          {row.data.map((v, i) => (
                            <td key={i} className="py-2.5 pr-3 text-center text-slate-600">{v}</td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 완료 배너 */}
            {phase === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-center"
              >
                <p className="text-sm font-bold text-emerald-700">✓ 상세페이지 {count}건 자동 생성 완료</p>
                <p className="mt-1 text-xs text-emerald-600">기존 2~5일 → AI 자동 생성 수초 내 처리</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── 채팅 데모 모달 ──────────────────────────────────────────────
const ChatDemoModal = ({ card, onClose }: { card: ResultCard; onClose: () => void }) => {
  const messages = (card.detail as { persona: string; messages: { role: "user" | "ai"; text: string }[] }).messages;
  const persona = (card.detail as { persona: string }).persona;
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (visible >= messages.length) return;
    const next = messages[visible];
    const delay = next.role === "ai" ? 900 : 500;
    const timer = setTimeout(() => {
      if (next.role === "ai") setTyping(true);
      const show = setTimeout(() => {
        setTyping(false);
        setVisible((v) => v + 1);
      }, next.role === "ai" ? 1200 : 300);
      return () => clearTimeout(show);
    }, visible === 0 ? 400 : delay);
    return () => clearTimeout(timer);
  }, [visible, messages]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 flex w-full max-w-sm flex-col overflow-hidden rounded-[28px] bg-[#f0f0f0] shadow-[0_32px_80px_rgba(0,0,0,0.28)]"
          style={{ height: "min(680px, 90vh)" }}
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 상단 바 */}
          <div className="flex items-center gap-3 bg-[#282640] px-5 py-4 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#F8B529] to-[#C400FF] text-sm font-black">
              AX
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{persona}</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-white/60">온라인 · 즉시 응답</span>
              </div>
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 hover:bg-white/10">
              <span className="text-sm">✕</span>
            </button>
          </div>

          {/* 대화 영역 */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-5">
            {messages.slice(0, visible).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F8B529] to-[#C400FF] text-[10px] font-black text-white">
                    AX
                  </div>
                )}
                <div
                  className={`max-w-[78%] whitespace-pre-line rounded-[18px] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "rounded-tr-md bg-[#282640] text-white"
                      : "rounded-tl-md bg-white text-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* 타이핑 인디케이터 */}
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-2"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F8B529] to-[#C400FF] text-[10px] font-black text-white">
                  AX
                </div>
                <div className="flex gap-1 rounded-[18px] rounded-tl-md bg-white px-4 py-3.5 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-slate-400"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* 입력창 (더미) */}
          <div className="flex items-center gap-2 border-t border-black/8 bg-white px-4 py-3">
            <div className="flex-1 rounded-full bg-[#f0f0f0] px-4 py-2.5 text-sm text-slate-400">
              메시지를 입력하세요...
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#282640]">
              <span className="text-xs text-white">↑</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CaseDetailModal = ({ card, onClose }: { card: ResultCard; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.2)]"
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 bg-[linear-gradient(135deg,#282640,#3a315f_55%,#C400FF)] p-6 text-white">
          <div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-widest text-white/90">
              {card.badge}
            </span>
            <h3 className="mt-3 text-xl font-black leading-tight">{card.title}</h3>
            <p className="mt-1 text-sm text-white/70">{card.team}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-6" style={{ maxHeight: "65vh" }}>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: card.stat1Value, l: card.stat1Label },
              { v: card.stat2Value, l: card.stat2Label },
            ].map(({ v, l }) => (
              <div key={l} className="rounded-2xl bg-[#f6f1fb] px-4 py-3 text-center">
                <p className="text-2xl font-black text-[#C400FF]">{v}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">{l}</p>
              </div>
            ))}
          </div>

          {/* Problem & Solution */}
          <div className="space-y-3">
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
              <p className="mb-1.5 text-xs font-bold tracking-widest text-rose-500">AS-IS 문제</p>
              <p className="text-sm leading-relaxed text-slate-700">{card.detail?.problem}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="mb-1.5 text-xs font-bold tracking-widest text-emerald-600">솔루션</p>
              <p className="text-sm leading-relaxed text-slate-700">{card.detail?.solution}</p>
            </div>
          </div>

          {/* Workflow */}
          {card.detail?.workflow && (
            <div>
              <p className="mb-3 text-xs font-bold tracking-widest text-slate-400">TO-BE 업무 흐름</p>
              <div className="flex flex-wrap gap-2">
                {card.detail.workflow.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C400FF] text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-700">{step}</span>
                    {i < card.detail!.workflow.length - 1 && (
                      <span className="text-slate-300">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stack */}
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-1.5 text-xs font-bold tracking-widest text-slate-400">기술 스택</p>
            <p className="text-sm text-slate-600">{card.detail?.stack}</p>
          </div>

          {/* Expand */}
          <div className="rounded-2xl border border-[#C400FF]/15 bg-[#f6f1fb] p-4">
            <p className="mb-1.5 text-xs font-bold tracking-widest text-[#C400FF]">확장 가능성</p>
            <p className="text-sm text-slate-600">{card.detail?.expand}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const VerifiedResultsSection = ({
  results,
  visualProofs,
}: {
  results: ReturnType<typeof getVerifiedResults>;
  visualProofs: VerifiedVisualProofType[];
}) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCard, setSelectedCard] = useState<ResultCard | null>(null);
  const [featuredOpen, setFeaturedOpen] = useState(false);

  const scrollRail = (direction: "left" | "right") => {
    const node = railRef.current;
    if (!node) return;
    node.scrollBy({ left: direction === "left" ? -360 : 360, behavior: "smooth" });
  };

  return (
    <motion.div
      ref={ref}
      className="mx-auto mb-14 max-w-[1380px]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#C400FF]">
            {t("ax.verifiedResults.badge")}
          </p>
          <h3 className="mt-3 text-3xl font-black leading-tight text-foreground md:text-5xl">
            {t("ax.verifiedResults.title")}
          </h3>
          <p className="mt-2 text-base text-muted-foreground md:text-xl">
            {t("ax.verifiedResults.subtitle")}
          </p>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => scrollRail("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-muted-foreground shadow-sm transition-colors hover:border-[#C400FF]/20 hover:text-[#C400FF]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollRail("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-muted-foreground shadow-sm transition-colors hover:border-[#C400FF]/20 hover:text-[#C400FF]"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex min-h-[600px] gap-4 overflow-x-auto pb-3 scrollbar-hide scroll-smooth"
      >
        {/* Featured card — 레일 첫 번째 */}
        <motion.article
          className="group relative h-[600px] min-w-[380px] max-w-[380px] cursor-pointer overflow-hidden rounded-[30px] border border-stone-300/60 bg-[linear-gradient(180deg,#11131c_0%,#171a27_100%)] p-7 text-white shadow-[0_28px_80px_rgba(22,18,35,0.22)] transition-shadow hover:shadow-[0_28px_80px_rgba(196,0,255,0.22)]"
          onClick={() => setFeaturedOpen(true)}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,181,41,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(196,0,255,0.12),transparent_30%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(196,0,255,0.08))]" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#F8B529]/18 bg-[#F8B529]/10 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[#F8B529]">
                {results.featured.eyebrow}
              </span>
              <span className="rounded-full border border-white/8 bg-white/6 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-white/70">
                {results.featured.tag}
              </span>
            </div>

            <h4 className="text-[1.28rem] font-black leading-[1.22] tracking-[-0.03em] text-white md:text-[1.5rem]">
              {results.featured.title}
            </h4>

            <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-[0.18em] text-white/45">
                  {results.featured.problemLabel}
                </p>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-white/72">
                  {results.featured.problem}
                </p>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-[0.18em] text-white/45">
                  {results.featured.solutionLabel}
                </p>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-white/78">
                  {results.featured.solution}
                </p>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3">
              {results.featured.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.045] p-4">
                  <p className="text-[1.2rem] font-black leading-none text-[#F8B529] md:text-[1.35rem]">{stat.value}</p>
                  <p className="mt-2 text-xs text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs font-semibold text-white/30 group-hover:text-[#F8B529] transition-colors">
              자세히 보기 →
            </p>
          </div>
        </motion.article>

        {/* 나머지 카드들 */}
        {results.cards.map((card, index) => (
              <motion.article
                key={`${card.badge}-${index}`}
                className="group h-[600px] min-w-[360px] max-w-[360px] cursor-pointer rounded-[30px] border border-stone-200/90 bg-white/96 p-6 transition-shadow hover:shadow-[0_24px_60px_rgba(196,0,255,0.12)]"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                onClick={() => card.detail && setSelectedCard(card)}
              >
                <div className="flex h-full flex-col">
                  <span className="mb-5 inline-flex rounded-full border border-[#C400FF]/10 bg-[linear-gradient(135deg,#eef5ff,#edf3ff)] px-4 py-1.5 text-[13px] font-bold text-[#4d84d8]">
                    {card.badge}
                  </span>
                  <p className="text-sm font-medium text-[#a6a5ae]">{card.team}</p>
                  <h4 className="mt-4 text-[1rem] font-black leading-[1.35] text-[#2c2d34] md:text-[1.08rem]">
                    {card.title}
                  </h4>

                  <div className="mt-5 rounded-2xl bg-[#fdf2f2] px-4 py-4 text-[13px] leading-relaxed text-[#e46452] md:text-[14px]">
                    {card.negative}
                  </div>
                  <div className="mt-4 rounded-2xl bg-[#edf8ed] px-4 py-4 text-[13px] leading-relaxed text-[#67b56f] md:text-[14px]">
                    {card.positive}
                  </div>

                  <div className="mt-auto border-t border-stone-100 pt-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[1.55rem] font-black leading-none tracking-[-0.03em] text-[#4b76cf] md:text-[1.8rem]">{card.stat1Value}</p>
                        <p className="mt-2 text-xs text-[#b1b1ba] md:text-sm">{card.stat1Label}</p>
                      </div>
                      <div>
                        <p className="text-[1.55rem] font-black leading-none tracking-[-0.03em] text-[#4b76cf] md:text-[1.8rem]">{card.stat2Value}</p>
                        <p className="mt-2 text-xs text-[#b1b1ba] md:text-sm">{card.stat2Label}</p>
                      </div>
                    </div>
                    {card.detail && (
                      <p className="mt-3 text-center text-xs font-semibold text-[#C400FF]/60 group-hover:text-[#C400FF]">
                        자세히 보기 →
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
      </div>

      <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
        {visualProofs.map((item) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-3xl border border-stone-300/65 bg-white p-3 shadow-[0_24px_60px_rgba(40,38,64,0.08)]"
          >
            <div className="relative overflow-hidden rounded-[1.35rem] border border-stone-200/80 bg-stone-50">
              <img
                src={item.image}
                alt={item.alt}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute left-3 top-3 rounded-full bg-[linear-gradient(135deg,#F8B529,#C400FF)] px-3.5 py-1.5 text-sm font-bold text-white shadow-lg">
                {item.metric}
              </div>
            </div>
            <div className="px-1 pb-1 pt-4 text-left">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#C400FF]">{item.label}</p>
              <h4 className="mt-2 text-lg font-black text-foreground md:text-xl">{item.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      {featuredOpen && <TrafficGrowthDemoModal onClose={() => setFeaturedOpen(false)} />}
      {selectedCard && (() => {
        const d = selectedCard.detail as Record<string, boolean> | undefined;
        if (d?.productDemo)  return <ProductPageDemoModal onClose={() => setSelectedCard(null)} />;
        if (d?.chatMode)     return <ChatDemoModal card={selectedCard} onClose={() => setSelectedCard(null)} />;
        if (d?.financeDemo)  return <FinanceDashboardDemoModal onClose={() => setSelectedCard(null)} />;
        if (d?.contractDemo) return <ContractAutoDemoModal onClose={() => setSelectedCard(null)} />;
        return <CaseDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />;
      })()}
    </motion.div>
  );
};

const AXSystemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Generate translated content
  const testimonials = getTestimonials(t);
  const industryCases = getIndustryCases(t);
  const roleCases = getRoleCases(t);
  const problemCards = getProblemCards(t);
  const verifiedResults = getVerifiedResults(t);

  const handleProblemCardClick = (scenarioId: DemoScenarioId) => {
    window.dispatchEvent(
      new CustomEvent("ax:select-demo-scenario", {
        detail: { scenarioId },
      })
    );

    document.getElementById("interactive-demo")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf9fe_0%,#f7f3fc_24%,#f6f1fb_46%,#ffffff_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,181,41,0.06),transparent_20%),radial-gradient(circle_at_86%_12%,rgba(196,0,255,0.07),transparent_24%)]" />

      {/* Part 1: Framework Introduction */}
      <div id="problems" className="relative flex min-h-screen flex-col items-center overflow-hidden overflow-x-hidden pb-24 md:pb-28">
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

        {/* metrics marquee moved to HomePageClient */}
        
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
              <span className="text-[#4566bc] font-bold text-sm">{t("ax.problems.badge")}</span>
            </motion.div>

            <motion.div 
              className="mb-10"
              variants={itemVariants}
            >
              <div className="mx-auto max-w-6xl text-center">
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#4566bc]">
                    {t("ax.problems.badge")}
                  </p>
                  <h3 className="mt-3 text-3xl font-black leading-tight text-[#10182b] md:text-6xl">
                    {t("ax.problems.title")}
                  </h3>
                  <p className="mt-4 text-base text-[#8b8b95] md:text-2xl">
                    {t("ax.problems.subtitle")}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {problemCards.map((card) => {
                    const Icon = card.icon;

                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => handleProblemCardClick(card.scenarioId)}
                        className="group relative flex min-h-[206px] flex-col rounded-[30px] border border-stone-200 bg-white p-7 text-left shadow-[0_16px_40px_rgba(40,38,64,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C400FF]/20 hover:shadow-[0_24px_56px_rgba(40,38,64,0.1)]"
                      >
                        <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top_left,rgba(248,181,41,0.06),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(196,0,255,0.05),transparent_28%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10 flex h-full flex-col">
                          <div className={`mb-8 ${card.iconClassName}`}>
                            <Icon className="h-8 w-8" strokeWidth={2.2} />
                          </div>
                          <h4 className="whitespace-pre-line text-[1.75rem] font-black leading-[1.28] tracking-[-0.03em] text-[#2c2d34]">
                            {card.title}
                          </h4>
                          <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-[#8f909d]">
                            {card.description}
                          </p>
                          <div className="mt-auto flex justify-end pt-8">
                            <ArrowRight className="h-5 w-5 text-stone-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#C400FF]" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      <InteractiveDemoSection />

      <HeroMetricsMarquee className="px-4 py-6 md:px-8 md:py-8" />

      {/* Part 3: Testimonials + Impact */}
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
          <div id="results">
            <VerifiedResultsSection
              results={verifiedResults}
              visualProofs={verifiedResults.visualProofs}
            />
          </div>

          <div id="industry">
            <IndustryCasesSection cases={industryCases} />
          </div>

          <div id="role">
            <RoleCasesSection cases={roleCases} />
          </div>

          <CasesBridgeSection />

          <TestimonialSlider testimonials={testimonials} />

        </div>
      </div>
    </section>
  );
};

export { AXSystemSection };

export default AXSystemSection;
