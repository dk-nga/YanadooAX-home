const partners = ["Enterprise Education", "L&D Teams", "Operations", "Transformation Leaders"];

export function PartnersSection() {
  return (
    <div className="rounded-[2rem] border border-orange-100 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
        AX Partners
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {partners.map((partner) => (
          <div
            key={partner}
            className="rounded-[1rem] border border-orange-100 px-4 py-4 text-sm text-stone-700"
          >
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
}
