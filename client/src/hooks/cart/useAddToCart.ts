import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "../../services/serviceses";
import toast from "react-hot-toast";

type cartProp = {
  user_id: string;
  price: number;
  productId: number;
  quantity: number;
};

export default function useAddToCart() {
  const queryClient = useQueryClient();
  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: ({ user_id, productId, price, quantity }: cartProp) =>
      addProductToCart(user_id, productId, price, quantity),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cart", variables.user_id] });
      toast.success('Product added to cart successfully!')
    },
    onError: () => {
      toast.error('Unable to add Product in cart, Try again!')
    },
  });

  return { addToCart, isPending };
}
