import { useQuery } from "@tanstack/react-query";
import { fetchWishlistItem } from "../../services/serviceses";

export function useFetchWishlistItem(productId: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist", productId],
    queryFn: () => fetchWishlistItem(productId),
  });

  return { data, isLoading };
}
