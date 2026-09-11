import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api, { clearAccessToken, setAccessToken } from "@/lib/axios";
import type { ApiResponse, AuthResponseData, User } from "@/lib/api-types";
import { LoadingScreen } from "@/components/common/loading-screen";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  authModalMode: "login" | "register";
  openAuthModal: (mode?: "login" | "register") => void;
  closeAuthModal: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("dali-auth-token"),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

  const openAuthModal = useCallback((mode: "login" | "register" = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    const storedToken = localStorage.getItem("dali-auth-token");
    if (!storedToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get<ApiResponse<User>>("/auth/me");
      setUser(response.data.data);
    } catch {
      clearAccessToken();
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await api.post<ApiResponse<AuthResponseData>>(
      "/auth/login",
      {
        email,
        password,
      },
    );

    const data = response.data.data;
    setAccessToken(data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ): Promise<void> => {
    const response = await api.post<ApiResponse<AuthResponseData>>(
      "/auth/register",
      {
        name,
        email,
        password,
        password_confirmation,
      },
    );

    const data = response.data.data;
    setAccessToken(data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = async (): Promise<void> => {
    setIsLoggingOut(true);
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore logout errors if token already invalid
    } finally {
      // Small delay so the loading screen is visible
      await new Promise((resolve) => setTimeout(resolve, 1200));
      clearAccessToken();
      setToken(null);
      setUser(null);
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: Boolean(user && token),
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {isLoggingOut && (
        <LoadingScreen
          fullScreen
          message="Signing you out..."
        />
      )}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
