import React, { useRef, type FormEvent } from "react";

interface ForgotPasswordOtpStepProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  isLoading: boolean;
  onResend: () => void;
  onSubmit: (e: FormEvent) => void;
}

export function ForgotPasswordOtpStep({
  otp,
  setOtp,
  isLoading,
  onResend,
  onSubmit,
}: ForgotPasswordOtpStepProps) {
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="flex justify-center gap-2 sm:gap-3">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              otpInputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(idx, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
            className="h-12 w-10 sm:w-12 rounded-xl border border-slate-200 text-center text-lg font-bold text-slate-900 outline-none transition focus:border-[#D70F64] focus:ring-2 focus:ring-[#D70F64]/20"
          />
        ))}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onResend}
          className="text-xs font-semibold text-[#D70F64] hover:underline cursor-pointer"
        >
          Resend verification code
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-[#D70F64] py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-[#C21760] disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? "Verifying..." : "Verify Code"}
      </button>
    </form>
  );
}
