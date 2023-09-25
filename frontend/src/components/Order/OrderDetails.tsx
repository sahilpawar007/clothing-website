import { useState } from "react";
import Heading from "../UI/OrderDetails/Heading";
import Text from "../UI/OrderDetails/Text";

type OrderStatus = "Order Placed" | "Processing" | "Shipped" | "Delivered";

type progressBarType = {
  [key in OrderStatus]: string;
};

const OrderDetails = () => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("Order Placed"); // Assuming default status is 'Order Placed'

  const progressBarWidth: progressBarType = {
    "Order Placed": "w-0",
    "Processing": "w-1/3",
    "Shipped": "w-[68.5%]",
    "Delivered": "w-full%"
  };

  return (
    <div className=" my-10">
      <div className="flex my-5 mx-12">
        <div className="flex w-full justify-start items-center">
          <h1 className="text-3xl font-bold text-gray-900">Order #54879</h1>
          <button onClick={() => setOrderStatus("Shipped")}>
            Set Status
          </button>
        </div>
        <div className="flex w-full justify-end items-center">
          <p className="text-sm px-2 font-medium text-gray-500">Order placed</p>
          <p className="text-sm font-bold text-gray-500">March 22,2021</p>
        </div>
      </div>

      <div className="bg-white  h-[500px] border-2 border-gray-200 drop-shadow-lg rounded-lg mx-10">
        <div className="bg-white flex h-80 mx-auto border-b-2 border-gray-200 ">
          {/* Image */}
          <div className="my-auto w-1/5 mx-auto  border-r-2 border-gray-200 ">
            <div className="  mx-auto w-fit bg-red-700 lg:aspect-none group-hover:opacity-75 lg:h-52">
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                alt="Front of men&#039;s Basic Tee in black."
                className="h-full w-full mx-auto items-center"
              />
            </div>
          </div>
          <div className="w-4/5  flex justify-evenly sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">

            {/* Title */}

            <div className=" w-1/2   space-y-2 border-r-2 border-gray-200">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Black T-Shirt
              </h2>
              <h3 className="text-xl font-medium tracking-tight text-gray-900">
                $40.00
              </h3>
              <div className="space-y-6">
                <Text text="The Basic Tee 6-Pack allows you to fully express your vibrant
                  personality with three grayscale options. Feeling adventurous?
                  Put on a heather gray tee. Want to be a trendsetter? Try our
                  exclusive colorway: &quot;Black&quot;. Need to add an extra
                  pop of color to your outfit? Our white tee has you covered." />
              </div>
            </div>

            {/* Address */}

            <div className="  w-1/4 ml-10 space-y-2 ">
              <Heading heading="Delivery Address" />

              <div className="space-y-2">
                <Text text="Floyd Miles" />
                <Text text="7363 Cynthia Pass Toronto,s" />
                <Text text="ON N3Y 4H8" />
              </div>
            </div>

            {/* Shipping Info */}
            <div className=" ml-10  w-1/4 space-y-2">
              <Heading heading="Shipping Updates" />
              <div className="space-y-2">
                <Text text="vegeta@gmail.com" />
                <Text text="+91 9898989898" />
              </div>
            </div>
          </div>
        </div>
        <div className="m-10">
          <p className="text-sm font-medium tracking-tight text-gray-900">
            Preparing to ship on March 24, 2021
          </p>

          <div className="w-full my-5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-100">
            <div
              className={`bg-blue-600 h-2.5 rounded-full ${progressBarWidth[orderStatus]}`}
            ></div>

            <div className="flex my-2">
              <div className="flex justify-start w-full m-0 items-center">
                <p className="text-sm font-medium tracking-tight text-gray-900">
                  Order Placed
                </p>
                <p className="text-sm ml-[50%] font-medium tracking-tight text-gray-900">
                  Processing
                </p>
              </div>

              <div className="flex w-full justify-end items-center">
                <p className="text-sm mr-[50%] font-medium tracking-tight text-gray-900">
                  Shipped
                </p>
                <p className="text-sm font-medium tracking-tight text-gray-900">
                  Delivered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
