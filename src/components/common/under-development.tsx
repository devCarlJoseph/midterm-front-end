import {
  Clock3,
  Leaf,
  PackageCheck,
  Wrench,
} from "lucide-react";

type UnderDevelopmentProps = {
  title?: string;
  description?: string;
  expectedBack?: string;
};

export function UnderDevelopment({
  title = "We're making this even better.",
  description = "This DALI experience is being prepared with the same care we put into every delivery.",
  expectedBack = "Please check back shortly.",
}: UnderDevelopmentProps) {
  return (
    <section
      aria-labelledby="under-development-title"
      className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
    >
      <div className="grid min-h-107.5 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
          <img
            src="/dali-transparent.png"
            alt="DALI"
            className="h-9 w-fit object-contain"
          />

          <p className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
            <Wrench aria-hidden="true" className="size-3.5" />
            Under development
          </p>

          <h1
            id="under-development-title"
            className="mt-5 max-w-lg text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl"
          >
            {title}
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
            {description}
          </p>

          <div className="mt-7 flex w-fit items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm text-emerald-900">
            <Clock3 aria-hidden="true" className="size-5 text-emerald-600" />
            <span>{expectedBack}</span>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500">
              Follow DALI
            </span>
          </div>
        </div>

        <div className="relative flex min-h-77.5 items-end justify-center overflow-hidden bg-emerald-50 px-8 pt-10">
          <Leaf
            aria-hidden="true"
            className="absolute left-4 top-7 size-24 -rotate-45 text-emerald-100 sm:left-10"
          />
          <Leaf
            aria-hidden="true"
            className="absolute bottom-8 right-2 size-32 rotate-135d text-emerald-100 sm:right-10"
          />

          <div className="relative mb-12 h-48 w-64 sm:h-56 sm:w-72">
            <div className="absolute bottom-0 left-4 right-4 h-3 rounded-full bg-emerald-900/10 blur-sm" />

            <div className="absolute bottom-3 left-1/2 h-40 w-36 -translate-x-1/2 rounded-t-xl border-[7px] border-emerald-900 bg-emerald-800 p-3 shadow-xl shadow-emerald-950/15 sm:h-48 sm:w-40">
              <div className="grid h-full grid-cols-2 gap-2">
                {["Fresh", "Local", "Fast", "Ready", "Care", "DALI"].map(
                  (label) => (
                    <div
                      key={label}
                      className="flex items-center justify-center rounded border border-emerald-700 bg-emerald-950/40 px-1 text-center text-[9px] font-bold uppercase tracking-wide text-emerald-100"
                    >
                      {label}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="absolute bottom-3 right-2 flex size-16 rotate-6 items-center justify-center rounded-2xl bg-amber-300 text-emerald-950 shadow-lg sm:size-20">
              <PackageCheck aria-hidden="true" className="size-8 sm:size-10" />
            </div>

            <div className="absolute bottom-2 left-5 size-10 rounded-full border-4 border-emerald-950 bg-slate-800" />
            <div className="absolute bottom-2 right-5 size-10 rounded-full border-4 border-emerald-950 bg-slate-800" />
          </div>
        </div>
      </div>
    </section>
  );
}
