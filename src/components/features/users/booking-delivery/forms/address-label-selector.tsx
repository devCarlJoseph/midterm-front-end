interface AddressLabelSelectorProps {
  label: string;
  setLabel: (val: string) => void;
}

export function AddressLabelSelector({ label, setLabel }: AddressLabelSelectorProps) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-slate-600">
        Address Label
      </label>
      <div className="mt-1 flex items-center gap-2">
        {["Home", "Work", "Other"].map((lbl) => (
          <button
            key={lbl}
            type="button"
            onClick={() => setLabel(lbl)}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
              label === lbl
                ? "bg-emerald-700 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {lbl}
          </button>
        ))}
        {!["Home", "Work"].includes(label) && (
          <input
            type="text"
            placeholder="Custom label"
            value={label === "Other" ? "" : label}
            onChange={(e) => setLabel(e.target.value || "Other")}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs outline-none focus:border-emerald-600"
          />
        )}
      </div>
    </div>
  );
}
