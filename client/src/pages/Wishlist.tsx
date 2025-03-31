import { ShoppingBag } from "lucide-react";

import { Link } from "react-router";

import Loader from "../components/Loader";
import Button from "../components/ui/Button";
import WishlistItem from "../components/WishlistItem";
import { useClearWishlist } from "../hooks/wishlist/useClearWishlist";
import { useFetchWishlist } from "../hooks/wishlist/useFetchWishlist";
import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";

export default function Wishlist() {
  const { userData } = useGetCurrentUser();
  const { wishlists, isLoading } = useFetchWishlist(userData?.user.id || "");

  const { emptyWishlist, isClearing } = useClearWishlist();

  if (isLoading) return <Loader />;

  const isEmpty = !wishlists?.length;

  const subtotal =
    wishlists?.reduce(
      (sum, item) => sum + item.price_at_time * item.quantity,
      0
    ) || 0;

  const shippingFee = 49.0;
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingFee + taxAmount;

  function handleClearWishlist() {
    emptyWishlist(userData?.user.id || "");
  }

  return (
    <div className="bg-gray-50 min-h-screen mt-5">
      <section className="container mx-auto py-12 px-4 md:px-6">
        <header className="flex items-center justify-between mb-8 ">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingBag className="text-blue-600" />
            Your Wishlist
          </h1>
          {!isEmpty && (
            <Button
              className="text-lg text-red-600 hover:text-red-400 transition-colors"
              variant="secondary"
              disabled={isClearing}
              onClick={handleClearWishlist}
            >
              Clear Wishlist
            </Button>
          )}
        </header>

        {isEmpty ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Your Wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your wishlist yet.
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
                    Items in Your Wishlist
                  </h2>
                  {!isEmpty && (
                    <span className="text-gray-500 text-lg">
                      ({wishlists.length}{" "}
                      {wishlists.length === 1 ? "item" : "items"})
                    </span>
                  )}
                </div>
                <ul className="space-y-6">
                  {wishlists.map((item) => (
                    <li key={item.product_id}>
                      <WishlistItem
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

                <Link
                  to="/products"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors mb-4"
                  aria-label="Continue to shopping"
                >
                  Continue to Shopping
                </Link>
              </aside>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
