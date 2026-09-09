import type { Product } from "@/context/shop-context";

import { BookingSteps } from "./booking-steps";
import { DeliveryDetails } from "./delivery-details";
import { DeliveryOptions } from "./delivery-options";
import { DeliveryTime } from "./delivery-time";
import { OrderItems } from "./order-items";
import { OrderSummary } from "./order-summary";
import { BookingSafetyCard } from "./booking-safety-card";
import { BookingFreshnessCard } from "./booking-freshness-card";

interface BookingLayoutProps {
  products: Product[];
}

export function BookingLayout({
  products,
}: BookingLayoutProps) {
  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[220px_minmax(0,1fr)_260px]">

        {/* LEFT */}
        <BookingSteps />

        {/* CENTER */}
        <main className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">

          <DeliveryDetails />

          <DeliveryOptions />

          <DeliveryTime />

          <OrderItems products={products} />

        </main>

        {/* RIGHT */}
        <aside>
          <OrderSummary />

          <BookingSafetyCard />

          <BookingFreshnessCard />
        </aside>

      </div>
    </section>
  );
}