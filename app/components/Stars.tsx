// Renders a 1-5 star rating. Rounds to whole stars; clamps to [0, 5].

export function Stars({ n }: { n: number }) {
  const full = Math.max(0, Math.min(5, Math.round(n)));
  return (
    <span aria-label={`${full} out of 5 stars`} className="inline-flex select-none tracking-wide">
      <span className="text-amber-500">{"★".repeat(full)}</span>
      <span className="text-slate-300">{"★".repeat(5 - full)}</span>
    </span>
  );
}
