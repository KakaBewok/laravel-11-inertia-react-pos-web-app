"use client";

import { Button } from "@/Components/ui/button";
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
import { Textarea } from "@/Components/ui/textarea";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Category from "@/interfaces/Category";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Category must contain at least 3 character(s)" }),
    description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
    initialData?: Category | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
    const { loading, setLoading } = useGlobalContext();
    const [isCreateAnother, setIsCreateAnother] = useState<boolean>(false);
    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category" : "Add a new category";
    const toastMessage = initialData
        ? "Category updated."
        : "Category created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
        },
    });

    const onSubmit = (data: CategoryFormValues) => {
        setLoading(true);

        const clearForm = () => {
            form.reset();
        };

        const handleSuccess = () => {
            clearForm();

            isCreateAnother
                ? router.visit(route("admin.category.create"))
                : router.visit(route("admin.category.index"));

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
                  route("admin.category.update", initialData?.id),
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
            : router.post(route("admin.category.store"), data, {
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
                                        Name{" "}
                                        <span className="text-red-500">*</span>
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
                    </div>

                    {/* submit button */}
                    <div className="flex flex-col items-center justify-between w-full gap-4 mt-10 md:w-1/2 lg:flex-row">
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
                </form>
            </Form>
        </>
    );
};
