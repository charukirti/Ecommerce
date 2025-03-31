import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWishlistItem } from "../../services/serviceses";
import toast from "react-hot-toast";

type wishlistProp = {
  userId: string;
  quantity: number;
  productId: number;
};

export function useUpdateWishlist() {
  const queryClient = useQueryClient();
  const { mutate: updateWishlist, isPending } = useMutation({
    mutationFn: ({ userId, quantity, productId }: wishlistProp) =>
      updateWishlistItem(userId, quantity, productId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["wishlistItem", variables.productId],
      });
      toast.success("Wishlist updated successfully!");
    },
    onError: () => {
      toast.error("Unable to update wishlist!");
    },
  });

  return { updateWishlist, isPending };
}
