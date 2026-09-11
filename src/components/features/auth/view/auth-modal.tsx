import { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "@/context/auth-context";
import { SocialAuthButtons } from "../ui/social-auth-buttons";
import { LoginForm } from "../forms/login-form";
import { RegisterForm } from "../forms/register-form";
import { ForgotPasswordModal } from "./forgot-password-modal";
import { AuthModalHeader } from "../ui/auth-modal-header";
import { AuthModalAlerts } from "../ui/auth-modal-alerts";
import { AuthModalFooter } from "../ui/auth-modal-footer";

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialMode?: "login" | "register";
}

export function AuthModal({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  initialMode: externalInitialMode,
}: AuthModalProps) {
  const {
    isAuthModalOpen: contextIsOpen,
    authModalMode: contextMode,
    closeAuthModal: contextClose,
    login,
    register,
  } = useAuth();

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : contextIsOpen;
  const handleClose = externalOnClose !== undefined ? externalOnClose : contextClose;

  const [mode, setMode] = useState<"login" | "register">(
    externalInitialMode || contextMode || "login",
  );

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync mode whenever contextMode changes or modal opens
  useEffect(() => {
    if (contextMode) {
      setMode(contextMode);
    }
  }, [contextMode]);

  // Handle ESC key press & body overflow
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isForgotPasswordOpen) {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isForgotPasswordOpen, handleClose]);

  if (!isOpen) return null;

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    setErrorMessage(null);
    setFieldErrors({});
    setSuccessMessage(null);
  };

  const handleLoginSubmit = async (email: string, pass: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      await login(email, pass);
      setSuccessMessage("Welcome back! Signing you in...");
      setTimeout(() => {
        handleClose();
        setSuccessMessage(null);
      }, 700);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as {
          message?: string;
          errors?: Record<string, string[]>;
        };
        setErrorMessage(
          data.message ?? "Invalid email or password. Please check your credentials.",
        );
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      } else {
        setErrorMessage("Unable to connect to the server. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (
    name: string,
    email: string,
    pass: string,
    passwordConfirmation: string,
  ) => {
    setIsLoading(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      await register(name, email, pass, passwordConfirmation);
      setSuccessMessage("Account created successfully! Welcome to Dali!");
      setTimeout(() => {
        handleClose();
        setSuccessMessage(null);
      }, 750);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as {
          message?: string;
          errors?: Record<string, string[]>;
        };
        setErrorMessage(data.message ?? "Registration failed. Please check the form errors.");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      } else {
        setErrorMessage("An unexpected network error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isLoading) {
            handleClose();
          }
        }}
      >
        <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
          <AuthModalHeader
            mode={mode}
            isLoading={isLoading}
            onClose={handleClose}
            onSwitchMode={switchMode}
          />

          {/* Scrollable Form Body */}
          <div className="overflow-y-auto px-6 py-4 sm:px-8 sm:py-5 flex-1 space-y-4">
            <AuthModalAlerts
              errorMessage={errorMessage}
              successMessage={successMessage}
              onDismissError={() => setErrorMessage(null)}
            />

            {/* Form */}
            {mode === "login" ? (
              <LoginForm
                onSubmit={handleLoginSubmit}
                isLoading={isLoading}
                fieldErrors={fieldErrors}
                onForgotPasswordClick={() => setIsForgotPasswordOpen(true)}
                onClearErrors={() => setFieldErrors({})}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegisterSubmit}
                isLoading={isLoading}
                fieldErrors={fieldErrors}
                onClearErrors={() => setFieldErrors({})}
              />
            )}

            {/* Sleek Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                or continue with
              </span>
            </div>

            {/* Social Authentication */}
            <SocialAuthButtons disabled={isLoading} />

            {/* Footer switcher */}
            <AuthModalFooter mode={mode} onSwitchMode={switchMode} />
          </div>
        </div>
      </div>

      {/* Embedded Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onSuccessReturnToLogin={() => {
          setIsForgotPasswordOpen(false);
          switchMode("login");
        }}
      />
    </>
  );
}
