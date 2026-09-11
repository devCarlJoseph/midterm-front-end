import { Banknote, CreditCard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type PaymentMethodValue = "cash_on_delivery" | "online";

interface PaymentMethodProps {
  selectedMethod: PaymentMethodValue;
  onSelectMethod: (method: PaymentMethodValue) => void;
}

const paymentMethods: Array<{
  id: PaymentMethodValue;
  name: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    id: "cash_on_delivery",
    name: "Cash on Delivery",
    description: "Pay when your order arrives.",
    icon: Banknote,
  },
  {
    id: "online",
    name: "Online Payment",
    description: "Pay securely online.",
    icon: CreditCard,
  },
];

export function PaymentMethod({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodProps) {
  return (
    <section>
      <div>
        <h2 className="text-lg font-bold text-[#164f45]">Payment Method</h2>
        <p className="mt-1 text-xs text-slate-400">
          Choose how you would like to pay for your order.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;
          const Icon = method.icon;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelectMethod(method.id)}
              className={`rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-[#08a66d] bg-[#f3fbf7]"
                  : "border-slate-200 bg-white hover:border-[#b7ddcc]"
              }`}
            >
              <div className="flex items-start">
                <span className={`text-lg ${isSelected ? "text-[#08a66d]" : "text-slate-400"}`}>
                  <Icon size={22} />
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-[#164f45]">
                {method.name}
              </h3>
              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                {method.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
