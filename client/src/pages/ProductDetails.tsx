import { useNavigate, useParams } from "react-router";

import Loader from "../components/Loader";
import { useState } from "react";
import Button from "../components/ui/Button";
import useAddToCart from "../hooks/cart/useAddToCart";
import { useFetchProductDetail } from "../hooks/products/useFetchProductDetail";
import RelatedProducts from "../components/RelatedProducts";
import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";

export default function ProductDetails() {
  const { id } = useParams<string>();
  const [quantity, setQuantity] = useState(1);
  const { userData } = useGetCurrentUser();

  const productId = Number(id);

  const { addToCart, isPending } = useAddToCart();

  const { productDetail, isLoading } = useFetchProductDetail(Number(id));

  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  if (!productDetail || productDetail.length === 0)
    return (
      <div className="container py-8">
        <p className="text-xl text-gray-600">There is no product</p>
      </div>
    );

  const product = productDetail[0];

  const {
    product_image,
    product_name,
    product_category,
    product_description,
    product_price,
    product_quantity: stock,
  } = product;

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (stock && quantity < stock) setQuantity(quantity + 1);
  };

  function handleAddToCart() {
    if (!userData?.user.id) navigate("/auth/signin");
    addToCart({
      user_id: userData?.user.id || "",
      productId: productId,
      price: product_price || 0,
      quantity: quantity,
    });
  }

  return (
    <section className="container py-8 px-4 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex-shrink-0 mb-8 md:mb-0">
          <img
            src={product_image ?? "/fallback.svg"}
            alt={product_name ?? "Product image"}
            className="w-full md:max-h-[450px] object-contain transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 md:pl-8">
          <span className="inline-block bg-indigo-500 px-3 py-1 rounded-full text-white text-sm font-medium uppercase mb-3">
            {product_category ?? "Uncategorized"}
          </span>

          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {product_name}
          </h1>

          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ₹{Number(product_price).toLocaleString("en-IN")}
          </p>

          <div className="my-6">
            <p className="text-gray-700 leading-relaxed">
              {product_description}
            </p>
          </div>

          <div className="mb-6">
            <p className="flex items-center">
              <span className="mr-2 text-gray-700">Availability:</span>
              {stock && stock > 0 ? (
                <span className="text-green-600 font-medium">
                  In stock ({stock} available)
                </span>
              ) : (
                <span className="text-red-600 font-medium">Out of stock</span>
              )}
            </p>
          </div>

          {stock && stock > 0 && (
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center">
                <Button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 border "
                >
                  -
                </Button>
                <div className="px-6 py-2 border-gray-300 text-center font-medium min-w-12">
                  {quantity}
                </div>
                <Button
                  onClick={increaseQuantity}
                  className="px-4 py-2 border "
                >
                  +
                </Button>
              </div>
            </div>
          )}

          <Button
            className={`w-full text-xl py-3 font-semibold transition-colors ${
              stock && stock > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!stock || stock <= 0 || isPending}
            onClick={handleAddToCart}
          >
            {stock && stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>

      <section>
        <RelatedProducts categoryName={product_category || "no category"} />
      </section>
    </section>
  );
}
