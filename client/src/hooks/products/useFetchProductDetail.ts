import { useQuery } from "@tanstack/react-query";
import { fetchProductDetails } from "../../services/serviceses";


export function useFetchProductDetail(id: number) {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", id],
      queryFn: () => fetchProductDetails(id!),
  });

  return { productDetail: data, isLoading, isError };
}
