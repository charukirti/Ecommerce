import { Heart, LogIn, LogOut, ShoppingBag } from "lucide-react";
import Button from "./ui/Button";
import useLogout from "../hooks/auth/useLogout";
import Searchbar from "./Searchbar";
import Avatar from "./Avatar";
import { useNavigate } from "react-router";
import { SetStateAction } from "react";

type MobileMenuProps = {
  setDropdownOpen: (value: SetStateAction<boolean>) => void;

  userData: any;
  handleSearch: any;
};

export default function MobileMenu({
  setDropdownOpen,
    userData,
  handleSearch
}: MobileMenuProps) {
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();
  return (
    <div className="py-3 border-t border-gray-700">
      <div className="mb-3">
        <Searchbar onSearch={handleSearch} />
      </div>
      {userData?.user.id ? (
        <div className="flex flex-col gap-2 px-4 items-center">
          <div className="flex items-center gap-2">
            <Avatar size="2.5rem" />
            <div className="text-sm">
              {userData?.user.user_metadata?.name || userData?.user.email}
            </div>
          </div>
          <div className="flex flex-col">
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
        </div>
      ) : (
        <Button
          variant="secondary"
          title="log-in"
          className="w-full flex justify-center"
          onClick={() => navigate("/auth/signin")}
        >
          <LogIn className="mr-2" />
          <span>Log In</span>
        </Button>
      )}
    </div>
  );
}
