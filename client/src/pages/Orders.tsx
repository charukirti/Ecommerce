import Loader from "../components/Loader";
import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";
import useFetchOrders from "../hooks/orders/useFetchOrders";

export default function Orders() {
  const { userData } = useGetCurrentUser();
  const { orders, isError, isLoading } = useFetchOrders(
    userData?.user.id || ""
  );

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="p-4 text-red-500">Error loading orders</div>;

  if (!orders || orders.length === 0) {
    return (
      <div className="p-4 mt-10 text-center text-gray-600 text-lg">
        You don't have any orders yet.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-16 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-[1.02]"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-semibold text-gray-800 text-lg">
                Order{" "}
                <span className="text-gray-500">
                  #{order.id.substring(0, 8)}
                </span>
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                  order.status === "completed"
                    ? "bg-green-200 text-green-800"
                    : order.status === "processing"
                    ? "bg-blue-200 text-blue-800"
                    : order.status === "cancelled"
                    ? "bg-red-200 text-red-800"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="text-sm text-gray-500 mt-3">
              Ordered on{" "}
              <span className="font-medium">
                {new Date(order.created_at).toLocaleDateString()}
              </span>{" "}
              at {new Date(order.created_at).toLocaleTimeString()}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Items</h3>
              <div className="space-y-2">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-gray-100 p-2 rounded-md"
                  >
                    <span className="text-gray-800">
                      {item.product_name} × {item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium">
                      ${item.product_price?.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t mt-4 pt-3 flex justify-between font-semibold text-gray-800 text-lg">
              <span>Total</span>
              <span>${order.total_price.toFixed(2)}</span>
            </div>

            {order.shipping_address && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Shipping Address
                </h3>
                <address className="text-sm text-gray-600 leading-relaxed">
                  {order.shipping_address.name}
                  <br />
                  {order.shipping_address.street}
                  <br />
                  {order.shipping_address.city}, {order.shipping_address.state}{" "}
                  {order.shipping_address.zip}
                </address>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
