import React, { useState } from "react";
import SalesManagerNav from "../../componnets/SalesManager/SalesManagerNav";
import SalesManagerHeadBar from "../../componnets/SalesManager/SalesManagerHeadBar";

const filterSales = [
  {
    _id: "1",
    salesID: "S001",
    salesDate: "2024-12-01",
    customerName: "John Doe",
  },
  {
    _id: "2",
    salesID: "S002",
    salesDate: "2024-12-02",
    customerName: "Jane Smith",
  },
  {
    _id: "3",
    salesID: "S003",
    salesDate: "2024-12-03",
    customerName: "Alice Johnson",
  },
  {
    _id: "4",
    salesID: "S004",
    salesDate: "2024-12-04",
    customerName: "Robert Brown",
  },
  {
    _id: "5",
    salesID: "S005",
    salesDate: "2024-12-05",
    customerName: "Emily Davis",
  },
];

export default function Sales() {
  const [search, setSearch] = useState(""); // Initialize search state

  return (
    <div>
      <div className="flex">
        <div>
          <SalesManagerNav />
        </div>
        <div className="w-screen">
          <div className="flex justify-between pt-8 pb-8 pl-5">
            <div>
              <h1 className="text-4xl font-semibold">Sales</h1>
            </div>
            <div className="mr-5">
              <SalesManagerHeadBar />
            </div>
          </div>
          <div>
            <div>
              <hr />

              <div className="flex m-5 ml-7">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Sales ID, Date, or Customer Name..."
                  className="w-full max-w-lg p-3 text-sm border-2 border-gray-300  rounded-lg shadow-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="m-7">
                <table className="w-full border-4 border-collapse border-gray-100 table-auto">
                  <thead>
                    <tr className="bg-gray-300 h-[60px]">
                      <th className="p-2 border border-gray-400">Sales ID</th>
                      <th className="p-2 border border-gray-400 ">
                        Sales Date
                      </th>
                      <th className="p-2 border border-gray-400 ">
                        Customer Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-50">
                    {filterSales
                      .filter((sale) => {
                        const lowerCaseSearch = search.toLowerCase();
                        return (
                          search === "" ||
                          sale.salesID
                            .toLowerCase()
                            .includes(lowerCaseSearch) ||
                          sale.salesDate
                            .toLowerCase()
                            .includes(lowerCaseSearch) ||
                          sale.customerName
                            .toLowerCase()
                            .includes(lowerCaseSearch)
                        );
                      })
                      .map((sale) => (
                        <tr
                          key={sale._id}
                          className="hover:bg-gray-200 hover:border-l-4 hover:border-gray-600 transition duration-150 ease-in-out h-[50px]"
                        >
                          <td className="p-2 border border-gray-400">
                            {sale.salesID}
                          </td>
                          <td className="p-2 border border-gray-400">
                            {sale.salesDate}
                          </td>
                          <td className="p-2 border border-gray-400">
                            {sale.customerName}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
