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
      detail: {
        problem: t("ax.verifiedResults.card1.detail.problem"),
        solution: t("ax.verifiedResults.card1.detail.solution"),
        stack: t("ax.verifiedResults.card1.detail.stack"),
        workflow: [
          t("ax.verifiedResults.card1.detail.workflow.0"),
          t("ax.verifiedResults.card1.detail.workflow.1"),
          t("ax.verifiedResults.card1.detail.workflow.2"),
          t("ax.verifiedResults.card1.detail.workflow.3"),
        ],
        expand: t("ax.verifiedResults.card1.detail.expand"),
      },
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
      detail: {
        problem: t("ax.verifiedResults.card3.detail.problem"),
        solution: t("ax.verifiedResults.card3.detail.solution"),
        stack: t("ax.verifiedResults.card3.detail.stack"),
        workflow: [
          t("ax.verifiedResults.card3.detail.workflow.0"),
          t("ax.verifiedResults.card3.detail.workflow.1"),
          t("ax.verifiedResults.card3.detail.workflow.2"),
          t("ax.verifiedResults.card3.detail.workflow.3"),
        ],
        expand: t("ax.verifiedResults.card3.detail.expand"),
      },
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

const IndustryCasesSection = ({ cases }: { cases: IndustryCaseType[] }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="mx-auto mb-10 max-w-6xl md:mb-14"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-6 text-center md:mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C400FF]/15 bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 px-4 py-2">
          <span className="text-sm font-bold text-[#C400FF]">{t("ax.industryCases.badge")}</span>
        </div>
        <h3 className="text-2xl font-black leading-tight text-foreground md:text-4xl">
          {t("ax.industryCases.title")}
        </h3>
        <p className="mx-auto mt-3 max-w-3xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground md:text-base">
          {t("ax.industryCases.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cases.map((item, index) => (
          <motion.article
            key={item.id}
            className="group relative overflow-hidden rounded-[28px] border border-stone-300/70 bg-white/92 p-5 shadow-[0_24px_70px_rgba(24,24,33,0.06)] backdrop-blur-sm md:p-6"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,181,41,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(196,0,255,0.1),transparent_34%)] opacity-80" />
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full border border-stone-300/50" />
            <div className="absolute -bottom-20 left-[-10px] h-32 w-32 rounded-full bg-[#f7f4fb]" />

            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full border border-[#C400FF]/15 bg-white/80 px-3 py-1 text-xs font-bold tracking-[0.16em] text-[#6b33c7]">
                  {item.industry}
                </span>
                <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-sm font-black text-transparent">
                  {item.metric}
                </span>
              </div>

              <h4 className="text-xl font-black leading-tight text-foreground md:text-2xl">
                {item.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-foreground/72 md:text-[15px]">
                {item.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-stone-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
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

const roleBgMap: Record<string, string> = {
  design: "rgba(248,181,41,0.10)",
  ops: "rgba(40,38,64,0.07)",
  marketing: "rgba(196,0,255,0.08)",
  sales: "rgba(16,185,129,0.08)",
};

const RoleCasesSection = ({ cases }: { cases: RoleCaseType[] }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="mx-auto mb-10 max-w-6xl md:mb-14"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-6 text-center md:mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#282640]/15 bg-gradient-to-r from-[#282640]/8 to-[#C400FF]/10 px-4 py-2">
          <span className="text-sm font-bold text-[#282640]">{t("ax.roleCases.badge")}</span>
        </div>
        <h3 className="text-2xl font-black leading-tight text-foreground md:text-4xl">
          {t("ax.roleCases.title")}
        </h3>
        <p className="mx-auto mt-3 max-w-3xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground md:text-base">
          {t("ax.roleCases.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cases.map((item, index) => (
          <motion.article
            key={item.id}
            className="group relative overflow-hidden rounded-[28px] border border-stone-300/70 bg-white/92 p-5 shadow-[0_24px_70px_rgba(24,24,33,0.06)] backdrop-blur-sm md:p-6"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6 }}
          >
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background: `radial-gradient(circle at top left, ${roleBgMap[item.icon] ?? "rgba(196,0,255,0.08)"}, transparent 40%)`,
              }}
            />
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full border border-stone-300/50" />
            <div className="absolute -bottom-20 left-[-10px] h-32 w-32 rounded-full bg-[#f7f4fb]" />

            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full border border-[#282640]/15 bg-white/80 px-3 py-1 text-xs font-bold tracking-[0.16em] text-[#282640]">
                  {item.role}
                </span>
                <span className="bg-gradient-to-r from-[#282640] to-[#C400FF] bg-clip-text text-sm font-black text-transparent">
                  {item.metric}
                </span>
              </div>

              <h4 className="text-xl font-black leading-tight text-foreground md:text-2xl">
                {item.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-foreground/72 md:text-[15px]">
                {item.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-stone-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
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
          className="relative h-[600px] min-w-[380px] max-w-[380px] overflow-hidden rounded-[30px] border border-stone-300/60 bg-[linear-gradient(180deg,#11131c_0%,#171a27_100%)] p-7 text-white shadow-[0_28px_80px_rgba(22,18,35,0.22)]"
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

      {selectedCard && (
        (selectedCard.detail as { chatMode?: boolean })?.chatMode
          ? <ChatDemoModal card={selectedCard} onClose={() => setSelectedCard(null)} />
          : <CaseDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
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
