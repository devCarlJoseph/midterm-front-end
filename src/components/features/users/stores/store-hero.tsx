export function ShopsHero() {
    return (
        <section className="w-6xl rounded-lg h-65 ml-7 bg-[#f7fcf9]">
            <div className="mx-auto flex max-w-7xl items-center justify-evenly p-5">
                {/* LEFT CONTENT */}
                <div className="flex-1 space-y-2 ml-4">

                    {/* Title */}
                    <h1 className="text-[50px] font-bold leading-none tracking-tight text-[#064e3b]">
                        Shops
                    </h1>

                    <h2 className="mt-1 text-[23px] font-bold text-gray-800">
                        Your favorite stores, all in one place.
                    </h2>

                    <p className="mt-2 text-[15px] text-gray-500">
                        Explore trusted local stores and supermarkets near you.
                        <br />
                        Fresh products, great deals, and convenient delivery.
                    </p>
                </div>

                {/* RIGHT BANNER */}
                <div className="relative h-[200px] w-[400px] shrink-0 overflow-hidden rounded-lg bg-[#dff5e9]">
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80"
                        alt="Fresh groceries"
                        className="absolute top-0 h-full w-[400px] object-cover"
                    />

                    {/* Green Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#dff5e9]/95 via-[#dff5e9]/30 to-transparent" />

                </div>
            </div>
        </section>
    );
}
