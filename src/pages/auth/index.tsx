import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { LogIn, UserPlus, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import axios from "axios";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  const { login, register, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Login Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Form States
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirmation, setRegisterPasswordConfirmation] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      await login(loginEmail, loginPassword);
      setSuccessMessage("Signed in successfully! Redirecting...");
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
        setErrorMessage(data.message ?? "Failed to sign in. Please check your credentials.");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      await register(
        registerName,
        registerEmail,
        registerPassword,
        registerPasswordConfirmation,
      );
      setSuccessMessage("Account created successfully! Redirecting...");
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
        setErrorMessage(data.message ?? "Registration failed. Please check the form.");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-800">
            Already Signed In
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            You are currently signed in as{" "}
            <span className="font-semibold text-emerald-700">{user.name}</span> (
            {user.email}).
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/"
              className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Back to Home
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft size={14} /> Back to store
          </Link>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center mb-6">
            <img
              src="/dali-transparent.png"
              alt="DALI"
              className="mx-auto h-9 w-auto object-contain"
            />
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              {mode === "login"
                ? "Sign in to access your cart, addresses, and track orders."
                : "Join DALI to start ordering fresh supplies from local stores."}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMessage(null);
                setFieldErrors({});
              }}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
                mode === "login"
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setErrorMessage(null);
                setFieldErrors({});
              }}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
                mode === "register"
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* General Error Banner */}
          {errorMessage && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {mode === "login" ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {fieldErrors.email[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {fieldErrors.password[0]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
              >
                <LogIn size={16} />
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Carl Joseph"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {fieldErrors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {fieldErrors.email[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Password (min 8 characters)
                </label>
                <input
                  type="password"
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {fieldErrors.password[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={registerPasswordConfirmation}
                  onChange={(e) => setRegisterPasswordConfirmation(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
              >
                <UserPlus size={16} />
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-slate-500">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setErrorMessage(null);
                    setFieldErrors({});
                  }}
                  className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMessage(null);
                    setFieldErrors({});
                  }}
                  className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
                >
                  Sign in instead
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
