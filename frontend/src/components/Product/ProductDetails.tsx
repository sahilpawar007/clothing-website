import { lazy, Suspense } from "react";
import CreateReview from "./CreateReview";
import Reviews from "./Reviews";
import { useState } from 'react'
import Nav from "../UI/Products/Nav";
import Images from "../UI/Products/Images";
import Description from "../UI/Products/Description";
const Review = lazy(() => import("../UI/Products/Review"));
const RecommendedProducts = lazy(() => import("./RecommendProducts"));
import Colors from "../UI/Products/Colors";
import Sizes from "../UI/Products/Sizes";
import Button from "../User/UI/Button";
import SizeEnable from "../UI/Products/SizeEnable";
import SizeDisable from "../UI/Products/SizeDisable";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";

const ProductDetails = () => {

  const [isCardVisible, setIsCardVisible] = useState(false);

  const showReviewCard = () => {
    setIsCardVisible(true);
  };
  const closeReviewCard = () => {
    setIsCardVisible(false);
  };

  const disable = "cursor-not-allowed bg-gray-50 text-gray-200"
  const enable = "cursor-pointer bg-white text-gray-900 shadow-sm"

  return (
    <>{isCardVisible && (
      <CreateReview closeReviewCard={closeReviewCard} isVisible={isCardVisible} />
    )}
      <div className="bg-white">
        <div className="pt-6">
          <Nav />
          <Images />
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Basic Tee 6-Pack
              </h1>
            </div>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">$192</p>
              <Suspense fallback={<Loader />}>
                <Review onClick={showReviewCard} />
              </Suspense>
              <form className="mt-10">
                <Colors />
                {/* <!-- Sizes --> */}
                <div className="my-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <Link to={"/"}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </Link>
                  </div>
                  <fieldset className="mt-4">
                    <legend className="sr-only">Choose a size</legend>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">

                      <Sizes disable={disable} value="XXS" ariaLabelledby="size-choice-0-label" ><SizeDisable /></Sizes>
                      <Sizes value="XS" ariaLabelledby="size-choice-1-label" ><SizeEnable /></Sizes>
                      <Sizes enable={enable} value="S" ariaLabelledby="size-choice-2-label" ><SizeEnable /></Sizes>
                      <Sizes enable={enable} value="M" ariaLabelledby="size-choice-3-label" ><SizeEnable /></Sizes>
                      <Sizes enable={enable} value="L" ariaLabelledby="size-choice-4-label" ><SizeEnable /></Sizes>
                      <Sizes enable={enable} value="XL" ariaLabelledby="size-choice-5-label" ><SizeEnable /></Sizes>
                      <Sizes enable={enable} value="2XL" ariaLabelledby="size-choice-6-label" ><SizeEnable /></Sizes>
                      <Sizes enable={enable} value="3XL" ariaLabelledby="size-choice-7-label" ><SizeEnable /></Sizes>
                    </div>
                  </fieldset>
                </div>
                <Button buttonName="Add to bag" />
              </form>
            </div>
            <Description />
          </div>
        </div>
        <Reviews />
        <Suspense fallback={<Loader />}><RecommendedProducts /></Suspense>

      </div>
    </>
  );
};

export default ProductDetails;
