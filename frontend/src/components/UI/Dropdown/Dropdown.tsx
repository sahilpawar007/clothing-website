import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
// import DropdownMenuItem from "./DropdownMenuItem";

interface dropdownName {
  Name: string;
  enableHoverEffect: boolean;
  children?: React.ReactNode;
}

const Dropdown: React.FC<dropdownName> = ({
  Name,
  enableHoverEffect,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const products = () => {
    navigate("/products")
  }
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        {() => (
          <>
            <div>
              <Menu.Button
                onMouseEnter={() => enableHoverEffect && setIsOpen(true)}
                onMouseLeave={() => enableHoverEffect && setIsOpen(false)}
                onClick={products}
                className="text-gray-900 border-transparent border-2 hover:border-2 hover:border-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-xl font-medium flex"
              >
                {Name}
                <ChevronDownIcon
                  className="w-5 h-6 flex justify-center mt-1"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              show={isOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-200"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                onMouseEnter={() => enableHoverEffect && setIsOpen(true)}
                onMouseLeave={() => enableHoverEffect && setIsOpen(false)}
                className="absolute left-0 z-40 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {children}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};

export default Dropdown;
