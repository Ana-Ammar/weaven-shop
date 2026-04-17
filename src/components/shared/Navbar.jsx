import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/products">All Products</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">Weaven</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span className="text-xl">{user?.displayName?.charAt(0) || 'U'}</span>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="px-4 py-2 font-semibold text-sm opacity-50 border-b">{user?.email}</li>
              <li><Link to="/admin/dashboard"><User className="w-4 h-4" /> Admin Dashboard</Link></li>
              <li><button onClick={logoutUser} className="text-error"><LogOut className="w-4 h-4" /> Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}
