import { useQuery } from "@tanstack/react-query";
import { fetchUserOrders } from "../../services/serviceses";

export default function useFetchOrders(user_id: string) {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchUserOrders(user_id),
  });

  return { orders, isError, isLoading };
}
