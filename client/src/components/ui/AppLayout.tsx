import { Outlet } from "react-router";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="w-full mt-8">
        <Outlet />
      </main>
    </div>
  );
}
