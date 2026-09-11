interface ForgotPasswordSuccessStepProps {
  onDone: () => void;
}

export function ForgotPasswordSuccessStep({ onDone }: ForgotPasswordSuccessStepProps) {
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={onDone}
        className="w-full rounded-xl bg-[#D70F64] py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-[#C21760] cursor-pointer"
      >
        Continue to Log In
      </button>
    </div>
  );
}
