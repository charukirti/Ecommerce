import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "../../services/authSearvice";
import toast from "react-hot-toast";

export default function useResetPasswordEmail() {
  const { mutate: sendEmail, isPending: sending } = useMutation({
    mutationFn: (email: string) => sendPasswordResetEmail(email),
    onSuccess: () =>
      toast.success("Password reset email sent! Check your inbox."),
    onError: (error) =>
      toast.error(error.message || "something went wrong!"),
  });

  return { sendEmail, sending };
}
