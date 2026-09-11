import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PandaMascot } from "../ui/auth-mascot";
import { ForgotPasswordEmailStep } from "../forms/forgot-password-email-step";
import { ForgotPasswordOtpStep } from "../forms/forgot-password-otp-step";
import { ForgotPasswordResetStep } from "../forms/forgot-password-reset-step";
import { ForgotPasswordSuccessStep } from "../forms/forgot-password-success-step";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
                  No worries! Enter the email associated with your account, and we&apos;ll send you a verification code.
                </p>
              </>
            )}

            {step === "otp" && (
              <>
                <h2 className="text-xl font-bold text-slate-900">Enter verification code</h2>
                <p className="mt-1 text-xs text-slate-500">
                  We&apos;ve sent a 6-digit verification code to{" "}
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
            <ForgotPasswordEmailStep
              email={email}
              setEmail={setEmail}
              isLoading={isLoading}
              onSubmit={handleSendCode}
            />
          )}

          {/* Step 2: 6-Digit OTP */}
          {step === "otp" && (
            <ForgotPasswordOtpStep
              otp={otp}
              setOtp={setOtp}
              isLoading={isLoading}
              onResend={() => {
                setOtp(["", "", "", "", "", ""]);
                setError(null);
              }}
              onSubmit={handleVerifyOtp}
            />
          )}

          {/* Step 3: New Password */}
          {step === "reset" && (
            <ForgotPasswordResetStep
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              isLoading={isLoading}
              onSubmit={handleResetPassword}
            />
          )}

          {/* Step 4: Success View */}
          {step === "success" && (
            <ForgotPasswordSuccessStep onDone={handleDone} />
          )}
        </div>
      </div>
    </div>
  );
}
