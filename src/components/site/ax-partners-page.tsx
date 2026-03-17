"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown, Clock, Target, Cog, Users, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import nextgenSymbol from "@/assets/nextgen-symbol.svg";
import solutionBg from "@/assets/solution-bg.jpg";
import stepObserve from "@/assets/step-observe.jpg";
import stepClassify from "@/assets/step-classify.jpg";
import stepDesign from "@/assets/step-design.jpg";
import stepIterate from "@/assets/step-iterate.jpg";
// 12-week process background images
import processDiagnosis from "@/assets/process-01-diagnosis.png";
import processDesign from "@/assets/process-02-design.png";
import processExecute from "@/assets/process-03-execute.png";
import processEvaluate from "@/assets/process-04-evaluate.png";

import { ContactWidgetProvider } from "@/contexts/ContactWidgetContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Case study background images
import case1ReportAutomation from "@/assets/case-1-report-automation.png";
import case2ChatbotRag from "@/assets/case-2-chatbot-rag.png";
import case3Dashboard from "@/assets/case-3-dashboard.png";
import { ContactWidget } from "@/components/ContactWidget";
import { HeroInlineForm } from "@/components/HeroInlineForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AXPartners = () => {
  const { t } = useLanguage();
  const [showInlineForm, setShowInlineForm] = useState(false);
  const [showCtaForm, setShowCtaForm] = useState<'diagnosis' | 'contact' | null>(null);
  const [showTableModal, setShowTableModal] = useState(false);

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  const handleDiagnosisClick = () => {
    setShowInlineForm(true);
  };

  const handleCloseInlineForm = () => {
    setShowInlineForm(false);
  };

  const handleCtaDiagnosisClick = () => {
    setShowCtaForm('diagnosis');
  };

  const handleCtaContactClick = () => {
    setShowCtaForm('contact');
  };

  const handleCloseCtaForm = () => {
    setShowCtaForm(null);
  };

  // Problem section items
  const problemItems = [
    t('axp.problem.item1'),
    t('axp.problem.item2'),
    t('axp.problem.item3'),
    t('axp.problem.item4'),
  ];

  // Solution section items
  const solutionCards = [
    { icon: Target, title: t('axp.solution.card1.title'), desc: t('axp.solution.card1.desc') },
    { icon: Clock, title: t('axp.solution.card2.title'), desc: t('axp.solution.card2.desc') },
    { icon: Cog, title: t('axp.solution.card3.title'), desc: t('axp.solution.card3.desc') },
    { icon: Zap, title: t('axp.solution.card4.title'), desc: t('axp.solution.card4.desc') },
    { icon: Users, title: t('axp.solution.card5.title'), desc: t('axp.solution.card5.desc') },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground overflow-x-hidden">
      <Header />
      
      {/* ========== 0. HERO SECTION (Combined & Mobile-optimized) ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f8f9fc] via-[#f5f6fa] to-[#f0f2f8]">
        {/* Subtle background gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-[#F8B529]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-[#282640]/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-[#C400FF]/20 shadow-sm mb-4 md:mb-6">
              <img src={nextgenSymbol.src} alt="Yanadoo AX" className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">
                AX Partners Program
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 md:mb-4 text-slate-900">
              {t('axp.hero.h1.line1')}
              <br />
              {t('axp.hero.h1.line2.before')}<span className="relative inline-block"><span className="absolute inset-0 bg-gradient-to-r from-[#F8B529]/20 to-[#C400FF]/20 -skew-x-3 rounded"></span><span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">{t('axp.hero.h1.highlight')}</span></span>{t('axp.hero.h1.line2.after')}
            </h1>

            {/* H2 - Description */}
            <p className="text-xs md:text-base text-slate-600 leading-relaxed mb-1">
              {t('axp.hero.h2.line1')}{t('axp.hero.h2.line2')}
            </p>
            <p className="text-xs md:text-base text-slate-600 leading-relaxed mb-4 md:mb-6">
              {t('axp.hero.h2.line3')}
            </p>

            {/* Sub Copy - smaller */}
            <p className="text-xs md:text-sm font-semibold text-[#C400FF] mb-3 md:mb-4">
              {t('axp.hero.subCopy')}
            </p>

            {/* Key Points - compact */}
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              {[t('axp.hero.keyPoint1'), t('axp.hero.keyPoint2'), t('axp.hero.keyPoint3')].map((point) => (
                <div key={point} className="flex items-center gap-1.5 text-[10px] md:text-xs text-slate-700 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-full border border-slate-200">
                  <Check className="h-3 w-3 text-[#C400FF]" />
                  {point}
                </div>
              ))}
            </div>

            {/* CTAs - compact */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button
                onClick={handleDiagnosisClick}
                size="sm"
                className="bg-[#282640] hover:bg-[#282640]/90 text-white px-4 md:px-6 py-2.5 md:py-4 text-xs md:text-sm rounded-lg shadow-lg shadow-[#C400FF]/25"
              >
                {t('axp.hero.ctaDiagnosis')}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-[#C400FF]/30 text-[#C400FF] hover:bg-[#C400FF]/5 px-4 md:px-6 py-2.5 md:py-4 text-xs md:text-sm rounded-lg bg-white/80 backdrop-blur-sm"
              >
                <Link href="/cases">{t('axp.hero.ctaCases')}</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right: S-Curve Roadmap Infographic OR Inline Form */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showInlineForm ? (
                <HeroInlineForm key="form" onClose={handleCloseInlineForm} />
              ) : (
                <motion.div
                  key="infographic"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full max-w-lg"
                >
              <svg viewBox="0 0 400 500" className="w-full h-auto">
                <defs>
                  {/* Path Gradients */}
                  <linearGradient id="orangeBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient id="tealPurpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="purpleBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient id="blueOrangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  
                  {/* Drop shadow */}
                  <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.12"/>
                  </filter>
                </defs>
                
                {/* S-Curve Path Segment 1: From top-right, curves down and left */}
                <motion.path
                  d="M 300 60 Q 350 60 350 120 Q 350 180 250 180"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                />
                
                {/* S-Curve Path Segment 2: Curves right */}
                <motion.path
                  d="M 250 180 Q 150 180 150 240 Q 150 300 250 300"
                  fill="none"
                  stroke="#14B8A6"
                  strokeWidth="20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                />
                
                {/* S-Curve Path Segment 3: Curves left again */}
                <motion.path
                  d="M 250 300 Q 350 300 350 360 Q 350 420 250 420"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                />
                
                {/* S-Curve Path Segment 4: Final curve */}
                <motion.path
                  d="M 250 420 Q 150 420 150 460"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 1.5, ease: "easeOut" }}
                />

                {/* Node 1: 진단 (1-2주) */}
                <motion.g
                  filter="url(#nodeShadow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5, delay: 0.5 }}
                >
                  <circle cx="300" cy="60" r="36" fill="white" />
                  {/* Search/Magnifying Glass Icon */}
                  <g transform="translate(300, 60)">
                    <circle cx="0" cy="-4" r="10" fill="none" stroke="#F97316" strokeWidth="2.5"/>
                    <line x1="7" y1="3" x2="13" y2="9" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round"/>
                  </g>
                  <text x="300" y="80" textAnchor="middle" fill="#F97316" fontSize="9" fontWeight="700">01</text>
                </motion.g>
                {/* Label 1 - Left side */}
                <motion.g
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <rect x="70" y="32" width="140" height="56" rx="8" fill="white" filter="url(#nodeShadow)" />
                  <text x="140" y="48" textAnchor="middle" fill="#F97316" fontSize="10" fontWeight="700">{t('axp.roadmap.step1.title')}</text>
                  <text x="140" y="64" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="600">{t('axp.roadmap.step1.desc1')}</text>
                  <text x="140" y="78" textAnchor="middle" fill="#64748b" fontSize="10">{t('axp.roadmap.step1.desc2')}</text>
                </motion.g>

                {/* Node 2: 설계 (3-4주) */}
                <motion.g
                  filter="url(#nodeShadow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5, delay: 0.9 }}
                >
                  <circle cx="150" cy="240" r="36" fill="white" />
                  {/* Blueprint/Layout Icon */}
                  <g transform="translate(150, 240)">
                    <rect x="-12" y="-12" width="24" height="18" rx="2" fill="none" stroke="#14B8A6" strokeWidth="2"/>
                    <line x1="-12" y1="-4" x2="12" y2="-4" stroke="#14B8A6" strokeWidth="2"/>
                    <line x1="-4" y1="-12" x2="-4" y2="6" stroke="#14B8A6" strokeWidth="2"/>
                  </g>
                  <text x="150" y="262" textAnchor="middle" fill="#14B8A6" fontSize="9" fontWeight="700">02</text>
                </motion.g>
                {/* Label 2 - Right side */}
                <motion.g
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <rect x="210" y="212" width="140" height="56" rx="8" fill="white" filter="url(#nodeShadow)" />
                  <text x="280" y="228" textAnchor="middle" fill="#14B8A6" fontSize="10" fontWeight="700">{t('axp.roadmap.step2.title')}</text>
                  <text x="280" y="244" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="600">{t('axp.roadmap.step2.desc1')}</text>
                  <text x="280" y="258" textAnchor="middle" fill="#64748b" fontSize="10">{t('axp.roadmap.step2.desc2')}</text>
                </motion.g>

                {/* Node 3: 구축 (5-8주) */}
                <motion.g
                  filter="url(#nodeShadow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5, delay: 1.3 }}
                >
                  <circle cx="350" cy="360" r="36" fill="white" />
                  {/* Hammer/Build Icon */}
                  <g transform="translate(350, 360)">
                    <rect x="-3" y="-12" width="6" height="16" rx="1" fill="#8B5CF6"/>
                    <rect x="-10" y="-14" width="20" height="6" rx="2" fill="#8B5CF6"/>
                  </g>
                  <text x="350" y="382" textAnchor="middle" fill="#8B5CF6" fontSize="9" fontWeight="700">03</text>
                </motion.g>
                {/* Label 3 - Left side */}
                <motion.g
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <rect x="80" y="332" width="150" height="56" rx="8" fill="white" filter="url(#nodeShadow)" />
                  <text x="155" y="348" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="700">{t('axp.roadmap.step3.title')}</text>
                  <text x="155" y="364" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="600">{t('axp.roadmap.step3.desc1')}</text>
                  <text x="155" y="378" textAnchor="middle" fill="#64748b" fontSize="10">{t('axp.roadmap.step3.desc2')}</text>
                </motion.g>

                {/* Node 4: 정착 (9-12주) */}
                <motion.g
                  filter="url(#nodeShadow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5, delay: 1.7 }}
                >
                  <circle cx="150" cy="460" r="36" fill="white" />
                  {/* Checkmark/Flag Icon */}
                  <g transform="translate(150, 460)">
                    <circle cx="0" cy="-4" r="12" fill="none" stroke="#3B82F6" strokeWidth="2.5"/>
                    <polyline points="-6,-4 -2,0 7,-9" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <text x="150" y="480" textAnchor="middle" fill="#3B82F6" fontSize="9" fontWeight="700">04</text>
                </motion.g>
                {/* Label 4 - Right side */}
                <motion.g
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9 }}
                >
                  <rect x="210" y="432" width="150" height="56" rx="8" fill="white" filter="url(#nodeShadow)" />
                  <text x="285" y="448" textAnchor="middle" fill="#3B82F6" fontSize="10" fontWeight="700">{t('axp.roadmap.step4.title')}</text>
                  <text x="285" y="464" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="600">{t('axp.roadmap.step4.desc1')}</text>
                  <text x="285" y="478" textAnchor="middle" fill="#64748b" fontSize="10">{t('axp.roadmap.step4.desc2')}</text>
                </motion.g>
              </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 inset-x-0 mx-auto w-fit cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToNext}
        >
          <ChevronDown className="h-8 w-8 text-[#C400FF]/50" />
        </motion.div>
      </section>

      {/* ========== 1. PROBLEM SECTION ========== */}
      <section className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              {t('axp.problem.headline')}
            </h2>
          </motion.div>

          {/* Checklist */}
          <div className="space-y-4 mb-12">
            {problemItems.map((item, index) => (
              <motion.div
                key={item}
                className="flex items-start gap-4 bg-white border border-red-100 rounded-xl p-5 shadow-sm cursor-pointer group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ 
                  scale: 1.02, 
                  x: 8,
                  boxShadow: "0 10px 40px -10px rgba(239, 68, 68, 0.2)"
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div 
                  className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-red-500 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-red-500 text-sm font-bold group-hover:text-white transition-colors">!</span>
                </motion.div>
                <span className="text-sm md:text-base text-foreground group-hover:text-red-600 transition-colors">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Highlight */}
          <motion.div
            className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 md:p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-foreground leading-relaxed">
              <span className="text-red-500 text-xl mr-1">❗</span>
              {t('axp.problem.highlight.before')}{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-red-500 rounded -skew-x-3"></span>
                <span className="relative text-white font-bold px-1.5">{t('axp.problem.highlight.count')}</span>
              </span>
              {t('axp.problem.highlight.mid')}{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded -skew-x-3"></span>
                <span className="relative text-white font-bold px-1.5">{t('axp.problem.highlight.experience')}</span>
              </span>
              {" "}{t('axp.problem.highlight.after')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== 2. SOLUTION SECTION ========== */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={solutionBg.src} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/70" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-white leading-tight">
              {t('axp.solution.headline.line1')}{" "}
              <span className="relative inline-block px-2 md:px-3 py-0.5 bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded-lg">
                {t('axp.solution.headline.highlight')}
              </span>
              <span className="text-white">{t('axp.solution.headline.suffix')}</span>
            </h2>
          </motion.div>

          {/* Feature Cards - 2x2 on mobile, 5 cols on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-5 mb-8 md:mb-12">
            {solutionCards.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 lg:p-6 hover:bg-white/20 hover:border-white/30 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#F8B529]/30 to-[#C400FF]/30 rounded-xl flex items-center justify-center mb-3 lg:mb-4 group-hover:from-[#F8B529]/50 group-hover:to-[#C400FF]/50 transition-colors">
                  <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <h3 className="text-sm lg:text-base font-bold mb-1 lg:mb-2 text-white leading-tight">{item.title}</h3>
                <p className="text-white/70 text-xs lg:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Line */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xl font-medium text-white/90">
              <span className="text-amber-400 font-bold">{t('axp.solution.bottom1')}</span>{t('axp.solution.bottom2')}
            </p>
          </motion.div>
        </div>
      </section>


      {/* ========== 3. THINKING PROCESS SECTION (ENHANCED) ========== */}
      <section className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Decorative Circles & Lines (like reference image) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large Glowing Circle - Top Right */}
          <motion.div
            className="absolute -top-40 -right-40 w-[700px] h-[700px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F8B529]/20 to-[#C400FF]/10 blur-3xl" />
            <div className="absolute inset-8 rounded-full border-2 border-[#C400FF]/30" />
            <div className="absolute inset-16 rounded-full border border-[#282640]/20" />
          </motion.div>
          
          {/* Large Glowing Circle - Bottom Left */}
          <motion.div
            className="absolute -bottom-60 -left-60 w-[600px] h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#282640]/15 to-[#C400FF]/10 blur-3xl" />
            <div className="absolute inset-12 rounded-full border-2 border-[#282640]/25" />
          </motion.div>
          
          {/* Curved Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <motion.path
              d="M -100 200 Q 300 100 600 250 Q 900 400 1300 200"
              fill="none"
              stroke="url(#thinkingLineGradient1)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.path
              d="M -100 600 Q 400 500 700 650 Q 1000 800 1300 550"
              fill="none"
              stroke="url(#thinkingLineGradient2)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <defs>
              <linearGradient id="thinkingLineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C400FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#C400FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#282640" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="thinkingLineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#282640" stopOpacity="0" />
                <stop offset="50%" stopColor="#282640" stopOpacity="1" />
                <stop offset="100%" stopColor="#C400FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="w-2 h-2 bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white/80">Our Unique Methodology</span>
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] via-[#A855F7] to-[#C400FF]">
                Yanadoo AX Thinking Process
              </span>
            </h2>
            
            <p className="text-xs md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
              {t('axp.thinking.subtitle1')}<br className="hidden sm:block" />
              <span className="text-white font-medium">{t('axp.thinking.subtitle2')}</span>{t('axp.thinking.subtitle3')}
            </p>
          </motion.div>

          {/* Core Philosophy Card */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-12 mb-8 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <p className="text-sm md:text-2xl text-white/90 leading-relaxed">
                {t('axp.thinking.philosophy1')}<br />
                {t('axp.thinking.philosophy2')}<br />
                <span className="relative inline-block mt-1 md:mt-2">
                  <span className="text-base md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">
                    {t('axp.thinking.philosophy3')}
                  </span>
                  <span className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded-full" />
                </span>
                <span className="text-white/90">{t('axp.thinking.philosophy4')}</span>
              </p>
            </div>
          </motion.div>

          {/* 4-Step Process Cards - 2x2 Grid on mobile, 4 cols on desktop */}
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { step: t('axp.thinking.step1.name'), title: t('axp.thinking.step1.title'), desc: t('axp.thinking.step1.desc'), image: stepObserve.src },
              { step: t('axp.thinking.step2.name'), title: t('axp.thinking.step2.title'), desc: t('axp.thinking.step2.desc'), image: stepClassify.src },
              { step: t('axp.thinking.step3.name'), title: t('axp.thinking.step3.title'), desc: t('axp.thinking.step3.desc'), image: stepDesign.src },
              { step: t('axp.thinking.step4.name'), title: t('axp.thinking.step4.title'), desc: t('axp.thinking.step4.desc'), image: stepIterate.src },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="group relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded-xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
                
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="absolute top-2 right-2 z-10 w-6 h-6 md:w-7 md:h-7 bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded-md flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-lg shadow-[#C400FF]/30">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* People Photo */}
                  <div className="w-full aspect-[3/2] lg:aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-center grayscale"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white/10 to-transparent" />
                  </div>
                  
                  {/* Content - Compact */}
                  <div className="p-3 md:p-5 text-center">
                    <div className="text-[10px] md:text-xs font-mono font-bold text-amber-400 mb-1 tracking-wider">
                      {item.step}
                    </div>
                    <div className="text-sm md:text-lg font-bold text-white mb-1">{item.title}</div>
                    <div className="text-[10px] md:text-sm text-white/60 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========== 4. WORK CLASSIFICATION MAP SECTION ========== */}
      <section className="relative py-24 md:py-32 px-4 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #C400FF 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 border border-[#C400FF]/20 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-[#C400FF]">Work Classification Map</span>
            </div>
            
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
              {t('axp.classification.header.line1')}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-white px-2">{t('axp.classification.header.highlight')}</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded-lg -skew-x-2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </span>
              {t('axp.classification.header.line2')}
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-1 text-muted-foreground text-sm md:text-base px-4 md:px-0">
              <p>{t('axp.classification.header.desc1')}</p>
              <p>{t('axp.classification.header.desc2')}</p>
              <p>{t('axp.classification.header.desc3')}</p>
              <p className="text-foreground font-semibold pt-1">{t('axp.classification.header.desc4')}</p>
            </div>
          </motion.div>

          {/* Main Visual: Diamond/Cross Layout */}
          <div className="relative max-w-5xl mx-auto mb-16">
            {/* Axis Labels */}
            <div className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C400FF]/30 to-transparent" />
                <span className="text-xs font-medium text-muted-foreground -rotate-90 whitespace-nowrap mt-2">{t('axp.classification.guide.complexity')}</span>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C400FF]/30 to-transparent" />
              </div>
            </div>
            <div className="hidden md:block absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#282640]/30 to-transparent" />
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{t('axp.classification.guide.freq')}</span>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#282640]/30 to-transparent" />
              </div>
            </div>

            {/* 1 column on mobile, 2x2 grid on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
              {/* 인간 영역 - Horizontal Card */}
              <motion.div
                className="group relative bg-white/70 backdrop-blur-xl border border-purple-200/50 rounded-xl md:rounded-2xl p-4 md:p-5 overflow-hidden hover:bg-white/90 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start gap-4">
                  {/* Left: Badge & Title */}
                  <div className="flex-1">
                    <span className="text-[10px] font-mono tracking-wider text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200 mb-2 inline-block">
                      {t('axp.classification.card1.badge')}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-foreground">{t('axp.classification.card1.title')}</h3>
                    <p className="text-purple-600 font-medium text-xs md:text-sm mb-2">{t('axp.classification.card1.desc')}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full border border-purple-200">{t('axp.classification.card1.tag1')}</span>
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full border border-purple-200">{t('axp.classification.card1.tag2')}</span>
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full border border-purple-200">{t('axp.classification.card1.tag3')}</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">{t('axp.classification.card1.detail')}</p>
                  </div>
                </div>
              </motion.div>

              {/* AI 협업 - Horizontal Card */}
              <motion.div
                className="group relative bg-white/70 backdrop-blur-xl border border-blue-200/50 rounded-xl md:rounded-2xl p-4 md:p-5 overflow-hidden hover:bg-white/90 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] font-mono tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200 mb-2 inline-block">
                      {t('axp.classification.card2.badge')}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-foreground">{t('axp.classification.card2.title')}</h3>
                    <p className="text-blue-600 font-medium text-xs md:text-sm mb-2">{t('axp.classification.card2.desc')}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-200">{t('axp.classification.card2.tag1')}</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-200">{t('axp.classification.card2.tag2')}</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-200">{t('axp.classification.card2.tag3')}</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">{t('axp.classification.card2.detail')}</p>
                  </div>
                </div>
              </motion.div>

              {/* 효율화 - Horizontal Card */}
              <motion.div
                className="group relative bg-white/70 backdrop-blur-xl border border-amber-200/50 rounded-xl md:rounded-2xl p-4 md:p-5 overflow-hidden hover:bg-white/90 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] font-mono tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 mb-2 inline-block">
                      {t('axp.classification.card3.badge')}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-foreground">{t('axp.classification.card3.title')}</h3>
                    <p className="text-amber-600 font-medium text-xs md:text-sm mb-2">{t('axp.classification.card3.desc')}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full border border-amber-200">{t('axp.classification.card3.tag1')}</span>
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full border border-amber-200">{t('axp.classification.card3.tag2')}</span>
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full border border-amber-200">{t('axp.classification.card3.tag3')}</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">{t('axp.classification.card3.detail')}</p>
                  </div>
                </div>
              </motion.div>

              {/* 완전 자동화 - Horizontal Card */}
              <motion.div
                className="group relative bg-white/70 backdrop-blur-xl border border-emerald-200/50 rounded-xl md:rounded-2xl p-4 md:p-5 overflow-hidden hover:bg-white/90 hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] font-mono tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 mb-2 inline-block">
                      {t('axp.classification.card4.badge')}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-foreground">{t('axp.classification.card4.title')}</h3>
                    <p className="text-emerald-600 font-medium text-xs md:text-sm mb-2">{t('axp.classification.card4.desc')}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full border border-emerald-200">{t('axp.classification.card4.tag1')}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full border border-emerald-200">{t('axp.classification.card4.tag2')}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full border border-emerald-200">{t('axp.classification.card4.tag3')}</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">{t('axp.classification.card4.detail')}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Classification Quick Guide */}
          <motion.div
            className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-foreground">{t('axp.classification.guide.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('axp.classification.guide.desc')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-white rounded-xl p-3 md:p-4 border border-slate-100">
                <div className="text-[10px] md:text-xs font-medium text-muted-foreground mb-2 md:mb-3 uppercase tracking-wider">{t('axp.classification.guide.freq')}</div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {[t('axp.classification.guide.freq1'), t('axp.classification.guide.freq2'), t('axp.classification.guide.freq3'), t('axp.classification.guide.freq4')].map((item, i) => (
                    <span key={item} className={`text-[10px] md:text-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full border transition-colors cursor-default ${i < 2 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 md:p-4 border border-slate-100">
                <div className="text-[10px] md:text-xs font-medium text-muted-foreground mb-2 md:mb-3 uppercase tracking-wider">{t('axp.classification.guide.complexity')}</div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {[t('axp.classification.guide.complexity1'), t('axp.classification.guide.complexity2'), t('axp.classification.guide.complexity3'), t('axp.classification.guide.complexity4')].map((item, i) => (
                    <span key={item} className={`text-[10px] md:text-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full border transition-colors cursor-default ${i < 2 ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Philosophy Statement */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-block">
              <p className="text-sm md:text-base text-muted-foreground mb-2">
                {t('axp.classification.philosophy1')}<span className="text-foreground font-semibold">{t('axp.classification.philosophy2')}</span>{t('axp.classification.philosophy3')}
              </p>
              <p className="text-base md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">
                {t('axp.classification.philosophy4')}
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200 max-w-xl mx-auto">
              <p className="text-xs md:text-sm text-muted-foreground">
                AX Partners는 <br className="md:hidden" />
                <span className="text-foreground font-semibold">&apos;시스템&apos;</span>과 <span className="text-foreground font-semibold">&apos;사람&apos;</span>을 동시에 바꿉니다
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== 5. 12-WEEK PROCESS SECTION (DETAILED) ========== */}
      <section className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 border border-[#C400FF]/20 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-[#C400FF]">{t('axp.12week.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground leading-tight">
              {t('axp.12week.title1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">{t('axp.12week.title2')}</span>{t('axp.12week.title3')}
              <br className="hidden sm:block" />
              {t('axp.12week.title4')}
            </h2>
          </motion.div>

          {/* 4 Steps Grid - 1x4 Layout with Hover Details */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Step 1 */}
            <motion.div
              className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:z-10 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Image Section */}
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={processDiagnosis.src} 
                  alt="진단" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                {/* Step Badge */}
                <div className="absolute top-2 left-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    01
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-semibold text-orange-600 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full">{t('axp.12week.step1.week')}</span>
                </div>
              </div>

              {/* Basic Content - Always Visible */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-foreground mb-1">{t('axp.12week.step1.title')}</h3>
                <span className="text-[10px] font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">{t('axp.12week.step1.badge')}</span>
              </div>

              {/* Hover Detail Overlay */}
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xs mb-3">
                  01
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{t('axp.12week.step1.title')}</h3>
                <p className="text-[10px] text-muted-foreground mb-2 italic">{t('axp.12week.step1.quote')}</p>
                <div className="space-y-1 mb-2">
                  {[t('axp.12week.step1.check1'), t('axp.12week.step1.check2'), t('axp.12week.step1.check3')].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-orange-500" />
                      <span className="text-[10px] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-md p-2 mt-auto">
                  <p className="text-[10px] text-orange-700">{t('axp.12week.step1.output')}</p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:z-10 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {/* Image Section */}
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={processDesign.src} 
                  alt="설계" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                <div className="absolute top-2 left-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    02
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-semibold text-teal-600 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full">{t('axp.12week.step2.week')}</span>
                </div>
              </div>

              {/* Basic Content */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-foreground mb-1">{t('axp.12week.step2.title')}</h3>
                <span className="text-[10px] font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">{t('axp.12week.step2.badge')}</span>
              </div>

              {/* Hover Detail Overlay */}
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xs mb-3">
                  02
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{t('axp.12week.step2.title')}</h3>
                <p className="text-[10px] text-muted-foreground mb-2 italic">{t('axp.12week.step2.quote')}</p>
                <div className="space-y-1 mb-2">
                  {[t('axp.12week.step2.check1'), t('axp.12week.step2.check2'), t('axp.12week.step2.check3')].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-teal-500" />
                      <span className="text-[10px] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-md p-2 mt-auto">
                  <p className="text-[10px] text-teal-700">{t('axp.12week.step2.output')}</p>
                </div>
              </div>
            </motion.div>

            {/* Step 3 - CORE */}
            <motion.div
              className="group relative bg-gradient-to-br from-[#F8B529]/5 to-[#C400FF]/5 border-2 border-[#C400FF]/30 rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:z-10 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Core Badge */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-[#282640] hover:bg-[#282640]/90 text-white px-2 py-0.5 rounded-full text-[8px] font-bold shadow-md">
                  ⭐ {t('axp.12week.step3.badge2')}
                </div>
              </div>

              {/* Image Section */}
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={processExecute.src} 
                  alt="구축" 
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                <div className="absolute top-2 left-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#F8B529] to-[#C400FF] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    03
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-semibold text-[#C400FF] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full">{t('axp.12week.step3.week')}</span>
                </div>
              </div>

              {/* Basic Content */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-foreground mb-1">{t('axp.12week.step3.title')}</h3>
                <span className="text-[10px] font-medium text-[#C400FF] bg-[#C400FF]/10 px-2 py-0.5 rounded-full">{t('axp.12week.step3.badge')}</span>
              </div>

              {/* Hover Detail Overlay */}
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-[#F8B529] to-[#C400FF] rounded-lg flex items-center justify-center text-white font-bold text-xs mb-3">
                  03
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{t('axp.12week.step3.title')}</h3>
                <p className="text-[10px] text-muted-foreground mb-2 italic">{t('axp.12week.step3.quote')}</p>
                <div className="space-y-1 mb-2">
                  {[t('axp.12week.step3.check1'), t('axp.12week.step3.check2'), t('axp.12week.step3.check3')].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-[#C400FF]" />
                      <span className="text-[10px] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#C400FF]/10 border border-[#C400FF]/20 rounded-md p-2 mt-auto">
                  <p className="text-[10px] text-[#C400FF]">{t('axp.12week.step3.output')}</p>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:z-10 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {/* Image Section */}
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={processEvaluate.src} 
                  alt="안정화" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                <div className="absolute top-2 left-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    04
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-semibold text-blue-600 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full">{t('axp.12week.step4.week')}</span>
                </div>
              </div>

              {/* Basic Content */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-foreground mb-1">{t('axp.12week.step4.title')}</h3>
                <span className="text-[10px] font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{t('axp.12week.step4.badge')}</span>
              </div>

              {/* Hover Detail Overlay */}
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs mb-3">
                  04
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{t('axp.12week.step4.title')}</h3>
                <p className="text-[10px] text-muted-foreground mb-2 italic">{t('axp.12week.step4.quote')}</p>
                <div className="space-y-1 mb-2">
                  {[t('axp.12week.step4.check1'), t('axp.12week.step4.check2'), t('axp.12week.step4.check3')].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-blue-500" />
                      <span className="text-[10px] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-2 mt-auto">
                  <p className="text-[10px] text-blue-700">{t('axp.12week.step4.output')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Emphasis */}
          <div className="mt-8 flex justify-center">
            <motion.div
              className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] rounded-xl px-6 py-4 text-center text-white"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-base md:text-lg font-semibold">
                {t('axp.12week.bottom')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 5.5. THREE CIRCLE VENN DIAGRAM SECTION ========== */}
      <section className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
        {/* Background decoration with lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-[#F8B529]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-br from-[#282640]/5 to-transparent rounded-full blur-3xl" />
          
          {/* Decorative SVG Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C400FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#C400FF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#282640" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#282640" stopOpacity="0" />
                <stop offset="50%" stopColor="#282640" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Curved decorative lines */}
            <motion.path
              d="M -100 200 Q 300 100 600 250 T 1300 180"
              fill="none"
              stroke="url(#lineGrad1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.path
              d="M -100 400 Q 400 300 700 450 T 1300 350"
              fill="none"
              stroke="url(#lineGrad2)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
            <motion.path
              d="M -100 600 Q 350 500 650 620 T 1300 550"
              fill="none"
              stroke="url(#lineGrad1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Title */}
          <motion.h2
            className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('axp.venn.title1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">{t('axp.venn.title2')}</span>{t('axp.venn.title3')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">{t('axp.venn.title4')}</span>{t('axp.venn.title5')}
          </motion.h2>

          {/* 3 Circle Venn Diagram */}
          <div className="flex justify-center">
            <motion.div
              className="relative w-full max-w-2xl aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <svg viewBox="0 0 500 480" className="w-full h-full">
                <defs>
                  {/* Circle gradients */}
                  <linearGradient id="processGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.35" />
                  </linearGradient>
                  <linearGradient id="processGradHover" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="systemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.35" />
                  </linearGradient>
                  <linearGradient id="systemGradHover" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="peopleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.35" />
                  </linearGradient>
                  <linearGradient id="peopleGradHover" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="centerGradVenn" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C400FF" />
                    <stop offset="100%" stopColor="#282640" />
                  </linearGradient>
                  
                  {/* Drop shadow */}
                  <filter id="circleShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.08"/>
                  </filter>
                  <filter id="circleShadowHover" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#000" floodOpacity="0.15"/>
                  </filter>
                </defs>

                {/* Top Circle - Process (cx=250, cy=150, r=120) */}
                <motion.g
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ transformOrigin: "250px 150px", cursor: "pointer" }}
                >
                  <circle cx="250" cy="150" r="120" fill="url(#processGrad)" stroke="#8B5CF6" strokeWidth="2" filter="url(#circleShadow)" className="transition-all duration-300" />
                  <text x="250" y="135" textAnchor="middle" fill="#7C3AED" fontSize="20" fontWeight="700">{t('axp.venn.process')}</text>
                  <text x="250" y="158" textAnchor="middle" fill="#64748b" fontSize="12">{t('axp.venn.process.desc1')}</text>
                  <text x="250" y="175" textAnchor="middle" fill="#64748b" fontSize="12">{t('axp.venn.process.desc2')}</text>
                </motion.g>

                {/* Left Circle - System (cx=150, cy=320, r=120) */}
                <motion.g
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ transformOrigin: "150px 320px", cursor: "pointer" }}
                >
                  <circle cx="150" cy="320" r="120" fill="url(#systemGrad)" stroke="#3B82F6" strokeWidth="2" filter="url(#circleShadow)" className="transition-all duration-300" />
                  <text x="150" y="305" textAnchor="middle" fill="#2563EB" fontSize="20" fontWeight="700">{t('axp.venn.system')}</text>
                  <text x="150" y="328" textAnchor="middle" fill="#64748b" fontSize="12">{t('axp.venn.system.desc1')}</text>
                  <text x="150" y="345" textAnchor="middle" fill="#64748b" fontSize="12">{t('axp.venn.system.desc2')}</text>
                </motion.g>

                {/* Right Circle - People (cx=350, cy=320, r=120) */}
                <motion.g
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ transformOrigin: "350px 320px", cursor: "pointer" }}
                >
                  <circle cx="350" cy="320" r="120" fill="url(#peopleGrad)" stroke="#14B8A6" strokeWidth="2" filter="url(#circleShadow)" className="transition-all duration-300" />
                  <text x="350" y="305" textAnchor="middle" fill="#0D9488" fontSize="20" fontWeight="700">{t('axp.venn.people')}</text>
                  <text x="350" y="328" textAnchor="middle" fill="#64748b" fontSize="12">{t('axp.venn.people.desc1')}</text>
                  <text x="350" y="345" textAnchor="middle" fill="#64748b" fontSize="12">{t('axp.venn.people.desc2')}</text>
                </motion.g>

                {/* Center - Sustainable AX (cx=250, cy=260) */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  style={{ transformOrigin: "250px 260px", cursor: "pointer" }}
                >
                  <circle cx="250" cy="260" r="55" fill="white" stroke="url(#centerGradVenn)" strokeWidth="3" filter="url(#circleShadow)" />
                  <text x="250" y="252" textAnchor="middle" fill="#C400FF" fontSize="13" fontWeight="600">{t('axp.venn.center1')}</text>
                  <text x="250" y="275" textAnchor="middle" fontSize="20" fontWeight="800">
                    <tspan fill="#C400FF">A</tspan>
                    <tspan fill="#282640">X</tspan>
                  </text>
                </motion.g>

                {/* Pulsing effect on center */}
                <motion.circle
                  cx="250" cy="260" r="60"
                  fill="none" stroke="url(#centerGradVenn)" strokeWidth="2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0.9, 1.15, 1.25] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  style={{ transformOrigin: "250px 260px" }}
                />
              </svg>
            </motion.div>
          </div>

          {/* Bottom description */}
          <motion.p
            className="text-center text-base md:text-lg text-slate-500 mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {t('axp.venn.bottom')}<span className="font-semibold text-slate-700">{t('axp.venn.bottom2')}</span>{t('axp.venn.bottom3')}
          </motion.p>
        </div>
      </section>

      {/* ========== 6. CASE STUDY SECTION ========== */}
      <section className="relative py-16 md:py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              <span className="relative inline-block">
                {/* Marker pen style highlight */}
                <motion.span
                  className="absolute -inset-x-1 top-[45%] bottom-[5%] bg-amber-300 -rotate-1 rounded-sm"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                  style={{ originX: 0, zIndex: -1 }}
                />
                <span className="relative text-[#C400FF] font-bold">{t('axp.case.title1')}</span>
              </span>
              <span className="ml-1">{t('axp.case.title2')}</span>
            </h2>
          </motion.div>

          {/* Case Cards - Compact Mobile Design */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Case 1: 보고서 자동화 */}
            <motion.div
              className="group bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {/* Image Section */}
              <div className="relative h-32 md:h-48 overflow-hidden">
                <img 
                  src={case1ReportAutomation.src}
                  alt="보고서 자동화"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                  <span className="text-[10px] md:text-xs font-semibold text-white bg-[#C400FF] px-2 py-1 md:px-3 md:py-1.5 rounded-md">
                    {t('axp.case.category1')}
                  </span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-3 md:p-5 bg-white">
                <p className="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider mb-1 md:mb-2">{t('axp.case.company1')}</p>
                <h3 className="text-sm md:text-lg font-bold text-foreground mb-1.5 md:mb-2">
                  {t('axp.case.headline1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">{t('axp.case.result1')}</span>
                </h3>
                <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed mb-3 md:mb-4 line-clamp-2">
                  {t('axp.case.desc1')}
                </p>
                <button className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-semibold text-foreground hover:text-[#C400FF] transition-colors group/btn">
                  <span className="px-2.5 py-1.5 md:px-4 md:py-2 bg-foreground text-white rounded-md group-hover/btn:bg-[#C400FF] transition-colors">{t('axp.case.viewMore')}</span>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Case 2: 세일즈/CS RAG 챗봇 */}
            <motion.div
              className="group bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Image Section */}
              <div className="relative h-32 md:h-48 overflow-hidden">
                <img 
                  src={case2ChatbotRag.src}
                  alt="RAG 챗봇"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                  <span className="text-[10px] md:text-xs font-semibold text-white bg-[#282640] px-2 py-1 md:px-3 md:py-1.5 rounded-md">
                    {t('axp.case.category2')}
                  </span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-3 md:p-5 bg-white">
                <p className="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider mb-1 md:mb-2">{t('axp.case.company2')}</p>
                <h3 className="text-sm md:text-lg font-bold text-foreground mb-1.5 md:mb-2">
                  {t('axp.case.headline2')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#282640] to-[#C400FF]">{t('axp.case.result2')}</span>
                </h3>
                <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed mb-3 md:mb-4 line-clamp-2">
                  {t('axp.case.desc2')}
                </p>
                <button className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-semibold text-foreground hover:text-[#282640] transition-colors group/btn">
                  <span className="px-2.5 py-1.5 md:px-4 md:py-2 bg-foreground text-white rounded-md group-hover/btn:bg-[#282640] transition-colors">{t('axp.case.viewMore')}</span>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Case 3: 재무 통합 대시보드 */}
            <motion.div
              className="group bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {/* Image Section */}
              <div className="relative h-32 md:h-48 overflow-hidden">
                <img 
                  src={case3Dashboard.src}
                  alt="재무 대시보드"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                  <span className="text-[10px] md:text-xs font-semibold text-white bg-teal-500 px-2 py-1 md:px-3 md:py-1.5 rounded-md">
                    {t('axp.case.category3')}
                  </span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-3 md:p-5 bg-white">
                <p className="text-[10px] md:text-xs font-semibold text-muted-foreground tracking-wider mb-1 md:mb-2">{t('axp.case.company3')}</p>
                <h3 className="text-sm md:text-lg font-bold text-foreground mb-1.5 md:mb-2">
                  {t('axp.case.headline3')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">{t('axp.case.result3')}</span>
                </h3>
                <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed mb-3 md:mb-4 line-clamp-2">
                  {t('axp.case.desc3')}
                </p>
                <button className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-semibold text-foreground hover:text-teal-500 transition-colors group/btn">
                  <span className="px-2.5 py-1.5 md:px-4 md:py-2 bg-foreground text-white rounded-md group-hover/btn:bg-teal-500 transition-colors">{t('axp.case.viewMore')}</span>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              asChild
              className="border-[#C400FF]/30 text-[#C400FF] hover:bg-[#C400FF]/5 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base rounded-xl"
            >
              <Link href="/cases">
                {t('axp.case.moreButton')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ========== 7. DIFFERENTIATION SECTION ========== */}
      <section className="relative py-16 md:py-32 px-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-8 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              {t('axp.diff.title1')}<br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">{t('axp.diff.title2')}</span>
            </h2>
          </motion.div>

          {/* Comparison Table - Compact Mobile Design with Tap to Expand */}
          <motion.div
            className="bg-white border border-slate-200 rounded-xl md:rounded-2xl overflow-hidden shadow-lg cursor-pointer md:cursor-default group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setShowTableModal(true)}
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[20%] md:w-1/4 font-bold text-muted-foreground text-[10px] md:text-sm px-2 md:px-4 py-2 md:py-3">{t('axp.diff.header.category')}</TableHead>
                  <TableHead className="w-[40%] md:w-[37.5%] font-bold text-center text-muted-foreground text-[10px] md:text-sm px-2 md:px-4 py-2 md:py-3">{t('axp.diff.header.general')}</TableHead>
                  <TableHead className="w-[40%] md:w-[37.5%] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF] text-[10px] md:text-sm px-2 md:px-4 py-2 md:py-3">{t('axp.diff.header.ax')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { category: t('axp.diff.row1.category'), general: t('axp.diff.row1.general'), ax: t('axp.diff.row1.ax') },
                  { category: t('axp.diff.row2.category'), general: t('axp.diff.row2.general'), ax: t('axp.diff.row2.ax') },
                  { category: t('axp.diff.row3.category'), general: t('axp.diff.row3.general'), ax: t('axp.diff.row3.ax') },
                  { category: t('axp.diff.row4.category'), general: t('axp.diff.row4.general'), ax: t('axp.diff.row4.ax') },
                  { category: t('axp.diff.row5.category'), general: t('axp.diff.row5.general'), ax: t('axp.diff.row5.ax') },
                  { category: t('axp.diff.row6.category'), general: t('axp.diff.row6.general'), ax: t('axp.diff.row6.ax') },
                  { category: t('axp.diff.row7.category'), general: t('axp.diff.row7.general'), ax: t('axp.diff.row7.ax') },
                ].map((row) => (
                  <TableRow key={row.category} className="hover:bg-slate-50/50 md:group-hover:bg-transparent">
                    <TableCell className="font-medium text-foreground text-[10px] md:text-sm px-2 md:px-4 py-2 md:py-3">{row.category}</TableCell>
                    <TableCell className="text-center text-muted-foreground text-[10px] md:text-sm px-2 md:px-4 py-2 md:py-3">{row.general}</TableCell>
                    <TableCell className="text-center font-medium text-[#C400FF] text-[10px] md:text-sm px-2 md:px-4 py-2 md:py-3">{row.ax}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Mobile Tap Hint - Below table */}
            <div className="md:hidden text-center py-2 bg-slate-50 border-t border-slate-100">
              <span className="inline-flex items-center justify-center text-[#C400FF]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table Expanded Modal */}
      <AnimatePresence>
        {showTableModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTableModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between z-10">
                <h3 className="text-base font-bold text-foreground">
                  {t('axp.diff.title1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF]">{t('axp.diff.title2')}</span>
                </h3>
                <button
                  onClick={() => setShowTableModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <span className="text-xl text-slate-400 hover:text-slate-600">×</span>
                </button>
              </div>

              {/* Expanded Table */}
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="w-1/4 font-bold text-muted-foreground text-xs px-3 py-3">{t('axp.diff.header.category')}</TableHead>
                      <TableHead className="w-[37.5%] font-bold text-center text-muted-foreground text-xs px-3 py-3">{t('axp.diff.header.general')}</TableHead>
                      <TableHead className="w-[37.5%] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#F8B529] to-[#C400FF] text-xs px-3 py-3">{t('axp.diff.header.ax')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { category: t('axp.diff.row1.category'), general: t('axp.diff.row1.general'), ax: t('axp.diff.row1.ax') },
                      { category: t('axp.diff.row2.category'), general: t('axp.diff.row2.general'), ax: t('axp.diff.row2.ax') },
                      { category: t('axp.diff.row3.category'), general: t('axp.diff.row3.general'), ax: t('axp.diff.row3.ax') },
                      { category: t('axp.diff.row4.category'), general: t('axp.diff.row4.general'), ax: t('axp.diff.row4.ax') },
                      { category: t('axp.diff.row5.category'), general: t('axp.diff.row5.general'), ax: t('axp.diff.row5.ax') },
                      { category: t('axp.diff.row6.category'), general: t('axp.diff.row6.general'), ax: t('axp.diff.row6.ax') },
                      { category: t('axp.diff.row7.category'), general: t('axp.diff.row7.general'), ax: t('axp.diff.row7.ax') },
                    ].map((row) => (
                      <TableRow key={row.category}>
                        <TableCell className="font-medium text-foreground text-sm px-3 py-3">{row.category}</TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm px-3 py-3">{row.general}</TableCell>
                        <TableCell className="text-center font-semibold text-[#C400FF] text-sm px-3 py-3 bg-[#C400FF]/5">{row.ax}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== 8. FINAL CTA SECTION ========== */}
      <section className="relative py-24 md:py-32 px-4 bg-gradient-to-br from-[#F8B529] to-[#C400FF] overflow-hidden min-h-[600px]">
        {/* Background Typography */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          <div className="absolute top-[5%] left-[5%] text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-white/[0.03] leading-none tracking-tighter">
            TRUST
          </div>
          <div className="absolute top-[30%] right-[5%] text-[6rem] md:text-[10rem] lg:text-[14rem] font-black text-white/[0.04] leading-none tracking-tighter">
            EXECUTE
          </div>
          <div className="absolute bottom-[15%] left-[10%] text-[7rem] md:text-[11rem] lg:text-[15rem] font-black text-white/[0.03] leading-none tracking-tighter">
            TRANSFORM
          </div>
          <div className="absolute top-[60%] right-[15%] text-[5rem] md:text-[8rem] lg:text-[10rem] font-black text-white/[0.05] leading-none tracking-tighter">
            AX
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10" style={{ perspective: "1000px" }}>
          <AnimatePresence mode="wait">
            {!showCtaForm ? (
              <motion.div
                key="cta-content"
                className="text-center"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                  {t('axp.cta.title1')}
                  <span className="relative inline-block">
                    <motion.span
                      className="absolute inset-x-0 -top-1 -bottom-1 bg-amber-300 -rotate-1 rounded-sm"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                      style={{ originX: 0, zIndex: 0 }}
                    />
                    <span className="relative z-10">{t('axp.cta.title2')}</span>
                  </span>
                  {t('axp.cta.title3')}
                </h2>
                <p className="text-xl md:text-2xl text-white/80 mb-10">
                  {t('axp.cta.subtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleCtaDiagnosisClick}
                    className="bg-white text-[#C400FF] hover:bg-white/90 px-8 py-6 text-lg rounded-xl font-bold shadow-xl"
                  >
                    {t('axp.cta.button1')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleCtaContactClick}
                    className="bg-amber-400 text-slate-900 hover:bg-amber-300 border-0 px-8 py-6 text-lg rounded-xl font-bold transition-colors"
                  >
                    {t('axp.cta.button2')}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cta-form"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {showCtaForm === 'diagnosis' ? t('axp.cta.form.title.diagnosis') : t('axp.cta.form.title.contact')}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {showCtaForm === 'diagnosis' 
                        ? t('axp.cta.form.desc.diagnosis')
                        : t('axp.cta.form.desc.contact')}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseCtaForm}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <span className="text-2xl text-slate-400 hover:text-slate-600">×</span>
                  </button>
                </div>

                {/* Simple Form */}
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleCloseCtaForm(); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t('axp.cta.form.company')}</label>
                      <input
                        type="text"
                        required
                        placeholder={t('axp.cta.form.company.placeholder')}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C400FF]/50 focus:border-[#C400FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t('axp.cta.form.name')}</label>
                      <input
                        type="text"
                        required
                        placeholder={t('axp.cta.form.name.placeholder')}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C400FF]/50 focus:border-[#C400FF]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t('axp.cta.form.phone')}</label>
                      <input
                        type="tel"
                        required
                        placeholder={t('axp.cta.form.phone.placeholder')}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C400FF]/50 focus:border-[#C400FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t('axp.cta.form.email')}</label>
                      <input
                        type="email"
                        required
                        placeholder={t('axp.cta.form.email.placeholder')}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C400FF]/50 focus:border-[#C400FF]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('axp.cta.form.message')}</label>
                    <textarea
                      rows={3}
                      placeholder={t('axp.cta.form.message.placeholder')}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C400FF]/50 focus:border-[#C400FF] resize-none"
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="privacy-cta" required className="mt-1" />
                    <label htmlFor="privacy-cta" className="text-sm text-slate-600">
                      {t('axp.cta.form.privacy')}
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#282640] hover:bg-[#282640]/90 text-white py-6 text-lg rounded-xl font-bold"
                  >
                    {t('axp.cta.form.submit')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export function AXPartnersPage() {
  return (
    <ContactWidgetProvider>
      <main>
        <AXPartners />
      </main>
      <ContactWidget />
    </ContactWidgetProvider>
  );
}
