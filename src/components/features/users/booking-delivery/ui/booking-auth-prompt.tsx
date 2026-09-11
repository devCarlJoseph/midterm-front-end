import { LogIn, ShoppingBag } from "lucide-react";

interface BookingAuthPromptProps {
  onSignIn: () => void;
}

export function BookingAuthPrompt({ onSignIn }: BookingAuthPromptProps) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
        <ShoppingBag size={28} />
      </div>
      <h2 className="mt-4 text-lg font-bold text-slate-800">
        Sign in to Book Delivery
      </h2>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
        Please sign in with your customer account to connect your live cart items,
        calculate delivery fees, and choose your delivery address just like Grab.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={onSignIn}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 cursor-pointer"
        >
          <LogIn size={15} />
          Sign In to Proceed
        </button>
      </div>
    </div>
  );
}
