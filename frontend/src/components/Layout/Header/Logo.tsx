import logo from "../../../images/rzln.png";

const Logo = () => {
  return (
    <div className="flex flex-shrink-0 justify-center items-center mt-1">
      <a href="/" title="logo">
        <img
          className="h-8 w-auto flex"
          src={logo}
          alt="Your Company"
        />
      </a>
    </div>
  );
};

export default Logo;
