import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { searchProducts } from "../services/serviceses";

export function useSearchProducts(searchTerm: string) {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: !!searchTerm, // Only run query if there's a search term
  });

  if (error) toast.error("There was an error during search");

  return { products, isLoading };
}
