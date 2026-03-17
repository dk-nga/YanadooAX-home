type WireframeSphereProps = {
  className?: string;
};

export function WireframeSphere({ className }: WireframeSphereProps) {
  return (
    <div
      className={`relative aspect-square w-full max-w-[300px] rounded-full border border-orange-300/40 ${className ?? ""}`}
    >
      <div className="absolute inset-4 rounded-full border border-orange-300/30" />
      <div className="absolute inset-8 rounded-full border border-orange-300/20" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-orange-300/20" />
      <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-orange-300/20" />
    </div>
  );
}
