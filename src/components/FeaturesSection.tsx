const features = [
  "교육과 구축을 함께 설계하는 AX 실행 방식",
  "현업 주도 운영 역량까지 남기는 정착 구조",
  "팀 단위로 바로 적용 가능한 실전형 프로그램",
];

export function FeaturesSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature}
          className="rounded-[1.5rem] border border-orange-100 bg-orange-50/70 p-6"
        >
          <p className="text-base font-medium text-stone-900">{feature}</p>
        </div>
      ))}
    </div>
  );
}
