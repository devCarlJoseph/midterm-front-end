import { CheckCircle2 } from "lucide-react";

type OrderSuccessModalProps = {
  isOpen: boolean;
  orderNumber: string | null;
  onContinue: () => void;
};

export function OrderSuccessModal({
  isOpen,
  orderNumber,
  onContinue,
}: OrderSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-success-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 aria-hidden="true" className="size-9" />
        </div>
        <h2 id="order-success-title" className="mt-5 text-xl font-bold text-emerald-950">
          Order placed successfully!
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Your order is confirmed{orderNumber ? ` — tracking number ${orderNumber}.` : "."}
        </p>
        <p className="mt-3 text-xs text-slate-400">Taking you back home shortly…</p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
