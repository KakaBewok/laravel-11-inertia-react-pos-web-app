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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import OrderSummary from "./order-summary";
import ProductCards from "./product-cards";

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

export type CompleteProduct = Product & {
    photos?: Photo[];
};
interface OrderFormProps {
    initialData?:
        | (Order & {
              products: string[];
          })
        | null;
    paymentMethods: PaymentMethod[];
    products: CompleteProduct[];
}

export const OrderForm: React.FC<OrderFormProps> = ({
    initialData,
    paymentMethods,
    products,
}) => {
    const { loading, setLoading } = useGlobalContext();
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isCash, setIsCash] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<CompleteProduct[]>([]);
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
            localStorage.removeItem("selectedItems");
            localStorage.removeItem("formData");
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

    // calculating total price per item
    useEffect(() => {
        const totalPrice = selectedItems.reduce(
            (acc, item) => acc + item.price * item.stock_quantity,
            0
        );
        const totalItems = selectedItems.reduce(
            (acc, item) => acc + item.stock_quantity,
            0
        );
        form.setValue("total_amount", totalPrice);
        setTotalItems(totalItems);
    }, [selectedItems, form.setValue]);

    const watchedFormValues = form.watch();
    // Load data from localStorage
    useEffect(() => {
        const storedItems = localStorage.getItem("selectedItems");
        const storedFormData = localStorage.getItem("formData");

        if (storedItems) {
            setSelectedItems(JSON.parse(storedItems));
        }
        if (storedFormData) {
            form.reset(JSON.parse(storedFormData));
        }
    }, []);
    // Save data from localStorage
    useEffect(() => {
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }, [selectedItems]);
    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(watchedFormValues));
    }, [watchedFormValues]);

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
            <ProductCards
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredProducts={filteredProducts}
                addItem={addItem}
            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full p-8 space-y-8 rounded-md bg-slate-50 dark:bg-gradient-to-tr md:dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
                >
                    <div className="grid w-full grid-cols-1 gap-4 md:gap-20 md:grid-cols-2">
                        <OrderSummary
                            selectedItems={selectedItems}
                            adjustQuantity={adjustQuantity}
                            removeItem={removeItem}
                            totalItems={totalItems}
                            form={form}
                        />

                        {/* 
                        'payment_method_id', ---
                        'customer_name', ---
                        'order_date', ---
                        'total_amount', --- (disable)
                        'total_paid', --- manual
                        'changes', --- kondisional
                        'status', --- manual
                        'notes', ---
                        'transaction_id' --- otomatis
                        */}

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
                                                {paymentMethods
                                                    .filter(
                                                        (item) => item.status
                                                    )
                                                    .map((paymentMethod) => (
                                                        <SelectItem
                                                            key={paymentMethod.id.toString()}
                                                            value={paymentMethod.id.toString()}
                                                        >
                                                            {paymentMethod.name}
                                                        </SelectItem>
                                                    ))}
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
                                                disabled={true}
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
                                                defaultValue={"Completed"}
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
                            {/* submit button */}
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
