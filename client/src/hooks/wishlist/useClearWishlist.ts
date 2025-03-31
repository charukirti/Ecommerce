import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearWishlist } from "../../services/serviceses";
import toast from "react-hot-toast";

export function useClearWishlist() {
  const queryClient = useQueryClient();
  const { mutate: emptyWishlist, isPending: isClearing } = useMutation({
    mutationFn: (userId: string) => clearWishlist(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", userId] });
      toast.success("Wishlist cleared successfully!");
    },
    onError: () => {
      toast.error("Unable to clear wishlist, try again!");
    },
  });

  return {
    emptyWishlist,
    isClearing,
  };
}
