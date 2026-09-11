interface RegisterTermsCheckboxesProps {
  acceptTerms: boolean;
  promoOffers: boolean;
  termsError: string | null;
  onAcceptTermsChange: (checked: boolean) => void;
  onPromoOffersChange: (checked: boolean) => void;
}

export function RegisterTermsCheckboxes({
  acceptTerms,
  promoOffers,
  termsError,
  onAcceptTermsChange,
  onPromoOffersChange,
}: RegisterTermsCheckboxesProps) {
  return (
    <div className="space-y-2 pt-1">
      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => onAcceptTermsChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#D70F64] text-[#D70F64] focus:ring-[#D70F64]"
        />
        <span className="text-xs text-slate-600 leading-snug">
          I agree to the{" "}
          <span className="font-semibold text-[#D70F64] hover:underline">
            Terms and Conditions
          </span>{" "}
          and{" "}
          <span className="font-semibold text-[#D70F64] hover:underline">
            Privacy Policy
          </span>
          .
        </span>
      </label>

      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={promoOffers}
          onChange={(e) => onPromoOffersChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#D70F64] text-[#D70F64] focus:ring-[#D70F64]"
        />
        <span className="text-xs text-slate-500 leading-snug">
          Send me exclusive discounts, food coupons, and deals via email.
        </span>
      </label>

      {termsError && (
        <p className="text-[11px] font-medium text-red-600">{termsError}</p>
      )}
    </div>
  );
}
