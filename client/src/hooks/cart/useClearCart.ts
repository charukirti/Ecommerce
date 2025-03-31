import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../../services/serviceses";
import toast from "react-hot-toast";


export function useClearCart() {
  const queryClient = useQueryClient();
  const { mutate: emptyCart, isPending: isClearing } = useMutation({
    mutationFn: (userId: string) => clearCart(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success('Cart has been cleared successfully!')
    },
    onError: () => {
      toast.error('There was an error while clearing cart, Try again!')
    },
  });

  return {
    emptyCart,
    isClearing,
  };
}
