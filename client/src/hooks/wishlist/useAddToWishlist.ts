import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToWishlist } from "../../services/serviceses";
import toast from "react-hot-toast";

type wishlistProp = {
  user_id: string;
  price: number;
  productId: number;
  quantity: number;
};

export default function useAddToWishlist() {
  const queryClient = useQueryClient();
  const { mutate: addToWishlist, isPending } = useMutation({
    mutationFn: ({ user_id, productId, price, quantity }: wishlistProp) =>
      addProductToWishlist(user_id, productId, price, quantity),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", variables.user_id] });
      toast.success('Product added to your wishlist!')
    },
    onError: () => {
      toast.error('There was an error while adding product to the wishlist!')
    },
  });

  return { addToWishlist, isPending };
}
