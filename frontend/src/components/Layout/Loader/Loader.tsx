import { CSSProperties } from "react";
import { MoonLoader } from "react-spinners";

const Loader = () => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <div className=" flex h-[100vh] w-full justify-center items-center">
      <div className="item-center my-auto ">
        <MoonLoader
          color="black"
          loading={true}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loader;
