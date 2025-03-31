import { useMutation } from "@tanstack/react-query";
import { resetUserPassword } from "../../services/authSearvice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useResetPassword() {
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending: resetting } = useMutation({
    mutationFn: (newPassword: string) => resetUserPassword(newPassword),
    onSuccess: () => {
      toast.success("Password reseted successfully!");
      navigate("/auth/signin");
    },
    onError: () => toast.error("Something went wrong, try again"),
  });

  return { resetPassword, resetting };
}
