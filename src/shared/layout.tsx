import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Topbar from "./top-bar";
import { Toaster } from "@/components/ui/sonner";


export default function Layout() {
  return (
    <div className="">
      <Topbar />
      <Outlet />
      <Footer />
      <Toaster/>
    </div>
  );
}
