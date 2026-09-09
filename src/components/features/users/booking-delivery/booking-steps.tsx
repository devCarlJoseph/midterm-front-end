interface BookingStepsProps {
  currentStep?: number;
}

export function BookingSteps({
  currentStep = 1,
}: BookingStepsProps) {
  const steps = [
    {
      number: 1,
      title: "Delivery Details",
      description: "Address & time",
    },
    {
      number: 2,
      title: "Order Summary",
      description: "Review your items",
    },
    {
      number: 3,
      title: "Payment Method",
      description: "Choose how to pay",
    },
    {
      number: 4,
      title: "Confirm Order",
      description: "You're all set!",
    },
  ];

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="relative">

        {/* Connecting line */}
        <div className="absolute left-4 top-8 bottom-8 w-px bg-slate-200" />

        <div className="space-y-6">
          {steps.map((step) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep;

            return (
              <div
                key={step.number}
                className={`relative flex gap-3 rounded-xl p-3 transition ${
                  isActive
                    ? "bg-[#eef9f3]"
                    : ""
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    isActive
                      ? "bg-[#08a66d] text-white"
                      : isCompleted
                        ? "bg-[#dff4e9] text-[#087a5a]"
                        : "bg-[#f1f5f3] text-slate-500"
                  }`}
                >
                  {step.number}
                </div>

                {/* Text */}
                <div className="pt-0.5">
                  <p
                    className={`text-xs font-semibold ${
                      isActive
                        ? "text-[#164f45]"
                        : "text-slate-700"
                    }`}
                  >
                    {step.title}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </aside>
  );
}