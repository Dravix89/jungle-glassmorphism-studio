export default function PageHeader({ pill, title, text }: { pill: string; title: string; text?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div>
        <div className="glass-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full lime-dot" />
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/90">{pill}</span>
        </div>
        <h1 className="font-bold text-3xl sm:text-5xl text-white tracking-tight">{title}</h1>
      </div>
      {text && <p className="text-white/70 max-w-md text-sm sm:text-base">{text}</p>}
    </div>
  );
}
