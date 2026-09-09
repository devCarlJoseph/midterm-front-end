import { useState } from "react";

export function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState("cod");

  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when your order arrives.",
      icon: "💵",
      available: true,
    },
    {
      id: "gcash",
      name: "GCash",
      description: "Pay securely using GCash.",
      icon: "📱",
      available: false,
    },
    {
      id: "card",
      name: "Credit / Debit Card",
      description: "Pay using your bank card.",
      icon: "💳",
      available: false,
    },
  ];

  return (
    <section>
      <div>
        <h2 className="text-lg font-bold text-[#164f45]">
          Payment Method
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Choose how you would like to pay for your order.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              disabled={!method.available}
              onClick={() => {
                if (method.available) {
                  setSelectedMethod(method.id);
                }
              }}
              className={`relative rounded-xl border p-4 text-left transition ${
                method.available
                  ? isSelected
                    ? "border-[#08a66d] bg-[#f3fbf7]"
                    : "border-slate-200 bg-white hover:border-[#b7ddcc]"
                  : "cursor-not-allowed border-slate-200 bg-slate-50 opacity-70"
              }`}
            >
              {/* Icon + Status */}
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                    method.available
                      ? "bg-[#e4f6ed]"
                      : "bg-slate-200"
                  }`}
                >
                  {method.icon}
                </div>

                {!method.available ? (
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-[9px] font-semibold text-slate-500">
                    Unavailable
                  </span>
                ) : (
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      isSelected
                        ? "border-[#08a66d] bg-[#08a66d] text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {isSelected && (
                      <span className="text-[9px]">
                        ✓
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Information */}
              <h3
                className={`mt-4 text-sm font-semibold ${
                  method.available
                    ? "text-[#164f45]"
                    : "text-slate-500"
                }`}
              >
                {method.name}
              </h3>

              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                {method.description}
              </p>

              {method.available && (
                <p className="mt-3 text-[10px] font-medium text-[#087a5a]">
                  Available
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Payment Information */}
      {selectedMethod === "cod" && (
        <div className="mt-5 rounded-xl bg-[#eef9f3] p-4">
          <p className="text-xs font-semibold text-[#164f45]">
            Cash on Delivery selected
          </p>

          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            Please prepare the exact amount when your order arrives.
          </p>
        </div>
      )}
    </section>
  );
}