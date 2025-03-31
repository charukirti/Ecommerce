import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItem } from "../../services/serviceses";
import toast from "react-hot-toast";

type cartProp = {
  userId: string;
  quantity: number;
  productId: number;
};

export function useUpdateCart() {
  const queryClient = useQueryClient();
  const { mutate: updateCart, isPending } = useMutation({
    mutationFn: ({ userId, quantity, productId }: cartProp) =>
      updateCartItem(userId, quantity, productId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cart", variables.userId] });
      queryClient.invalidateQueries({
        queryKey: ["cart", variables.productId],
      });
      toast.success("Cart item updated successfully!");
    },
    onError: () => {
      toast.error("There was an error while updating cart item!");
    },
  });

  return { updateCart, isPending };
}
