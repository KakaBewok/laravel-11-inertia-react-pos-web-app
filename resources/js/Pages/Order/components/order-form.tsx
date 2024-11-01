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
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
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
    photos: Photo[];
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
    const [selectedItems, setSelectedItems] = useState<Product[]>([]);
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
    //
    // const handleQuantityUpdate = (productId: string, newQuantity: number) => {
    //     setSelectedItems(
    //         selectedItems.map((item) =>
    //             item.id === productId
    //                 ? { ...item, quantity: newQuantity }
    //                 : item
    //         )
    //     );
    // };

    const addProduct = (product: Product) => {
        const existingItem = selectedItems.find(
            (item: Product) => item.id === product.id
        );
        if (existingItem) {
            setSelectedItems(
                selectedItems.map((item) =>
                    item.id === product.id
                        ? { ...item, stock_quantity: item.stock_quantity + 1 }
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
    //

    // TODO:
    // 1. buat tampilan product yang dibeli --- ok
    // 2. buat tampilan cards product yang akan dibeli
    // 3. buat dalam 2 column di MD

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
            <div className="bg-slate-100 dark:bg-slate-950 p-3 md:p-6 rounded-md">
                <div className="px-3 md:px-6 py-4">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-md border-gray-300 p-2 dark:bg-slate-200 dark:text-slate-800"
                    />
                </div>
                {filteredProducts.length === 0 && (
                    <div className="text-center text-sm text-gray-700 dark:text-slate-400 mt-4">
                        No products found.
                    </div>
                )}
                <div className="p-3 md:p-6 grid max-h-72 grid-cols-1 gap-x-6 gap-y-10 overflow-y-scroll sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 scrollbar-hidden">
                    {filteredProducts.map((product) => (
                        <div
                            onClick={() => addProduct(product)}
                            key={product.id}
                            className="group relative bg-gray-100 shadow-md p-3 rounded-md dark:bg-gray-700"
                        >
                            <div className="aspect-h-1 aspect-w-1 w-full h-40 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-85">
                                {product.photos.length === 0 ? (
                                    <img
                                        alt="Image not found"
                                        src={ImageNotFound}
                                        className="h-full w-full object-cover object-center"
                                    />
                                ) : (
                                    <img
                                        alt="Product image"
                                        src={`${
                                            import.meta.env.VITE_APP_URL
                                        }/storage/${product.photos[0].photo}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                )}
                            </div>
                            <div className="mt-4 flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-sm text-gray-700 dark:text-slate-50">
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                        />
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">
                                        Rp. {product.price}
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
                    <div className="w-full grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                        <div className="w-full ">
                            <div className="order-summary">
                                <div className="mb-4">
                                    <h1 className="font-bold text-lg mb-2">
                                        Order Summary
                                    </h1>
                                    <Separator className="dark:bg-slate-700 bg-slate-300" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 py-5">
                                    {selectedItems.map((item) => (
                                        <div className="w-full">
                                            <div className="mb-2">
                                                <h3 className="font-medium text-sm mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="font-light text-sm text-slate-500">
                                                    Rp.{" "}
                                                    {item.price *
                                                        item.stock_quantity}
                                                </p>
                                            </div>

                                            <div
                                                key={item.id}
                                                className="w-full rounded-md bg-slate-200 flex justify-between items-center text-slate-700"
                                            >
                                                <Button
                                                    className="bg-slate-500"
                                                    // onClick={() =>
                                                    //     adjustQuantity(item.id, -1)
                                                    // }
                                                >
                                                    -
                                                </Button>
                                                <span className="font-medium">
                                                    {item.stock_quantity}
                                                </span>
                                                {/* <input
                                                    type="number"
                                                    value={item.stock_quantity}
                                                    min="1"
                                                    onChange={(e) =>
                                                        handleQuantityUpdate(
                                                            item.id,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                /> */}
                                                <Button
                                                    className="bg-slate-500"
                                                    // onClick={() =>
                                                    //     adjustQuantity(item.id, 1)
                                                    // }
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* <button onClick={handleSubmitOrder}>
                                    Submit Order
                                </button> */}
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            <div className="mb-4">
                                <h1 className="font-bold text-lg mb-2">
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

//  const [products, setProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedItems, setSelectedItems] = useState([]);

//     useEffect(() => {
//         fetchProducts();
//     }, [searchTerm]);

//     const fetchProducts = async () => {
//         const response = await axios.get(`/products?name=${searchTerm}`);
//         setProducts(response.data.products);
//     };

//      UDAH
//     const addProduct = (product) => {
//         const existingItem = selectedItems.find(item => item.id === product.id);
//         if (existingItem) {
//             setSelectedItems(selectedItems.map(item =>
//                 item.id === product.id
//                     ? { ...item, quantity: item.quantity + 1 }
//                     : item
//             ));
//         } else {
//             setSelectedItems([...selectedItems, { ...product, quantity: 1 }]);
//         }
//     };

//     const adjustQuantity = (productId, amount) => {
//         setSelectedItems(selectedItems.map(item =>
//             item.id === productId
//                 ? { ...item, quantity: Math.max(item.quantity + amount, 0) }
//                 : item
//         ));
//     };

//     const handleSubmitOrder = async () => {
//         const response = await axios.post('/order', { items: selectedItems });
//         console.log("Order saved:", response.data.order_id);
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Cari produk..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <div className="product-list">
//                 {products.map(product => (
//                     <div key={product.id} className="product-card">
//                         <h3>{product.name}</h3>
//                         <p>Price: {product.price}</p>
//                         <button onClick={() => addProduct(product)}>Add</button>
//                     </div>
//                 ))}
//             </div>
//             <div className="order-summary">
//                 <h3>Order Summary</h3>
//                 {selectedItems.map(item => (
//                     <div key={item.id} className="selected-item">
//                         <span>{item.name}</span>
//                         <button onClick={() => adjustQuantity(item.id, -1)}>-</button>
//                         <span>{item.quantity}</span>
//                         <button onClick={() => adjustQuantity(item.id, 1)}>+</button>
//                         <span>{item.price * item.quantity}</span>
//                     </div>
//                 ))}
//                 <button onClick={handleSubmitOrder}>Submit Order</button>
//             </div>
//         </div>
//     );
// };

// export default OrderForm;

///////////

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
