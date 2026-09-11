import "@/styles/style.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { AuthProvider } from "@/context/auth-context";
import { ShopProvider } from "@/context/shop-context";
import UserLayout from "@/pages/user/layout";
import BookingPage from "@/pages/user/booking";
import HomePage from "@/pages/user/home";
import CategoriesPage from "@/pages/user/categories";
import StoresPage from "@/pages/user/stores";
import StoreDetailPage from "@/pages/user/stores/detail";
import AuthPage from "@/pages/auth";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/stores/:storeId" element={<StoreDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  </AuthProvider>,
);