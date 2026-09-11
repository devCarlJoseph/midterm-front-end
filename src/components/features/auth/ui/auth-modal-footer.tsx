interface AuthModalFooterProps {
  mode: "login" | "register";
  onSwitchMode: (mode: "login" | "register") => void;
}

export function AuthModalFooter({ mode, onSwitchMode }: AuthModalFooterProps) {
  return (
    <div className="pt-3 pb-2 text-center text-xs text-slate-500 border-t border-slate-100">
      {mode === "login" ? (
        <p>
          Don&apos;t have a Dali account?{" "}
          <button
            type="button"
            onClick={() => onSwitchMode("register")}
            className="font-bold text-emerald-600 hover:underline cursor-pointer"
          >
            Sign up now
          </button>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onSwitchMode("login")}
            className="font-bold text-emerald-600 hover:underline cursor-pointer"
          >
            Log in instead
          </button>
        </p>
      )}
    </div>
  );
}
