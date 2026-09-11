import { Sparkles, Tag } from "lucide-react";
import { authPerks } from "../contents/auth-content";

export function AuthPerksSidebar() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-emerald-700 p-8 text-white shadow-2xl shadow-emerald-600/20">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-black/10 blur-2xl" />

      {/* Top Section: Mascot & Brand Welcome */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-xs px-3.5 py-1 text-xs font-bold text-white tracking-wide uppercase">
          <Sparkles size={14} className="text-yellow-300" />
          <span>Dali Delivery Experience</span>
        </div>
      </div>

      {/* Center Perks List */}
      <div className="relative z-10 my-8 space-y-4">
        {authPerks.map((perk, index) => {
          const Icon = perk.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-3.5 rounded-2xl bg-white/10 backdrop-blur-xs p-3.5 transition-all hover:bg-white/15 hover:translate-x-1"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-xs">
                <Icon size={18} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  {perk.title}
                </h3>
                <p className="mt-0.5 text-[11px] text-white/80 leading-relaxed">
                  {perk.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Promo Tag */}
      <div className="relative z-10 rounded-2xl bg-white/15 backdrop-blur-xs p-4 border border-white/20">
        <div className="flex items-center gap-2 text-xs font-bold text-yellow-300">
          <Tag size={16} />
          <span>FIRST ORDER PROMO</span>
        </div>
        <p className="mt-1 text-xs text-white font-medium">
          Get <strong>FREE delivery + ₱100 off</strong> on your first store booking today!
        </p>
      </div>
    </div>
  );
}
