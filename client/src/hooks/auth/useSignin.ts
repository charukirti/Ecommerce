import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn as signInApi } from "../../services/authSearvice";
import { signInData } from "../../types/projectTypes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useSignin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signIn, isPending: signingin } = useMutation({
    mutationFn: ({ email, password }: signInData) =>
      signInApi({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("User signed in successfully!");
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("Provided email or password is incorrect");
    },
  });

  return { signIn, signingin };
}
