const stats = [
  { value: "500+", label: "누적 교육 수료생" },
  { value: "90%", label: "재계약률" },
  { value: "50+", label: "AI 프로젝트" },
];

export function StatsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[1.5rem] border border-orange-100 bg-white p-6 shadow-sm"
        >
          <p className="text-3xl font-semibold text-stone-950">{stat.value}</p>
          <p className="mt-2 text-sm text-stone-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
