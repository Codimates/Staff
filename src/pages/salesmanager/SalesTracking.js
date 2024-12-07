
import SalesManagerNav from "../../componnets/SalesManager/SalesManagerNav";
import SalesManagerHeadBar from "../../componnets/SalesManager/SalesManagerHeadBar";
import SalesTrackingCompo from "../../componnets/SalesManager/SalesTrackingCompo";








export default function Salestracking() {
  return (
    <div>
      <div className="flex ">
        <div>
          <SalesManagerNav />
        </div>
        <div className="w-screen">
          <div className="flex justify-between pt-8 pb-8 pl-5">
            <div className="">
              <h1 className="text-4xl font-semibold">Sales Tracking</h1>
            </div>

            <div className="mr-5">
              <SalesManagerHeadBar />
            </div>
          </div>
          <div>
            <hr/>
              <div className="m-7">
                <div className="flex flex-col gap-4">
                 <SalesTrackingCompo/>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
