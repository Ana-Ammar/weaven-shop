import { useReducer, useEffect } from "react";
import { CartContext } from "./CartContext";

// Define initial state from localStorage or default
const initialState = {
  cartItems: [],
};

// Lazy initializer for useReducer
const init = (initialState) => {
  try {
    const localData = localStorage.getItem("cartState");
    return localData ? JSON.parse(localData) : initialState;
  } catch (error) {
    console.error("Error reading cart from localStorage", error);
    return initialState;
  }
};

// Reducer function to handle cart state transitions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size,
      );

      if (existingItemIndex >= 0) {
        // Increment quantity if item exists
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return { ...state, cartItems: updatedItems };
      } else {
        // Add new item with quantity 1 (if not provided)
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { ...action.payload, quantity: action.payload.quantity || 1 },
          ],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.size === action.payload.size
            ),
        ),
      };

    case "INCREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};


// Context Provider Component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, init);

  // Sync to localStorage on every state change
  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  // Actions
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const increaseQty = (product) => {
    dispatch({ type: "INCREASE_QTY", payload: product });
  };

  const decreaseQty = (product) => {
    dispatch({ type: "DECREASE_QTY", payload: product });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Derived state
  const cartCount = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const cartTotal = state.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const contextValue = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext value={contextValue}>{children}</CartContext>
  );
}
