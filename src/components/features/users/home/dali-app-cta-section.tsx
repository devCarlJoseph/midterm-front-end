import { Smartphone, QrCode, ShieldCheck, Zap, Heart, Sparkles } from "lucide-react";

export function DaliAppCtaSection() {
  return (
    <section className="my-10 sm:my-14 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-xl border border-emerald-800/60">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-12 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left info */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30 backdrop-blur-xs">
              <Sparkles size={13} />
              <span>Official Dali Mobile Experience</span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Direct access to local inventory <br className="hidden sm:inline" />
              right from your phone.
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-xl">
              Download the Dali App to track your rider on the map, access app-exclusive flash sales, and save your favorite stores for 1-tap reordering.
            </p>

            {/* Feature Bullets */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-left">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5 border border-white/10 backdrop-blur-xs">
                <Zap size={16} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-100">
                  25-Min Express Delivery
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5 border border-white/10 backdrop-blur-xs">
                <Heart size={16} className="text-rose-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-100">
                  Quick Favorite Stores
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5 border border-white/10 backdrop-blur-xs">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-100">
                  Everyday Low Prices
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5 border border-white/10 backdrop-blur-xs">
                <Smartphone size={16} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-100">
                  Real-time GPS Tracking
                </span>
              </div>
            </div>

            {/* App Badges */}
            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="#download-ios"
                className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-2 text-slate-950 font-bold text-xs shadow-md transition hover:bg-emerald-50 hover:shadow-lg"
              >
                <div className="text-lg leading-none"></div>
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase text-slate-500 font-semibold">Download on</div>
                  <div className="text-xs font-black">App Store</div>
                </div>
              </a>

              <a
                href="#download-android"
                className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-2 text-slate-950 font-bold text-xs shadow-md transition hover:bg-emerald-50 hover:shadow-lg"
              >
                <div className="text-base leading-none">▶</div>
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase text-slate-500 font-semibold">Get it on</div>
                  <div className="text-xs font-black">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right QR card / App visual */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative rounded-2xl bg-white p-5 text-slate-900 shadow-2xl border-4 border-emerald-600/30 text-center max-w-[210px]">
              <div className="flex items-center justify-center gap-1.5 pb-2">
                <img
                  src="/dali-transparent.png"
                  alt="Dali"
                  className="h-6 w-auto object-contain"
                />
              </div>

              {/* QR Code graphic */}
              <div className="my-2 rounded-xl bg-emerald-50 p-3 flex items-center justify-center border border-emerald-100">
                <QrCode size={110} className="text-emerald-950" />
              </div>

              <p className="text-[11px] font-bold text-slate-800">
                Scan with phone camera
              </p>
              <p className="text-[10px] text-slate-400">
                Instant Dali App download
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
