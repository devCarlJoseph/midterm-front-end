import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

const promotions = [
  {
    id: 1,
    label: "First Order Offer",
    title: "Get 20% off your first grocery order",
    description: "Use code WELCOME20 at checkout.",
    buttonText: "Shop Now",
    to: "/stores",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    label: "Free Delivery",
    title: "Free delivery on orders over ₱500",
    description: "Fresh groceries delivered straight to your door.",
    buttonText: "Book Delivery",
    to: "/booking",
    image:
      "https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1000&q=80",
  },
];

export function PromoBannerSection() {
  const navigate = useNavigate();

  return (
    <section className="mt-15">
      <div className="grid gap-5 md:grid-cols-2">
        {promotions.map((promotion) => (
          <article
            key={promotion.id}
            className="relative min-h-64 overflow-hidden rounded-2xl shadow-sm"
          >
            <img
              src={promotion.image}
              alt={promotion.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/75 to-emerald-900/20" />

            <div className="relative z-10 flex min-h-64 max-w-sm flex-col justify-center p-7 text-white">
              <p className="text-xs font-bold tracking-wider text-emerald-300 uppercase">
                {promotion.label}
              </p>

              <h3 className="mt-2 text-2xl font-bold leading-tight">
                {promotion.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-emerald-50">
                {promotion.description}
              </p>

              <button
                type="button"
                onClick={() => navigate(promotion.to)}
                className="mt-5 flex w-fit items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 cursor-pointer shadow-xs"
              >
                {promotion.buttonText}
                <ArrowRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
