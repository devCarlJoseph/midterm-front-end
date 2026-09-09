import { NavLink } from "react-router";

export function CategoryBanner() {
  return (
    <section className="px-4 pt-6 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#f5faf7]">
        <div className="grid lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="flex flex-col px-7 py-6 sm:px-10 sm:py-8 lg:px-10">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <NavLink to="/" className="hover:text-[#087a5a]">
                Home
              </NavLink>

              <span className="text-slate-300">
                ›
              </span>

              <span className="font-medium text-slate-600">
                Categories
              </span>
            </nav>

            {/* Heading */}
            <div className="mt-5">
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-[#063f35] sm:text-5xl">
                Shop by
                <span className="block text-[#08a66d]">
                  Category
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-[#607b73]">
                Find everything you need, from fresh produce to daily essentials.
                Browse our categories and discover great deals near you.
              </p>
            </div>

          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="p-0 lg:p-2">
            <div className="relative h-full min-h-[240px] overflow-hidden rounded-none lg:rounded-2xl">

              <img
                src="./src/assets/category-banner-img.jpeg"
                alt="Fresh groceries"
                className="h-full w-full object-cover"
              />


              

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}