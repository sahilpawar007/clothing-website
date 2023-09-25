// import React from 'react'

import SingleProduct from "../Home/SingleProduct";

const RecommendedProducts = () => {
  return (
    <div className="bg-white drop-shadow-lg rounded-lg m-10 ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          You Might Like
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array(8).fill(null).map((_, idx) => <SingleProduct key={idx} />)}

        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
