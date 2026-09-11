import { useState, useMemo, type FormEvent } from "react";
import { Check, Eye, EyeOff, Lock, Mail, ShieldCheck, User, UserPlus } from "lucide-react";
import { PasswordStrengthMeter } from "./password-strength-meter";
import { RegisterTermsCheckboxes } from "./register-terms-checkboxes";

interface RegisterFormProps {
  onSubmit: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => Promise<void>;
  isLoading: boolean;
  fieldErrors: Record<string, string[]>;
  onClearErrors: () => void;
}

export function RegisterForm({
  onSubmit,
  isLoading,
  fieldErrors,
  onClearErrors,
}: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [promoOffers, setPromoOffers] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  // Real-time password strength calculation
  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let label = "Weak";
    let textColor = "text-red-600";

    if (score === 2) {
      label = "Fair";
      textColor = "text-orange-600";
    } else if (score === 3) {
      label = "Good";
      textColor = "text-amber-600";
    } else if (score === 4) {
      label = "Strong";
      textColor = "text-emerald-600";
    }

    return { score, label, textColor };
  }, [password]);

  const passwordsMatch = useMemo(() => {
    if (!passwordConfirmation) return null;
    return password === passwordConfirmation;
  }, [password, passwordConfirmation]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTermsError(null);

    if (!acceptTerms) {
      setTermsError("Please accept the terms and conditions to create an account.");
      return;
    }

    await onSubmit(name, email, password, passwordConfirmation);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <User
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) onClearErrors();
            }}
            placeholder="e.g. Maria Santos"
            className={`w-full rounded-xl border py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-slate-900 outline-none transition focus:ring-2 ${
              fieldErrors.name
                ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 bg-white focus:border-[#D70F64] focus:ring-[#D70F64]/15"
            }`}
          />
        </div>
        {fieldErrors.name && (
          <p className="mt-1 text-[11px] font-medium text-red-600">
            {fieldErrors.name[0]}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Email address
        </label>
        <div className="relative">
          <Mail
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) onClearErrors();
            }}
            placeholder="e.g. name@example.com"
            className={`w-full rounded-xl border py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-slate-900 outline-none transition focus:ring-2 ${
              fieldErrors.email
                ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 bg-white focus:border-[#D70F64] focus:ring-[#D70F64]/15"
            }`}
          />
        </div>
        {fieldErrors.email && (
          <p className="mt-1 text-[11px] font-medium text-red-600">
            {fieldErrors.email[0]}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            Password (min 8 characters)
          </label>
          {password && (
            <span className={`text-[11px] font-bold ${passwordStrength.textColor}`}>
              {passwordStrength.label}
            </span>
          )}
        </div>
        <div className="relative">
          <Lock
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) onClearErrors();
            }}
            placeholder="At least 8 characters"
            className={`w-full rounded-xl border py-2.5 pl-10 pr-10 text-xs sm:text-sm text-slate-900 outline-none transition focus:ring-2 ${
              fieldErrors.password
                ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 bg-white focus:border-[#D70F64] focus:ring-[#D70F64]/15"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Dynamic Strength Meter */}
        {password && <PasswordStrengthMeter score={passwordStrength.score} />}

        {fieldErrors.password && (
          <p className="mt-1 text-[11px] font-medium text-red-600">
            {fieldErrors.password[0]}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            Confirm Password
          </label>
          {passwordsMatch !== null && (
            <span
              className={`flex items-center gap-1 text-[11px] font-semibold ${
                passwordsMatch ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {passwordsMatch ? (
                <>
                  <Check size={12} /> Passwords match
                </>
              ) : (
                "Passwords don't match"
              )}
            </span>
          )}
        </div>
        <div className="relative">
          <ShieldCheck
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Repeat your password"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-[#D70F64] focus:ring-2 focus:ring-[#D70F64]/15"
          />
        </div>
      </div>

      {/* Checkboxes */}
      <RegisterTermsCheckboxes
        acceptTerms={acceptTerms}
        promoOffers={promoOffers}
        termsError={termsError}
        onAcceptTermsChange={(checked) => {
          setAcceptTerms(checked);
          if (termsError) setTermsError(null);
        }}
        onPromoOffersChange={setPromoOffers}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || (passwordsMatch === false && Boolean(passwordConfirmation))}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D70F64] py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-[#C21760] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Creating account...</span>
          </div>
        ) : (
          <>
            <UserPlus size={16} />
            <span>Create account</span>
          </>
        )}
      </button>
    </form>
  );
}
