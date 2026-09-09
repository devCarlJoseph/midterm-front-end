import { NavLink } from "react-router";

export function BookingBanner() {
  return (
    <section className="px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#eef9f3]">
        <div className="grid min-h-[210px] lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="flex flex-col px-7 py-6 sm:px-10 lg:px-10">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <NavLink to="/" className="transition-colors hover:text-[#087a5a]">
                Home
              </NavLink>

              <span className="text-slate-300">
                ›
              </span>

              <span className="font-medium text-[#087a5a]">
                Booking
              </span>
            </nav>

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

            {/* Soft gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#eef9f3]/95 via-[#eef9f3]/30 to-transparent" />

            
          </div>

        </div>
      </div>
    </section>
  );
}