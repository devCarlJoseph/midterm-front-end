import "@/styles/style.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { ShopProvider } from "@/context/shop-context";
import UserLayout from "@/pages/user/layout";
import BookingPage from "@/pages/user/booking";
import HomePage from "@/pages/user/home";

createRoot(document.getElementById("root")!).render(
  <ShopProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ShopProvider>,
);