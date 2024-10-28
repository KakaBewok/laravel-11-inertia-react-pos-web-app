import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Heading } from "@/Components/ui/heading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import PaymentMethod from "@/interfaces/PaymentMethod";
import { router } from "@inertiajs/react";

const PaymentMethodDetails = ({
    paymentMethod,
}: {
    paymentMethod: PaymentMethod;
}) => {
    const { loading, setLoading } = useGlobalContext();

    const handleEditPaymentMethod = () => {
        setLoading(true);
        router.get(
            route("admin.payment_method.edit", paymentMethod.id),
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
                    title="Details payment method"
                    description="All about your payment method"
                />
                <div className="flex items-center gap-3">
                    <Button
                        disabled={loading}
                        variant="ghost"
                        className="h-8 p-0 w-9 bg-amber-400 hover:bg-amber-500"
                        onClick={handleEditPaymentMethod}
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 bg-slate-50 dark:bg-slate-600">
                <div className=" w-full max-w-lg p-6 space-y-6 rounded-md md:p-7">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">
                        {paymentMethod.name}
                    </h1>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Bank name:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {paymentMethod.bank_name}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Status:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {paymentMethod.status ? (
                                <Badge
                                    variant="default"
                                    className="bg-green-500 dark:text-white hover:bg-green-500 hover:text-white"
                                >
                                    Active
                                </Badge>
                            ) : (
                                <Badge
                                    variant="destructive"
                                    className="pointer-events-none dark:bg-red-500"
                                >
                                    Non-Active
                                </Badge>
                            )}
                        </p>
                    </div>
                    <div className="text-gray-800 dark:text-gray-200 ">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Description/Account number:{" "}
                        </h3>
                        <p className="text-sm leading-normal text-justify text-gray-500 md:leading-relaxed lg:leading-loose dark:text-gray-300">
                            {paymentMethod.description ? (
                                paymentMethod.description
                            ) : (
                                <span className="text-slate-400">
                                    No description.
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                {/* Image Card */}
                <div className="flex flex-col gap-6 items-center justify-around max-w-lg p-6 mx-auto rounded-lg md:flex-row md:space-y-0 md:space-x-6 md:p-8">
                    {/* Bank Logo */}
                    <div className="flex flex-col items-center space-y-4 w-full h-full">
                        <div className="relative w-full h-full overflow-hidden border rounded-md shadow-md dark:border-gray-500 border-gray-300">
                            <img
                                src={`${import.meta.env.VITE_APP_URL}/storage/${
                                    paymentMethod.bank_logo
                                }`}
                                alt="Bank Logo"
                                className="object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* QRIS Image */}
                    <div className="flex flex-col items-center space-y-4 w-full h-full">
                        <div className="relative w-full h-full overflow-hidden border rounded-md shadow-md dark:border-gray-500 border-gray-300">
                            <img
                                src={`${import.meta.env.VITE_APP_URL}/storage/${
                                    paymentMethod.qris_image
                                }`}
                                alt="QRIS Image"
                                className="object-cover w-full h-full transition-transform duration-200 transform hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentMethodDetails;
