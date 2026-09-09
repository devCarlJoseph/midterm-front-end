export function BookingSafetyCard() {
  return (
    <div className="mt-4 rounded-xl bg-[#eef9f3] p-4">
      <div className="flex gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d9f2e6] text-[#087a5a]">
          ✓
        </div>

        <div>
          <h3 className="text-xs font-semibold text-[#164f45]">
            Secure & Safe
          </h3>

          <p className="mt-1 text-[10px] leading-4 text-slate-400">
            Your payment information
            <br />
            is always protected.
          </p>
        </div>

      </div>
    </div>
  );
}