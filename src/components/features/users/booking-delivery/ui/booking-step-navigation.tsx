interface BookingStepNavigationProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  backLabel?: string;
}

export function BookingStepNavigation({
  onBack,
  onNext,
  nextLabel = "Continue →",
  backLabel = "← Back",
}: BookingStepNavigationProps) {
  return (
    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
      <button
        type="button"
        onClick={onBack}
        className="rounded-lg border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
      >
        {backLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        className="rounded-lg bg-[#08a66d] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#078f5e] cursor-pointer"
      >
        {nextLabel}
      </button>
    </div>
  );
}
