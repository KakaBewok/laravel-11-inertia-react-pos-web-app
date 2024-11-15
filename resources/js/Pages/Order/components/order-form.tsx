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
import SelectedItem from "@/interfaces/SelectedItem";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { BankTransferCard } from "./bank-transfer-card";
import OrderSummary from "./order-summary";
import ProductCards from "./product-cards";
import { QrModal } from "./qr-modal";

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
});

type OrderFormValues = z.infer<typeof formSchema>;

export type CompleteProduct = Product & {
    photos?: Photo[];
};

interface OrderFormProps {
    initialData?:
        | (Order & {
              selectedItems: SelectedItem[];
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
    const [paymentMethodName, setPaymentMethodName] = useState<string | null>(
        null
    );
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(
        initialData && initialData.selectedItems
            ? initialData.selectedItems
            : []
    );
    const [searchTerm, setSearchTerm] = useState<string>("");
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            product.stock_quantity > 0
    );
    const [isCreateAnother, setIsCreateAnother] = useState<boolean>(false);
    const title = initialData ? "Edit order" : "Create order";
    const description = initialData ? "Edit an order" : "Add a new order";
    const toastMessage = initialData ? "Order updated." : "Order created.";
    const action = initialData ? "Save changes" : "Create";

    const defaultFormValues = {
        customer_name: "",
        order_date: new Date(),
        total_amount: totalPrice,
        changes: 0,
        status: "",
        notes: "",
        payment_method_id: "",
    };

    const form = useForm<OrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer_name: initialData?.customer_name || "",
            order_date: initialData?.order_date || new Date(),
            total_amount: initialData?.total_amount || totalPrice,
            changes: initialData?.changes || 0,
            status: initialData?.status || "",
            notes: initialData?.notes || "",
            payment_method_id: initialData?.payment_method_id || "",
        },
    });

    const watchedFormValues = form.watch();

    const onSubmit = (data: OrderFormValues) => {
        setLoading(true);

        const clearForm = () => {
            form.reset();
            localStorage.removeItem("selectedItems");
            localStorage.removeItem("formData");
            localStorage.removeItem("paymentMethodName");
        };

        const handleSuccess = () => {
            isCreateAnother
                ? router.visit(route("admin.order.create"))
                : router.visit(route("admin.order.index"));

            setTimeout(() => {
                toast.success(toastMessage, {
                    position: "top-center",
                });
                clearForm();
            }, 1000);
        };

        const handleError = (error: any) => {
            Object.keys(error).forEach((key) => {
                const message = error[key];
                toast.error(message, {
                    position: "top-center",
                });
            });
        };

        const handleFinish = () => setLoading(false);

        initialData
            ? router.post(
                  route("admin.order.update", initialData?.id),
                  {
                      ...data,
                      items: [
                          ...selectedItems.map((item) => ({
                              product_id: item.id,
                              quantity: item.quantity,
                          })),
                      ],
                      _method: "PATCH",
                  },
                  {
                      onSuccess: handleSuccess,
                      onError: handleError,
                      onFinish: handleFinish,
                  }
              )
            : router.post(
                  route("admin.order.store"),
                  {
                      ...data,
                      items: [
                          ...selectedItems.map((item) => ({
                              product_id: item.id,
                              quantity: item.quantity,
                          })),
                      ],
                  },
                  {
                      onSuccess: handleSuccess,
                      onError: handleError,
                      onFinish: handleFinish,
                  }
              );
    };

    const handlePaymentMethodChange = (value: string) => {
        const selectedPaymentMethod = paymentMethods.find(
            (method) => method.id.toString() === value
        );
        setPaymentMethodName(selectedPaymentMethod?.name ?? null);
    };

    const adjustQuantity = (itemClicked: SelectedItem, amount: number) => {
        const product = products.find(
            (product) => product.id == itemClicked.id
        );
        if (product) {
            setSelectedItems(
                selectedItems
                    .map((item) => {
                        if (item.id === itemClicked.id) {
                            let newQuantity = item.quantity + amount;
                            newQuantity = Math.min(
                                newQuantity,
                                product.stock_quantity
                            );
                            newQuantity = Math.max(newQuantity, 0);
                            return {
                                ...item,
                                quantity: newQuantity,
                            };
                        }
                        return item;
                    })
                    .filter((item) => item.quantity > 0)
            );
        }
    };

    const addItem = (product: CompleteProduct) => {
        const existingItem = selectedItems.find(
            (item: SelectedItem) => item.id === product.id
        );
        if (existingItem) {
            setSelectedItems(
                selectedItems.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity: Math.min(
                                  item.quantity + 1,
                                  product.stock_quantity
                              ),
                          }
                        : item
                )
            );
        } else {
            setSelectedItems([
                ...selectedItems,
                {
                    id: product.id,
                    product_name: product.name,
                    price: product.price,
                    unit: product.unit,
                    quantity: 1,
                    total_price: product.price,
                    photos: product.photos,
                },
            ]);
        }
    };

    const removeItem = (itemClicked: SelectedItem) => {
        setSelectedItems(
            selectedItems.filter((item) => item.id !== itemClicked.id)
        );
    };

    // calculating total price per item
    useEffect(() => {
        const totalPrice = selectedItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        const totalItems = selectedItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        );
        form.setValue("total_amount", totalPrice);
        setTotalPrice(totalPrice);
        setTotalItems(totalItems);
    }, [selectedItems, form.setValue]);

    // Load data from localStorage
    useEffect(() => {
        if (!initialData) {
            const storedItemsCache = localStorage.getItem("selectedItems");
            const storedFormDataCache = localStorage.getItem("formData");
            const paymentMethodNameCache =
                localStorage.getItem("paymentMethodName");

            if (storedItemsCache) {
                const parsedItems = JSON.parse(storedItemsCache);
                const filteredItems = parsedItems.filter((item: Product) =>
                    products.some((product) => product.id === item.id)
                );
                setSelectedItems(filteredItems);
            }
            if (storedFormDataCache) {
                const parsedData = JSON.parse(storedFormDataCache);
                if (parsedData.order_date) {
                    parsedData.order_date = new Date(parsedData.order_date);
                }
                form.reset(parsedData);
            }
            if (paymentMethodNameCache) {
                setPaymentMethodName(
                    JSON.parse(paymentMethodNameCache) ?? null
                );
            }
        }
    }, []);

    // Save data to localStorage
    useEffect(() => {
        if (!initialData) {
            localStorage.setItem(
                "selectedItems",
                JSON.stringify(selectedItems)
            );
            localStorage.setItem("formData", JSON.stringify(watchedFormValues));
            localStorage.setItem(
                "paymentMethodName",
                JSON.stringify(paymentMethodName)
            );
        }
    }, [selectedItems, watchedFormValues]);

    // check form values
    const isFormEmpty = (
        Object.keys(defaultFormValues) as (keyof typeof defaultFormValues)[]
    ).every((key) => {
        const defaultValue = defaultFormValues[key];
        const currentValue = watchedFormValues[key];

        if (defaultValue instanceof Date && currentValue instanceof Date) {
            return defaultValue.toDateString() === currentValue.toDateString();
        }

        return currentValue === defaultValue;
    });

    const clearFormValue = () => {
        form.reset(defaultFormValues);
        setPaymentMethodName("");
    };

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
                            products={products}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                            adjustQuantity={adjustQuantity}
                            removeItem={removeItem}
                            totalItems={totalItems}
                            form={form}
                        />
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex items-baseline justify-between">
                                <h1 className="text-lg font-bold ">
                                    Form Checkout
                                </h1>
                                <Button
                                    type="button"
                                    size={"sm"}
                                    variant="outline"
                                    onClick={() => clearFormValue()}
                                    className={`${
                                        isFormEmpty ? "hidden" : ""
                                    } text-white bg-red-500 hover:bg-red-500 hover:text-white hover:opacity-85`}
                                >
                                    Clear Form
                                </Button>
                            </div>

                            <Separator className="bg-slate-300 dark:bg-slate-700" />

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
                                            <span className="text-red-500">
                                                *
                                            </span>
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
                                            Order Date
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

                            {/* total amount */}
                            <div className="hidden">
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
                            </div>

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
                                            <span className="text-red-500">
                                                *
                                            </span>
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
                                                            {paymentMethod.name ==
                                                            "Cash"
                                                                ? ""
                                                                : ` - ${paymentMethod.bank_name}`}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Conditional Rendering for Payment Methods */}
                            {(() => {
                                switch (paymentMethodName) {
                                    case "Cash":
                                        return (
                                            <FormField
                                                control={form.control}
                                                name="changes"
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
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
                                                                disabled={
                                                                    loading
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="dark:text-red-500" />
                                                    </FormItem>
                                                )}
                                            />
                                        );

                                    case "QRIS":
                                        return (
                                            <>
                                                <Button
                                                    onClick={() =>
                                                        setIsVisible(true)
                                                    }
                                                    type="button"
                                                    variant="outline"
                                                    className="text-white bg-sky-500 hover:bg-sky-500 hover:text-white hover:opacity-85"
                                                >
                                                    Show QR code
                                                </Button>
                                                <QrModal
                                                    paymentMethodId={form.getValues(
                                                        "payment_method_id"
                                                    )}
                                                    paymentMethods={
                                                        paymentMethods
                                                    }
                                                    isVisible={isVisible}
                                                    onClose={() =>
                                                        setIsVisible(false)
                                                    }
                                                />
                                            </>
                                        );

                                    case "Bank Transfer":
                                        return (
                                            <BankTransferCard
                                                paymentMethodId={form.getValues(
                                                    "payment_method_id"
                                                )}
                                                paymentMethods={paymentMethods}
                                            />
                                        );

                                    default:
                                        return null;
                                }
                            })()}

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
                                            Payment Status
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={loading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={"completed"}
                                            >
                                                <FormControl className="dark:bg-slate-700">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue
                                                            defaultValue={
                                                                field.value
                                                            }
                                                            placeholder="Select a payment status"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="completed">
                                                        Completed
                                                    </SelectItem>
                                                    <SelectItem value="pending">
                                                        Pending
                                                    </SelectItem>
                                                    <SelectItem value="cancelled">
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
                            <div className="flex flex-col items-center justify-between w-full gap-4 mt-5 lg:flex-row">
                                <Button
                                    disabled={loading}
                                    className="w-full"
                                    type="submit"
                                    onClick={() => setIsCreateAnother(false)}
                                >
                                    {action}
                                </Button>
                                <Button
                                    disabled={loading}
                                    className={`${
                                        initialData ? "hidden" : ""
                                    } w-full bg-slate-300 text-slate-950 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200`}
                                    type="submit"
                                    onClick={() => setIsCreateAnother(true)}
                                >
                                    Create & Create another
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
};
