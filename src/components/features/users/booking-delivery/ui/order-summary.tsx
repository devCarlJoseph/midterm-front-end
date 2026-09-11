interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  distanceKm?: number | null;
  optionName?: string;
}

export function OrderSummary({
  itemCount,
  subtotal,
  deliveryFee,
  distanceKm,
  optionName,
}: OrderSummaryProps) {
  const total = subtotal + deliveryFee;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#164f45]">Order Summary</h2>
        <span className="rounded-full bg-[#eef9f3] px-3 py-1 text-[10px] font-medium text-[#087a5a]">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-medium text-slate-600">₱ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">
            Delivery Fee
            {optionName ? ` · ${optionName}` : ""}
            {distanceKm ? ` (${distanceKm.toFixed(1)} km)` : ""}
          </span>
          <span className="font-medium text-slate-600">
            ₱ {deliveryFee.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="my-4 border-t border-slate-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#164f45]">Total</span>
        <span className="text-base font-bold text-[#164f45]">₱ {total.toFixed(2)}</span>
      </div>
    </section>
  );
}
