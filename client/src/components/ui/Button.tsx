import { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "success";
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  title?: string;
  className?: string;
};

export default function Button({
  variant = "primary",
  onClick,
  disabled,
  children,
  title,
  className,
}: ButtonProps) {
  const baseStyles =
    "px-3 py-2 rounded-md font-medium transition-colors cursor-pointer";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: " transperent",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}
