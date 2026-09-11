import {
  AlertCircle,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";

interface AddressFormHeaderProps {
  editingAddressId: number | null;
  latitude: number | null;
  longitude: number | null;
  isDetectingLocation: boolean;
  locationSuccess: string | null;
  locationError: string | null;
  formError: string | null;
  onDetectLocation: () => void;
  onCancel: () => void;
}

export function AddressFormHeader({
  editingAddressId,
  latitude,
  longitude,
  isDetectingLocation,
  locationSuccess,
  locationError,
  formError,
  onDetectLocation,
  onCancel,
}: AddressFormHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-900">
            {editingAddressId
              ? "Edit Delivery Address"
              : "New Delivery Address"}
          </span>
          {latitude && longitude && (
            <span className="hidden items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 sm:inline-flex">
              <MapPin size={10} />
              GPS: {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick toggle to re-detect location */}
          <button
            type="button"
            onClick={onDetectLocation}
            disabled={isDetectingLocation}
            title="Detect current location via GPS"
            className="flex items-center gap-1 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-800 transition hover:bg-emerald-100 disabled:opacity-60 cursor-pointer"
          >
            <span>
              {isDetectingLocation ? "Detecting..." : "Detect Location"}
            </span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Location Status Notifications */}
      {locationSuccess && (
        <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs text-emerald-800">
          <MapPin size={14} className="shrink-0 text-emerald-600" />
          <span className="flex-1">{locationSuccess}</span>
        </div>
      )}

      {locationError && (
        <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs text-amber-800">
          <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-600" />
          <div className="flex-1">
            <span>{locationError}</span>
          </div>
        </div>
      )}

      {formError && (
        <p className="mt-2 text-xs font-medium text-red-600">{formError}</p>
      )}
    </>
  );
}
