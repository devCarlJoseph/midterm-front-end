import "@/styles/style.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import UserLayout from "@/pages/user/layout";

import HomePage from "@/pages/user/home";
import BookingPage from "@/pages/user/booking";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      {/* User Pages Routes */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
