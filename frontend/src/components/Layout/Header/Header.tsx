import { useState } from "react";
import "./Header.css";
import Cart from "../../Cart/Cart";
import Logo from "./Logo";
import Dropdown from "../../UI/Dropdown/Dropdown";
import Search from "./Search";
import Icons from "./Icons";
import { useNavigate } from "react-router-dom";
import DropdownMenuItem from "../../UI/Dropdown/DropdownMenuItem";

const Header = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const navigate = useNavigate();
  const showCart = () => {
    setIsCartVisible(true);
  };

  const showLogin = () => {
    navigate("/login");
  };
  return (
    <>
      {isCartVisible && (
        <Cart isVisible={isCartVisible} hideCart={() => setIsCartVisible(false)} />
      )}
      <div className=" sticky drop-shadow-lg top-0 z-30">
        <nav className="bg-white h-20 z-10 "></nav>
        <div className="mt-[-5%] top-0 sticky mx-auto max-w-7xl z-40 px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 items-center ">
            {/* Logo to the left */}
            <Logo />

            {/* Dropdown in the center */}
            <div className="flex-1 flex justify-center space-x-4">
              <Dropdown Name="Men" enableHoverEffect={true}>
                {
                  <div className="py-1">
                    <DropdownMenuItem option="T-Shirt" />
                    <DropdownMenuItem option="T-Shirt" />
                  </div>
                }
              </Dropdown>
              <Dropdown Name="Women" enableHoverEffect={true}>
                {
                  <div className="py-1">
                    <DropdownMenuItem option="T-Shirt" />
                    <DropdownMenuItem option="T-Shirt" />
                  </div>
                }
              </Dropdown>
              <a
                href="/contact"
                className="text-gray-900 border-transparent border-2 hover:border-2 hover:border-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-xl font-medium flex"
              >
                Contact
              </a>
              <a
                href="#about"
                className="text-gray-900 border-transparent border-2 hover:border-2 hover:border-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-xl font-medium flex"
              >
                About
              </a>
            </div>

            {/* Search and icons to the right */}
            <div className="flex space-x-4">
              <Search />

              <Icons
                span={false}
                title="Login"
                onClick={showLogin}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />

              <Icons
                span={true}
                title="Cart"
                onClick={showCart}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
