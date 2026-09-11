import { BookingFreshnessCard } from "./booking-freshness-card";
import { BookingSafetyCard } from "./booking-safety-card";

export function BookingCheckoutAside() {
  return (
    <aside>
      <BookingSafetyCard />
      <BookingFreshnessCard />
    </aside>
  );
}
