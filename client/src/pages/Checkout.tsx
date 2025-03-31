import { useEffect, useState } from "react";
import Navbar from "../components/checkout/Navbar";
import Shipping from "../components/checkout/Shipping";
import { loadStripe } from "@stripe/stripe-js";
import { useFetchCart } from "../hooks/cart/useFetchCart";
import Loader from "../components/Loader";
import { fetchCartItem } from "../services/serviceses";
import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";

export default function Checkout() {
  const { userData } = useGetCurrentUser();
  const userId = userData?.user.id;
  const [fullCartDetails, setFullCartDetails] = useState([]);
  const { data: cartData, isLoading } = useFetchCart(userId || '');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      if (cartData) {
        const productDetails = await Promise.all(
          cartData.map(async (item) => {
            const product = await fetchCartItem(item.product_id);
            const totalItemPrice = product?.product_price * item.quantity;
            return { ...product, quantity: item.quantity, totalItemPrice };
          })
        );

        setFullCartDetails(productDetails);

        // Compute overall total price
        const overallTotal = productDetails.reduce(
          (acc, item) => acc + item.totalItemPrice,
          0
        );
        setTotalPrice(overallTotal);
      }
    }

    fetchProducts();
  }, [cartData]);

  if (isLoading || fullCartDetails.length === 0) return <Loader />;

  async function makePayment() {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
    const shippingInfo = JSON.parse(
      localStorage.getItem("shippingInfo") || "{}"
    );

    const body = {
      products: fullCartDetails,
      totalPrice,
      userId,
      shippingInfo,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:7000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const orderResponse = await fetch(
        "http://localhost:7000/api/store-order",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            userId,
            products: fullCartDetails,
            totalPrice,
            shippingInfo,
            sessionId: session.id,
          }),
        }
      );

      const orderResult = await orderResponse.json();

      if (orderResult.success) {
        localStorage.setItem("pendingOrderId", orderResult.orderId);
      }

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.error("Stripe redirect error:", result.error);
      }
    } catch (error) {
      console.error("Payment process error:", error);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-5 pb-16">
      <header className="container mx-auto px-4 md:px-6">
        <Navbar />
      </header>

      <main className="container mx-auto px-4 md:px-6">
        <div className="mx-20">
          <section className="md:col-span-2">
            <article className="bg-white rounded-lg shadow-sm border p-6">
              <Shipping makePayment={makePayment} />
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
