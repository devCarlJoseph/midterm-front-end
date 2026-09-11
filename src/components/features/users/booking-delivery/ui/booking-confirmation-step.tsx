import type { Address, Cart, DeliveryOption } from "@/lib/api-types";

interface BookingConfirmationStepProps {
  cart: Cart | null;
  activeAddress: Address | null;
  selectedDeliveryOption: DeliveryOption | null;
  distanceKm: number | null;
  paymentMethod: "cash_on_delivery" | "online";
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  error: string | null;
  orderNumber: string | null;
  isSubmitting: boolean;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export function BookingConfirmationStep({
  cart,
  activeAddress,
  selectedDeliveryOption,
  distanceKm,
  paymentMethod,
  itemCount,
  subtotal,
  deliveryFee,
  error,
  orderNumber,
  isSubmitting,
  onBack,
  onPlaceOrder,
}: BookingConfirmationStepProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="text-center">
        <h2 className="mt-4 text-xl font-bold text-[#164f45]">Confirm Your Order</h2>
        <p className="mx-auto mt-1 max-w-md text-xs text-slate-500">
          Please review your delivery and payment details before placing your order.
        </p>
      </div>

      {/* Order breakdown card */}
      <div className="mx-auto mt-6 max-w-lg divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-left text-xs">
        {cart?.store?.name && (
          <div className="flex items-center justify-between pb-2.5">
            <span className="text-slate-500">Store</span>
            <span className="font-semibold text-slate-800">{cart.store.name}</span>
          </div>
        )}
        {activeAddress && (
          <div className="flex items-start justify-between py-2.5">
            <span className="text-slate-500">Deliver To</span>
            <div className="text-right font-medium text-slate-800">
              <p className="font-semibold">
                {activeAddress.recipient_name} ({activeAddress.phone})
              </p>
              <p className="text-[11px] text-slate-600">
                {activeAddress.line_one}
                {activeAddress.barangay ? `, Brgy. ${activeAddress.barangay}` : ""},{" "}
                {activeAddress.city}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-slate-500">Delivery Tier</span>
          <span className="font-semibold text-emerald-800">
            {selectedDeliveryOption?.name ?? "Standard"}
            {distanceKm ? ` (${distanceKm.toFixed(1)} km)` : ""}
          </span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-slate-500">Payment</span>
          <span className="font-semibold text-slate-800">
            {paymentMethod === "cash_on_delivery"
              ? "Cash on Delivery (COD)"
              : "Online Payment"}
          </span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-slate-500">Subtotal ({itemCount} items)</span>
          <span className="font-semibold text-slate-700">
            ₱ {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-slate-500">Delivery Fee</span>
          <span className="font-semibold text-slate-700">
            ₱ {deliveryFee.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3 font-bold text-sm text-[#164f45]">
          <span>Total Amount</span>
          <span className="text-base text-[#087a5a]">
            ₱ {(subtotal + deliveryFee).toFixed(2)}
          </span>
        </div>
      </div>

      {error ? (
        <p className="mt-4 text-center text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 max-w-lg mx-auto">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => void onPlaceOrder()}
          disabled={isSubmitting || orderNumber !== null}
          className="rounded-lg bg-[#08a66d] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#078f5e] disabled:cursor-not-allowed disabled:opacity-60 shadow-xs cursor-pointer"
        >
          {isSubmitting
            ? "Placing Order..."
            : "Place Order"}
        </button>
      </div>
    </div>
  );
}
