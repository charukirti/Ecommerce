import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/authSearvice";

export default function useGetCurrentUser() {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { userData, isLoading };
}
