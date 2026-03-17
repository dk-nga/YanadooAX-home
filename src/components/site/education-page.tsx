"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Shield, Briefcase, GraduationCap, Target, Lightbulb, CheckCircle2, ChevronRight, ChevronLeft, ChevronDown, TrendingUp, Users } from "lucide-react";
import type { Variants } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactWidget } from "@/components/ContactWidget";
import { useLanguage } from "@/contexts/LanguageContext";
import { ContactWidgetProvider, useContactWidget } from "@/contexts/ContactWidgetContext";
import { DownloadModal } from "@/components/DownloadModal";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import nextgenSymbol from "@/assets/nextgen-symbol.svg";
import logoFull from "@/assets/logo-full.svg";

// Problem card images
import problemImage1 from "@/assets/problem-1-hourglass.png";
import problemImage2 from "@/assets/problem-2-individual.png";
import problemImage3 from "@/assets/problem-3-documents.png";
import problemImage4 from "@/assets/problem-4-metrics.png";
import problemImage5 from "@/assets/problem-5-temporary.png";

// Pain point card images
import painpointSecurity from "@/assets/painpoint-security.jpg";
import painpointTeam from "@/assets/painpoint-team.jpg";
import painpointMetrics from "@/assets/painpoint-metrics.jpg";

// Core program card images
import programThinking from "@/assets/program-thinking.png";
import programWorkflow from "@/assets/program-workflow.png";
import programSecurity from "@/assets/program-security.png";

const problemImages = [
  problemImage1.src,
  problemImage2.src,
  problemImage3.src,
  problemImage4.src,
  problemImage5.src,
];

type EducationStat = Database["public"]["Tables"]["education_stats"]["Row"];
type EducationPageProps = {
  stats: EducationStat[];
};






// Typing animation hook
const useTypewriter = (text: string, speed: number = 50, startDelay: number = 0) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startTimeout = setTimeout(() => {
      if (!isMounted) return;
      setDisplayedText("");
      setIsComplete(false);

      let i = 0;
      intervalId = setInterval(() => {
        if (!isMounted) {
          if (intervalId) clearInterval(intervalId);
          return;
        }
        
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          if (intervalId) clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speed);
    }, startDelay);
    
    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
};

// Animated Counter Hook - simplified to work with external trigger
const useAnimatedCounter = (target: number, duration: number = 2000, isDecimal: boolean = false, shouldStart: boolean = false) => {
  const [count, setCount] = useState(0);
  const hasStartedRef = useRef(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Skip if already started or shouldn't start yet
    if (!shouldStart || hasStartedRef.current) return;
    
    hasStartedRef.current = true;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      if (isDecimal) {
        const newValue = Math.round(target * easeOut * 10) / 10;
        setCount(newValue);
      } else {
        setCount(Math.floor(target * easeOut));
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exactly target
        setCount(target);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [shouldStart, target, duration, isDecimal]);

  return count;
};

// Education partner logos from Supabase storage
const PARTNER_STORAGE_URL = "https://rsigybhusvrnkllhurhv.supabase.co/storage/v1/object/public/education-partners";

const educationPartners = [
  { name: "OP.GG", logo: `${PARTNER_STORAGE_URL}/op.gg.png` },
  { name: "에듀윌", logo: `${PARTNER_STORAGE_URL}/eduwill.png` },
  { name: "삼화제작소", logo: `${PARTNER_STORAGE_URL}/samhwa.png` },
  { name: "세정글로벌", logo: `${PARTNER_STORAGE_URL}/sejungglobal.png` },
  { name: "잇존어페럴", logo: `${PARTNER_STORAGE_URL}/itzon.png` },
  { name: "대법원", logo: `${PARTNER_STORAGE_URL}/court.svg` },
  { name: "메이플미디어", logo: `${PARTNER_STORAGE_URL}/maplemedia.png` },
  { name: "씨클라임", logo: `${PARTNER_STORAGE_URL}/cclime.jpg` },
  { name: "라이브스메드", logo: `${PARTNER_STORAGE_URL}/livesmed.png` },
  { name: "수원지법", logo: `${PARTNER_STORAGE_URL}/suwon_court.png` },
  { name: "법원행정처", logo: `${PARTNER_STORAGE_URL}/judicial research.svg` },
  { name: "삼성금융네트웍스", logo: `${PARTNER_STORAGE_URL}/samsung_finance.png` },
  { name: "SK경영경제연구소", logo: `${PARTNER_STORAGE_URL}/sk_research.jpg` },
  { name: "알파클럽", logo: `${PARTNER_STORAGE_URL}/alphaclub.png` },
  { name: "크리에이티브포스", logo: `${PARTNER_STORAGE_URL}/creativeforce.jpg` },
  { name: "서울옥션", logo: `${PARTNER_STORAGE_URL}/seoul_auction.png` },
  { name: "검문", logo: `${PARTNER_STORAGE_URL}/gummun.png` },
  { name: "서울대학교", logo: `${PARTNER_STORAGE_URL}/seoul_univ.png` },
  { name: "EBS", logo: `${PARTNER_STORAGE_URL}/ebs-2.png` },
  { name: "CJ", logo: `${PARTNER_STORAGE_URL}/cj.png` },
  { name: "MK유니버셜", logo: `${PARTNER_STORAGE_URL}/mkuniversial.png` },
  { name: "크리스탈리", logo: `${PARTNER_STORAGE_URL}/christally.png` },
  { name: "그란데클립", logo: `${PARTNER_STORAGE_URL}/grandeclip.png` },
  { name: "노블레스", logo: `${PARTNER_STORAGE_URL}/noblesse.jpeg` },
  { name: "한국콘텐츠진흥원", logo: `${PARTNER_STORAGE_URL}/kca.png` },
  { name: "서울디지털미디어고", logo: `${PARTNER_STORAGE_URL}/seoul_digital media_high.webp` },
  { name: "중소벤처기업진흥공단", logo: `${PARTNER_STORAGE_URL}/kosme.svg` },
  { name: "안목", logo: `${PARTNER_STORAGE_URL}/ahnmok.png` },
];

// 강사 데이터 (다국어)
type Instructor = {
  name: string;
  title: string;
  image: string;
  credentials: string[];
};

const getInstructors = (t: (key: string) => string): Instructor[] => [
  {
    name: t("edu.instructor1.name"),
    title: t("edu.instructor1.title"),
    image: "dk.jpg",
    credentials: [
      t("edu.instructor1.cred1"),
      t("edu.instructor1.cred2"),
      t("edu.instructor1.cred3"),
    ],
  },
  {
    name: t("edu.instructor2.name"),
    title: t("edu.instructor2.title"),
    image: "ian.jpg",
    credentials: [
      t("edu.instructor2.cred1"),
      t("edu.instructor2.cred2"),
      t("edu.instructor2.cred3"),
    ],
  },
  {
    name: t("edu.instructor3.name"),
    title: t("edu.instructor3.title"),
    image: "jack.jpg",
    credentials: [
      t("edu.instructor3.cred1"),
      t("edu.instructor3.cred2"),
      t("edu.instructor3.cred3"),
    ],
  },
  {
    name: t("edu.instructor4.name"),
    title: t("edu.instructor4.title"),
    image: "chris.jpg",
    credentials: [
      t("edu.instructor4.cred1"),
      t("edu.instructor4.cred2"),
      t("edu.instructor4.cred3"),
    ],
  },
  {
    name: t("edu.instructor5.name"),
    title: t("edu.instructor5.title"),
    image: "leo.jpg",
    credentials: [
      t("edu.instructor5.cred1"),
      t("edu.instructor5.cred2"),
      t("edu.instructor5.cred3"),
    ],
  },
  {
    name: t("edu.instructor6.name"),
    title: t("edu.instructor6.title"),
    image: "jay.jpg",
    credentials: [
      t("edu.instructor6.cred1"),
      t("edu.instructor6.cred2"),
      t("edu.instructor6.cred3"),
    ],
  },
];

// Pain Points 데이터
const painPoints = [
  {
    icon: Shield,
    image: painpointSecurity.src,
    question: "보안 사고가 걱정되시나요?",
    solution: "AI Governance 전략 수립",
    description: "기업 데이터 보안과 AI 활용 윤리 체계를 동시에 구축합니다."
  },
  {
    icon: Target,
    image: painpointTeam.src,
    question: "부서마다 필요한 역량이 다른가요?",
    solution: "직군별 맞춤형 Thinking Process",
    description: "마케팅, 영업, HR, 개발 등 각 부서 특성에 최적화된 커리큘럼을 제공합니다."
  },
  {
    icon: Lightbulb,
    image: painpointMetrics.src,
    question: "교육 효과를 측정하기 어려우신가요?",
    solution: "데이터 기반 AI-Q 역량 진단 리포트",
    description: "교육 전후 역량 변화를 6개 지표로 정량화하여 시각화합니다."
  },
];

// Core Program 데이터 - 번역 키 사용으로 변경
const getCorePrograms = (t: (key: string) => string) => [
  {
    step: "Step 1",
    title: t('edu.coreProgram.step1.title'),
    subtitle: t('edu.coreProgram.step1.subtitle'),
    description: t('edu.coreProgram.step1.description'),
    hoverDetails: [
      t('edu.coreProgram.step1.hover1'),
      t('edu.coreProgram.step1.hover2'),
      t('edu.coreProgram.step1.hover3')
    ],
    hoverConclusion: t('edu.coreProgram.step1.conclusion'),
    icon: Lightbulb,
    color: "from-amber-500 to-orange-500",
    image: programThinking.src
  },
  {
    step: "Step 2",
    title: t('edu.coreProgram.step2.title'),
    subtitle: t('edu.coreProgram.step2.subtitle'),
    description: t('edu.coreProgram.step2.description'),
    hoverDetails: [
      t('edu.coreProgram.step2.hover1'),
      t('edu.coreProgram.step2.hover2'),
      t('edu.coreProgram.step2.hover3')
    ],
    hoverConclusion: t('edu.coreProgram.step2.conclusion'),
    icon: Briefcase,
    color: "from-[#F8B529] to-[#C400FF]",
    image: programWorkflow.src
  },
  {
    step: "Step 3",
    title: t('edu.coreProgram.step3.title'),
    subtitle: t('edu.coreProgram.step3.subtitle'),
    description: t('edu.coreProgram.step3.description'),
    hoverDetails: [
      t('edu.coreProgram.step3.hover1'),
      t('edu.coreProgram.step3.hover2'),
      t('edu.coreProgram.step3.hover3')
    ],
    hoverConclusion: t('edu.coreProgram.step3.conclusion'),
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
    image: programSecurity.src
  },
];

type ProcessStep = {
  step: string;
  title: string;
  subtitle: string;
  description: string;
};

// Process 데이터 (다국어)
const getProcessSteps = (t: (key: string) => string): ProcessStep[] => [
  {
    step: t("edu.process1.step"),
    title: t("edu.process1.title"),
    subtitle: t("edu.process1.subtitle"),
    description: t("edu.process1.description"),
  },
  {
    step: t("edu.process2.step"),
    title: t("edu.process2.title"),
    subtitle: t("edu.process2.subtitle"),
    description: t("edu.process2.description"),
  },
  {
    step: t("edu.process3.step"),
    title: t("edu.process3.title"),
    subtitle: t("edu.process3.subtitle"),
    description: t("edu.process3.description"),
  },
  {
    step: t("edu.process4.step"),
    title: t("edu.process4.title"),
    subtitle: t("edu.process4.subtitle"),
    description: t("edu.process4.description"),
  },
];

// Animation variants - MUST be defined before components that use them
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Process Step Card Component (Desktop)
interface ProcessStepCardProps {
  step: ProcessStep;
  index: number;
}

const ProcessStepCard = ({ step, index }: ProcessStepCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  // Progressive heights: 01 smallest → 04 tallest
  const heightStyles = ['120px', '160px', '200px', '240px'];

  return (
    <motion.div 
      className="flex-1 flex flex-col items-center relative"
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: { 
            duration: 0.6, 
            delay: index * 0.15,
            ease: [0.25, 0.1, 0.25, 1] 
          }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-full mb-3 z-20 w-64"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-[#1a1a2e] text-white rounded-lg p-4 shadow-2xl border border-white/10 relative">
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1a2e] rotate-45 border-r border-b border-white/10" />
              <p className="text-xs leading-relaxed whitespace-pre-line">
                {step.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Step Card/Bar - Semi-transparent Glassmorphism with 3D Icon */}
      <motion.div 
        className="relative w-full flex flex-col justify-end pb-4 px-4 cursor-pointer transition-all duration-300 backdrop-blur-md border border-white/30 overflow-hidden"
        style={{ 
          height: heightStyles[index],
          background: isHovered 
            ? `linear-gradient(180deg, rgba(141,54,235,0.6) 0%, rgba(22,92,255,0.6) 100%)`
            : `linear-gradient(180deg, rgba(141,54,235,0.25) 0%, rgba(22,92,255,0.35) 100%)`,
          borderRadius: '12px',
          boxShadow: isHovered 
            ? '0 8px 32px rgba(141,54,235,0.3)' 
            : '0 4px 16px rgba(0,0,0,0.1)',
        }}
        whileHover={{ scale: 1.03, y: -4 }}
      >
        <div>
          <span className={`text-2xl font-black mb-1 block transition-colors duration-300 ${isHovered ? 'text-white' : 'text-foreground'}`}>
            {step.step}.
          </span>
          <h4 className={`font-bold text-sm mb-1 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-foreground'}`}>
            {step.title}
          </h4>
          <p className={`text-xs transition-colors duration-300 line-clamp-2 ${isHovered ? 'text-white/90' : 'text-muted-foreground'}`}>
            {step.subtitle}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Process Step Card Component (Mobile)
const ProcessStepCardMobile = ({ step, index }: ProcessStepCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Higher base intensity for better visibility: 45% to 90%
  const gradientIntensity = 45 + (index * 15);

  return (
    <motion.div className="w-full" variants={itemVariants}>
      <motion.div 
        className="rounded-xl p-5 cursor-pointer relative overflow-hidden shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, rgba(141,54,235,${gradientIntensity/100}) 0%, rgba(22,92,255,${gradientIntensity/100}) 100%)`
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-start gap-4">
          <span className="text-2xl font-bold text-white drop-shadow-sm">{step.step}.</span>
          <div className="flex-1">
            <h4 className="font-bold text-lg text-white drop-shadow-sm mb-1">{step.title}</h4>
            <p className="text-sm text-white/90">{step.subtitle}</p>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-white mt-4 pt-4 border-t border-white/30 whitespace-pre-line leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Problem Card Component with Glassmorphism and Hover-to-Show
interface ProblemCardProps {
  number: number;
  title: string;
  subtitle: string;
  quote: string;
  details: string[];
}

const ProblemCard = ({ number, title, subtitle, quote, details }: ProblemCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <div className="bg-white/50 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/60 shadow-lg transition-all duration-300 min-h-[180px] md:min-h-[220px] flex flex-col">
        {/* Number - Plain text */}
        <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent mb-2 md:mb-3 drop-shadow-sm">
          0{number}
        </span>

        {/* Title & Subtitle */}
        <h3 className="text-sm md:text-lg font-extrabold text-foreground mb-0.5 md:mb-1">{title}</h3>
        <p className="text-[10px] md:text-sm font-semibold text-foreground/70 mb-2 md:mb-4">{subtitle}</p>

        {/* Speech Bubble Quote */}
        <div className="relative mt-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 border border-white/90 shadow-sm relative">
            <p className="text-xs md:text-sm font-medium text-foreground/90 leading-relaxed">
              &quot;{quote}&quot;
            </p>
            {/* Speech bubble tail */}
            <div className="absolute -top-2 left-4 md:left-6 w-3 h-3 md:w-4 md:h-4 bg-white/80 border-l border-t border-white/90 rotate-45" />
          </div>
        </div>
      </div>

      {/* Hover Overlay with Details and Image */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? 'auto' : 'none'
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 z-10"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#C400FF]/20 shadow-2xl h-full flex">
          {/* Left side - Content */}
          <div className="flex flex-col flex-1 pr-3">
            {/* Pain Point Label */}
            <span className="text-[10px] md:text-xs font-bold text-[#C400FF] tracking-wide mb-0.5 md:mb-1">Pain Point</span>
            
            {/* Number */}
            <span className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent mb-2 md:mb-3">
              0{number}
            </span>

            {/* Details List */}
            <div className="space-y-2 flex-1">
              {details.map((detail, index) => (
                <p
                  key={index}
                  className="text-sm font-bold text-[#1a2744] leading-relaxed"
                >
                  {detail}
                </p>
              ))}
            </div>
          </div>

          {/* Right side - Grayscale Image */}
          <div className="w-24 md:w-28 flex-shrink-0 flex items-center justify-center">
            <img 
              src={problemImages[number - 1]} 
              alt=""
              className="w-full h-auto max-h-[140px] object-contain grayscale opacity-70"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Core Program Card Component with Hover-to-Show
interface CoreProgramCardProps {
  program: {
    step: string;
    title: string;
    subtitle: string;
    description: string;
    hoverDetails: string[];
    hoverConclusion: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    image: string;
  };
}

const CoreProgramCard = ({ program }: CoreProgramCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="relative min-h-[320px] md:min-h-[420px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <div className="bg-white/80 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl overflow-hidden h-full transition-all hover:border-[#C400FF]/30 hover:shadow-xl hover:shadow-[#C400FF]/5">
        {/* Image Header */}
        <div className="relative h-28 md:h-44 overflow-hidden">
          <img 
            src={program.image} 
            alt={program.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          {/* Step Badge on image */}
          <div className={`absolute top-3 left-3 md:top-4 md:left-4 inline-flex items-center gap-2 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gradient-to-r ${program.color} shadow-lg`}>
            <span className="text-[10px] md:text-xs font-bold text-white">{program.step}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-[#F8B529]/10 to-[#C400FF]/10 flex items-center justify-center mb-3 md:mb-4">
            <program.icon className="w-3 h-3 md:w-4 md:h-4 text-[#C400FF]" />
          </div>
          
          <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">{program.title}</h3>
          <p className="text-xs md:text-sm font-medium text-foreground/80 mb-2 md:mb-3">{program.subtitle}</p>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{program.description}</p>
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? 'auto' : 'none'
        }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 z-10"
      >
        <div className="bg-white/98 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#C400FF]/20 shadow-2xl h-full flex flex-col">
          {/* Header */}
          <div className={`inline-flex items-center gap-2 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gradient-to-r ${program.color} self-start mb-3 md:mb-4`}>
            <span className="text-[10px] md:text-xs font-bold text-white">{program.step}</span>
          </div>
          
          <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">{program.title}</h3>
          <p className="text-xs md:text-sm font-medium text-foreground/80 mb-3 md:mb-4">{program.subtitle}</p>
          
          {/* Details List */}
          <div className="space-y-2 md:space-y-2.5 mb-3 md:mb-4 flex-1">
            {program.hoverDetails.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" />
                </div>
                <p className="text-[11px] md:text-[13px] text-foreground/80 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          
          {/* Conclusion */}
          <div className="pt-3 md:pt-4 border-t border-border/30">
            <p className="text-xs md:text-sm font-medium text-foreground whitespace-pre-line leading-relaxed">
              {program.hoverConclusion}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Instructor Carousel Component - Infinite Marquee Style (CSS-based for seamless loop)
const InstructorCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();
  
  // Triple duplication for truly seamless infinite scroll
  const instructors = getInstructors(t);
  const tripleInstructors = [...instructors, ...instructors, ...instructors];

  return (
    <div 
      className="relative max-w-6xl mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left fade gradient overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-56 bg-gradient-to-r from-[#0d0d24] via-[#0d0d24]/70 to-transparent z-10 pointer-events-none" />
      
      {/* Right fade gradient overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-56 bg-gradient-to-l from-[#0d0d24] via-[#0d0d24]/70 to-transparent z-10 pointer-events-none" />
      
      <div 
        className="flex gap-6"
        style={{
          animation: `marquee-scroll 45s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
          width: 'max-content',
        }}
      >
        {tripleInstructors.map((instructor, index) => (
          <motion.div
            key={`${instructor.name}-${index}`}
            className="flex-shrink-0 w-72 rounded-2xl overflow-hidden border border-white/10"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Image Section - cropped more at bottom */}
            <div className="w-full h-64 bg-gradient-to-br from-[#1a1a3a] to-[#0d0d24] overflow-hidden">
              {instructor.image ? (
                <img 
                  src={`https://rsigybhusvrnkllhurhv.supabase.co/storage/v1/object/public/university-logos/${instructor.image}`}
                  alt={instructor.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F8B529]/30 to-[#C400FF]/30 flex items-center justify-center">
                    <GraduationCap className="w-12 h-12 text-white/50" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Info Section - Navy background like reference */}
            <div className="bg-[#1a2744] p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-base font-bold text-white">{instructor.name}</h4>
                <span className="text-white/60 text-xs">{instructor.title}</span>
              </div>
              <ul className="space-y-0.5">
                {instructor.credentials.map((cred, i) => (
                  <li key={i} className="text-white/70 text-xs leading-snug">
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* CSS Keyframes for seamless marquee */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333%)); }
        }
      `}</style>
    </div>
  );
};

// Hook to fetch education testimonials from database
const useEducationTestimonials = (language: string) => {
  const [testimonials, setTestimonials] = useState<Array<{
    id: string;
    title: string;
    subtitle: string;
    content: string;
    author_name: string;
    author_title: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
          .from("testimonials")
          .select("id, title, subtitle, content, author_name, author_title")
          .eq("category", "education")
          .eq("language", language)
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err) {
        console.error("Error fetching education testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [language]);

  return { testimonials, loading };
};

// Testimonial Carousel Component - Now fetches from database
const TestimonialCarousel = ({ t, language }: { t: (key: string) => string; language: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { testimonials, loading } = useEducationTestimonials(language);

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-16 flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-10 z-10 p-2 rounded-full bg-white shadow-lg border border-border/50 hover:bg-muted/50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-10 z-10 p-2 rounded-full bg-white shadow-lg border border-border/50 hover:bg-muted/50 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Show 2 cards at once - macOS Style */}
              {[0, 1].map((offset) => {
                const index = (currentIndex + offset) % testimonials.length;
                const testimonial = testimonials[index];
                if (!testimonial) return null;
                return (
                  <div 
                    key={testimonial.id}
                    className="bg-white rounded-xl border border-border/30 overflow-hidden"
                  >
                    {/* macOS Title Bar */}
                    <div className="bg-gradient-to-b from-gray-100 to-gray-50 px-3 py-2 flex items-center gap-1.5 border-b border-border/30">
                      {/* Traffic Light Buttons */}
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shadow-inner" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] shadow-inner" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] shadow-inner" />
                      </div>
                      {/* Window Title */}
                      <div className="flex-1 text-center">
                        <span className="text-[10px] text-muted-foreground font-medium">{t("edu.testimonialWindowTitle")}</span>
                      </div>
                      {/* Spacer for symmetry */}
                      <div className="w-8" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 md:p-5 min-h-[160px] flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-2">
                        <svg width="16" height="14" viewBox="0 0 18 14" fill="none" className="text-primary/25">
                          <path d="M0 14V8.4C0 6.8 0.3 5.35 0.9 4.05C1.5 2.75 2.35 1.7 3.45 0.899999L5.55 2.4C4.85 3.06667 4.3 3.85 3.9 4.75C3.5 5.65 3.3 6.6 3.3 7.6H6V14H0ZM10 14V8.4C10 6.8 10.3 5.35 10.9 4.05C11.5 2.75 12.35 1.7 13.45 0.899999L15.55 2.4C14.85 3.06667 14.3 3.85 13.9 4.75C13.5 5.65 13.3 6.6 13.3 7.6H16V14H10Z" fill="currentColor"/>
                        </svg>
                      </div>
                      
                      {/* Main Quote - title is the main headline */}
                      <div className="flex-1">
                        <p className="text-sm md:text-base font-bold text-foreground leading-relaxed mb-2 line-clamp-2">
                          {testimonial.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {testimonial.content}
                        </p>
                      </div>
                      
                      {/* Author */}
                      <div className="flex items-center gap-2 pt-3 border-t border-border/30">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
                            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">{testimonial.author_name}</p>
                          <p className="text-[10px] text-muted-foreground">{testimonial.author_title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 2)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / 2) === index 
                  ? 'w-6 bg-gradient-to-r from-primary to-accent' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Before/After Bar Chart Component with Toggle
const BeforeAfterChart = () => {
  const [showAfter, setShowAfter] = useState(true);
  const { t } = useLanguage();
  
  const metrics = [
    { label: t('edu.evidence.metric1'), before: 28, after: 85 },
    { label: t('edu.evidence.metric2'), before: 22, after: 78 },
    { label: t('edu.evidence.metric3'), before: 18, after: 72 },
    { label: t('edu.evidence.metric4'), before: 15, after: 68 },
    { label: t('edu.evidence.metric5'), before: 32, after: 82 },
    { label: t('edu.evidence.metric6'), before: 25, after: 75 },
  ];

  return (
    <motion.div 
      className="bg-gray-50 rounded-2xl p-6"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-foreground">{t('edu.aiq.beforeAfter')}</h3>
        
        {/* Toggle Switch */}
        <motion.button
          onClick={() => setShowAfter(!showAfter)}
          className="relative flex items-center gap-2 px-1 py-1 bg-white rounded-full border border-gray-200 shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-0.5">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
              !showAfter 
                ? 'bg-gray-200 text-gray-700' 
                : 'text-gray-400'
            }`}>
              Before
            </span>
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
              showAfter 
                ? 'bg-gradient-to-r from-[#F8B529] to-[#C400FF] text-white shadow-md' 
                : 'text-gray-400'
            }`}>
              After
            </span>
          </div>
        </motion.button>
      </div>
      
      {/* Bar Chart */}
      <div className="space-y-3">
        {metrics.map((item, index) => {
          const currentValue = showAfter ? item.after : item.before;
          const difference = item.after - item.before;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-foreground">{item.label}</span>
                <motion.span 
                  className="text-[11px] font-bold"
                  animate={{ 
                    color: showAfter ? '#C400FF' : '#888888',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {showAfter ? `+${difference}%` : `${item.before}%`}
                </motion.span>
              </div>
              <div className="relative h-6 bg-[#F0F0F0] rounded-lg overflow-hidden">
                {/* Animated bar */}
                <motion.div 
                  className="absolute inset-y-0 left-0 rounded-lg flex items-center justify-end pr-2"
                  animate={{ 
                    width: `${currentValue}%`,
                    background: showAfter 
                      ? 'linear-gradient(90deg, #F8B529 0%, #C400FF 100%)' 
                      : '#D0D0D0'
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.05,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <motion.span 
                    className="text-[10px] font-bold"
                    animate={{ 
                      color: showAfter ? '#ffffff' : '#666666',
                    }}
                  >
                    {currentValue}
                  </motion.span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary indicator */}
      <motion.div 
        className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center gap-3"
        animate={{ opacity: showAfter ? 1 : 0.5 }}
      >
        <motion.div 
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          animate={{ 
            background: showAfter 
              ? 'linear-gradient(135deg, rgba(141,54,235,0.1) 0%, rgba(22,92,255,0.1) 100%)' 
              : 'rgba(0,0,0,0.03)'
          }}
        >
          <motion.div
            animate={{ 
              rotate: showAfter ? 0 : 180,
              color: showAfter ? '#C400FF' : '#888888'
            }}
            transition={{ duration: 0.3 }}
          >
            <TrendingUp className="w-4 h-4" />
          </motion.div>
          <motion.span 
            className="text-sm font-bold"
            animate={{ 
              color: showAfter ? '#C400FF' : '#888888'
            }}
          >
            {t('edu.aiq.avgGrowth')}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const EducationContent = ({ stats }: EducationPageProps) => {
  const { language, t } = useLanguage();
  const { openContactWidget } = useContactWidget();
  
  const mainHeadline = t("edu.headline");
  
  const { displayedText, isComplete } = useTypewriter(mainHeadline, 45, 500);

  // Chart flip state
  const [isChartFlipped, setIsChartFlipped] = useState(false);
  
  // Download modal state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Metrics section visibility ref
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-50px" });
  
  const educationStats = stats;
  
  // Get stat values from database or use defaults
  const getStat = (key: string): EducationStat | undefined => 
    educationStats?.find(s => s.stat_key === key);
  
  const satisfactionStat = getStat('satisfaction');
  const repurchaseStat = getStat('repurchase');
  const studentsStat = getStat('students');
  
  // Only start animation when data is loaded AND in view
  const statsLoaded = educationStats && educationStats.length > 0;
  const shouldStartAnimation = metricsInView && statsLoaded;
  
  // Animated counters - triggered by shared visibility AND data loaded
  const satisfactionCount = useAnimatedCounter(
    parseFloat(satisfactionStat?.stat_value || '4.9'), 
    2000, 
    true, 
    shouldStartAnimation
  );
  const repurchaseCount = useAnimatedCounter(
    parseInt(repurchaseStat?.stat_value || '92'), 
    2000, 
    false, 
    shouldStartAnimation
  );
  const companyCount = useAnimatedCounter(
    parseInt(studentsStat?.stat_value || '113'), 
    2000, 
    false, 
    shouldStartAnimation
  );
  
  // Handle primary CTA click - flip chart and show contact form
  const handlePrimaryCTA = () => {
    setIsChartFlipped(true);
    // Open contact widget after a short delay for the flip animation
    setTimeout(() => {
      openContactWidget();
    }, 300);
  };
  
  // Handle secondary CTA click - open download modal
  const handleSecondaryCTA = () => {
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Section 1: Hero - 파스텔 배경 (기존 스타일) */}
      <section className="pt-40 md:pt-44 pb-24 relative overflow-hidden">
        {/* Light pastel animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D8ECFC] via-[#E4EAFF] to-[#EDE4FB]">
          <motion.div 
            className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#282640]/15 to-[#C400FF]/10 blur-3xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#F8B529]/15 to-[#FF6B9D]/10 blur-3xl"
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1.1, 1, 1.1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-[40%] left-[40%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#282640]/10 to-[#00D4FF]/8 blur-3xl"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto lg:mx-0 lg:ml-auto">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left lg:pl-8 xl:pl-16">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 border border-[#C400FF]/15 rounded-full mb-6 backdrop-blur-sm shadow-sm"
              >
                <img src={nextgenSymbol.src} alt="Yanadoo AX" className="w-5 h-5" />
                <span className="text-sm font-medium text-foreground/80">
                  {t("edu.badge")}
                </span>
              </motion.div>
              
              {/* Headline with typewriter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mb-8"
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold min-h-[80px] md:min-h-[100px] text-foreground leading-tight">
                  <span className="whitespace-pre-line">
                    {displayedText.split(language === 'ja' ? '「業務が変わる教育」' : '"업무가 바뀌는 교육"').map((part, index, arr) => (
                      <span key={index}>
                        {part}
                        {index < arr.length - 1 && (
                          <span className="relative inline">
                            <span className="absolute inset-0 bg-gradient-to-r from-[#F8B529]/25 to-[#C400FF]/25 -skew-x-1 rounded-sm" style={{ top: '15%', bottom: '10%' }} />
                            <span className="relative">{language === 'ja' ? '「業務が変わる教育」' : '"업무가 바뀌는 교육"'}</span>
                          </span>
                        )}
                      </span>
                    ))}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block w-0.5 h-8 md:h-10 bg-[#282640] ml-1 align-middle"
                  />
                </h1>
              </motion.div>
              
              {/* Sub text and CTA */}
              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed whitespace-pre-line">
                      {t("edu.subtext")}
                    </p>
                    
                    <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start items-center">
                      {/* Primary CTA - AI 전문가에게 문의하기 */}
                      <motion.button
                        onClick={handlePrimaryCTA}
                        className="group relative inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-8 py-2 sm:py-4 rounded-full font-semibold text-[11px] sm:text-base overflow-hidden shadow-lg shadow-[#C400FF]/25"
                        style={{ background: 'linear-gradient(135deg, #F8B529 0%, #C400FF 100%)' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="relative z-10 text-white whitespace-nowrap">
                          {t("edu.ctaPrimary")}
                        </span>
                        <ArrowRight size={12} className="relative z-10 text-white sm:w-[18px] sm:h-[18px]" />
                      </motion.button>
                      
                      {/* Secondary CTA - 커리큘럼 받기 */}
                      <motion.button
                        onClick={handleSecondaryCTA}
                        className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-8 py-2 sm:py-4 bg-white/80 border border-[#C400FF]/20 text-foreground rounded-full font-semibold text-[11px] sm:text-base hover:bg-white transition-all backdrop-blur-sm whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t("edu.ctaSecondary")}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Right: 3D Flip Chart Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mt-8 lg:mt-0 perspective-1000"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative max-w-sm mx-auto lg:mx-0"
                animate={{ rotateY: isChartFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front - Chart Card */}
                <div 
                  className="bg-white/90 backdrop-blur-md rounded-xl p-5 shadow-xl shadow-[#C400FF]/10 border border-white/50"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">
                      {t("edu.chartTitle")}
                    </h3>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E0E0E0]" />
                        <span className="text-muted-foreground">{t("edu.chartBefore")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#F8B529] to-[#C400FF]" />
                        <span className="text-muted-foreground">{t("edu.chartAfter")}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart Bars */}
                  <div className="space-y-3">
                    {[
                      { label: t("edu.chartMetric1"), before: 25, after: 85 },
                      { label: t("edu.chartMetric2"), before: 20, after: 90 },
                      { label: t("edu.chartMetric3"), before: 15, after: 88 },
                      { label: t("edu.chartMetric4"), before: 10, after: 82 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-foreground">{item.label}</span>
                          <span className="text-xs font-bold text-[#C400FF]">+{item.after - item.before}%</span>
                        </div>
                        <div className="relative h-6 flex gap-0.5">
                          <motion.div 
                            className="h-full bg-[#E8E8E8] rounded-md relative overflow-hidden"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.before}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                          >
                            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-gray-500">{item.before}%</span>
                          </motion.div>
                          <motion.div 
                            className="h-full bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded-md relative overflow-hidden"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.after}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                          >
                            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-white">{item.after}%</span>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Summary */}
                  <motion.div 
                    className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium text-foreground">
                      {t("edu.chartSummary")} <span className="text-[#C400FF] font-bold">+68%</span>
                    </span>
                  </motion.div>
                </div>
                
                {/* Back - Contact Info Card */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#F8B529] to-[#C400FF] rounded-xl p-6 shadow-xl flex flex-col items-center justify-center text-center"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t("edu.flipCard.title")}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {t("edu.flipCard.description")}
                  </p>
                  <motion.button
                    onClick={() => setIsChartFlipped(false)}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("edu.flipCard.backButton")}
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-[#F8B529]/20 to-[#C400FF]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-gradient-to-br from-[#282640]/15 to-[#00D4FF]/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Social Proof - Animated Metrics + Logo Marquee */}
      <section className="pt-20 pb-44 bg-muted/30">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <motion.h2
            className="text-xl md:text-2xl font-bold text-center text-foreground mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("edu.socialProofTitle")}
          </motion.h2>
          
          {/* Animated Metrics */}
          <div
            ref={metricsRef}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
          >
            {/* Satisfaction */}
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                  {satisfactionCount}
                </span>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#F8B529]/60 to-[#C400FF]/60 bg-clip-text text-transparent">
                  {satisfactionStat?.stat_suffix || '/5.0'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {satisfactionStat?.stat_label || t("edu.metricSatisfaction")}
              </p>
            </motion.div>

            {/* Repurchase */}
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                  {repurchaseCount}
                </span>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#F8B529]/60 to-[#C400FF]/60 bg-clip-text text-transparent">
                  {repurchaseStat?.stat_suffix || '%'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {repurchaseStat?.stat_label || t("edu.metricRepurchase")}
              </p>
            </motion.div>

            {/* Companies */}
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                  {companyCount}
                </span>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#F8B529]/60 to-[#C400FF]/60 bg-clip-text text-transparent">
                  {studentsStat?.stat_suffix || (language === 'ja' ? '名' : '명')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {studentsStat?.stat_label || t("edu.metricStudents")}
              </p>
            </motion.div>
          </div>
          
          {/* Date reference */}
          <p className="text-center text-xs text-muted-foreground/60 mt-1">(2026.01 {language === 'ja' ? '基準' : '기준'})</p>

          {/* Logo Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h3 className="text-center text-xl md:text-2xl font-bold text-foreground mb-8">
              {t("edu.partnersTitle")}
            </h3>
            
            {/* Marquee Container */}
            <div className="relative overflow-hidden">
              {/* Gradient masks */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10" />
              
              {/* Scrolling logos - Row 1 */}
              <div className="flex mb-4">
                <motion.div 
                  className="flex gap-8 items-center"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ 
                    duration: 70, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  {[...educationPartners, ...educationPartners].map((partner, index) => (
                    <div 
                      key={`${partner.name}-${index}`}
                      className="flex-shrink-0 px-6 py-4 bg-transparent rounded-lg hover:bg-white/50 transition-all min-w-[140px] h-16 flex items-center justify-center"
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-h-10 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<span class="text-sm font-medium text-muted-foreground whitespace-nowrap">${partner.name}</span>`;
                        }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Scrolling logos - Row 2 (reverse) */}
              <div className="flex">
                <motion.div 
                  className="flex gap-8 items-center"
                  animate={{ x: ['-50%', '0%'] }}
                  transition={{ 
                    duration: 75, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  {[...educationPartners.slice().reverse(), ...educationPartners.slice().reverse()].map((partner, index) => (
                    <div 
                      key={`${partner.name}-rev-${index}`}
                      className="flex-shrink-0 px-6 py-4 bg-transparent rounded-lg hover:bg-white/50 transition-all min-w-[140px] h-16 flex items-center justify-center"
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-h-10 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<span class="text-sm font-medium text-muted-foreground whitespace-nowrap">${partner.name}</span>`;
                        }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Carousel */}
          <TestimonialCarousel t={t} language={language} />
        </div>
      </section>
      {/* Section 3: Why Most AI Education Fails - Light Purple Theme */}
      <section className="py-24 bg-[#E8ECFF] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-4xl font-bold text-foreground">
              {language === 'ja' 
                ? 'なぜほとんどのAI教育は' 
                : '왜 대부분의 AI 교육은'}
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute inset-0 bg-gradient-to-r from-[#F8B529]/20 to-[#C400FF]/20 -skew-x-1 rounded-sm" style={{ top: '10%', bottom: '5%' }} />
                <span className="relative">
                  {language === 'ja' ? '「使えない」のか？' : "'써먹을 수 없을까요?'"}
                </span>
              </span>
            </h2>
          </motion.div>

          {/* 5 Problem Cards - Glassmorphism with Click-to-Expand */}
          <motion.div
            className="max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Top Row - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Problem 1 */}
              <ProblemCard
                number={1}
                title={t("edu.problem1.title")}
                subtitle={t("edu.problem1.subtitle")}
                quote={t("edu.problem1.quote")}
                details={[
                  t("edu.problem1.detail1"),
                  t("edu.problem1.detail2")
                ]}
              />

              {/* Problem 2 */}
              <ProblemCard
                number={2}
                title={t("edu.problem2.title")}
                subtitle={t("edu.problem2.subtitle")}
                quote={t("edu.problem2.quote")}
                details={[
                  t("edu.problem2.detail1"),
                  t("edu.problem2.detail2")
                ]}
              />

              {/* Problem 3 */}
              <ProblemCard
                number={3}
                title={t("edu.problem3.title")}
                subtitle={t("edu.problem3.subtitle")}
                quote={t("edu.problem3.quote")}
                details={[
                  t("edu.problem3.detail1"),
                  t("edu.problem3.detail2")
                ]}
              />
            </div>

            {/* Bottom Row - 2 Cards Centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Problem 4 */}
              <ProblemCard
                number={4}
                title={t("edu.problem4.title")}
                subtitle={t("edu.problem4.subtitle")}
                quote={t("edu.problem4.quote")}
                details={[
                  t("edu.problem4.detail1"),
                  t("edu.problem4.detail2")
                ]}
              />

              {/* Problem 5 */}
              <ProblemCard
                number={5}
                title={t("edu.problem5.title")}
                subtitle={t("edu.problem5.subtitle")}
                quote={t("edu.problem5.quote")}
                details={[
                  t("edu.problem5.detail1"),
                  t("edu.problem5.detail2")
                ]}
              />
            </div>
          </motion.div>

          {/* Common Cause Summary */}
          <motion.div
            className="max-w-3xl mx-auto mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 md:p-10 text-center relative overflow-hidden border border-white/60 shadow-xl">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 text-foreground/70 text-sm font-medium mb-4">
                  <motion.span 
                    className="text-2xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    ❗
                  </motion.span>
                  <span className="font-semibold">{t("edu.problemCommon.label")}</span>
                </div>
                <p className="text-sm md:text-2xl font-bold text-foreground leading-relaxed">
                  {t("edu.problemCommon.before")}<span className="relative inline-block"><span className="relative z-10 text-white">{t("edu.problemCommon.highlight")}</span><motion.span 
                      className="absolute inset-0 bg-[#E53935] -skew-x-1 rounded-sm origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    /></span>{t("edu.problemCommon.after")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Down Arrow Transition */}
          <motion.div
            className="flex flex-col items-center mt-10 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex flex-col items-center gap-1"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-8 h-8 text-[#C400FF]" strokeWidth={2.5} />
              <ChevronDown className="w-8 h-8 text-[#282640] -mt-4" strokeWidth={2.5} />
            </motion.div>
          </motion.div>

          {/* Solution Transition */}
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-white/60 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs md:text-xl text-foreground font-medium leading-relaxed mb-2">
                  {language === "ja" ? (
                    <>
                      AXはツールではなく <span className="text-[#C400FF] font-bold">システム</span>です。
                    </>
                  ) : (
                    <>
                      AX는 툴이 아니라 <span className="text-[#C400FF] font-bold">시스템</span>입니다.
                    </>
                  )}
                </p>
                <p className="text-sm md:text-2xl font-bold">
                  <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                    {language === 'ja' 
                      ? "仕事をAIに任せられる構造を作ります。" 
                      : "일을 AI에 맡길 수 있는 구조를 만듭니다."}
                  </span>
                </p>
              </div>
              {/* Decorative Curved Lines with Glow */}
              <div className="absolute bottom-0 right-0 w-56 h-56 md:w-72 md:h-72 overflow-hidden pointer-events-none">
                <motion.svg 
                  className="absolute bottom-0 right-0 w-full h-full"
                  viewBox="0 0 200 200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <defs>
                    <linearGradient id="curveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C400FF" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#282640" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="curveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#282640" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#C400FF" stopOpacity="0.2" />
                    </linearGradient>
                    {/* Blur/Glow filters */}
                    <filter id="glowFilter1" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glowFilter2" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" />
                    </filter>
                  </defs>
                  {/* Soft background glow layer */}
                  <motion.path
                    d="M 250 180 Q 150 160 120 100 Q 90 40 20 -20"
                    stroke="url(#curveGradient1)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#softBlur)"
                    opacity="0.4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  {/* Main flowing curve with glow */}
                  <motion.path
                    d="M 250 180 Q 150 160 120 100 Q 90 40 20 -20"
                    stroke="url(#curveGradient1)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glowFilter1)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  {/* Secondary curve background glow */}
                  <motion.path
                    d="M 260 140 Q 180 130 140 80 Q 100 30 40 -10"
                    stroke="url(#curveGradient2)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#softBlur)"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
                  />
                  {/* Secondary curve with glow */}
                  <motion.path
                    d="M 260 140 Q 180 130 140 80 Q 100 30 40 -10"
                    stroke="url(#curveGradient2)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glowFilter2)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
                  />
                  {/* Accent curve with soft glow */}
                  <motion.path
                    d="M 240 220 Q 170 190 130 140 Q 90 90 30 50"
                    stroke="url(#curveGradient1)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glowFilter1)"
                    opacity="0.7"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
                  />
                </motion.svg>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 4: Pain Points */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-4xl font-bold mb-4">
              {t('edu.enterprise.headline1')}
              <br className="md:hidden" />
              <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                {t('edu.enterprise.headline2')}
              </span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {painPoints.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-card border border-border rounded-xl md:rounded-2xl overflow-hidden hover:border-[#C400FF]/30 hover:shadow-xl hover:shadow-[#C400FF]/5 transition-all group"
                whileHover={{ y: -5 }}
              >
                {/* 상단 이미지 영역 */}
                <div className="relative h-24 md:h-32 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt="" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* 작은 아이콘 로고 - 이미지 위에 */}
                  <div className="absolute bottom-2 md:bottom-3 left-3 md:left-4 w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg ring-1 ring-black/5">
                    <item.icon className="w-3 h-3 md:w-4 md:h-4 text-[#C400FF]" />
                  </div>
                </div>

                {/* 콘텐츠 영역 */}
                <div className="p-4 md:p-6">
                  <p className="text-foreground font-semibold text-sm md:text-lg mb-2 md:mb-4">{t(`edu.painpoint${index + 1}.question`)}</p>
                  
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <span className="px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full bg-[#C400FF]/10 text-[#C400FF]">Solution</span>
                  </div>
                  <h3 className="text-sm md:text-base font-bold mb-2 md:mb-3 flex items-center gap-1 md:gap-2">
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-[#C400FF]" />
                    {t(`edu.painpoint${index + 1}.solution`)}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t(`edu.painpoint${index + 1}.description`)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 4: Core Program - Why Different */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-[#F8B529]/5 to-transparent blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-[#282640]/5 to-transparent blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Main Question */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('edu.core.whyDifferent1')}
              <br />
              <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                {t('edu.core.whyDifferent2')}
              </span>
            </h2>
          </motion.div>

          {/* Answer Statement */}
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/80 shadow-xl relative overflow-hidden">
              {/* Decorative gradient corner */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#F8B529]/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#282640]/10 to-transparent rounded-tr-full" />
              
              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-bold text-center mb-8 text-foreground">
                  {t('edu.core.answer')}
                </p>
                
                <div className="space-y-6 text-center">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t('edu.core.mostFocus')}
                  </p>
                  <p className="text-base md:text-lg text-foreground font-medium leading-relaxed">
                    {t('edu.core.ngaFocus1')}
                    <span className="relative inline-block">
                      <span className="relative z-10 font-bold bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                        {t('edu.core.ngaFocus2')}
                      </span>
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#F8B529]/20 to-[#C400FF]/20 -skew-x-2 rounded"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      />
                    </span>
                    {t('edu.core.ngaFocus3')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transition text */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm md:text-xl text-muted-foreground mb-1 md:mb-2">
              {language === 'ja' ? 'この違いを生み出すのが、' : '이 차이를 만드는 것이 바로,'}
            </p>
            <p className="text-base md:text-2xl font-bold text-foreground">
              {language === 'ja' 
                ? 'Yanadoo AXだけの' 
                : 'Yanadoo AX만의 '}
              <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                {language === 'ja' 
                  ? '実務適用・定着中心の教育運営システム' 
                  : '실무 적용·정착 중심 교육 운영 시스템'}
              </span>
              {language === 'ja' ? 'です。' : '입니다.'}
            </p>
          </motion.div>

          {/* Down Arrow */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-8 h-8 text-[#C400FF]" strokeWidth={2} />
            </motion.div>
          </motion.div>

          {/* Program Cards */}
          <motion.div 
            className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {getCorePrograms(t).map((program, index) => (
              <CoreProgramCard key={index} program={program} />
            ))}
          </motion.div>

          {/* Info cards */}
          <motion.div
            className="grid md:grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white/60 backdrop-blur-sm border border-[#C400FF]/10 rounded-xl md:rounded-2xl p-4 md:p-6 cursor-default"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <h4 className="font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-[#C400FF]" />
                {t('edu.core.enterpriseSecurity')}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {t('edu.core.enterpriseSecurityDesc1')}<br />
                {t('edu.core.enterpriseSecurityDesc2')}<br />
                {t('edu.core.enterpriseSecurityDesc3')}
              </p>
            </motion.div>
            <motion.div 
              className="bg-white/60 backdrop-blur-sm border border-[#282640]/10 rounded-xl md:rounded-2xl p-4 md:p-6 cursor-default"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <h4 className="font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                <Target className="w-4 h-4 md:w-5 md:h-5 text-[#282640]" />
                {t('edu.core.enterpriseKpi')}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {t('edu.core.enterpriseKpiDesc1')}<br />
                {t('edu.core.enterpriseKpiDesc2')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Evidence - Chart */}
      <section className="py-24 bg-gradient-to-br from-[#F8B529] to-[#C400FF] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center text-white mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl md:text-4xl font-bold mb-4">
                <span className="relative inline-block">
                  <span className="relative z-10">
                    {t("edu.evidence.headline1")}
                    {t("edu.evidence.headline2")}
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[45%] origin-left"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.45) 100%)",
                      borderRadius: "4px 8px 6px 3px",
                      transform: "skewX(-3deg) rotate(-0.5deg)",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  />
                </span>
                {t("edu.evidence.headline3")}
                <br />
                <span className="hidden md:inline">
                  {t("edu.evidence.headline4")}
                  {t("edu.evidence.headline5")}
                </span>
                <span className="md:hidden">{t("edu.evidence.headline5Mobile")}</span>
                <span className="relative inline-block">
                  <span className="relative z-10">{t("edu.evidence.headline6")}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[45%] origin-left"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,59,59,0.75) 0%, rgba(255,80,80,0.85) 40%, rgba(255,59,59,0.7) 100%)",
                      borderRadius: "6px 4px 8px 5px",
                      transform: "skewX(-2deg) rotate(0.3deg)",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  />
                </span>
                {t("edu.evidence.headline7")}
                <br />
                {t("edu.evidence.measurePrefix")} {" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t("edu.evidence.measureHighlight")}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[50%] origin-left"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,217,61,0.85) 0%, rgba(255,230,100,0.9) 50%, rgba(255,217,61,0.8) 100%)",
                      borderRadius: "5px 7px 4px 6px",
                      transform: "skewX(-4deg) rotate(-0.3deg)",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  />
                </span>
                {t("edu.evidence.headline9")}
              </h2>
              <p className="text-white/80 mt-6 text-sm md:text-lg font-medium">
                {t('edu.evidence.subheadline')}
              </p>
              <p className="text-white/70 mt-2 text-xs md:text-base max-w-xl mx-auto leading-relaxed">
                {t('edu.evidence.description1')}<br />
                {t('edu.evidence.description2')}
              </p>
            </motion.div>

            {/* Assessment Dimensions */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {[
                t('edu.evidence.metric1'),
                t('edu.evidence.metric2'),
                t('edu.evidence.metric3'),
                t('edu.evidence.metric4'),
                t('edu.evidence.metric5'),
                t('edu.evidence.metric6')
              ].map((dim, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-white/15 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-medium border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
                >
                  {dim}
                </motion.span>
              ))}
            </motion.div>

            {/* Main Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              {/* KPI Cards Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <motion.div 
                  className="bg-gray-50 rounded-xl p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xs text-muted-foreground mb-1">{t('edu.aiq.avgScore')}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">86.6</span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">150/150{t('edu.aiq.participants')}</p>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 rounded-xl p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xs text-muted-foreground mb-1">{t('edu.aiq.examStatus')}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-foreground">100</span>
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">150/150{t('edu.aiq.participants')}</p>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 rounded-xl p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xs text-muted-foreground mb-1">{t('edu.aiq.aiTalent')}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-foreground">65</span>
                    <span className="text-sm text-muted-foreground">{t('edu.aiq.participants')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t('edu.aiq.total')} 88%</p>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 rounded-xl p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xs text-muted-foreground mb-1">{t('edu.aiq.distribution')}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF3B3B] to-[#FF6B6B] text-white text-sm font-black flex items-center justify-center shadow-lg shadow-[#FF3B3B]/30">
                        S
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full text-[8px] font-bold flex items-center justify-center shadow-md text-[#FF3B3B]">48</div>
                    </motion.div>
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9500] to-[#FFB340] text-white text-sm font-black flex items-center justify-center shadow-lg shadow-[#FF9500]/30">
                        A
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full text-[8px] font-bold flex items-center justify-center shadow-md text-[#FF9500]">51</div>
                    </motion.div>
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFD60A] to-[#FFE566] text-[#8B7000] text-sm font-black flex items-center justify-center shadow-lg shadow-[#FFD60A]/30">
                        B
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full text-[8px] font-bold flex items-center justify-center shadow-md text-[#8B7000]">51</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Charts Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Hexagon Radar Chart - 6 Metrics */}
                <motion.div 
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground">{t('edu.aiq.sixMetrics')}</h3>
                    <span className="text-xs text-muted-foreground">{t('edu.aiq.companyBasis')}</span>
                  </div>
                  
                  {/* Hexagon Radar Chart SVG */}
                  <div className="relative aspect-square max-w-[260px] mx-auto">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Hexagon grid layers */}
                      {[20, 40, 60, 80].map((r, i) => {
                        const points = Array.from({ length: 6 }, (_, j) => {
                          const angle = (j * 60 - 90) * (Math.PI / 180);
                          return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                        }).join(' ');
                        return (
                          <polygon
                            key={i}
                            points={points}
                            fill="none"
                            stroke="#E5E5E5"
                            strokeWidth="0.5"
                          />
                        );
                      })}
                      
                      {/* Axis lines */}
                      {Array.from({ length: 6 }, (_, i) => {
                        const angle = (i * 60 - 90) * (Math.PI / 180);
                        const x = 100 + 80 * Math.cos(angle);
                        const y = 100 + 80 * Math.sin(angle);
                        return (
                          <line
                            key={i}
                            x1="100"
                            y1="100"
                            x2={x}
                            y2={y}
                            stroke="#E5E5E5"
                            strokeWidth="0.5"
                          />
                        );
                      })}
                      
                      {/* Data polygon - animated */}
                      <motion.polygon
                        fill="url(#radarGradient)"
                        stroke="url(#strokeGradient)"
                        strokeWidth="2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        points={(() => {
                          const values = [85, 78, 72, 68, 82, 75]; // 6 metrics values
                          return values.map((v, i) => {
                            const angle = (i * 60 - 90) * (Math.PI / 180);
                            const r = (v / 100) * 80;
                            return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                          }).join(' ');
                        })()}
                      />
                      
                      {/* Gradient definitions */}
                      <defs>
                        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#C400FF" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#282640" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#C400FF" />
                          <stop offset="100%" stopColor="#282640" />
                        </linearGradient>
                      </defs>
                      
                      {/* Data points - small circles */}
                      {[85, 78, 72, 68, 82, 75].map((v, i) => {
                        const angle = (i * 60 - 90) * (Math.PI / 180);
                        const r = (v / 100) * 80;
                        const x = 100 + r * Math.cos(angle);
                        const y = 100 + r * Math.sin(angle);
                        return (
                          <motion.circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#C400FF"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + i * 0.08 }}
                          />
                        );
                      })}
                    </svg>
                    
                    {/* Labels around the hexagon */}
                    {[
                      { label: t('edu.aiq.aiUnderstanding'), value: 85, pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-6' },
                      { label: t('edu.aiq.toolProficiency'), value: 78, pos: 'top-[15%] right-0 translate-x-4' },
                      { label: t('edu.aiq.workApplication'), value: 72, pos: 'bottom-[15%] right-0 translate-x-4' },
                      { label: t('edu.aiq.automationLevel'), value: 68, pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-6' },
                      { label: t('edu.aiq.productivityChange'), value: 82, pos: 'bottom-[15%] left-0 -translate-x-4' },
                      { label: t('edu.aiq.orgSpread'), value: 75, pos: 'top-[15%] left-0 -translate-x-4' },
                    ].map((item, i) => (
                      <div key={i} className={`absolute ${item.pos} text-center`}>
                        <span className="text-[10px] font-medium text-muted-foreground block">{item.label}</span>
                        <span className="text-xs font-bold text-[#C400FF]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Before/After Bar Chart with Toggle */}
                <BeforeAfterChart />
              </div>
              
              {/* Bottom Summary */}
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-foreground">
                    {t('edu.evidence.avgImprovement')} <span className="text-[#C400FF] font-bold text-lg">+68%</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-foreground">
                    {t('edu.evidence.productivity')} <span className="text-[#282640] font-bold text-lg">+45%</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-foreground">
                    {t('edu.evidence.spreadRate')} <span className="text-orange-500 font-bold text-lg">92%</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: Process */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              {language === 'ja' 
                ? <>なぜ多くの企業のAI教育は失敗するのでしょうか？<br />
                  <span className="relative inline-block">
                    <span className="relative z-10">出発点</span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-[45%] origin-left"
                      style={{
                        background: 'linear-gradient(90deg, rgba(141,54,235,0.5) 0%, rgba(22,92,255,0.6) 100%)',
                        borderRadius: '4px 6px 5px 4px',
                        transform: 'skewX(-2deg) rotate(0.3deg)',
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    />
                  </span>が違うからです。</>
                : <>왜 많은 기업의 AI 교육은 실패할까요?<br />
                  <span className="relative inline-block">
                    <span className="relative z-10">시작점</span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-[45%] origin-left"
                      style={{
                        background: 'linear-gradient(90deg, rgba(141,54,235,0.5) 0%, rgba(22,92,255,0.6) 100%)',
                        borderRadius: '4px 6px 5px 4px',
                        transform: 'skewX(-2deg) rotate(0.3deg)',
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    />
                  </span>이 다르기 때문입니다.</>
              }
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              {language === 'ja' 
                ? <>私たちの組織の
                  <span className="relative inline-block mx-1">
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                    />
                    <span className="relative z-10 text-white font-bold px-2 py-0.5">&apos;AX-Level&apos;</span>
                  </span>、今どこから始めるべきでしょうか？</>
                : <>우리 조직의 
                  <span className="relative inline-block mx-1">
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                    />
                    <span className="relative z-10 text-white font-bold px-2 py-0.5">&apos;AX-Level&apos;</span>
                  </span>, 지금 어디부터 시작해야 할까요?</>
              }
            </p>
          </motion.div>
          
          {/* Stair-step Layout with Curved Base */}
          <motion.div 
            className="relative max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Desktop Stair Layout */}
            <div className="hidden md:flex flex-row items-end justify-between gap-3">
              {getProcessSteps(t).map((step, index) => (
                <ProcessStepCard key={index} step={step} index={index} />
              ))}
            </div>

            {/* Mobile Vertical Layout */}
            <div className="md:hidden flex flex-col gap-4">
              {getProcessSteps(t).map((step, index) => (
                <ProcessStepCardMobile key={index} step={step} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Expert Credentials - Instructor Carousel */}
      <section className="py-24 bg-gradient-to-br from-[#0a0a1a] via-[#0d0d24] to-[#1a1a2e] relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C400FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#282640]/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* University Logos - Small Card Above Quote */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-6 px-6 py-3">
                {[
                  { name: "서울대", logo: "snu.png", needsBg: true },
                  { name: "KAIST", logo: "kaist.png", needsBg: true },
                  { name: "연세대", logo: "yonsei.png", needsBg: false },
                ].map((uni, index) => (
                  <motion.div 
                    key={index}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <img 
                      src={`https://rsigybhusvrnkllhurhv.supabase.co/storage/v1/object/public/university-logos/${uni.logo}`}
                      alt={uni.name}
                      className={`w-10 h-10 object-contain ${uni.needsBg ? 'bg-white rounded-lg p-1' : ''}`}
                    />
                    <p className="text-white/60 text-[10px] font-medium">{uni.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <p className="text-white/60 text-sm md:text-lg mb-3 md:mb-4">
              {language === 'ja' 
                ? '"本当に使う人たちが、本当に使えるようにします。"'
                : '"진짜 쓰는 사람들이, 진짜 쓸 수 있게 만듭니다."'}
            </p>
            <h2 className="text-sm md:text-2xl font-bold leading-relaxed mb-6 md:mb-8">
              {language === 'ja' 
                ? <>
                    <span className="relative inline-block">
                      <motion.span 
                        className="absolute inset-0 bg-yellow-300/60 -skew-x-3 -z-10 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1.05 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                      />
                      ソウル大・KAIST・延世大
                    </span>
                    出身、修士・博士級AI専門家が<br className="hidden md:inline" />御社の業務に合った
                    <span className="relative inline-block">
                      <motion.span 
                        className="absolute inset-0 bg-red-400/60 -skew-x-3 -z-10 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1.05 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                      />
                      実践AI教育
                    </span>
                    を直接設計します。
                  </>
                : <>
                    <span className="relative inline-block">
                      <motion.span 
                        className="absolute inset-0 bg-yellow-300/60 -skew-x-3 -z-10 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                      />
                      서울대·카이스트·연세대
                    </span>
                    {' '}출신, 석·박사급 AI 전문가들이<br />우리 회사 업무에 맞는{' '}
                    <span className="relative inline-block">
                      <motion.span 
                        className="absolute inset-0 bg-red-400/60 -skew-x-3 -z-10 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                      />
                      실전 AI 교육
                    </span>
                    을 직접 설계합니다.
                  </>}
            </h2>
          </motion.div>

          {/* Instructor Carousel */}
          <InstructorCarousel />

          {/* YouTube Videos Section */}
          <motion.div
            className="mt-16 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-8">
              {t('edu.instructor.videoTitle1')}<span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">{t('edu.instructor.videoTitle2')}</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/20">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/lKE_0BFLL1s?si=YtqHwIlKcO4y8Q2-"
                  title="Yanadoo AX 강연 영상 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/20">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/mot9hPKJ96c?si=QFIIh56t7Eg97VMR"
                  title="Yanadoo AX 강연 영상 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 8: Footer CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-4">
              {t('edu.footerCta.subtitle')}
            </p>
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              {t('edu.footerCta.headline1')}
              <br />
              <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                {t('edu.footerCta.headline2')}
              </span>
            </h2>
            <p className="text-muted-foreground mb-10">
              {t('edu.footerCta.description')}
            </p>
            
            <div className="flex flex-row gap-2 sm:gap-4 justify-center">
              <motion.button
                onClick={handlePrimaryCTA}
                className="group relative inline-flex items-center gap-1 sm:gap-3 px-4 sm:px-10 py-2.5 sm:py-5 rounded-full font-bold text-xs sm:text-lg overflow-hidden shadow-2xl shadow-[#C400FF]/30"
                style={{ background: 'linear-gradient(135deg, #F8B529 0%, #C400FF 100%)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 text-white whitespace-nowrap">{t('edu.ctaPrimary')}</span>
                <ArrowRight size={14} className="relative z-10 text-white sm:w-[22px] sm:h-[22px]" />
              </motion.button>
              
              <motion.button
                onClick={handleSecondaryCTA}
                className="inline-flex items-center gap-1 sm:gap-2 px-4 sm:px-8 py-2.5 sm:py-5 bg-white border border-border text-foreground rounded-full font-semibold text-xs sm:text-lg hover:bg-muted transition-all whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('edu.ctaSecondary')}
              </motion.button>
            </div>
            
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <img 
                src={logoFull.src}
                alt="Yanadoo AX"
                className="h-10 mx-auto opacity-80"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactWidget />
      
      {/* Download Modal for 커리큘럼 받기 */}
      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)}
        fileName="AI Education Curriculum"
      />
    </div>
  );
};

export function EducationPage(props: EducationPageProps) {
  return (
    <ContactWidgetProvider>
      <main>
        <EducationContent {...props} />
      </main>
    </ContactWidgetProvider>
  );
}
