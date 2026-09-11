import { useState, useRef, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { PandaMascot } from "./auth-mascot";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  onSuccessReturnToLogin?: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
  initialEmail = "",
  onSuccessReturnToLogin,
}: ForgotPasswordModalProps) {
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">("email");
  const [email, setEmail] = useState(initialEmail || "");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!isOpen) return null;

  const handleSendCode = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate backend sending verification code
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 900);
  };

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

  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join("");
    if (enteredCode.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      setStep("reset");
    }, 800);
  };

  const handleResetPassword = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 900);
  };

  const handleDone = () => {
    onClose();
    onSuccessReturnToLogin?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100">
        {/* Top Accent Bar (Foodpanda Pink) */}
        <div className="h-1.5 w-full bg-[#D70F64]" />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            {step !== "success" ? (
              <button
                type="button"
                onClick={() => {
                  if (step === "otp") setStep("email");
                  else if (step === "reset") setStep("otp");
                  else onClose();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#D70F64] transition cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>{step === "email" ? "Back" : "Previous step"}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Center Mascot & Title */}
          <div className="text-center mb-6">
            <PandaMascot
              size={56}
              mood={step === "success" ? "happy" : step === "otp" ? "winking" : "hungry"}
              className="mx-auto mb-3"
            />

            {step === "email" && (
              <>
                <h2 className="text-xl font-bold text-slate-900">Forgot your password?</h2>
                <p className="mt-1 text-xs text-slate-500">
                  No worries! Enter the email associated with your account, and we'll send you a verification code.
                </p>
              </>
            )}

            {step === "otp" && (
              <>
                <h2 className="text-xl font-bold text-slate-900">Enter verification code</h2>
                <p className="mt-1 text-xs text-slate-500">
                  We've sent a 6-digit verification code to{" "}
                  <span className="font-semibold text-slate-700">{email}</span>
                </p>
              </>
            )}

            {step === "reset" && (
              <>
                <h2 className="text-xl font-bold text-slate-900">Create new password</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Please choose a strong password with at least 8 characters.
                </p>
              </>
            )}

            {step === "success" && (
              <>
                <div className="mx-auto my-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={28} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Password Reset Complete!</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Your password has been successfully updated. You can now log in to your account.
                </p>
              </>
            )}
          </div>

          {/* Error notice */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Step 1: Email Form */}
          {step === "email" && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. foodlover@example.com"
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition focus:border-[#D70F64] focus:ring-2 focus:ring-[#D70F64]/15"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#D70F64] py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-[#C21760] disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? "Sending code..." : "Send Reset Code"}
              </button>
            </form>
          )}

          {/* Step 2: 6-Digit OTP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
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
                  onClick={() => {
                    setOtp(["", "", "", "", "", ""]);
                    setError(null);
                  }}
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
          )}

          {/* Step 3: New Password */}
          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-[#D70F64] focus:ring-2 focus:ring-[#D70F64]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <ShieldCheck
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition focus:border-[#D70F64] focus:ring-2 focus:ring-[#D70F64]/15"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#D70F64] py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-[#C21760] disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? "Saving password..." : "Update Password"}
              </button>
            </form>
          )}

          {/* Step 4: Success View */}
          {step === "success" && (
            <div className="mt-4">
              <button
                type="button"
                onClick={handleDone}
                className="w-full rounded-xl bg-[#D70F64] py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-[#C21760] cursor-pointer"
              >
                Continue to Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
