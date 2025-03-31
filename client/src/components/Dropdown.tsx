import { Heart, LogOut, ShoppingBag } from "lucide-react";
import Button from "./ui/Button";
import { useNavigate } from "react-router";
import useLogout from "../hooks/auth/useLogout";
import { SetStateAction } from "react";
type DropdownProps = {
  setDropdownOpen: (value: SetStateAction<boolean>) => void;
};
export default function Dropdown({ setDropdownOpen }: DropdownProps) {
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800 z-50">
      <Button
        variant="secondary"
        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
        onClick={() => {
          navigate("/wishlist");
          setDropdownOpen(false);
        }}
      >
        <Heart className="h-4 w-4 mr-2" />
        Wishlit
      </Button>
      <Button
        variant="secondary"
        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
        onClick={() => {
          navigate("/orders");
          setDropdownOpen(false);
        }}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        Orders
      </Button>
      <div className="border-t border-gray-200 my-1"></div>
      <Button
        variant="secondary"
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center"
        onClick={() => {
          logout();
          setDropdownOpen(false);
        }}
        disabled={isPending}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}
