import { Check } from "lucide-react";

interface AddressFormActionsProps {
  isSaving: boolean;
  editingAddressId: number | null;
  onCancel: () => void;
}

export function AddressFormActions({
  isSaving,
  editingAddressId,
  onCancel,
}: AddressFormActionsProps) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2 border-t border-emerald-100 pt-3">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSaving}
        className="flex items-center gap-1.5 rounded-lg bg-[#08a66d] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#078f5e] disabled:opacity-60 cursor-pointer"
      >
        {isSaving ? (
          <div className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
        ) : (
          <Check size={14} />
        )}
        {editingAddressId ? "Update Address" : "Save Address"}
      </button>
    </div>
  );
}
