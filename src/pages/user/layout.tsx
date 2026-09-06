import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Outlet } from "react-router";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
