import { Outlet, Link } from "react-router";
import { LayoutDashboard, PlusCircle, LogOut, Package } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function AdminLayout() {
  const { logoutUser } = useAuth();

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-rich-base">
        {/* Navbar for mobile */}
        <div className="w-full navbar bg-rich-card lg:hidden">
          <div className="flex-none">
            <label htmlFor="admin-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-xl font-bold">Admin Panel</div>
        </div>
        
        {/* Main Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div> 
      <div className="drawer-side">
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-rich-card text-rich-text space-y-2">
          {/* Sidebar content here */}
          <li><h2 className="text-2xl font-bold mb-4 text-rich-accent">Admin Panel</h2></li>
          <li>
            <Link to="/admin/dashboard">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/products">
              <Package className="w-5 h-5" /> All Products
            </Link>
          </li>
          <li>
            <Link to="/admin/add-product">
              <PlusCircle className="w-5 h-5" /> Add Product
            </Link>
          </li>
          <li>
            <Link to="/admin/banners">
              <PlusCircle className="w-5 h-5" /> Manage Banners
            </Link>
          </li>
          <div className="divider"></div>
          <li>
            <Link to="/">Go to Website</Link>
          </li>
          <li>
            <button onClick={logoutUser} className="text-error">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
