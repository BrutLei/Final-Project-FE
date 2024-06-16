import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import SideBar from "@/pages/_components/sidebar";
import "./index.css";
import Navbar from "@/pages/_components/navbar";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <div className="h-full">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="sidebar h-full w-56 flex-col fixed inset-y-0 z-50">
          <SideBar />
        </div>
        <main className="md:pl-56 pt-[80px] h-full">
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
}
