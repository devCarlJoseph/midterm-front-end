import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import axios from "axios";

import { useAuth } from "@/context/auth-context";
import { PandaMascot } from "./auth-mascot";
import { SocialAuthButtons } from "./social-auth-buttons";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { ForgotPasswordModal } from "./forgot-password-modal";

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialMode?: "login" | "register";
}

export function AuthModal({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  initialMode: externalInitialMode,
}: AuthModalProps) {
  const {
    isAuthModalOpen: contextIsOpen,
    authModalMode: contextMode,
    closeAuthModal: contextClose,
    login,
    register,
  } = useAuth();

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : contextIsOpen;
  const handleClose = externalOnClose !== undefined ? externalOnClose : contextClose;

  const [mode, setMode] = useState<"login" | "register">(
    externalInitialMode || contextMode || "login",
  );

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync mode whenever contextMode changes or modal opens
  useEffect(() => {
    if (contextMode) {
      setMode(contextMode);
    }
  }, [contextMode]);

  // Handle ESC key press & body overflow
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isForgotPasswordOpen) {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isForgotPasswordOpen, handleClose]);

  if (!isOpen) return null;

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    setErrorMessage(null);
    setFieldErrors({});
    setSuccessMessage(null);
  };

  const handleLoginSubmit = async (email: string, pass: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      await login(email, pass);
      setSuccessMessage("Welcome back! Signing you in...");
      setTimeout(() => {
        handleClose();
        setSuccessMessage(null);
      }, 700);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as {
          message?: string;
          errors?: Record<string, string[]>;
        };
        setErrorMessage(
          data.message ?? "Invalid email or password. Please check your credentials.",
        );
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      } else {
        setErrorMessage("Unable to connect to the server. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (
    name: string,
    email: string,
    pass: string,
    passwordConfirmation: string,
  ) => {
    setIsLoading(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      await register(name, email, pass, passwordConfirmation);
      setSuccessMessage("Account created successfully! Welcome to Foodpanda!");
      setTimeout(() => {
        handleClose();
        setSuccessMessage(null);
      }, 750);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as {
          message?: string;
          errors?: Record<string, string[]>;
        };
        setErrorMessage(data.message ?? "Registration failed. Please check the form errors.");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      } else {
        setErrorMessage("An unexpected network error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isLoading) {
            handleClose();
          }
        }}
      >
        <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
          {/* Top Brand Accent Bar (Foodpanda Pink) */}
          <div className="h-1.5 w-full bg-[#D70F64] shrink-0" />

          {/* Modal Header */}
          <div className="relative px-6 pt-6 pb-2 sm:px-8 shrink-0 text-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer disabled:opacity-50"
            >
              <X size={18} />
            </button>

            {/* Mascot */}
            <div className="inline-flex items-center justify-center mb-2">
              <PandaMascot
                size={62}
                mood={mode === "login" ? "happy" : "winking"}
                className="mx-auto"
              />
            </div>

            <h2
              id="auth-modal-title"
              className="text-xl sm:text-2xl font-black tracking-tight text-slate-900"
            >
              {mode === "login" ? "Welcome back!" : "Create an account"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {mode === "login"
                ? "Log in to view saved addresses, active orders, and fast checkout."
                : "Sign up to start ordering fresh food and groceries with free delivery."}
            </p>

            {/* Foodpanda Pill Tabs */}
            <div className="mt-4 flex rounded-2xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex-1 rounded-xl py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === "login"
                    ? "bg-white text-[#D70F64] shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`flex-1 rounded-xl py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === "register"
                    ? "bg-white text-[#D70F64] shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Scrollable Form Body */}
          <div className="overflow-y-auto px-6 py-4 sm:px-8 sm:py-5 flex-1 space-y-4">
            {/* Error Banner */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50/80 p-3 text-xs text-red-700 animate-in fade-in">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Success Banner */}
            {successMessage && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 animate-in fade-in">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span className="font-semibold">{successMessage}</span>
              </div>
            )}

            {/* Social Authentication */}
            <SocialAuthButtons disabled={isLoading} />

            {/* Sleek Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                or continue with email
              </span>
            </div>

            {/* Form */}
            {mode === "login" ? (
              <LoginForm
                onSubmit={handleLoginSubmit}
                isLoading={isLoading}
                fieldErrors={fieldErrors}
                onForgotPasswordClick={() => setIsForgotPasswordOpen(true)}
                onClearErrors={() => setFieldErrors({})}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegisterSubmit}
                isLoading={isLoading}
                fieldErrors={fieldErrors}
                onClearErrors={() => setFieldErrors({})}
              />
            )}

            {/* Footer switcher */}
            <div className="pt-3 pb-2 text-center text-xs text-slate-500 border-t border-slate-100">
              {mode === "login" ? (
                <p>
                  Don't have a Foodpanda account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("register")}
                    className="font-bold text-[#D70F64] hover:underline cursor-pointer"
                  >
                    Sign up now
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="font-bold text-[#D70F64] hover:underline cursor-pointer"
                  >
                    Log in instead
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onSuccessReturnToLogin={() => {
          setIsForgotPasswordOpen(false);
          switchMode("login");
        }}
      />
    </>
  );
}
