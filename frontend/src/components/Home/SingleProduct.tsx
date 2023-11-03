import { Link } from "react-router-dom";

const SingleProduct = () => {
  return (
    <div className="group relative bg-white drop-shadow-lg rounded-lg">
      <div className="aspect-h-1 aspect-w-1 mt-1 overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src="https://s3.gsxtr.com/i/p/t-shirt-tommy-hilfiger-th-cool-flag-collar-t-shirt-white-269872-1080s-1.jpg"
          alt="Front of men&#039;s Basic Tee in black."
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="my-4 flex ml-2 justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={"/product"}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              Basic Tee
            </Link>
          </h3>
          <p className="mt-1 text-lg font-medium text-gray-900">$48</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
