import { Edit2, Loader2, Navigation, X } from "lucide-react";

interface AddressMethodChooserProps {
  isDetectingLocation: boolean;
  onDetectLocation: () => void;
  onManualInput: () => void;
  onClose: () => void;
}

export function AddressMethodChooser({
  isDetectingLocation,
  onDetectLocation,
  onManualInput,
  onClose,
}: AddressMethodChooserProps) {
  return (
    <div className="mt-4 rounded-xl border-2 border-emerald-200 bg-linear-to-b from-[#f4fbf7] to-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-emerald-950">
            Choose How to Set Your Delivery Address
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            You can turn on your location to auto-detect, or type your address manually.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Option 1: Turn On Location */}
        <button
          type="button"
          disabled={isDetectingLocation}
          onClick={onDetectLocation}
          className="group relative flex flex-col items-start rounded-xl border-2 border-emerald-500/40 bg-white p-4 text-left shadow-xs transition hover:border-emerald-600 hover:bg-emerald-50/50 hover:shadow-md disabled:opacity-60 cursor-pointer"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:scale-105">
              {isDetectingLocation ? (
                <Loader2 size={20} className="animate-spin text-emerald-700" />
              ) : (
                <Navigation size={20} className="text-emerald-700" />
              )}
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
              Fastest
            </span>
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-900">
              Turn On Location
            </h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Use your device&apos;s GPS to automatically detect your current address &amp; pin coordinates.
            </p>
          </div>

          <div className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-700 py-2 text-xs font-semibold text-white transition group-hover:bg-emerald-800">
            {isDetectingLocation ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Detecting Location...
              </>
            ) : (
              <>
                <Navigation size={13} />
                Turn On My Location
              </>
            )}
          </div>
        </button>

        {/* Option 2: Manually Input Address */}
        <button
          type="button"
          onClick={onManualInput}
          className="group flex flex-col items-start rounded-xl border border-slate-200 bg-white p-4 text-left shadow-xs transition hover:border-slate-400 hover:bg-slate-50/70 hover:shadow-md cursor-pointer"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:scale-105">
              <Edit2 size={18} className="text-slate-700" />
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
              Manual
            </span>
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-slate-950">
              Enter Address Manually
            </h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Type in your street address, barangay, city, and delivery details by hand.
            </p>
          </div>

          <div className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2 text-xs font-semibold text-slate-700 transition group-hover:bg-slate-100">
            <Edit2 size={13} />
            Manually Input
          </div>
        </button>
      </div>
    </div>
  );
}
