import { ArrowRight, LocateFixed, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

import deliveryBanner from "@/assets/delivery-banner-img.jpeg";

/**
 * A delivery-first landing hero: headline, address entry, and a clear route
 * into nearby stores, while retaining Dali's visual identity.
 */
export function DaliAppBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#f7f7f8]">
      <div className="relative mx-auto min-h-[490px] max-w-[1440px] overflow-hidden sm:min-h-[520px]">
        <img
          src={deliveryBanner}
          alt="Fresh groceries ready for delivery"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f7f8] via-[#f7f7f8]/95 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-t from-[#f7f7f8]/55 via-transparent to-transparent sm:hidden" />

        <div className="relative z-10 mx-auto flex min-h-[490px] max-w-7xl items-center px-4 py-14 sm:min-h-[520px] sm:px-6 lg:px-8">
          <div className="w-full max-w-xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d70f64]/15 bg-white/90 px-3 py-1.5 text-xs font-bold text-[#d70f64] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#d70f64]" />
              Groceries delivered around Cordova
            </p>
            <h1 className="max-w-lg text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-[3.5rem]">
              Your groceries, delivered fresh to your door
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
              Choose your delivery address to see Dali stores, everyday deals,
              and fresh essentials available near you.
            </p>

            <div className="mt-7 rounded-2xl bg-white p-2 shadow-[0_8px_28px_rgba(15,23,42,0.14)] sm:flex sm:items-center sm:gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5">
                <MapPin size={21} className="shrink-0 text-[#d70f64]" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900">Delivery address</p>
                  <p className="truncate text-xs text-slate-500">Enter your street or barangay</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate("/stores")}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d70f64] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#bd0d58] sm:mt-0 sm:w-auto cursor-pointer"
              >
                Find stores
                <ArrowRight size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate("/stores")}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-700 transition hover:text-[#d70f64] cursor-pointer"
            >
              <LocateFixed size={17} className="text-[#d70f64]" />
              Use my current location
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
