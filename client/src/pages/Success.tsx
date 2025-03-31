import { useNavigate } from "react-router";
import { useClearCart } from "../hooks/cart/useClearCart";
import { useEffect } from "react";
import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";

export default function SuccessPage() {
  const navigate = useNavigate();

  const { emptyCart } = useClearCart();
  const { userData } = useGetCurrentUser();
  const user_id = userData?.user.id;
  useEffect(
    function () {
      emptyCart(user_id || "");
    },
    [emptyCart, user_id]
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Order Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
