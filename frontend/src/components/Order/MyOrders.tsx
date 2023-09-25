// import { useState } from "react";

import Dropdown from "../UI/Dropdown/Dropdown";
import DropdownMenuItem from "../UI/Dropdown/DropdownMenuItem";
import Table from "../UI/Table/Table";

const MyOrders = () => {
  return (
    <>
      <div className="my-10 mx-10">
        <div className="relative shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between pb-4">
            <Dropdown Name="Last 7 Days" enableHoverEffect={false}>
              {
                <div className="py-1">
                  <DropdownMenuItem option="Last Day" />
                  <DropdownMenuItem option="Last 7 Days " />
                  <DropdownMenuItem option="Last 30 days" />
                  <DropdownMenuItem option="Last Month" />
                  <DropdownMenuItem option="Last Year" />
                </div>
              }
            </Dropdown>
          </div>
          <Table />
        </div>
      </div>
    </>
  );
};
export default MyOrders;
