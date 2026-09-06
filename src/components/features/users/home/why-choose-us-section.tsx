import { Leaf, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    title: "Fresh Products",
    description:
      "We carefully select quality fruits, vegetables, and everyday groceries.",
    icon: Leaf,
  },
  {
    title: "Fast Delivery",
    description:
      "Get your groceries delivered quickly and safely to your doorstep.",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    description:
      "Your payments and personal details are protected at every checkout.",
    icon: ShieldCheck,
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="border-y border-slate-100 bg-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold text-emerald-500">WHY CHOOSE US</p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
            Grocery shopping made simple
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Everything you need, from fresh products to reliable delivery, in
            one convenient place.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-800">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
