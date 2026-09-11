import { Sparkles } from "lucide-react";
import { demoAccounts } from "../contents/auth-content";

interface DemoAccountsBannerProps {
  onFillDemo: (email: string, pass: string) => void;
}

export function DemoAccountsBanner({ onFillDemo }: DemoAccountsBannerProps) {
  return (
    <div className="rounded-xl border border-pink-100 bg-[#FFF5F8] p-2.5 text-xs text-slate-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-semibold text-emerald-600">
          <Sparkles size={14} />
          <span>Midterm Test Accounts:</span>
        </div>
        <span className="text-[10px] text-slate-400">1-click fill</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {demoAccounts.map((account) => (
          <button
            key={account.email}
            type="button"
            onClick={() => onFillDemo(account.email, account.password)}
            className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-xs border border-pink-100 hover:border-emerald-600 hover:text-emerald-600 transition cursor-pointer"
          >
            {account.label}
          </button>
        ))}
      </div>
    </div>
  );
}
