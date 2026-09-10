import type { DeliveryOption } from "@/lib/api-types";
import { calculateTotalDeliveryFee, MAX_DELIVERY_DISTANCE_KM } from "@/lib/delivery-fee";
import { Zap, Clock, ShieldCheck, AlertCircle } from "lucide-react";

interface DeliveryOptionsProps {
  deliveryOptions: DeliveryOption[];
  selectedDeliveryOptionId: number | null;
  onSelectDeliveryOption: (deliveryOptionId: number) => void;
  distanceKm: number | null;
}

export function DeliveryOptions({
  deliveryOptions,
  selectedDeliveryOptionId,
  onSelectDeliveryOption,
  distanceKm,
}: DeliveryOptionsProps) {
  const isOutOfRange = distanceKm !== null && distanceKm > MAX_DELIVERY_DISTANCE_KM;

  return (
    <section className="mt-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#164f45]">Delivery Option</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Choose your preferred delivery speed. Fee is accurately calculated based on store distance.
          </p>
        </div>
        {distanceKm !== null && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
            <span>📍</span>
            <span>{distanceKm.toFixed(1)} km away</span>
          </span>
        )}
      </div>

      {isOutOfRange && (
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
          <AlertCircle size={16} className="shrink-0 text-amber-600" />
          <span>
            This address is {distanceKm?.toFixed(1)} km away, which exceeds the store&apos;s {MAX_DELIVERY_DISTANCE_KM} km maximum delivery radius.
          </span>
        </div>
      )}

      {deliveryOptions.length === 0 ? (
        <p className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
          Delivery options will appear after your cart has a store.
        </p>
      ) : (
        <div className="mt-3.5 grid gap-3 sm:grid-cols-3">
          {deliveryOptions.map((option) => {
            const isSelected = option.id === selectedDeliveryOptionId;
            const effectiveDist = distanceKm ?? 1.0;
            const totalFee = calculateTotalDeliveryFee(effectiveDist, option.additional_fee);
            const additionalFeeNum = Number(option.additional_fee);

            // Badges & styling per tier
            const isExpress = option.name.toLowerCase().includes("express") || additionalFeeNum >= 50;
            const isSaver = option.name.toLowerCase().includes("saver") || additionalFeeNum === 0;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectDeliveryOption(option.id)}
                className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition ${
                  isSelected
                    ? "border-[#08a66d] bg-[#f0faf4] ring-2 ring-[#08a66d]/30 shadow-xs"
                    : "border-slate-200 bg-white hover:border-[#b7ddcc] hover:bg-slate-50/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isExpress ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-100 text-amber-700">
                          <Zap size={14} />
                        </span>
                      ) : isSaver ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                          <ShieldCheck size={14} />
                        </span>
                      ) : (
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-700">
                          <Clock size={14} />
                        </span>
                      )}
                      <h3 className="text-xs font-bold text-[#164f45]">
                        {option.name}
                      </h3>
                    </div>

                    {isSelected ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#08a66d] text-[11px] font-bold text-white shadow-xs">
                        ✓
                      </span>
                    ) : (
                      <span className="h-4 w-4 rounded-full border border-slate-300" />
                    )}
                  </div>

                  <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                    {option.description ?? `Delivers in ~${option.estimated_delivery_minutes} mins`}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock size={11} />
                    <span>~{option.estimated_delivery_minutes} mins</span>
                    {additionalFeeNum > 0 ? (
                      <span className="ml-1 font-medium text-emerald-700">
                        (+₱{additionalFeeNum.toFixed(0)} tier)
                      </span>
                    ) : (
                      <span className="ml-1 font-medium text-emerald-600">
                        (No extra tier fee)
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3.5 border-t border-slate-100 pt-2.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] text-slate-400">Total delivery fee</span>
                    <span className="text-sm font-extrabold text-[#087a5a]">
                      ₱ {totalFee.toFixed(2)}
                    </span>
                  </div>
                  {distanceKm !== null && (
                    <p className="mt-0.5 text-[9px] text-slate-400 text-right">
                      ₱30 base + ₱{(Math.ceil(Math.max(distanceKm, 0.1)) * 10).toFixed(0)} ({distanceKm.toFixed(1)} km)
                      {additionalFeeNum > 0 ? ` + ₱${additionalFeeNum.toFixed(0)}` : ""}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
