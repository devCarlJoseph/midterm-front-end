interface PasswordStrengthMeterProps {
  score: number;
}

export function PasswordStrengthMeter({ score }: PasswordStrengthMeterProps) {
  let color = "bg-red-500";
  if (score === 2) {
    color = "bg-orange-500";
  } else if (score === 3) {
    color = "bg-amber-500";
  } else if (score === 4) {
    color = "bg-emerald-500";
  }

  return (
    <div className="mt-2 space-y-1">
      <div className="grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              score >= step ? color : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className="text-[10px] text-slate-400">
        Tip: Use a mix of uppercase letters, numbers, and symbols.
      </p>
    </div>
  );
}
