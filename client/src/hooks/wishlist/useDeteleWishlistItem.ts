import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishlistItem } from "../../services/serviceses";
import toast from "react-hot-toast";

type wishlistProp = {
  product_id: number;
  userId: string;
};

export function useDeleteWishlistItem() {
  const queryClient = useQueryClient();
  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: ({ product_id, userId }: wishlistProp) =>
      deleteWishlistItem(product_id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success('Product removed from wishlist!')
    },
    onError: () => {
      toast.error('There was an error while removing product!')
    },
  });

  return { deleteItem, isPending };
}
