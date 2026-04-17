import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
