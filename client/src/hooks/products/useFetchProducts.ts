import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/serviceses";
import toast from "react-hot-toast";

export function useFetchProducts(category?: string, searchQuery?: string) {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", category, searchQuery],
    queryFn: () => fetchProducts(category, searchQuery),
  });

  if (error) toast.error("There was an error while fetching products");

  return { products, isLoading };
}
