export function TestCard() {
  return (
    <div className="group relative w-70 h-48 overflow-hidden rounded-2xl">
      <img
        src="/dali.png"
        alt="Card"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-emerald-950/95 via-emerald-900/75 to-emerald-900/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-white text-center">
        <p className="text-xs font-bold tracking-wider text-emerald-300">
          LABEL
        </p>

        <h3 className="mt-2 text-xl font-bold leading-tight">
          Title
        </h3>

        <p className="mt-3 text-sm leading-6 text-emerald-50">
          Some description text here.
        </p>
      </div>
    </div>
  );
}