import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AuthModalAlertsProps {
  errorMessage: string | null;
  successMessage: string | null;
  onDismissError: () => void;
}

export function AuthModalAlerts({
  errorMessage,
  successMessage,
  onDismissError,
}: AuthModalAlertsProps) {
  return (
    <>
      {/* Error Banner */}
      {errorMessage && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50/80 p-3 text-xs text-red-700 animate-in fade-in">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={onDismissError}
            className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Success Banner */}
      {successMessage && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}
    </>
  );
}
