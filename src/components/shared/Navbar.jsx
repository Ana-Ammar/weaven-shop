import { Link, NavLink } from "react-router";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { LogOut, User } from "lucide-react";
import CartIcon from "../CartIcon";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/products">All Products</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
    </>
  );

  return (
    <div className={`md:sticky md:z-50 md:transition-all md:duration-300 ${isScrolled ? 'md:top-4 md:max-w-5xl md:mx-auto px-8' : 'top-0 w-full'}`}>
      <div className={`navbar backdrop-blur-md transition-all duration-300 mx-auto gap-8 ${isScrolled
        ? 'bg-rich-base/80 border border-white/10 shadow-2xl md:rounded-3xl md:px-4 md:py-2'
        : 'bg-rich-base/95 border-b border-rich-card shadow-sm px-4 py-4 sm:px-6 lg:px-8 max-w-7xl'
        }`}>
        <div className="navbar-start">
          <div className="lg:hidden mr-4">
            <label htmlFor="main-drawer" aria-label="open sidebar" className="btn btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
          </div>
          <Link to="/" className="text-2xl md:text-3xl font-extrabold text-rich-accent hover:text-rich-accent-hover hover:bg-transparent">Weaven</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end gap-2 hidden lg:flex">
          <CartIcon />
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span className="text-xl">{user?.displayName?.charAt(0) || 'U'}</span>
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-rich-card rounded-box w-52">
                <li className="px-4 py-2 font-semibold text-sm opacity-50 border-b">{user?.email}</li>
                <li><Link to="/admin/dashboard"><User className="w-4 h-4" /> Admin Dashboard</Link></li>
                <li><button onClick={logoutUser} className="text-error"><LogOut className="w-4 h-4" /> Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn bg-transparent border-rich-accent text-rich-accent shadow-none hover:bg-rich-accent hover:text-white">Login</Link>
              <Link to="/signup" className="btn bg-rich-accent text-white border-none shadow-none hover:bg-rich-accent-hover">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
