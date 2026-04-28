import { Outlet, Link } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import useAuth from "../hooks/useAuth";
import CartSidebar from "../components/CartSidebar";


export default function MainLayout() {
  const { user, logoutUser } = useAuth();

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById('main-drawer');
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <div className="drawer">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <CartSidebar />
      <div className="drawer-side z-100">
        <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-rich-card text-rich-text space-y-4">
          <li><h2 className="text-2xl font-bold mb-2 text-rich-accent">Weaven</h2></li>

          <li><Link to="/" onClick={closeDrawer} className="text-lg">Home</Link></li>
          <li><Link to="/products" onClick={closeDrawer} className="text-lg">All Products</Link></li>
          <li><Link to="/about" onClick={closeDrawer} className="text-lg">About Us</Link></li>

          <div className="divider my-0"></div>

          {user ? (
            <>
              <li className="px-4 py-2 font-semibold text-sm opacity-50">{user?.email}</li>
              <li><Link to="/admin/dashboard" onClick={closeDrawer} className="text-lg">Admin Dashboard</Link></li>
              <li>
                <button onClick={() => { closeDrawer(); logoutUser(); }} className="text-error text-lg">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={closeDrawer} className="btn bg-transparent border-rich-accent text-rich-accent shadow-none hover:bg-rich-accent hover:text-white">Login</Link></li>
              <li>
                <Link to="/signup" onClick={closeDrawer} className="btn bg-rich-accent text-white border-none shadow-none hover:bg-rich-accent-hover mt-2">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
