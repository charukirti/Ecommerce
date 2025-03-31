import { HeartIcon, ShoppingCart } from "lucide-react";
import Button from "./ui/Button";
import { Link, useNavigate } from "react-router";
import { Tables } from "../types/supabase";
import useAddToCart from "../hooks/cart/useAddToCart";
import useAddToWishlist from "../hooks/wishlist/useAddToWishlist";
import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";

type ProductProps = {
  product: Tables<"product_data">;
};

export default function Product({ product }: ProductProps) {
  const {
    id,
    product_image,
    product_name,
    product_category,
    product_description,
    product_price,
  } = product;

  const { addToCart, isPending } = useAddToCart();
  const { addToWishlist, isPending: isAdding } = useAddToWishlist();
  const { userData } = useGetCurrentUser();
  const navigate = useNavigate();

  function handleAddToCart() {
    if (!userData?.user.id) navigate("/auth/signin");

    addToCart({
      user_id: userData?.user.id || "",
      productId: id,
      price: product_price || 0,
      quantity: 1,
    });
  }
  function handleAddToWishlist() {
    if (!userData?.user.id) navigate("/auth/signin");
    addToWishlist({
      user_id: userData?.user.id || "",
      productId: id,
      price: product_price || 0,
      quantity: 1,
    });
  }
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product-details/${id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product_image || "no image available"}
            alt={product_name || "productName"}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-[#c56cf0] text-white text-xs font-bold px-2 py-1 rounded capitalize">
            {product_category}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product-details/${id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-[#c56cf0] transition-colors line-clamp-2 h-14">
            {product_name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">
          {product_description}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-[#c56cf0]">₹{product_price}</p>
          <Button
            variant="secondary"
            className="text-black"
            title="add to wishlist"
            onClick={handleAddToWishlist}
            disabled={isAdding}
          >
            <HeartIcon />
          </Button>
        </div>

        <Button
          className="mt-4 w-full bg-[#c56cf0] hover:bg-[#b15bd6] text-lg text-white py-2 flex items-center justify-center gap-2"
          onClick={handleAddToCart}
          disabled={isPending}
        >
          Add to cart <ShoppingCart />
        </Button>
      </div>
    </div>
  );
}
