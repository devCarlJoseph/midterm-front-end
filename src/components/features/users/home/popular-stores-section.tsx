const popularStoreData = {
  popularStore: [
    {
      id: 1,
      storeDiscount: "35% Discount",
      discountDescription: "Order any food from the app and get the discount.",
    },
    {
      id: 2,
      storeDiscount: "20% Discount",
      discountDescription: "Order any food from the app and get the discount.",
    },
    {
      id: 3,
      storeDiscount: "15% Discount",
      discountDescription: "Order any food from the app and get the discount.",
    },
    {
      id: 4,
      storeDiscount: "10% Discount",
      discountDescription: "Order any food from the app and get the discount.",
    },
  ],
};

export function PopularStoreSection() {
  return (
    <section className="my-15">
      <div className="text-lg font-semibold">Popular Stores Near you</div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-5">
        {popularStoreData.popularStore.map((store) => (
          <div className="flex h-75 w-70 flex-col rounded-2xl bg-emerald-500 p-6">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {store.storeDiscount}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/90">
                {store.discountDescription}
              </p>
            </div>

            <button className="mt-auto self-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50 cursor-pointer">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
