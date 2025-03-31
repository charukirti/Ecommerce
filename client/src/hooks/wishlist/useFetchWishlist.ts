import { useQuery } from "@tanstack/react-query";
import { fetchWishlistData } from "../../services/serviceses";


export function useFetchWishlist(user_id: string) {
  const { data:wishlists, isLoading, isError } = useQuery({
    queryKey: ["wishlist", user_id],
    queryFn: () => fetchWishlistData(user_id),
  });
  if (isError) throw new Error("Something went wrong");
  return { wishlists, isLoading };
}
