import React from "react";
import SalesManagerNav from "../../componnets/SalesManager/SalesManagerNav";
import SalesManagerHeadBar from "../../componnets/SalesManager/SalesManagerHeadBar";
import DashboardStatusGrid from "../../componnets/SalesManager/DashboardStatusGrid";
import SalesBarchart from "../../componnets/SalesManager/SalesBarchart";
import SalesLineChart from "../../componnets/SalesManager/SalesLineChart";

export default function SalesmanagerLanding() {
  return (
    <div>
      <div className="flex ">
        <div>
          <SalesManagerNav />
        </div>
        <div className="w-screen">
          <div className="flex justify-between pt-8 pb-8 pl-5">
            <div className="">
              <h1 className="text-4xl font-semibold">Dashboard</h1>
            </div>

            <div className="mr-5">
              <SalesManagerHeadBar />
            </div>
          </div>
          <div>
            <hr/>
              <div className="m-7">
                <div className="flex flex-col gap-4">
                  <DashboardStatusGrid />
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <SalesBarchart />
                    <SalesLineChart/>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
