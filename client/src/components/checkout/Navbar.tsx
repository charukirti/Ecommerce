import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="mb-8">
      <button
        onClick={() => navigate("/cart")}
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        <ChevronLeft size={16} />
        <span>Back to cart</span>
      </button>
      <h1 className="text-3xl font-bold mt-4">Checkout</h1>
    </div>
  );
}
