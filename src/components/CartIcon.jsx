import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <div className="indicator relative flex items-center justify-center">
      <label
        htmlFor="cart-drawer"
        className="btn btn-ghost btn-circle relative"
        aria-label="Open cart"
      >
        <ShoppingCart className="w-5 h-5 text-rich-text" />
        {cartCount > 0 && (
          <span className="indicator-item badge badge-sm bg-rich-accent text-white border-none absolute top-1 right-1">
            {cartCount}
          </span>
        )}
      </label>
    </div>
  );
}
