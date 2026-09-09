export function CategoryBanner() {
  return (
    <section className="px-0 pt-5 pb-8">
      <div className="mx-auto w-full overflow-hidden rounded-2xl bg-[#eef9f3]">

        <div className="grid min-h-[210px] lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="flex flex-col px-7 py-6 sm:px-10 lg:px-10">

            {/* Heading */}
            <div className="mt-5">
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-[#064b3e] sm:text-5xl">
                Complete Your
                <span className="block text-[#08a66d]">
                  Booking
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-[#607b73]">
                Choose your delivery details, review your items,
                and get your groceries at your doorstep.
              </p>
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative min-h-[210px] overflow-hidden">
            <img
              src="/src/assets/delivery-banner-img.jpeg"
              alt="Fresh groceries"
              className="h-full w-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}