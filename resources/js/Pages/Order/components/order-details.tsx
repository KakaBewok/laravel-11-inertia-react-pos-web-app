import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Heading } from "@/Components/ui/heading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Order from "@/interfaces/Order";
import PaymentMethod from "@/interfaces/PaymentMethod";
import ProductOrdered from "@/interfaces/ProductsOrdered";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import ProductOrderTable from "./product-order-table";

interface OrderDetailsProps {
    order: Order;
    paymentMethod: PaymentMethod;
    productsOrdered: ProductOrdered[];
}

const OrderDetails = ({
    order,
    paymentMethod,
    productsOrdered,
}: OrderDetailsProps) => {
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
            <div className="rounded-lg flex flex-col lg:flex-row justify-between bg-slate-50 dark:bg-slate-600">
                <div className="flex-1 p-6 space-y-6 md:p-12">
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
                            Rp. {order.total_amount}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Total paid:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            Rp. {order.total_paid}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            changes:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            Rp. {order.changes}
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
                            {order.transaction_id}
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
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Notes:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300 w-full lg:w-2/3">
                            {order.notes ? (
                                order.notes
                            ) : (
                                <span className="text-slate-400">
                                    No notes.
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex-1 p-6 md:p-12 bg-slate-200 dark:bg-slate-700">
                    <h1 className="pb-5 font-bold text-md text-slate-700 dark:text-white">
                        List of products ordered
                    </h1>
                    {productsOrdered != null && productsOrdered.length > 0 ? (
                        <ProductOrderTable productsOrdered={productsOrdered} />
                    ) : (
                        <p className="font-normal text-center text-muted-foreground text-md">
                            No result.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
