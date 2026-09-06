import { Header } from "@/components/common/header";
import { Outlet } from "react-router";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

    </>
  );
}
