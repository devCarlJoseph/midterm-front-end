export function ShopsHero() {
    return (
        <section className="w-full overflow-hidden rounded-xl bg-[#f7fcf9]">
            <div className="mx-auto flex min-h-[220px] max-w-7xl flex-col justify-center gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7 lg:min-h-[260px] lg:px-10">
                {/* LEFT CONTENT */}
                <div className="max-w-xl space-y-2">

                    {/* Title */}
                    <h1 className="text-4xl font-bold leading-none tracking-tight text-[#064e3b] sm:text-5xl">
                        Shops
                    </h1>

                    <h2 className="mt-1 text-lg font-bold text-gray-800 sm:text-[23px]">
                        Your favorite stores, all in one place.
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-[15px]">
                        Explore trusted local stores and supermarkets near you.
                        <br className="hidden sm:block" />
                        Fresh products, great deals, and convenient delivery.
                    </p>
                </div>

                {/* RIGHT BANNER */}
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-[#dff5e9] sm:h-[180px] sm:w-[42%] lg:h-[200px] lg:w-[400px]">
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80"
                        alt="Fresh groceries"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Green Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#dff5e9]/95 via-[#dff5e9]/30 to-transparent" />

                </div>
            </div>
        </section>
    );
}
