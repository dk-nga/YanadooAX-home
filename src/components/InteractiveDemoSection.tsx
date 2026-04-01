"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  CheckCircle2,
  Megaphone,
  MessageCircleMore,
  SendHorizontal,
  Sparkles,
  TrendingUp,
  Wand2,
} from "lucide-react";
import { startTransition, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type ScenarioId = "support" | "content" | "report" | "marketing" | "sales";
type ModelId = "opus" | "sonnet" | "flow";
type StageState = "idle" | "working" | "done";
type QuickOption = {
  question: string;
  userBubble: string;
  agentReply: string;
  metrics: [string, string, string];
};

type Scenario = {
  id: ScenarioId;
  title: string;
  description: string;
  tags: [string, string];
  prompt: string;
  quickOptions: [QuickOption, QuickOption, QuickOption];
  metricLabels: [string, string, string];
  beforeItems: [string, string];
  afterItems: [string, string];
  completed: string;
  icon: typeof MessageCircleMore;
  accent: string;
  model: ModelId;
};

const flowIcons = [Bot, Sparkles, Wand2, BarChart3];

function FlowRow({
  labels,
  stageIndex,
  isRunning,
}: {
  labels: string[];
  stageIndex: number;
  isRunning: boolean;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {labels.map((label, index) => {
        const Icon = flowIcons[index];
        const state: StageState =
          stageIndex > index ? "done" : stageIndex === index && isRunning ? "working" : "idle";

        return (
          <div
            key={label}
            className={cn(
              "rounded-2xl border px-4 py-5 transition-all duration-300",
              state === "done"
                ? "border-emerald-200 bg-emerald-50"
                : state === "working"
                  ? "border-[#f4c86b] bg-[#fff8e6] shadow-[0_10px_24px_rgba(244,200,107,0.28)]"
                  : "border-slate-200 bg-white"
            )}
          >
            <div className="flex items-center justify-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border",
                  state === "done"
                    ? "border-emerald-200 bg-emerald-100 text-emerald-600"
                    : state === "working"
                      ? "border-[#f4c86b] bg-[#fff1bf] text-[#b7791f]"
                      : "border-slate-200 bg-slate-50 text-slate-400"
                )}
              >
                {state === "done" ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-slate-800">{label}</p>
            <p className="mt-1 text-center text-xs text-slate-400">
              {state === "done" ? "완료" : state === "working" ? "진행 중" : "대기"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function InteractiveDemoSection() {
  const { t } = useLanguage();

  const scenarios: Scenario[] = [
    {
      id: "support",
      title: t("demo.scenarios.support.title"),
      description: t("demo.scenarios.support.description"),
      tags: [t("demo.scenarios.support.tag1"), t("demo.scenarios.support.tag2")],
      prompt: t("demo.scenarios.support.prompt"),
      quickOptions: [
        {
          question: t("demo.scenarios.support.quick1"),
          userBubble: t("demo.scenarios.support.quick1"),
          agentReply: t("demo.scenarios.support.reply1"),
          metrics: [
            t("demo.scenarios.support.quick1Metric1"),
            t("demo.scenarios.support.quick1Metric2"),
            t("demo.scenarios.support.quick1Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.support.quick2"),
          userBubble: t("demo.scenarios.support.quick2"),
          agentReply: t("demo.scenarios.support.reply2"),
          metrics: [
            t("demo.scenarios.support.quick2Metric1"),
            t("demo.scenarios.support.quick2Metric2"),
            t("demo.scenarios.support.quick2Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.support.quick3"),
          userBubble: t("demo.scenarios.support.quick3"),
          agentReply: t("demo.scenarios.support.reply3"),
          metrics: [
            t("demo.scenarios.support.quick3Metric1"),
            t("demo.scenarios.support.quick3Metric2"),
            t("demo.scenarios.support.quick3Metric3"),
          ],
        },
      ],
      metricLabels: [
        t("demo.scenarios.support.metricLabel1"),
        t("demo.scenarios.support.metricLabel2"),
        t("demo.scenarios.support.metricLabel3"),
      ],
      beforeItems: [
        t("demo.scenarios.support.before1"),
        t("demo.scenarios.support.before2"),
      ],
      afterItems: [t("demo.scenarios.support.after1"), t("demo.scenarios.support.after2")],
      completed: t("demo.scenarios.support.completed"),
      icon: MessageCircleMore,
      accent: "#111111",
      model: "opus",
    },
    {
      id: "content",
      title: t("demo.scenarios.content.title"),
      description: t("demo.scenarios.content.description"),
      tags: [t("demo.scenarios.content.tag1"), t("demo.scenarios.content.tag2")],
      prompt: t("demo.scenarios.content.prompt"),
      quickOptions: [
        {
          question: t("demo.scenarios.content.quick1"),
          userBubble: t("demo.scenarios.content.quick1"),
          agentReply: t("demo.scenarios.content.reply1"),
          metrics: [
            t("demo.scenarios.content.quick1Metric1"),
            t("demo.scenarios.content.quick1Metric2"),
            t("demo.scenarios.content.quick1Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.content.quick2"),
          userBubble: t("demo.scenarios.content.quick2"),
          agentReply: t("demo.scenarios.content.reply2"),
          metrics: [
            t("demo.scenarios.content.quick2Metric1"),
            t("demo.scenarios.content.quick2Metric2"),
            t("demo.scenarios.content.quick2Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.content.quick3"),
          userBubble: t("demo.scenarios.content.quick3"),
          agentReply: t("demo.scenarios.content.reply3"),
          metrics: [
            t("demo.scenarios.content.quick3Metric1"),
            t("demo.scenarios.content.quick3Metric2"),
            t("demo.scenarios.content.quick3Metric3"),
          ],
        },
      ],
      metricLabels: [
        t("demo.scenarios.content.metricLabel1"),
        t("demo.scenarios.content.metricLabel2"),
        t("demo.scenarios.content.metricLabel3"),
      ],
      beforeItems: [
        t("demo.scenarios.content.before1"),
        t("demo.scenarios.content.before2"),
      ],
      afterItems: [t("demo.scenarios.content.after1"), t("demo.scenarios.content.after2")],
      completed: t("demo.scenarios.content.completed"),
      icon: Sparkles,
      accent: "#2f6edb",
      model: "flow",
    },
    {
      id: "report",
      title: t("demo.scenarios.report.title"),
      description: t("demo.scenarios.report.description"),
      tags: [t("demo.scenarios.report.tag1"), t("demo.scenarios.report.tag2")],
      prompt: t("demo.scenarios.report.prompt"),
      quickOptions: [
        {
          question: t("demo.scenarios.report.quick1"),
          userBubble: t("demo.scenarios.report.quick1"),
          agentReply: t("demo.scenarios.report.reply1"),
          metrics: [
            t("demo.scenarios.report.quick1Metric1"),
            t("demo.scenarios.report.quick1Metric2"),
            t("demo.scenarios.report.quick1Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.report.quick2"),
          userBubble: t("demo.scenarios.report.quick2"),
          agentReply: t("demo.scenarios.report.reply2"),
          metrics: [
            t("demo.scenarios.report.quick2Metric1"),
            t("demo.scenarios.report.quick2Metric2"),
            t("demo.scenarios.report.quick2Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.report.quick3"),
          userBubble: t("demo.scenarios.report.quick3"),
          agentReply: t("demo.scenarios.report.reply3"),
          metrics: [
            t("demo.scenarios.report.quick3Metric1"),
            t("demo.scenarios.report.quick3Metric2"),
            t("demo.scenarios.report.quick3Metric3"),
          ],
        },
      ],
      metricLabels: [
        t("demo.scenarios.report.metricLabel1"),
        t("demo.scenarios.report.metricLabel2"),
        t("demo.scenarios.report.metricLabel3"),
      ],
      beforeItems: [
        t("demo.scenarios.report.before1"),
        t("demo.scenarios.report.before2"),
      ],
      afterItems: [t("demo.scenarios.report.after1"), t("demo.scenarios.report.after2")],
      completed: t("demo.scenarios.report.completed"),
      icon: BarChart3,
      accent: "#2f6edb",
      model: "opus",
    },
    {
      id: "marketing",
      title: t("demo.scenarios.marketing.title"),
      description: t("demo.scenarios.marketing.description"),
      tags: [t("demo.scenarios.marketing.tag1"), t("demo.scenarios.marketing.tag2")],
      prompt: t("demo.scenarios.marketing.prompt"),
      quickOptions: [
        {
          question: t("demo.scenarios.marketing.quick1"),
          userBubble: t("demo.scenarios.marketing.quick1"),
          agentReply: t("demo.scenarios.marketing.reply1"),
          metrics: [
            t("demo.scenarios.marketing.quick1Metric1"),
            t("demo.scenarios.marketing.quick1Metric2"),
            t("demo.scenarios.marketing.quick1Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.marketing.quick2"),
          userBubble: t("demo.scenarios.marketing.quick2"),
          agentReply: t("demo.scenarios.marketing.reply2"),
          metrics: [
            t("demo.scenarios.marketing.quick2Metric1"),
            t("demo.scenarios.marketing.quick2Metric2"),
            t("demo.scenarios.marketing.quick2Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.marketing.quick3"),
          userBubble: t("demo.scenarios.marketing.quick3"),
          agentReply: t("demo.scenarios.marketing.reply3"),
          metrics: [
            t("demo.scenarios.marketing.quick3Metric1"),
            t("demo.scenarios.marketing.quick3Metric2"),
            t("demo.scenarios.marketing.quick3Metric3"),
          ],
        },
      ],
      metricLabels: [
        t("demo.scenarios.marketing.metricLabel1"),
        t("demo.scenarios.marketing.metricLabel2"),
        t("demo.scenarios.marketing.metricLabel3"),
      ],
      beforeItems: [
        t("demo.scenarios.marketing.before1"),
        t("demo.scenarios.marketing.before2"),
      ],
      afterItems: [t("demo.scenarios.marketing.after1"), t("demo.scenarios.marketing.after2")],
      completed: t("demo.scenarios.marketing.completed"),
      icon: Megaphone,
      accent: "#eb8f2f",
      model: "sonnet",
    },
    {
      id: "sales",
      title: t("demo.scenarios.sales.title"),
      description: t("demo.scenarios.sales.description"),
      tags: [t("demo.scenarios.sales.tag1"), t("demo.scenarios.sales.tag2")],
      prompt: t("demo.scenarios.sales.prompt"),
      quickOptions: [
        {
          question: t("demo.scenarios.sales.quick1"),
          userBubble: t("demo.scenarios.sales.quick1"),
          agentReply: t("demo.scenarios.sales.reply1"),
          metrics: [
            t("demo.scenarios.sales.quick1Metric1"),
            t("demo.scenarios.sales.quick1Metric2"),
            t("demo.scenarios.sales.quick1Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.sales.quick2"),
          userBubble: t("demo.scenarios.sales.quick2"),
          agentReply: t("demo.scenarios.sales.reply2"),
          metrics: [
            t("demo.scenarios.sales.quick2Metric1"),
            t("demo.scenarios.sales.quick2Metric2"),
            t("demo.scenarios.sales.quick2Metric3"),
          ],
        },
        {
          question: t("demo.scenarios.sales.quick3"),
          userBubble: t("demo.scenarios.sales.quick3"),
          agentReply: t("demo.scenarios.sales.reply3"),
          metrics: [
            t("demo.scenarios.sales.quick3Metric1"),
            t("demo.scenarios.sales.quick3Metric2"),
            t("demo.scenarios.sales.quick3Metric3"),
          ],
        },
      ],
      metricLabels: [
        t("demo.scenarios.sales.metricLabel1"),
        t("demo.scenarios.sales.metricLabel2"),
        t("demo.scenarios.sales.metricLabel3"),
      ],
      beforeItems: [
        t("demo.scenarios.sales.before1"),
        t("demo.scenarios.sales.before2"),
      ],
      afterItems: [t("demo.scenarios.sales.after1"), t("demo.scenarios.sales.after2")],
      completed: t("demo.scenarios.sales.completed"),
      icon: TrendingUp,
      accent: "#2b7fff",
      model: "flow",
    },
  ];

  const [selectedScenarioId, setSelectedScenarioId] = useState<ScenarioId>("support");
  const [selectedModel, setSelectedModel] = useState<ModelId>("opus");
  const [autoMode, setAutoMode] = useState(true);
  const [liveMode, setLiveMode] = useState(true);
  const [selectedQuickIndex, setSelectedQuickIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [flowStep, setFlowStep] = useState(-1);
  const [statusMessage, setStatusMessage] = useState(t("demo.workspace.ready"));
  const [replyVisible, setReplyVisible] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState(0);
  const [beforeAfterVisible, setBeforeAfterVisible] = useState(false);
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const currentScenario =
    scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0];
  const currentQuick = currentScenario.quickOptions[selectedQuickIndex] ?? currentScenario.quickOptions[0];

  const clearTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  const resetWorkspace = () => {
    clearTimers();
    setIsRunning(false);
    setFlowStep(-1);
    setStatusMessage(t("demo.workspace.ready"));
    setReplyVisible(false);
    setMetricsVisible(0);
    setBeforeAfterVisible(false);
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    startTransition(() => {
      setSelectedScenarioId(scenario.id);
      setSelectedModel(scenario.model);
      setSelectedQuickIndex(0);
      setAutoMode(true);
      setLiveMode(true);
    });
    resetWorkspace();
  };

  const runScenario = () => {
    clearTimers();
    setIsRunning(true);
    setFlowStep(0);
    setStatusMessage(t("demo.workspace.received"));
    setReplyVisible(false);
    setMetricsVisible(0);
    setBeforeAfterVisible(false);

    timersRef.current.push(
      setTimeout(() => {
        setFlowStep(1);
        setStatusMessage(t("demo.workspace.analyzing"));
      }, 500)
    );

    timersRef.current.push(
      setTimeout(() => {
        setFlowStep(2);
        setStatusMessage(t("demo.workspace.generating"));
        setReplyVisible(true);
      }, 1250)
    );

    timersRef.current.push(
      setTimeout(() => {
        setFlowStep(3);
        setStatusMessage(t("demo.workspace.summarizing"));
        setMetricsVisible(1);
      }, 1880)
    );

    timersRef.current.push(
      setTimeout(() => {
        setMetricsVisible(2);
      }, 2320)
    );

    timersRef.current.push(
      setTimeout(() => {
        setMetricsVisible(3);
        setBeforeAfterVisible(true);
        setIsRunning(false);
        setFlowStep(4);
        setStatusMessage(currentScenario.completed);
      }, 2820)
    );
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  useEffect(() => {
    setStatusMessage(t("demo.workspace.ready"));
  }, [t]);

  const flowLabels = [
    t("demo.flow.receive"),
    t("demo.flow.analyze"),
    t("demo.flow.generate"),
    t("demo.flow.report"),
  ];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfbfe_0%,#f3f0fb_52%,#f8f8fc_100%)] pb-28 pt-20 text-slate-950 md:pb-32 md:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,181,41,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(196,0,255,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(248,248,252,0.96))]" />
      <div className="absolute left-[-120px] top-10 h-64 w-64 rounded-full bg-[#F8B529]/10 blur-3xl" />
      <div className="absolute bottom-0 right-[-140px] h-72 w-72 rounded-full bg-[#C400FF]/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(248,248,252,0),rgba(244,240,251,0.92)_55%,rgba(255,255,255,1))]" />
      <div className="container relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-10">
          <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {t("demo.title")}
          </h2>
          <p className="mt-3 max-w-3xl text-base text-slate-500 md:text-lg">
            {t("demo.subtitle")}
          </p>
        </div>

        <div className="grid min-w-0 gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="min-w-0 space-y-3"
          >
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              const isSelected = scenario.id === selectedScenarioId;

              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleScenarioSelect(scenario)}
                  className={cn(
                    "w-full rounded-[22px] border bg-white/92 px-5 py-4 text-left shadow-[0_12px_32px_rgba(40,38,64,0.06)] backdrop-blur-sm transition-all duration-200",
                    isSelected
                      ? "border-[#C400FF]/20 shadow-[0_22px_48px_rgba(95,63,156,0.16)]"
                      : "border-[#282640]/10 hover:border-[#282640]/20 hover:shadow-[0_18px_36px_rgba(40,38,64,0.08)]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        !isSelected && "bg-slate-100 text-slate-400"
                      )}
                      style={isSelected ? { backgroundColor: `${scenario.accent}12`, color: scenario.accent } : undefined}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-bold text-slate-900">{scenario.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {scenario.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {scenario.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                          isSelected
                            ? "border border-[#C400FF]/10 bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 text-[#6b33c7]"
                            : "border border-slate-200 bg-slate-100 text-slate-500"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="w-full min-w-0 rounded-[24px] border border-white/70 bg-white/92 shadow-[0_30px_70px_rgba(40,38,64,0.1)] backdrop-blur-sm"
          >
            <div className="flex items-center justify-between border-b border-[#282640]/10 px-5 py-4">
              <h3 className="text-xl font-bold text-slate-900">{currentScenario.title}</h3>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#6b33c7]">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#F8B529] to-[#C400FF]" />
                <span>{t("demo.workspace.live")}</span>
              </div>
            </div>

            <div className="space-y-4 p-4 md:p-5">
              <div className="rounded-[20px] border border-[#282640]/10 bg-[linear-gradient(135deg,rgba(248,181,41,0.08),rgba(196,0,255,0.06))] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold tracking-[0.08em] text-[#282640]/50">
                    {t("demo.workspace.quick")}
                  </p>
                  <span className="rounded-full border border-[#C400FF]/15 bg-white/80 px-3 py-1 text-xs font-semibold text-[#6b33c7]">
                    {t("demo.workspace.fillPrompt")}
                  </span>
                </div>
                <p className="mt-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm leading-6 text-[#282640]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  {currentScenario.prompt}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {currentScenario.quickOptions.map((option, index) => (
                    <button
                      key={option.question}
                      type="button"
                      onClick={() => setSelectedQuickIndex(index)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                        selectedQuickIndex === index
                          ? "border-transparent bg-[linear-gradient(135deg,#282640,#C400FF)] text-white shadow-[0_12px_24px_rgba(95,63,156,0.25)]"
                          : "border-white/80 bg-white/90 text-[#282640]/80 hover:border-[#C400FF]/20 hover:text-[#6b33c7]"
                      )}
                    >
                      {option.question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-[#282640]/10 bg-white/95 shadow-[0_16px_40px_rgba(40,38,64,0.06)]">
                <div className="min-h-[260px] space-y-4 border-b border-[#282640]/10 px-4 py-4 md:px-5">
                  <div className="flex justify-end">
                    <div className="max-w-[220px] rounded-[16px] bg-[linear-gradient(135deg,#282640,#3a315f_55%,#C400FF)] px-4 py-3 text-lg font-bold text-white shadow-[0_16px_32px_rgba(59,49,95,0.28)]">
                      {currentQuick.userBubble}
                    </div>
                  </div>

                  {replyVisible ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-[76%] rounded-[16px] border border-[#282640]/10 bg-[linear-gradient(180deg,#ffffff,#faf7ff)] px-4 py-4"
                    >
                      <p className="text-base leading-8 text-[#282640]/78">{currentQuick.agentReply}</p>
                      <div className="mt-2 text-xs font-semibold text-[#282640]/40">
                        AX Agent · {t("demo.workspace.justNow")}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="max-w-[76%] rounded-[16px] border border-[#282640]/10 bg-[linear-gradient(180deg,#ffffff,#faf7ff)] px-4 py-4">
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded-full bg-[#282640]/10" />
                        <div className="h-3 w-5/6 rounded-full bg-[#282640]/10" />
                        <div className="h-3 w-2/3 rounded-full bg-[#282640]/10" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 px-4 py-3 md:px-5">
                  <input
                    value={currentQuick.question}
                    readOnly
                    aria-readonly="true"
                    className="h-11 flex-1 cursor-default rounded-xl border border-[#282640]/10 bg-[linear-gradient(180deg,#faf8fd,#f3effa)] px-4 text-sm font-medium text-[#282640]/80 outline-none ring-1 ring-white/70"
                  />
                  <Button
                    type="button"
                    onClick={runScenario}
                    disabled={isRunning}
                    className="h-11 rounded-xl bg-[linear-gradient(135deg,#282640,#C400FF)] px-5 text-white shadow-[0_14px_28px_rgba(95,63,156,0.28)] hover:opacity-95"
                  >
                    <SendHorizontal className="h-4 w-4" />
                    {t("demo.workspace.send")}
                  </Button>
                </div>
              </div>

              <div className="rounded-[20px] border border-[#282640]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,244,252,0.95))] px-4 py-4">
                <p className="text-sm font-semibold text-[#282640]/62">{t("demo.workspace.flowTitle")}</p>
                <div className="mt-3">
                  <FlowRow labels={flowLabels} stageIndex={flowStep} isRunning={isRunning} />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {currentQuick.metrics.map((metric, index) => (
                  <div
                    key={`${metric}-${index}`}
                    className="rounded-[18px] border border-[#282640]/10 bg-white/95 px-4 py-4 text-center shadow-[0_14px_34px_rgba(40,38,64,0.05)]"
                  >
                    {metricsVisible > index ? (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                        <p
                          className={cn(
                            "text-4xl font-black",
                            index === 0
                              ? "text-[#6b33c7]"
                              : index === 1
                                ? "text-[#2f8f63]"
                                : "text-[#d88922]"
                          )}
                        >
                          {metric}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#282640]/55">
                          {currentScenario.metricLabels[index]}
                        </p>
                      </motion.div>
                    ) : (
                      <div className="space-y-2 py-2">
                        <div className="mx-auto h-4 w-20 rounded-full bg-slate-200" />
                        <div className="mx-auto h-3 w-24 rounded-full bg-slate-100" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-[18px] border border-rose-100 bg-rose-50 px-4 py-4">
                  <p className="text-sm font-black tracking-[0.18em] text-[#d2624d]">
                    {t("demo.workspace.before")}
                  </p>
                  <div className="mt-4 space-y-3">
                    {beforeAfterVisible
                      ? currentScenario.beforeItems.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-slate-600">
                            <span className="mt-1 text-[#d2624d]">×</span>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))
                      : [0, 1].map((index) => (
                          <div key={index} className="h-3 w-3/4 rounded-full bg-rose-100" />
                        ))}
                  </div>
                </div>

                <div className="rounded-[18px] border border-emerald-100 bg-emerald-50 px-4 py-4">
                  <p className="text-sm font-black tracking-[0.18em] text-[#67a96b]">
                    {t("demo.workspace.after")}
                  </p>
                  <div className="mt-4 space-y-3">
                    {beforeAfterVisible
                      ? currentScenario.afterItems.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-slate-600">
                            <span className="mt-1 text-[#67a96b]">✓</span>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))
                      : [0, 1].map((index) => (
                          <div key={index} className="h-3 w-3/4 rounded-full bg-emerald-100" />
                        ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[#282640]/10 bg-white/95 px-4 py-3 shadow-[0_16px_40px_rgba(40,38,64,0.05)]">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-3 text-sm text-[#282640]/72">
                    <Switch checked={autoMode} onCheckedChange={setAutoMode} className="data-checked:bg-[#6b33c7]" />
                    <span>{t("demo.workspace.autoMode")}</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-[#282640]/72">
                    <Switch checked={liveMode} onCheckedChange={setLiveMode} className="data-checked:bg-[#282640]" />
                    <span>{t("demo.workspace.liveMode")}</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-[#282640]/10 bg-[#282640]/[0.03] text-[#282640]/72">
                    {selectedModel}
                  </Badge>
                  <Badge className="border border-[#C400FF]/10 bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10 text-[#6b33c7]">
                    {statusMessage}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
