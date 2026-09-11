import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, LogIn, Mail, X } from "lucide-react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  fieldErrors: Record<string, string[]>;
  onForgotPasswordClick: () => void;
  onClearErrors: () => void;
}

export function LoginForm({
  onSubmit,
  isLoading,
  fieldErrors,
  onForgotPasswordClick,
  onClearErrors,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Input */}
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
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) onClearErrors();
            }}
            placeholder="e.g. name@example.com"
            className={`w-full rounded-xl border py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-900 outline-none transition focus:ring-2 ${
              fieldErrors.email
                ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 bg-white focus:border-emerald-600 focus:ring-emerald-600/15"
            }`}
          />
          {email && (
            <button
              type="button"
              onClick={() => setEmail("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
        {fieldErrors.email && (
          <p className="mt-1 text-[11px] font-medium text-red-600">
            {fieldErrors.email[0]}
          </p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">Password</label>
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) onClearErrors();
            }}
            placeholder="Enter your password"
            className={`w-full rounded-xl border py-2.5 pl-10 pr-10 text-xs sm:text-sm text-slate-900 outline-none transition focus:ring-2 ${
              fieldErrors.password
                ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 bg-white focus:border-emerald-600 focus:ring-emerald-600/15"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="mt-1 text-[11px] font-medium text-red-600">
            {fieldErrors.password[0]}
          </p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-emerald-600 text-emerald-600 focus:ring-emerald-600"
          />
          <span className="text-xs text-slate-600">Keep me logged in on this device</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Logging in...</span>
          </div>
        ) : (
          <>
            <LogIn size={16} />
            <span>Log in</span>
          </>
        )}
      </button>
    </form>
  );
}
