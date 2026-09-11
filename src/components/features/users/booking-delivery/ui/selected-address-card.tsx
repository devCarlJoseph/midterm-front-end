import { MapPin, Navigation } from "lucide-react";
import type { Address } from "@/lib/api-types";

interface SelectedAddressCardProps {
  address: Address;
  onEdit: (e: React.MouseEvent) => void;
}

export function SelectedAddressCard({ address, onEdit }: SelectedAddressCardProps) {
  return (
    <div className="mt-5 space-y-3">
      <div className="rounded-xl border border-[#08a66d] bg-[#eef9f3] p-4 transition shadow-xs">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-md bg-emerald-700 px-2 py-0.5 text-[10px] font-bold text-white">
                <MapPin size={10} />
                {address.label || "Delivery Address"}
              </span>
              {address.latitude && address.longitude && (
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                  GPS: {Number(address.latitude).toFixed(4)}, {Number(address.longitude).toFixed(4)}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-700">
              <span className="font-semibold text-slate-900">
                {address.recipient_name}
              </span>{" "}
              · <span className="font-medium text-slate-600">{address.phone}</span>
              <br />
              <span className="font-medium text-slate-800">{address.line_one}</span>
              {address.barangay ? `, Brgy. ${address.barangay}` : ""}
              {address.line_two ? `, ${address.line_two}` : ""},{" "}
              {address.city}, {address.province} {address.postal_code ? `(${address.postal_code})` : ""}
            </p>
          </div>
        </div>

        {/* Helpful tip for users not at home */}
        <div className="mt-3 flex items-center justify-between border-t border-emerald-200/60 pt-2.5 text-xs text-emerald-800">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <Navigation size={13} className="shrink-0 text-emerald-600" />
            Not at home right now? Update your address or auto-detect via GPS.
          </span>
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs transition hover:bg-emerald-50 hover:border-emerald-500 shrink-0 ml-2"
          >
            <Navigation size={12} />
            Update Location
          </button>
        </div>
      </div>
    </div>
  );
}
