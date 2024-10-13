"use client";

import * as z from "zod";
import { Button } from "@/Components/ui/button";
import { Heading } from "@/Components/ui/heading";
import { Separator } from "@/Components/ui/separator";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Form,
    FormMessage,
    FormDescription,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import { AlertModal } from "@/Components/AlertModal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Checkbox } from "@/Components/ui/checkbox";
import { useGlobalContext } from "@/hooks/useGlobalContext";

const formSchema = z.object({
    name: z.string().min(3),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    description: z.string().min(3).optional(),
    unit: z.string().min(1),
    stock: z.coerce.number().min(1),
    photos: z
        .array(z.instanceof(File))
        .min(1, "At least one photo is required"),
});

// interface Photo {
//     id: number;
//     photo: string;
//     product_id: string;
// }

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    unit: string;
    stock_quantity: number;
    category_id: string;
}

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    initialData:
        | (Product & {
              photos: File[];
          })
        | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
    const { loading, setLoading } = useGlobalContext();
    const [open, setOpen] = useState(false); //

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product" : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                  ...initialData,
              }
            : {
                  name: "",
                  price: 0,
                  categoryId: "",
                  description: "",
                  unit: "",
                  stock: 0,
                  photos: [],
              },
    });

    // const onSubmit = async (data: ProductFormValues) => {
    //     try {
    //         setLoading(true);

    //         if (initialData) {
    //             await axios.patch(
    //                 `/api/${params.storeId}/products/${params.productId}`,
    //                 data
    //             );
    //         } else {
    //             await axios.post(`/api/${params.storeId}/products`, data);
    //         }

    //         router.push(`/${params.storeId}/products`);
    //         router.refresh(); // for syncronize component
    //         toast.success(toastMessage);
    //     } catch (error) {
    //         toast.error("Something went wrong.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const onDelete = async () => {
    //     try {
    //         setLoading(true);

    //         await axios.delete(
    //             `/api/${params.storeId}/products/${params.productId}`
    //         );
    //         router.push(`/${params.storeId}/products`);
    //         router.refresh();

    //         toast.success("Product deleted.");
    //     } catch (error) {
    //         toast.error("Something went wrong.");
    //     } finally {
    //         setLoading(false);
    //         setOpen(false);
    //     }
    // };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => alert("delete")}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <TrashIcon className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(() => alert("submit"))}
                    className="w-full space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="photos"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    {/* <ImageUpload
                                        value={field.value.map(
                                            (image) => image.url
                                        )}
                                        disabled={loading}
                                        onChange={(url) =>
                                            field.onChange([
                                                ...field.value,
                                                { url },
                                            ])
                                        }
                                        onRemove={(url) =>
                                            field.onChange([
                                                ...field.value.filter(
                                                    (current) =>
                                                        current.url != url
                                                ),
                                            ])
                                        }
                                    /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="T-Shirt Nike Special Edition"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            placeholder="10.9"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))} */}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
