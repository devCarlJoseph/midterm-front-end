import { useState } from "react";

export function DeliveryTime() {
  const [selectedDate, setSelectedDate] =
    useState("Today");

  const [selectedTime, setSelectedTime] =
    useState("9:00 AM – 12:00 PM");

  const dates = [
    "Today",
    "Tomorrow",
    "Sun",
    "Mon",
    "Tue",
  ];

  const times = [
    "9:00 AM – 12:00 PM",
    "12:00 PM – 3:00 PM",
    "3:00 PM – 6:00 PM",
    "6:00 PM – 9:00 PM",
    "9:00 PM – 10:00 PM",
  ];

  return (
    <section className="mt-5">

      <h2 className="text-sm font-bold text-[#164f45]">
        Preferred Delivery Time
      </h2>

      <p className="mt-1 text-xs text-slate-400">
        Select a time slot that works for you.
      </p>

      {/* Dates */}
      <div className="mt-3 grid grid-cols-5 gap-2">
        {dates.map((date, index) => (
          <button
            key={date}
            type="button"
            onClick={() => setSelectedDate(date)}
            className={`rounded-lg border px-2 py-2 text-center text-[10px] transition ${
              selectedDate === date
                ? "border-[#08a66d] bg-[#08a66d] text-white"
                : "border-slate-200 text-slate-500 hover:border-[#9dd6bc]"
            }`}
          >
            <span className="block font-medium">
              {date}
            </span>

            <span
              className={`mt-1 block ${
                selectedDate === date
                  ? "text-white/80"
                  : "text-slate-400"
              }`}
            >
              Apr {26 + index}
            </span>
          </button>
        ))}
      </div>

      {/* Time slots */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {times.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => setSelectedTime(time)}
            className={`rounded-lg border px-3 py-2.5 text-[10px] font-medium transition ${
              selectedTime === time
                ? "border-[#08a66d] bg-[#08a66d] text-white"
                : "border-slate-200 text-slate-500 hover:border-[#9dd6bc]"
            }`}
          >
            {time}
          </button>
        ))}
      </div>

    </section>
  );
}