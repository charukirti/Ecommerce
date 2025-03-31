import { ShoppingBag } from "lucide-react";

import { Link, useNavigate } from "react-router";

import Loader from "../components/Loader";
import Button from "../components/ui/Button";
import { useFetchCart } from "../hooks/cart/useFetchCart";
import { useClearCart } from "../hooks/cart/useClearCart";
import CartItem from "../components/CartItem";
import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";

export default function Cart() {
  const { userData } = useGetCurrentUser();

  const { data: cartItems, isLoading } = useFetchCart(userData?.user.id || "");

  const { emptyCart, isClearing } = useClearCart();

  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  const isEmpty = !cartItems?.length;

  const subtotal =
    cartItems?.reduce(
      (sum, item) => sum + item.price_at_time * item.quantity,
      0
    ) || 0;

  const shippingFee = 49.0;
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingFee + taxAmount;

  function handleClearCart() {
    emptyCart(userData?.user.id || "");
  }

  return (
    <div className="bg-gray-50 min-h-screen mt-5">
      <section className="container mx-auto py-12 px-4 md:px-6">
        <header className="flex items-center justify-between mb-8 ">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingBag className="text-blue-600" />
            Your Cart
          </h1>
          {!isEmpty && (
            <Button
              className="text-lg text-red-600 hover:text-red-400 transition-colors"
              variant="secondary"
              disabled={isClearing}
              onClick={handleClearCart}
            >
              Clear cart
            </Button>
          )}
        </header>

        {isEmpty ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mb-4 pb-2 ">
                    Items in Your Cart
                  </h2>
                  {!isEmpty && (
                    <span className="text-gray-500 text-lg">
                      ({cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "items"})
                    </span>
                  )}
                </div>
                <ul className="space-y-6">
                  {cartItems.map((item) => (
                    <li key={item.product_id}>
                      <CartItem
                        productId={item.product_id}
                        price={item.price_at_time}
                        quantity={item.quantity}
                        userId={item.user_id}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-1">
              <aside className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
                  Order Summary
                </h2>
                <dl className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <dt>Subtotal</dt>
                    <dd>₹{subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <dt>Shipping</dt>
                    <dd>₹{shippingFee.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <dt>Tax</dt>
                    <dd>₹{taxAmount.toFixed(2)}</dd>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <dt>Total</dt>
                      <dd>₹{total.toFixed(2)}</dd>
                    </div>
                  </div>
                </dl>

                <Button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors mb-4"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </Button>

                <Link
                  to="/products"
                  className="w-full block text-center text-blue-600 hover:text-blue-800 font-medium py-2"
                  aria-label="Continue shopping"
                >
                  Continue Shopping
                </Link>
              </aside>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
