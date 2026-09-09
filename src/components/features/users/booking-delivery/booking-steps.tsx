interface BookingStepsProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function BookingSteps({
  currentStep,
  onStepClick,
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
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex min-w-[700px] items-center">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isLocked = step.number > currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.number}
              className="flex flex-1 items-center"
            >
              {/* Step */}
              <button
                type="button"
                disabled={isLocked}
                onClick={() => {
                  if (!isLocked) {
                    onStepClick(step.number);
                  }
                }}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                  isActive
                    ? "bg-[#eef9f3]"
                    : isCompleted
                      ? "cursor-pointer hover:bg-slate-50"
                      : "cursor-not-allowed opacity-60"
                }`}
              >
                {/* Number */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    isActive
                      ? "bg-[#08a66d] text-white"
                      : isCompleted
                        ? "bg-[#dff4e9] text-[#087a5a]"
                        : "bg-[#f1f5f3] text-slate-500"
                  }`}
                >
                  {isCompleted ? "✓" : step.number}
                </div>

                {/* Text */}
                <div className="whitespace-nowrap">
                  <p
                    className={`text-xs font-semibold ${
                      isActive
                        ? "text-[#164f45]"
                        : "text-slate-700"
                    }`}
                  >
                    {step.title}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {step.description}
                  </p>
                </div>
              </button>

              {/* Connector */}
              {!isLast && (
                <div
                  className={`mx-3 h-px flex-1 ${
                    step.number < currentStep
                      ? "bg-[#08a66d]"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}