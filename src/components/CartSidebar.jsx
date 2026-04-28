import { Link } from "react-router";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

export default function CartSidebar() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();

  return (
    <div className="drawer drawer-end z-100">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="cart-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-0 w-80 md:w-96 min-h-full bg-rich-card text-rich-text flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-rich-base flex justify-between items-center bg-rich-card sticky top-0 z-10">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag size={20} className="text-rich-accent" />
              Your Cart ({cartCount})
            </h2>
            <label
              htmlFor="cart-drawer"
              className="btn btn-sm btn-circle btn-ghost"
              aria-label="Close cart"
            >
              <X size={20} />
            </label>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 bg-rich-base/50">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-60">
                <ShoppingBag size={48} className="mb-4 text-rich-text-muted" />
                <p className="text-lg font-medium text-rich-text-muted">
                  Your cart is empty
                </p>
                <label
                  htmlFor="cart-drawer"
                  className="btn btn-sm mt-4 bg-transparent border-rich-accent text-rich-accent hover:bg-rich-accent hover:text-white"
                >
                  Continue Shopping
                </label>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={clearCart}
                    className="text-xs text-error hover:underline transition-all"
                  >
                    Clear All
                  </button>
                </div>
                {cartItems.map((item) => (
                  <CartItem key={`${item.id}-${item.size || "default"}`} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-rich-base bg-rich-card sticky bottom-0 z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-rich-text-muted">Subtotal</span>
                <span className="text-xl font-bold text-rich-accent">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  to="/checkout"
                  className="btn bg-rich-accent hover:bg-rich-accent-hover text-white w-full border-none shadow-md"
                  onClick={() => {
                    // Close drawer when navigating to checkout
                    document.getElementById("cart-drawer").checked = false;
                  }}
                >
                  Proceed to Checkout
                </Link>
                <label
                  htmlFor="cart-drawer"
                  className="btn btn-ghost w-full border border-rich-base"
                >
                  Continue Shopping
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
