export function DeliveryDetails() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div>
        <h2 className="text-lg font-bold text-[#164f45]">
          Delivery Details
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Where should we deliver your order?
        </p>
      </div>

      {/* Address */}
      <div className="mt-5 rounded-xl bg-[#eef9f3] p-4">
        <div className="flex items-start gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d9f2e6] text-[#087a5a]">
            📍
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-[#164f45]">
              Delivery Address
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              123 Kalachuchi St., Poblacion
              <br />
              Makati City, Metro Manila 1200
            </p>
          </div>

          <button
            type="button"
            className="text-xs font-semibold text-[#087a5a] hover:underline"
          >
            ✎ Edit
          </button>

        </div>
      </div>
    </section>
  );
}