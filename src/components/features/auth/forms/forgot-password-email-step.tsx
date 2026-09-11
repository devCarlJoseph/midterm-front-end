import type { FormEvent } from "react";
import { Mail } from "lucide-react";

interface ForgotPasswordEmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  onSubmit: (e: FormEvent) => void;
}

export function ForgotPasswordEmailStep({
  email,
  setEmail,
  isLoading,
  onSubmit,
}: ForgotPasswordEmailStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
  );
}
