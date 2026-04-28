import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartItem({ item }) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-rich-base border border-rich-card rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={item.image || "https://placehold.co/100x100"}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <Link to={`/product/${item.id}`} >
          <h3 className="font-semibold text-rich-text">{item.name}</h3>
          {item.size && (
            <p className="text-sm text-rich-text-muted">Size: {item.size}</p>
          )}
          <p className="text-rich-accent font-bold mt-1">${item.price}</p>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center border border-rich-card rounded-md bg-rich-card">
          <button
            onClick={() => decreaseQty(item.id)}
            className="p-1 hover:bg-rich-base text-rich-text transition-colors rounded-l-md disabled:opacity-50"
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <button
            onClick={() => increaseQty(item.id)}
            className="p-1 hover:bg-rich-base text-rich-text transition-colors rounded-r-md"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-error hover:bg-error/10 rounded-full transition-colors"
          title="Remove from cart"
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div >
  );
}
