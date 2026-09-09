import { BookingBanner } from "@/components/features/users/booking-delivery/booking-banner";
import { BookingLayout } from "@/components/features/users/booking-delivery/booking-layout";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-white">
      <BookingBanner />
      <BookingLayout products={[]} />
    </div>
  );
}