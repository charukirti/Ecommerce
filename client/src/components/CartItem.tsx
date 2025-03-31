import { Minus, Plus, Trash2 } from "lucide-react";
import Loader from "./Loader";
import Button from "./ui/Button";
import { useFetchCartItem } from "../hooks/cart/useFetchCartItem";
import { useUpdateCart } from "../hooks/cart/useUpdateCart";
import { useDeleteCartItem } from "../hooks/cart/useDeteleCartItem";


interface CartItemProps {
  productId: number;
  price: number;
  quantity: number;
  userId: string;
}

export default function CartItem({
  productId,
  price,
  quantity,
  userId,
}: CartItemProps) {
  const { data: cartItem, isLoading } = useFetchCartItem(productId);
  const { updateCart, isPending } = useUpdateCart();
  const { deleteItem, isPending: isDeleting } = useDeleteCartItem();

  if (isLoading) return <Loader />;

  const totalPrice = price * quantity;

  function handleQuantityChange(newQuantity: number) {
    if (newQuantity > 0) {
      updateCart({
        userId: userId,
        quantity: newQuantity,
        productId: productId,
      });
    } else {
      handleDelete()
    }
  }

  function handleDelete() {
    deleteItem({
      product_id: productId,
      userId: userId,
    });
  }

  return (
    <article className="flex items-center gap-4 p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      <img
        src={cartItem?.product_image || "fallback.svg"}
        alt={`${cartItem?.product_name}`}
        className="w-24 h-24 object-cover rounded-lg border"
        loading="lazy"
      />

      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">
            {cartItem?.product_name}
          </h3>
          <Button
            variant="secondary"
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
            aria-label="Remove item"
            disabled={isDeleting}
          >
            <Trash2 size={18} />
          </Button>
        </div>

        <dl className="grid gap-2">
          <div className="flex items-center">
            <dt className="text-gray-600 mr-1">Price:</dt>
            <dd className="font-medium">₹{price.toFixed(2)}</dd>
          </div>

          <div className="flex items-center">
            <dt className="text-gray-600 mr-2">Quantity:</dt>
            <dd className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={ isPending}
                className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </Button>
              <span className="min-w-8 text-center font-medium">
                {quantity}
              </span>
              <Button
                variant="secondary"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isPending}
                className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </Button>
            </dd>
          </div>

          <div className="flex items-center font-bold text-lg">
            <dt className="mr-1">Total:</dt>
            <dd className="text-green-700">₹{totalPrice.toFixed(2)}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
