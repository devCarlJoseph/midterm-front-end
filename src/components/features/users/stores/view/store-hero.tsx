import { storesHeroContent } from "../contents/stores-content";

export function ShopsHero() {
  return (
    <section className="w-full overflow-hidden rounded-xl bg-[#f7fcf9]">
      <div className="mx-auto flex min-h-5 max-w-7xl flex-col justify-center gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7 lg:min-h-65 lg:px-10">
        {/* LEFT CONTENT */}
        <div className="max-w-xl space-y-2">
          {/* Title */}
          <h1 className="text-4xl font-bold leading-none tracking-tight text-[#064e3b] sm:text-5xl">
            {storesHeroContent.title}
          </h1>

          <h2 className="mt-1 text-lg font-bold text-gray-800 sm:text-[23px]">
            {storesHeroContent.subtitle}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-[15px]">
            {storesHeroContent.description}
          </p>
        </div>

        {/* RIGHT BANNER */}
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-[#dff5e9] sm:h-45 sm:w-[42%] lg:h-50 lg:w-100">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80"
            alt="Fresh groceries"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Green Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#dff5e9]/95 via-[#dff5e9]/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
