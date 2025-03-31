import { useQuery } from "@tanstack/react-query";
import { fetchCartData } from "../../services/serviceses";
import toast from "react-hot-toast";

export function useFetchCart(user_id: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", user_id],
    queryFn: () => fetchCartData(user_id),
    enabled: !!user_id,
  });
  if (isError) toast.error("There was an error while fetching cart items");
  return { data, isLoading };
}
