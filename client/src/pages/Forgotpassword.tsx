import { SubmitHandler, useForm } from "react-hook-form";
import useResetPasswordEmail from "../hooks/auth/useResetEmail";
import { Headphones } from "lucide-react";
import { useNavigate } from "react-router";

interface ForgotpasswordInput {
  email: string;
}

export default function Forgotpassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotpasswordInput>();

  const { sendEmail, sending } = useResetPasswordEmail();

  // const navigate = useNavigate()

  const onSubmit: SubmitHandler<ForgotpasswordInput> = (data) => {
    const { email } = data;

    sendEmail(email);

    // navigate('/signin')
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
            <span>
              <Headphones size={30} />
            </span>
            AudioSphere
          </h1>
          <h1 className="text-2xl font-bold mt-4">
            Enter your email to reset password
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
          <button
            type="submit"
            className="w-full mt-4 text-xl font-semibold bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send password reset email"}
          </button>
        </form>
      </div>
    </section>
  );
}
