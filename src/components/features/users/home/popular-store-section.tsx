import { MoveRight, Star, ArrowRight, Bike } from "lucide-react";

export function PopularStoreSection() {
  return (
    <section className="mt-15">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-emerald-950">Popular Stores</h1>
          <p className="text-sm text-gray-500 pt-1">
            Our customers' favories, delivered fresh.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-emerald-700 text-sm font-medium">View all</h1>
          <MoveRight size={14} />
        </div>
      </div>
      <div className="mt-6">
        <div className="w-60 border border-gray-200 rounded-xl overflow-hidden bg-white">
          <div className="w-full h-35">
            <img
              className="w-full h-full object-cover"
              src="/images/puregold.jpg"
              alt="Puregold"
            />
          </div>

          <div className="px-3 pt-3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-md font-semibold text-emerald-900">
                  Puregold
                </h1>

                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={13} className="text-yellow-500 fill-current" />

                  <p className="text-xs font-medium text-gray-700">
                    4.8{" "}
                    <span className="font-normal text-gray-500">(2.4k)</span>
                  </p>
                </div>
              </div>
              <ArrowRight className="text-emerald-900 mt-1" size={15} />
            </div>

            <div className="mt-3 inline-block bg-emerald-50 px-2 py-1 rounded-md">
              <p className="text-[11px] text-emerald-700">Supermarket</p>
            </div>

            <div className="flex items-center gap-1.5 mt-3 pb-3">
              <Bike size={13} className="text-gray-500" />

              <p className="text-[11px] text-gray-500">
                Delivery <span className="mx-1">•</span> Pickup
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
