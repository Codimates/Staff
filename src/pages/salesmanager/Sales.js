import { useEffect, useState } from "react";
import SalesManagerNav from "../../componnets/SalesManager/SalesManagerNav";
import SalesManagerHeadBar from "../../componnets/SalesManager/SalesManagerHeadBar";
import axios from "axios";

export default function Sales() {
  const [salesData, setSalesData] = useState([]);
  const [search, setSearch] = useState(""); // Initialize search state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order/getordersispayedtrue");
        const orders = response.data?.data || [];

        // Process data for the table
        const formattedData = orders.map((order) => ({
          salesID: order._id,
          salesDate: new Date(order.createdAt).toLocaleDateString(),
          customerName: "Placeholder Customer", // Replace with actual customer name if available
          products: order.products.map((product) => ({
            quantity: product.quantity,
            unit_price: product.unit_price,
            total_price: product.total_price,
          })),
        }));

        setSalesData(formattedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

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
            <hr />
            <div className="flex m-5 ml-7">
              {/* Search bar */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Sales ID,Unit price or Total Price"
                className="w-full max-w-lg p-3 text-sm border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black"
              />
            </div>
            <div className="m-7">
              <table className="w-full border-4 border-collapse border-gray-100 table-auto">
                <thead>
                  <tr className="bg-gray-300 h-[60px]">
                    <th className="p-2 border border-gray-400">Quantity</th>
                    <th className="p-2 border border-gray-400">Unit Price</th>
                    <th className="p-2 border border-gray-400">Total Price</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50">
                  {salesData
                    .filter((sale) => {
                      const lowerCaseSearch = search.toLowerCase();

                      // Check salesID, salesDate, customerName
                      const isSaleMatch =
                        sale.salesID.toLowerCase().includes(lowerCaseSearch) ||
                        sale.salesDate
                          .toLowerCase()
                          .includes(lowerCaseSearch) ||
                        sale.customerName
                          .toLowerCase()
                          .includes(lowerCaseSearch);

                      // Check product fields
                      const isProductMatch = sale.products.some((product) =>
                        [
                          product.quantity.toString(),
                          product.unit_price.toString(),
                          product.total_price.toString(),
                        ].some((field) =>
                          field.toLowerCase().includes(lowerCaseSearch)
                        )
                      );

                      return search === "" || isSaleMatch || isProductMatch;
                    })
                    .map((sale) =>
                      sale.products.map((product, index) => (
                        <tr
                          key={`${sale.salesID}-${index}`}
                          className="hover:bg-gray-200 hover:border-l-4 hover:border-gray-600 transition duration-150 ease-in-out h-[50px]"
                        >
                          <td className="p-2 border border-gray-400">
                            {product.quantity}
                          </td>
                          <td className="p-2 border border-gray-400">
                            {product.unit_price}
                          </td>
                          <td className="p-2 border border-gray-400">
                            {product.total_price}
                          </td>
                        </tr>
                      ))
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
