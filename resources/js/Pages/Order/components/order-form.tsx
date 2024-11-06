"use client";

import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Heading } from "@/Components/ui/heading";
import { Input } from "@/Components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";
import { Textarea } from "@/Components/ui/textarea";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Order from "@/interfaces/Order";
import PaymentMethod from "@/interfaces/PaymentMethod";
import Photo from "@/interfaces/Photo";
import Product from "@/interfaces/Product";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import ImageNotFound from "../../../../../public/images/image-not-found.jpg";

const formSchema = z.object({
    customer_name: z
        .string()
        .min(3, { message: "Name must contain at least 3 character(s)" }),
    order_date: z.date().refine(
        (inputDate) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            return inputDate < tomorrow;
        },
        {
            message: "Order date cannot be tomorrow or in the future.",
        }
    ),
    total_amount: z.coerce
        .number()
        .min(0, { message: "Total amount must be greater than or equal to 0" }),
    total_paid: z.coerce
        .number()
        .min(0, { message: "Total paid must be greater than or equal to 0" }),
    changes: z.coerce
        .number()
        .min(0, { message: "Changes must be greater than or equal to 0" }),
    status: z
        .string()
        .min(3, { message: "Status must contain at least 3 character(s)" }),
    notes: z.string().optional(),
    payment_method_id: z
        .string()
        .min(1, { message: "Payment method is required" }),
    products: z.array(z.string().min(2)),
});

type OrderFormValues = z.infer<typeof formSchema>;

type AllProduct = Product & {
    photos?: Photo[];
};
interface OrderFormProps {
    initialData?:
        | (Order & {
              products: string[];
          })
        | null;
    paymentMethods: PaymentMethod[];
    products: AllProduct[];
}

export const OrderForm: React.FC<OrderFormProps> = ({
    initialData,
    paymentMethods,
    products,
}) => {
    const { loading, setLoading } = useGlobalContext();
    const [isCash, setIsCash] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<AllProduct[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const title = initialData ? "Edit order" : "Create order";
    const description = initialData ? "Edit an order" : "Add a new order";
    const toastMessage = initialData ? "Order updated." : "Order created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<OrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer_name: initialData?.customer_name || "",
            order_date: initialData?.order_date || new Date(),
            total_amount: initialData?.total_amount || 0,
            total_paid: initialData?.total_paid || 0,
            changes: initialData?.changes || 0,
            status: initialData?.status || "",
            notes: initialData?.notes || "",
            payment_method_id: initialData?.payment_method_id || "",
            products: initialData?.products,
        },
    });

    const onSubmit = (data: OrderFormValues) => {
        setLoading(true);

        const clearForm = () => {
            form.reset();
        };

        const handleSuccess = () => {
            clearForm();
            router.visit(route("admin.order.index"));
            setTimeout(() => {
                toast.success(toastMessage, {
                    position: "top-center",
                });
            }, 1000);
        };

        const handleError = (error: any) => {
            console.log("An error occurred: ", error);
        };

        const handleFinish = () => setLoading(false);

        initialData
            ? router.post(
                  route("admin.order.update", initialData?.id),
                  {
                      ...data,
                      _method: "PATCH",
                  },
                  {
                      onSuccess: handleSuccess,
                      onError: handleError,
                      onFinish: handleFinish,
                  }
              )
            : router.post(route("admin.order.store"), data, {
                  onSuccess: handleSuccess,
                  onError: handleError,
                  onFinish: handleFinish,
              });
    };

    const handlePaymentMethodChange = (value: string) => {
        const selectedPaymentMethod = paymentMethods.find(
            (method) => method.id.toString() === value
        );
        setIsCash(selectedPaymentMethod?.is_cash || false);
        form.setValue("payment_method_id", value);
    };

    const adjustQuantity = (itemClicked: Product, amount: number) => {
        const product = products.find(
            (product) => product.id == itemClicked.id
        );
        if (product) {
            setSelectedItems(
                selectedItems
                    .map((item) => {
                        if (item.id === itemClicked.id) {
                            let newQuantity = item.stock_quantity + amount;
                            newQuantity = Math.min(
                                newQuantity,
                                product.stock_quantity
                            );
                            newQuantity = Math.max(newQuantity, 0);
                            return {
                                ...item,
                                stock_quantity: newQuantity,
                            };
                        }
                        return item;
                    })
                    .filter((item) => item.stock_quantity > 0)
            );
        }
    };

    const addItem = (product: Product) => {
        const existingItem = selectedItems.find(
            (item: Product) => item.id === product.id
        );
        if (existingItem) {
            setSelectedItems(
                selectedItems.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              stock_quantity: Math.min(
                                  item.stock_quantity + 1,
                                  product.stock_quantity
                              ),
                          }
                        : item
                )
            );
        } else {
            setSelectedItems([
                ...selectedItems,
                { ...product, stock_quantity: 1 },
            ]);
        }
    };

    const removeItem = (itemClicked: Product) => {
        setSelectedItems(
            selectedItems.filter((item) => item.id !== itemClicked.id)
        );
    };

    useEffect(() => {
        const total = selectedItems.reduce(
            (acc, item) => acc + item.price * item.stock_quantity,
            0
        );

        form.setValue("total_amount", total);
    }, [selectedItems, form.setValue]);

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="dark:bg-slate-200 dark:text-slate-900"
                >
                    Back
                </Button>
            </div>
            <div className="p-3 rounded-md bg-slate-100 md:p-6 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
                {/* SEARCH FIELD */}
                <div className="px-3 py-4 md:px-6">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border-gray-300 rounded-md dark:bg-slate-200 dark:text-slate-800"
                    />
                </div>
                {filteredProducts.length === 0 && (
                    <div className="mt-4 text-sm text-center text-gray-700 dark:text-slate-400">
                        No products found.
                    </div>
                )}
                {/* PRODUCT CARDS */}
                <div className="grid grid-cols-1 gap-5 p-3 overflow-y-scroll cursor-pointer md:p-6 max-h-72 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 scrollbar-hidden">
                    {filteredProducts.map((product) => (
                        <div
                            onClick={() => addItem(product)}
                            key={product.id}
                            className="relative p-3 bg-gray-100 rounded-md shadow-md group dark:bg-gray-800"
                        >
                            <div className="w-full h-40 overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-85">
                                {product.photos?.length === 0 ? (
                                    <img
                                        alt="Image not found"
                                        src={ImageNotFound}
                                        className="object-cover object-center w-full h-full"
                                    />
                                ) : (
                                    <img
                                        alt="Product image"
                                        src={`${
                                            import.meta.env.VITE_APP_URL
                                        }/storage/${product.photos?.[0].photo}`}
                                        className="object-cover object-center w-full h-full"
                                    />
                                )}
                            </div>
                            <div className="flex items-start justify-between mt-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-50">
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                        />
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">
                                        Rp.{" "}
                                        {product.price.toLocaleString("id-ID")}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-slate-400">
                                    {product.stock_quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full p-8 space-y-8 rounded-md bg-slate-50 dark:bg-gradient-to-tr md:dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
                >
                    <div className="grid w-full grid-cols-1 gap-4 md:gap-20 md:grid-cols-2">
                        {/* ORDER SUMMARY */}
                        <div className="w-full ">
                            <div className="order-summary">
                                <div className="mb-4">
                                    <h1 className="mb-2 text-lg font-bold">
                                        Order Summary
                                    </h1>
                                    <Separator className="dark:bg-slate-700 bg-slate-300" />
                                </div>

                                {selectedItems.length > 0 ? (
                                    <>
                                        {/* ORDER ITEMS */}
                                        <div className="flex flex-col justify-start gap-3 lg:gap-6 lg:p-6 h-80 md:h-[548px] dark:bg-gray-950 bg-gray-100 overflow-y-scroll p-3 rounded-sm">
                                            {selectedItems.map((item) => (
                                                <div
                                                    className="flex items-center justify-center w-full gap-3 p-2 rounded-md shadow-sm lg:gap-5 lg:p-4 dark:bg-slate-800 dark:shadow-none shadow-slate-300 bg-slate-50"
                                                    key={item.id}
                                                >
                                                    {/* SELECTED ITEMS IMAGE */}
                                                    <div className="w-1/3 h-[87px] overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-85">
                                                        {item.photos?.length ===
                                                        0 ? (
                                                            <img
                                                                alt="Image not found"
                                                                src={
                                                                    ImageNotFound
                                                                }
                                                                className="object-cover object-center w-full h-full"
                                                            />
                                                        ) : (
                                                            <img
                                                                alt="item image"
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_APP_URL
                                                                }/storage/${
                                                                    item
                                                                        .photos?.[0]
                                                                        .photo
                                                                }`}
                                                                className="object-cover object-center w-full h-full"
                                                            />
                                                        )}
                                                    </div>
                                                    <div
                                                        className="flex flex-col items-start justify-start w-2/3 gap-3"
                                                        key={item.id}
                                                    >
                                                        <div>
                                                            <h3 className="mb-1 font-medium text-md">
                                                                {item.name}
                                                            </h3>
                                                            <p className="text-sm font-light text-slate-500">
                                                                Rp.{" "}
                                                                {(
                                                                    item.price *
                                                                    item.stock_quantity
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}
                                                            </p>
                                                        </div>

                                                        <div
                                                            key={item.id}
                                                            className="flex items-center justify-start w-full gap-2 lg:justify-end lg:gap-3"
                                                        >
                                                            <div className="flex items-center justify-between w-full rounded-md lg:w-24 bg-slate-200 text-slate-700">
                                                                <Button
                                                                    variant={
                                                                        "ghost"
                                                                    }
                                                                    type="button"
                                                                    className="bg-slate-200 hover:bg-slate-200 dark:hover:text-slate-600"
                                                                    onClick={() =>
                                                                        adjustQuantity(
                                                                            item,
                                                                            -1
                                                                        )
                                                                    }
                                                                >
                                                                    -
                                                                </Button>
                                                                <span className="text-sm font-medium">
                                                                    {
                                                                        item.stock_quantity
                                                                    }
                                                                </span>
                                                                <Button
                                                                    variant={
                                                                        "ghost"
                                                                    }
                                                                    className="bg-slate-200 hover:bg-slate-200 dark:hover:text-slate-600"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        adjustQuantity(
                                                                            item,
                                                                            1
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </Button>
                                                            </div>
                                                            <Button
                                                                variant="destructive"
                                                                className="px-2 py-1 bg-red-500 dark:bg-red-500"
                                                                type="button"
                                                                onClick={() =>
                                                                    removeItem(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <Trash2
                                                                    width={18}
                                                                    height={18}
                                                                />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* PRICING */}
                                        <div className="flex flex-col items-start justify-start w-full gap-3 p-5 my-10 bg-gray-100 rounded-md md:my-6 dark:bg-slate-950 text-slate-500">
                                            <div className="flex justify-between w-full text-xs lg:text-sm ">
                                                <p>Total items</p>
                                                <p className="font-semibold text-slate-900 dark:text-slate-300">
                                                    543x
                                                </p>
                                            </div>
                                            <div className="flex justify-between w-full text-xs lg:text-sm">
                                                <p>Subtotal</p>
                                                <p className="font-semibold text-slate-900 dark:text-slate-300">
                                                    Rp. 34.000
                                                </p>
                                            </div>
                                            <div className="flex justify-between w-full text-xs lg:text-sm">
                                                <p>Tax (11%)</p>
                                                <p className="font-semibold text-slate-900 dark:text-slate-300">
                                                    + Rp. 934.000
                                                </p>
                                            </div>
                                            <div className="flex justify-between w-full text-xs text-green-600 lg:text-sm">
                                                <p>Discount</p>
                                                <p className="font-semibold">
                                                    - Rp. 34.000
                                                </p>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between w-full font-bold text-md text-slate-900 dark:text-slate-300">
                                                <p>Total</p>
                                                <p>Rp. 344.000</p>
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
                        {/* CHECKOUT FORM */}
                        <div className="flex flex-col w-full gap-4">
                            <div className="mb-4">
                                <h1 className="mb-2 text-lg font-bold">
                                    Form Checkout
                                </h1>
                                <Separator className="dark:bg-slate-700 bg-slate-300" />
                            </div>

                            {/* customer name */}
                            <FormField
                                control={form.control}
                                name="customer_name"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500"
                                                    : "dark:text-gray-300"
                                            }
                                        >
                                            Customer name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:bg-slate-700"
                                                disabled={loading}
                                                placeholder="Panjul"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* notes */}
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500"
                                                    : "dark:text-gray-300"
                                            }
                                        >
                                            Notes
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="w-full h-32 max-w-lg max-h-40 dark:bg-slate-700"
                                                disabled={loading}
                                                placeholder="....."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* order_date */}
                            <FormField
                                control={form.control}
                                name="order_date"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500"
                                                    : "dark:text-gray-300"
                                            }
                                        >
                                            Order date
                                        </FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start gap-3 p-5 text-left font-normal dark:bg-slate-600 dark:hover:bg-slate-600",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon />
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* payment method */}
                            <FormField
                                control={form.control}
                                name="payment_method_id"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500"
                                                    : "dark:text-gray-300"
                                            }
                                        >
                                            Payment method
                                        </FormLabel>
                                        <Select
                                            disabled={loading}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                handlePaymentMethodChange(
                                                    value
                                                );
                                            }}
                                            value={field.value.toString()}
                                            defaultValue={field.value.toString()}
                                        >
                                            <FormControl className="dark:bg-slate-700">
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        defaultValue={field.value.toString()}
                                                        placeholder="Select a payment method"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {paymentMethods.map(
                                                    (paymentMethod) => (
                                                        <SelectItem
                                                            key={paymentMethod.id.toString()}
                                                            value={paymentMethod.id.toString()}
                                                        >
                                                            {paymentMethod.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* total amount */}
                            <FormField
                                control={form.control}
                                name="total_amount"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500"
                                                    : "dark:text-gray-300"
                                            }
                                        >
                                            Total amount
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:bg-slate-700"
                                                type="number"
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* total paid */}
                            <FormField
                                control={form.control}
                                name="total_paid"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500"
                                                    : "dark:text-gray-300"
                                            }
                                        >
                                            Total paid
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:bg-slate-700"
                                                type="number"
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* changes */}
                            {isCash && (
                                <FormField
                                    control={form.control}
                                    name="changes"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={
                                                    fieldState.error
                                                        ? "text-red-500"
                                                        : "dark:text-gray-300"
                                                }
                                            >
                                                Changes
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="dark:bg-slate-700"
                                                    type="number"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="dark:text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {/* status */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={
                                                fieldState.error
                                                    ? "text-red-500"
                                                    : "dark:text-gray-300"
                                            }
                                        >
                                            Status
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={loading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormControl className="dark:bg-slate-700">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue
                                                            defaultValue={
                                                                field.value
                                                            }
                                                            placeholder="Select a status"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Completed">
                                                        Completed
                                                    </SelectItem>
                                                    <SelectItem value="Pending">
                                                        Pending
                                                    </SelectItem>
                                                    <SelectItem value="Cancelled">
                                                        Cancelled
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                disabled={loading}
                                className="w-full mt-10"
                                type="submit"
                            >
                                {action}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
};

// store order

// public function store(Request $request)
// {
//     $items = $request->items;

//     \DB::transaction(function () use ($items) {
//         $order = Order::create();

//         foreach ($items as $item) {
//             $product = Product::find($item['id']);

//             // Cek stok produk
//             if ($product->stock < $item['quantity']) {
//                 throw new \Exception("Stok tidak mencukupi untuk produk {$product->name}");
//             }

//             // Kurangi stok produk
//             $product->reduceStock($item['quantity']);

//             // Simpan item order
//             $order->items()->create([
//                 'product_id' => $product->id,
//                 'quantity' => $item['quantity'],
//                 'price' => $product->price
//             ]);
//         }
//     });

//     return response()->json(['status' => 'success', 'order_id' => $order->id]);
// }
