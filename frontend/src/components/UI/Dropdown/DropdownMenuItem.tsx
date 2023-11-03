import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

interface Option {
  option: string;
}
const DropdownMenuItem: React.FC<Option> = ({ option }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link to={"/"}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm"
          )}
        >
          {option}
        </Link>
      )}
    </Menu.Item>
  );
};

export default DropdownMenuItem;
