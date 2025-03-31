import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../../services/serviceses";
import toast from "react-hot-toast";

type cartProp = {
  product_id: number;
  userId: string;
};

export function useDeleteCartItem() {
  const queryClient = useQueryClient();
  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: ({ product_id, userId }: cartProp) =>
      deleteCartItem(product_id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product deleted from cart successfully!");
    },
    onError: () => {
      toast.error("There was an error while deleting product from cart");
    },
  });

  return { deleteItem, isPending };
}
