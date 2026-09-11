import { useNavigate } from "react-router";
import { homeHeroContent } from "../contents/home-content";

export function HomeHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="my-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-emerald-800 leading-tight">
              {homeHeroContent.title}
              <span className="text-gray-900"> {homeHeroContent.highlightedTitle}</span>
            </h1>
          </div>
          <div className="pt-4">
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {homeHeroContent.description}
            </p>
          </div>
          <div className="pt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/stores")}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-sm text-white rounded-2xl cursor-pointer font-semibold shadow-sm transition"
            >
              {homeHeroContent.primaryAction}
            </button>
            <button
              type="button"
              onClick={() => navigate("/categories")}
              className="px-6 py-2.5 border border-emerald-300 text-emerald-800 hover:bg-emerald-50 text-sm rounded-2xl cursor-pointer font-semibold transition"
            >
              {homeHeroContent.secondaryAction}
            </button>
          </div>
        </div>

        {/* Right - 50% */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <div className="relative w-full max-w-md h-72 rounded-2xl overflow-hidden shadow-lg border border-emerald-100">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Fresh local grocery inventory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent flex items-end p-5">
              <div className="text-white">
                <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Fresh Delivery
                </span>
                <p className="text-sm font-semibold mt-1">
                  Local Supermarkets &amp; Farm Partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
