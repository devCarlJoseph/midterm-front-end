import { X } from "lucide-react";
import { PandaMascot } from "./auth-mascot";

interface AuthModalHeaderProps {
  mode: "login" | "register";
  isLoading: boolean;
  onClose: () => void;
  onSwitchMode: (mode: "login" | "register") => void;
}

export function AuthModalHeader({
  mode,
  isLoading,
  onClose,
  onSwitchMode,
}: AuthModalHeaderProps) {
  return (
    <>
      {/* Top Brand Accent Bar (Foodpanda Pink) */}
      <div className="h-1.5 w-full bg-[#D70F64] shrink-0" />

      {/* Modal Header */}
      <div className="relative px-6 pt-6 pb-2 sm:px-8 shrink-0 text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
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
            onClick={() => onSwitchMode("login")}
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
            onClick={() => onSwitchMode("register")}
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
    </>
  );
}
