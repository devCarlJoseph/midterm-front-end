interface BookingErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function BookingErrorState({ error, onRetry }: BookingErrorStateProps) {
  return (
    <div className="mx-auto max-w-md px-4 py-12 text-center">
      <p className="text-sm font-medium text-red-600">{error}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800 cursor-pointer"
      >
        Retry
      </button>
    </div>
  );
}
