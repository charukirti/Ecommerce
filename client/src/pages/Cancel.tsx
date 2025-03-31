import { useNavigate } from "react-router";
import Button from "../components/ui/Button";

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
      <h2 className="text-2xl font-bold text-red-700">Payment Canceled ❌</h2>
      <p className="text-gray-700 mt-2">Your order was not completed.</p>
      <Button
        onClick={() => navigate("/checkout")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Try Again
      </Button>
    </div>
  );
}
