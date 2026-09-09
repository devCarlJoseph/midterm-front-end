import { useState } from "react";
import type { Product } from "@/context/shop-context";

import { BookingSteps } from "./booking-steps";
import { DeliveryDetails } from "./delivery-details";
import { DeliveryOptions } from "./delivery-options";
import { DeliveryTime } from "./delivery-time";
import { OrderItems } from "./order-items";
import { OrderSummary } from "./order-summary";
import { PaymentMethod } from "./payment-method";
import { BookingSafetyCard } from "./booking-safety-card";
import { BookingFreshnessCard } from "./booking-freshness-card";

interface BookingLayoutProps {
  products: Product[];
}

export function BookingLayout({
  products,
}: BookingLayoutProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((current) => Math.min(current + 1, 4));
  };

  const goToPreviousStep = () => {
    setCurrentStep((current) => Math.max(current - 1, 1));
  };

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* STEPS */}
        <BookingSteps
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        {/* CONTENT */}
        <div className="mt-4">
          {currentStep === 1 && (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              {/* STEP 1 */}
              <main className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
                <DeliveryDetails />

                <DeliveryOptions />

                <DeliveryTime />

                <OrderItems products={products} />

                {/* Continue */}
                <div className="mt-5 flex justify-end border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="rounded-lg bg-[#08a66d] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#078f5e]"
                  >
                    Continue to Order Summary →
                  </button>
                </div>
              </main>

              {/* SIDE INFORMATION */}
              <aside>
                <BookingSafetyCard />
                <BookingFreshnessCard />
              </aside>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              {/* STEP 2 */}
              <main className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-[#164f45]">
                    Review Your Order
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Check your order details before proceeding to payment.
                  </p>
                </div>

                <OrderSummary />

                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="rounded-lg border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="rounded-lg bg-[#08a66d] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#078f5e]"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </main>

              {/* SIDE INFORMATION */}
              <aside>
                <BookingSafetyCard />
                <BookingFreshnessCard />
              </aside>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              {/* STEP 3 */}
              <main className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
                <PaymentMethod />

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="rounded-lg border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="rounded-lg bg-[#08a66d] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#078f5e]"
                  >
                    Continue to Confirmation →
                  </button>
                </div>
              </main>

              {/* SIDE INFORMATION */}
              <aside>
                <BookingSafetyCard />
                <BookingFreshnessCard />
              </aside>
            </div>
          )}

          {currentStep === 4 && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dff4e9] text-2xl text-[#08a66d]">
                ✓
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#164f45]">
                Confirm Your Order
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Review everything one last time before placing your order.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="rounded-lg border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  className="rounded-lg bg-[#08a66d] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#078f5e]"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}