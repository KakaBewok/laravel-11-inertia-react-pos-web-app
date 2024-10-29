import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Heading } from "@/Components/ui/heading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Order from "@/interfaces/Order";
import PaymentMethod from "@/interfaces/PaymentMethod";
import { router } from "@inertiajs/react";
import { format } from "date-fns";

const OrderDetails = ({
    order,
    paymentMethod,
}: {
    order: Order;
    paymentMethod: PaymentMethod;
}) => {
    const { loading, setLoading } = useGlobalContext();

    const handleEditOrder = () => {
        setLoading(true);
        router.get(
            route("admin.order.edit", order.id),
            {},
            {
                onFinish: () => setLoading(false),
            }
        );
    };

    // id: string; --- 0
    // customer_name: string; ----0
    // payment_method_id: string; -----0
    // order_date: Date; --- 0
    // total_amount: number; ---0
    // total_paid: number; ---0
    // changes: number; ----0
    // status: "pending" | "cancelled" | "completed";

    return (
        <>
            <div className="flex items-center justify-between pt-6 pb-10">
                <Heading
                    title="Details order"
                    description="All about your order"
                />
                <div className="flex items-center gap-3">
                    <Button
                        disabled={loading}
                        variant="ghost"
                        className="h-8 p-0 w-9 bg-amber-400 hover:bg-amber-500"
                        onClick={handleEditOrder}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="edit-alt"
                            className="fill-current"
                            width="21"
                            height="21"
                            fill="none"
                        >
                            <path
                                fill="#F9F9FC"
                                d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
                            ></path>
                        </svg>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="dark:bg-slate-200 dark:text-slate-900"
                    >
                        Back
                    </Button>
                </div>
            </div>
            <div className="rounded-lg flex flex-col md:flex-row justify-between bg-slate-50 dark:bg-slate-600">
                <div className="flex-1 p-6 space-y-6 md:p-7">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">
                        {order.customer_name}
                    </h1>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Payment method:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {paymentMethod.name}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Total amount:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {order.total_amount}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Total paid:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {order.total_paid}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            changes:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {order.changes}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Order date:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {format(new Date(order.order_date), "dd MMMM yyyy")}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Transaction id:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {order.id}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50 mb-1">
                            Status:{" "}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                            <Badge
                                variant="default"
                                className={`${
                                    order.status === "completed"
                                        ? "bg-green-500 dark:text-white hover:bg-green-500 hover:text-white"
                                        : order.status === "pending"
                                        ? "bg-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white"
                                        : "bg-red-500 dark:text-white hover:bg-red-500 hover:text-white"
                                } px-3 py-1 text-sm rounded-sm`}
                            >
                                {order.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                {/* <div className="flex-1 flex flex-col gap-5 items-center justify-center w-full p-5 md:flex-row">
                    <div className="w-full h-full overflow-hidden border rounded-sm shadow-sm dark:border-gray-400 border-gray-200">
                        {paymentMethod.bank_logo ? (
                            <img
                                src={`${import.meta.env.VITE_APP_URL}/storage/${
                                    paymentMethod.bank_logo
                                }`}
                                alt="Bank Logo"
                                className="object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"
                            />
                        ) : (
                            <img
                                src={ImageNotFound}
                                alt="No image uploaded"
                                className="object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"
                            />
                        )}
                    </div>
                    <div className="w-full h-full overflow-hidden border rounded-sm shadow-sm dark:border-gray-400 border-gray-200">
                        {paymentMethod.qris_image ? (
                            <img
                                src={`${import.meta.env.VITE_APP_URL}/storage/${
                                    paymentMethod.qris_image
                                }`}
                                alt="QRIS image"
                                className="object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"
                            />
                        ) : (
                            <img
                                src={ImageNotFound}
                                alt="No image uploaded"
                                className="object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"
                            />
                        )}
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default OrderDetails;
