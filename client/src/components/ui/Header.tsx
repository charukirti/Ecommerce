import { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useFetchCart } from "../../hooks/cart/useFetchCart";
import Logo from "../Logo";
import Searchbar from "../Searchbar";
import Button from "./Button";
import { LogIn, ShoppingCart, Menu } from "lucide-react";
import useGetCurrentUser from "../../hooks/auth/useGetCurrentUser";
import Avatar from "../Avatar";

import Dropdown from "../Dropdown";
import MobileMenu from "../MobileMenu";

export default function Header() {
  const { userData } = useGetCurrentUser();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user_id = userData?.user?.id;

  const { data, isLoading } = useFetchCart(user_id ? user_id : "");
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    },
    [navigate]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#2d3436] text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="hidden md:flex items-center justify-between px-4 lg:px-12 py-2">
        <Logo />
        <div className="flex-grow mx-4 lg:mx-8">
          <Searchbar onSearch={handleSearch} />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            title="cart"
            onClick={() => navigate("/cart")}
            disabled={isLoading}
          >
            <div className="relative">
              <span className="absolute bottom-4 left-5">{data?.length}</span>
              <ShoppingCart />
            </div>
          </Button>
          {userData?.user.id ? (
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="secondary"
                title="profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Avatar />
              </Button>

              {dropdownOpen && <Dropdown setDropdownOpen={setDropdownOpen} />}
            </div>
          ) : (
            <Button
              variant="secondary"
              title="log-in"
              onClick={() => navigate("/auth/signin")}
            >
              <LogIn />
            </Button>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <Logo />
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              title="cart"
              onClick={() => navigate("/cart")}
              disabled={isLoading}
            >
              <div className="relative">
                <span className="absolute bottom-4 left-5">{data?.length}</span>
                <ShoppingCart />
              </div>
            </Button>
            <Button
              variant="secondary"
              title="menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <MobileMenu
            setDropdownOpen={setDropdownOpen}
            userData={userData}
            handleSearch={handleSearch}
          />
        )}
      </div>
    </header>
  );
}
