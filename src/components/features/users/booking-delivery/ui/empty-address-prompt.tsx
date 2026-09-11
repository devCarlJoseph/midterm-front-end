import { MapPin, Plus } from "lucide-react";

interface EmptyAddressPromptProps {
  onAddAddress: () => void;
}

export function EmptyAddressPrompt({ onAddAddress }: EmptyAddressPromptProps) {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
      <MapPin size={24} className="mx-auto text-slate-400" />
      <p className="mt-2 text-xs font-medium text-slate-600">
        No delivery address saved yet.
      </p>
      <p className="mt-1 text-[11px] text-slate-400">
        Please set your delivery address to proceed with the Grab booking.
      </p>
      <button
        type="button"
        onClick={onAddAddress}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#08a66d] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#078f5e]"
      >
        <Plus size={14} />
        Add Address Now
      </button>
    </div>
  );
}
