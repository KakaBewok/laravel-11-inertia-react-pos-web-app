import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import Product from "@/interfaces/Product";
import { Trash2 } from "lucide-react";
import ImageNotFound from "../../../../../public/images/image-not-found.jpg";
import { CompleteProduct } from "./order-form";
import { BASE_URL } from "@/constants";

interface OrderSummaryProps {
    products: Product[];
    selectedItems: CompleteProduct[];
    setSelectedItems: (arg: CompleteProduct[]) => void;
    adjustQuantity: (itemClicked: Product, amount: number) => void;
    removeItem: (itemClicked: Product) => void;
    totalItems: number;
    form: any;
}

const OrderSummary = ({
    products,
    selectedItems,
    setSelectedItems,
    adjustQuantity,
    removeItem,
    totalItems,
    form,
}: OrderSummaryProps) => {
    if (products.length < 1) localStorage.removeItem("selectedItems");
    return (
        <div className="w-full ">
            <div className="order-summary">
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <h1 className="mb-2 text-lg font-bold">
                            Order Summary
                        </h1>
                        <Button
                            type="button"
                            size={"sm"}
                            variant="outline"
                            onClick={() => setSelectedItems([])}
                            className={`${
                                selectedItems.length < 1 ? "hidden" : ""
                            } text-white bg-red-500  hover:bg-red-500 hover:text-white hover:opacity-85`}
                        >
                            Clear Items
                        </Button>
                    </div>
                </div>

                {selectedItems.length > 0 && products.length > 0 ? (
                    <>
                        {/* ORDER ITEMS */}
                        <div className="flex flex-col justify-start gap-3 lg:gap-6 lg:p-6 h-80 md:h-[548px] dark:bg-gray-950 bg-gray-100 overflow-y-scroll p-3 rounded-sm">
                            {selectedItems.map((item) => (
                                <div
                                    className="relative flex items-center justify-center w-full gap-3 p-2 rounded-md shadow-sm lg:gap-5 lg:p-4 dark:bg-slate-800 dark:shadow-none shadow-slate-300 bg-slate-50"
                                    key={item.id}
                                >
                                    {/* SELECTED ITEMS IMAGE */}
                                    <div className="w-1/3 h-[87px] overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-85">
                                        {item.photos?.length === 0 ? (
                                            <img
                                                alt="Image not found"
                                                src={ImageNotFound}
                                                className="object-cover object-center w-full h-full"
                                            />
                                        ) : (
                                            <img
                                                alt="item image"
                                                src={`${BASE_URL}/storage/${item.photos?.[0].photo}`}
                                                className="object-cover object-center w-full h-full"
                                            />
                                        )}
                                    </div>
                                    {/* SELECTED ITEMS DESC */}
                                    <div
                                        className="flex flex-col items-start justify-start w-2/3 gap-3"
                                        key={item.id}
                                    >
                                        <div className="mr-1">
                                            <h3 className="mb-1 font-medium leading-none text-md">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm font-light text-slate-500">
                                                Rp.{" "}
                                                {(
                                                    item.price *
                                                    item.stock_quantity
                                                ).toLocaleString("id-ID")}
                                            </p>
                                        </div>

                                        {/* SELECTED ITEMS BUTTONS */}
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-start w-full lg:justify-end"
                                        >
                                            <div className="flex items-center justify-between w-2/3 rounded-md lg:w-24 bg-slate-200 text-slate-700">
                                                <Button
                                                    variant={"ghost"}
                                                    type="button"
                                                    className="bg-slate-200 hover:bg-slate-200 dark:hover:text-slate-600"
                                                    onClick={() =>
                                                        adjustQuantity(item, -1)
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <span className="text-sm font-medium">
                                                    {item.stock_quantity}
                                                </span>
                                                <Button
                                                    variant={"ghost"}
                                                    className="bg-slate-200 hover:bg-slate-200 dark:hover:text-slate-600"
                                                    type="button"
                                                    onClick={() =>
                                                        adjustQuantity(item, 1)
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* REMOVE ITEM */}
                                    <Button
                                        className="absolute flex items-center justify-center w-5 h-5 p-2 text-white bg-red-500 rounded-full lg:w-6 lg:h-6 hover:opacity-85 hover:bg-red-500 hover:text-white lg:-right-2 lg:-top-2 -top-1 -right-1"
                                        type="button"
                                        onClick={() => removeItem(item)}
                                    >
                                        <span className="text-xs leading-none">
                                            X
                                        </span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                        {/* PRICING */}
                        <div className="flex flex-col items-start justify-start w-full gap-3 p-5 my-10 bg-gray-200 rounded-md shadow-md md:my-6 dark:bg-slate-950 text-slate-500">
                            <div className="flex justify-between w-full text-xs lg:text-sm ">
                                <p>Total items</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-300">
                                    {Number(totalItems)}x
                                </p>
                            </div>
                            <div className="flex justify-between w-full text-xs lg:text-sm">
                                <p>Subtotal</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-300">
                                    Rp.{" "}
                                    {form
                                        .getValues("total_amount")
                                        .toLocaleString("id-ID")}
                                </p>
                            </div>
                            <div className="flex justify-between w-full text-xs lg:text-sm">
                                <p>Tax</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-300">
                                    + 0
                                </p>
                            </div>
                            <div className="flex justify-between w-full text-xs lg:text-sm">
                                <p>Discount</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-300">
                                    - 0
                                </p>
                            </div>
                            <Separator className="bg-slate-300 dark:bg-slate-800" />
                            <div className="flex justify-between w-full font-bold text-md text-slate-900 dark:text-slate-300">
                                <p>Total</p>
                                <p>
                                    Rp.{" "}
                                    {form
                                        .getValues("total_amount")
                                        .toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <h1 className="py-6 text-center text-slate-500">
                        No order.
                    </h1>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;
