import { useState } from "react";

export function DeliveryOptions() {
  const [selected, setSelected] =
    useState("standard");

  return (
    <section className="mt-5">
      <div>
        <h2 className="text-sm font-bold text-[#164f45]">
          Delivery Option
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Choose how you want your order delivered.
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">

        {/* Standard */}
        <button
          type="button"
          onClick={() => setSelected("standard")}
          className={`rounded-xl border p-4 text-left transition ${
            selected === "standard"
              ? "border-[#08a66d] bg-[#f3fbf7]"
              : "border-slate-200 bg-white hover:border-[#b7ddcc]"
          }`}
        >
          <div className="flex items-start justify-between">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4f6ed] text-[#087a5a]">
              🚚
            </div>

            <div
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                selected === "standard"
                  ? "border-[#08a66d] bg-[#08a66d] text-white"
                  : "border-slate-300"
              }`}
            >
              {selected === "standard" && (
                <span className="text-[9px]">
                  ✓
                </span>
              )}
            </div>

          </div>

          <h3 className="mt-3 text-xs font-semibold text-[#164f45]">
            Standard Delivery
          </h3>

          <p className="mt-1 text-[11px] text-slate-400">
            Within 2–4 hours
          </p>

          <p className="mt-2 text-xs font-bold text-[#087a5a]">
            ₱ 50.00
          </p>
        </button>

        {/* Express */}
        <button
          type="button"
          onClick={() => setSelected("express")}
          className={`rounded-xl border p-4 text-left transition ${
            selected === "express"
              ? "border-[#08a66d] bg-[#f3fbf7]"
              : "border-slate-200 bg-white hover:border-[#b7ddcc]"
          }`}
        >
          <div className="flex items-start justify-between">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f3] text-[#164f45]">
              ◷
            </div>

            <div
              className={`h-4 w-4 rounded-full border ${
                selected === "express"
                  ? "border-[#08a66d] bg-[#08a66d]"
                  : "border-slate-300"
              }`}
            />

          </div>

          <h3 className="mt-3 text-xs font-semibold text-[#164f45]">
            Express Delivery
          </h3>

          <p className="mt-1 text-[11px] text-slate-400">
            Within 1 hour
          </p>

          <p className="mt-2 text-xs font-bold text-[#087a5a]">
            ₱ 100.00
          </p>
        </button>

      </div>
    </section>
  );
}