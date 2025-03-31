import { useQuery } from "@tanstack/react-query";
import { fetchCartItem } from "../../services/serviceses";

export function useFetchCartItem(productId: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["cart", productId],
    queryFn: () => fetchCartItem(productId),
  });

  return { data, isLoading };
}
