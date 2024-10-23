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
import { Textarea } from "@/Components/ui/textarea";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Expense from "@/interfaces/Expense";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Category must contain at least 3 character(s)" }),
    amount: z.number().min(0, { message: "Minimal amount is 0" }),
    description: z.string().optional(),
    expense_date: z.date().refine(
        (inputDate) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            return inputDate < tomorrow;
        },
        {
            message: "The expense date cannot be tomorrow or in the future.",
        }
    ),
});

type ExpenseFormValues = z.infer<typeof formSchema>;

interface ExpenseFormProps {
    initialData?: Expense | null;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ initialData }) => {
    const { loading, setLoading } = useGlobalContext();

    const title = initialData ? "Edit expense" : "Create expense";
    const description = initialData ? "Edit an expense" : "Add a new expense";
    const toastMessage = initialData ? "Expense updated." : "Expense created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            amount: initialData?.amount || 0,
            description: initialData?.description || "",
            expense_date: initialData?.expense_date
                ? initialData.expense_date
                : new Date(),
        },
    });

    const onSubmit = (data: ExpenseFormValues) => {
        setLoading(true);

        console.log(data);

        const clearForm = () => {
            form.reset();
        };

        const handleSuccess = () => {
            clearForm();
            router.visit(route("admin.expense.index"));
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
                  route("admin.expense.update", initialData?.id),
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
            : router.post(route("admin.expense.store"), data, {
                  onSuccess: handleSuccess,
                  onError: handleError,
                  onFinish: handleFinish,
              });
    };

    return (
        <>
            <div className="flex items-center justify-between pb-5">
                <Heading title={title} description={description} />
                <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="dark:bg-slate-200 dark:text-slate-900"
                >
                    Back
                </Button>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full p-8 space-y-8 rounded-md bg-slate-50 dark:bg-gradient-to-tr md:dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
                >
                    <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                        {/* name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            fieldState.error
                                                ? "text-red-500"
                                                : "dark:text-gray-300"
                                        }
                                    >
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="dark:bg-slate-700"
                                            disabled={loading}
                                            placeholder="Strong coffee"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />

                        {/* amount */}
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            fieldState.error
                                                ? "text-red-500"
                                                : "dark:text-gray-300"
                                        }
                                    >
                                        Amount
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

                        {/* description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            fieldState.error
                                                ? "text-red-500"
                                                : "dark:text-gray-300"
                                        }
                                    >
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="w-full h-32 max-w-lg max-h-40 dark:bg-slate-700"
                                            disabled={loading}
                                            placeholder="Describe about strong coffee."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />

                        {/* expense_date */}
                        <FormField
                            control={form.control}
                            name="expense_date"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            fieldState.error
                                                ? "text-red-500"
                                                : "dark:text-gray-300"
                                        }
                                    >
                                        Expense Date
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
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        disabled={loading}
                        className="w-full lg:w-1/2"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
