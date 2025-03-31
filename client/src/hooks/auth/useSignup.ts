import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/authSearvice";
import toast from "react-hot-toast";
import { signUpData } from "../../types/projectTypes";
import { useNavigate } from "react-router";

export default function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isPending: signingUp } = useMutation({
    mutationFn: ({ name, email, password }: signUpData) =>
      signUpApi({ name, email, password }),
    onSuccess: () => {
      toast.success("Account successfully created!");
      navigate("/auth/signin");
    },
    onError: () => {
      toast.error("There was an error while signing up, pls try again!");
    },
  });

  return { signUp, signingUp };
}
