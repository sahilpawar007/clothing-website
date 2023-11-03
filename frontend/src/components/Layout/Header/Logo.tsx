import { Link } from "react-router-dom";
import logo from "../../../images/rzln.png";

const Logo = () => {
  return (
    <div className="flex flex-shrink-0 justify-center items-center mt-1">
      <Link to={"/"}> <img
        className="h-8 w-auto flex"
        src={logo}
        alt="Your Company"
      /></Link>
    </div>
  );
};

export default Logo;
