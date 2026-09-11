import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import axios from "axios";

import { useAuth } from "@/context/auth-context";
import { PandaMascot } from "@/components/features/auth/auth-mascot";
import { SocialAuthButtons } from "@/components/features/auth/social-auth-buttons";
import { LoginForm } from "@/components/features/auth/login-form";
import { RegisterForm } from "@/components/features/auth/register-form";
import { ForgotPasswordModal } from "@/components/features/auth/forgot-password-modal";
import { AuthenticatedView } from "@/components/features/auth/authenticated-view";
import { AuthPerksSidebar } from "@/components/features/auth/auth-perks-sidebar";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register, isAuthenticated, user, logout } = useAuth();

  // Determine mode from route path or query param, with local override
  const isRegisterRoute =
    location.pathname === "/register" || searchParams.get("mode") === "register";

  const [overrideMode, setOverrideMode] = useState<"login" | "register" | null>(null);
  const mode = overrideMode ?? (isRegisterRoute ? "register" : "login");

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const switchMode = (newMode: "login" | "register") => {
    setOverrideMode(newMode);
    setErrorMessage(null);
    setFieldErrors({});
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("mode", newMode);
      return next;
    });
  };

  const handleLoginSubmit = async (email: string, pass: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      await login(email, pass);
      setSuccessMessage("Welcome back! Signing you in...");
      setTimeout(() => {
        const redirectTo = searchParams.get("redirect") ?? "/";
        navigate(redirectTo);
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
        const redirectTo = searchParams.get("redirect") ?? "/";
        navigate(redirectTo);
      }, 800);
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

  // If already authenticated, show the Foodpanda VIP card
  if (isAuthenticated && user) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <AuthenticatedView user={user} onLogout={logout} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center py-8 sm:py-12">
      <div className="w-full max-w-5xl">
        {/* Top Breadcrumb / Back Link */}
        <div className="mb-4 flex items-center justify-between px-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#D70F64] transition"
          >
            <ArrowLeft size={16} />
            <span>Back to explore stores</span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#D70F64]">
            <span className="h-2 w-2 rounded-full bg-[#D70F64] animate-pulse" />
            Foodpanda Delivery Express
          </span>
        </div>

        {/* Main Grid: Perks Sidebar + Auth Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Foodpanda Perks (Visible on desktop) */}
          <div className="lg:col-span-5 flex">
            <AuthPerksSidebar />
          </div>

          {/* Right: Foodpanda Authentication Form Card */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-xl shadow-pink-500/5">
              {/* Header with Mascot */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center mb-2">
                  <PandaMascot
                    size={68}
                    mood={mode === "login" ? "happy" : "winking"}
                    className="mx-auto"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  {mode === "login" ? "Welcome back!" : "Let's get you started"}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  {mode === "login"
                    ? "Log in with your Foodpanda account to order your favorite treats."
                    : "Create an account in seconds and unlock free delivery rewards."}
                </p>
              </div>

              {/* Mode Tabs (Foodpanda Pill Toggle) */}
              <div className="mb-6 flex rounded-2xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className={`flex-1 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
                  className={`flex-1 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    mode === "register"
                      ? "bg-white text-[#D70F64] shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* General Error Banner */}
              {errorMessage && (
                <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-700 animate-in fade-in">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
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
                <div className="mb-5 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 animate-in fade-in">
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                  <span className="font-semibold">{successMessage}</span>
                </div>
              )}

              {/* Foodpanda Social Auth Row */}
              <div className="mb-5">
                <SocialAuthButtons disabled={isLoading} />
              </div>

              {/* Sleek Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  or continue with email
                </span>
              </div>

              {/* Form Content */}
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

              {/* Mode Switch Prompt */}
              <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
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
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onSuccessReturnToLogin={() => switchMode("login")}
      />
    </div>
  );
}
