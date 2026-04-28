import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real app, this would process payment/API call
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-rich-base py-16 px-4">
        <div className="max-w-2xl mx-auto bg-rich-card p-8 rounded-2xl shadow-xl text-center border border-rich-base">
          <CheckCircle2 size={64} className="text-success mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-rich-text mb-4">Order Placed Successfully!</h1>
          <p className="text-rich-text-muted mb-8 text-lg">
            Thank you for shopping with Weaven. Your order is being processed and will be shipped soon.
          </p>
          <Link to="/" className="btn bg-rich-accent hover:bg-rich-accent-hover text-white border-none px-8">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rich-base py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-rich-text-muted hover:text-rich-accent transition-colors gap-2 w-max">
            <ArrowLeft size={20} />
            <span>Back to Shopping</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-rich-text mt-4">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Summary (Left side on desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            <div className="bg-rich-card rounded-2xl shadow-md border border-rich-base overflow-hidden">
              <div className="p-6 border-b border-rich-base bg-rich-card">
                <h2 className="text-xl font-semibold text-rich-text">Order Items</h2>
              </div>

              <div className="p-6">
                {cartItems.length === 0 ? (
                  <p className="text-rich-text-muted text-center py-8">Your cart is empty.</p>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.size || "default"}`} className="flex items-center justify-between border-b border-rich-base/50 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image || "https://placehold.co/100x100"}
                            alt={item.name}
                            className="w-16 h-16 rounded-md object-cover border border-rich-base"
                          />
                          <div>
                            <h3 className="font-semibold text-rich-text">{item.name}</h3>
                            {item.size && (
                              <p className="text-sm text-rich-text-muted">Size: {item.size}</p>
                            )}
                            <p className="text-sm text-rich-text-muted mt-1">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold text-rich-text">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dummy Shipping Info Form */}
            <div className="bg-rich-card rounded-2xl shadow-md border border-rich-base mt-8 p-6">
              <h2 className="text-xl font-semibold text-rich-text mb-6">Shipping Information</h2>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text text-rich-text">First Name</span></label>
                    <input type="text" placeholder="John" className="input input-bordered w-full bg-rich-base border-rich-card focus:border-rich-accent text-rich-text" required />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text text-rich-text">Last Name</span></label>
                    <input type="text" placeholder="Doe" className="input input-bordered w-full bg-rich-base border-rich-card focus:border-rich-accent text-rich-text" required />
                  </div>
                </div>
                <div className="form-control w-full">
                  <label className="label"><span className="label-text text-rich-text">Email Address</span></label>
                  <input type="email" placeholder="john@example.com" className="input input-bordered w-full bg-rich-base border-rich-card focus:border-rich-accent text-rich-text" required />
                </div>
                <div className="form-control w-full">
                  <label className="label"><span className="label-text text-rich-text">Shipping Address</span></label>
                  <input type="text" placeholder="123 Main St" className="input input-bordered w-full bg-rich-base border-rich-card focus:border-rich-accent text-rich-text" required />
                </div>
              </form>
            </div>
          </div>

          {/* Totals (Right side on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
            <div className="bg-rich-card rounded-2xl shadow-md border border-rich-base p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-rich-text mb-6">Order Summary</h2>

              <div className="space-y-4 text-rich-text-muted mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-rich-text font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-rich-text font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (Estimated)</span>
                  <span className="text-rich-text font-medium">${(cartTotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t border-rich-base pt-4 mt-4 flex justify-between items-center">
                  <span className="font-bold text-lg text-rich-text">Total</span>
                  <span className="text-2xl font-bold text-rich-accent">
                    ${(cartTotal + (cartTotal * 0.05)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={cartItems.length === 0}
                className="btn bg-rich-accent hover:bg-rich-accent-hover text-white w-full border-none shadow-md disabled:bg-rich-base disabled:text-rich-text-muted h-14 text-lg"
              >
                Place Order
              </button>

              <p className="text-xs text-center text-rich-text-muted mt-4">
                By placing your order, you agree to Weaven's Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
