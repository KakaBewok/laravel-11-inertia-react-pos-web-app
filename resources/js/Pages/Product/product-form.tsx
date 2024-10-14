"use client";

import * as z from "zod";
import { Button } from "@/Components/ui/button";
import { Heading } from "@/Components/ui/heading";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Form,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { toast } from "react-toastify";
import { AlertModal } from "@/Components/AlertModal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Textarea } from "@headlessui/react";

const formSchema = z.object({
    name: z.string().min(3),
    price: z.coerce.number().min(1),
    category_id: z.string().min(1),
    description: z.string().min(3).optional(),
    unit: z.string().min(1),
    stock_quantity: z.coerce.number().min(1),
    photos: z
        .array(
            z.union([
                z
                    .instanceof(File)
                    .refine(
                        (file) =>
                            ["image/jpeg", "image/png", "image/jpg"].includes(
                                file.type
                            ),
                        {
                            message:
                                "Only .jpg, .jpeg, and .png formats are accepted",
                        }
                    )
                    .refine((file) => file.size <= 700 * 1024, {
                        message: "File size must be less than 700KB",
                    }),
                z.string(), // Accept string type as well
            ])
        )
        .optional(),
});

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    unit: string;
    stock_quantity: number;
    category_id: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
}

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    initialData?:
        | (Product & {
              photos: string[];
          })
        | null;
    categories: Category[];
}

const urlToFile = async (
    url: string,
    fileName: string,
    mimeType: string
): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
};

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
}) => {
    const [photoFiles, setPhotoFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { loading, setLoading } = useGlobalContext();
    const [open, setOpen] = useState(false);

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product" : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            price: initialData?.price || 0,
            category_id: initialData?.category_id || "",
            description: initialData?.description || "",
            unit: initialData?.unit || "",
            stock_quantity: initialData?.stock_quantity || 0,
            photos: initialData?.photos,
        },
    });

    useEffect(() => {
        const convertUrlsToFiles = async () => {
            if (initialData && initialData.photos.length > 0) {
                const files = await Promise.all(
                    initialData.photos.map((photoUrl, index) => {
                        const filePath = `${
                            import.meta.env.VITE_APP_URL
                        }/${photoUrl}`;
                        return urlToFile(
                            filePath,
                            `photo-${index}.jpg`,
                            "image/jpeg"
                        );
                    })
                );

                setPhotoFiles(files);

                const dt = new DataTransfer();
                files.forEach((file) => dt.items.add(file));
                if (fileInputRef.current) {
                    fileInputRef.current.files = dt.files;
                }
                form.setValue("photos", files);
            }
        };

        convertUrlsToFiles();
    }, [initialData, form]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setPhotoFiles([...photoFiles, ...files]);
            form.setValue("photos", [...photoFiles, ...files]); // Update form state
        }
    };

    const removePhotoFile = (index: number) => {
        const updatedPhotoFiles = photoFiles.filter((_, i) => i !== index);
        setPhotoFiles(updatedPhotoFiles);
        form.setValue("photos", updatedPhotoFiles);

        const dt = new DataTransfer();
        updatedPhotoFiles.forEach((file) => dt.items.add(file));
        if (fileInputRef.current) {
            fileInputRef.current.files = dt.files;
        }
        form.setValue("photos", updatedPhotoFiles);
    };

    const onSubmit = (data: ProductFormValues) => {
        console.log("data dari form", data);
        form.reset();
        setPhotoFiles([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full p-5 space-y-8 rounded-md bg-slate-50"
                >
                    <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
                        {/* name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Arabica coffe beans"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* price */}
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
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* category */}
                        <FormField
                            control={form.control}
                            name="category_id"
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
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* unit */}
                        <FormField
                            control={form.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        placeholder="Select a unit"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Gram">
                                                    Gram
                                                </SelectItem>
                                                <SelectItem value="Kilogram">
                                                    Kilogram
                                                </SelectItem>
                                                <SelectItem value="Pcs">
                                                    Pcs
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* stock_quantity */}
                        <FormField
                            control={form.control}
                            name="stock_quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={loading}
                                            placeholder="Description of Arabica coffe beans like size, color etc."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* images */}
                        <FormField
                            control={form.control}
                            name="photos"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <Input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            accept="image/jpeg, image/png, image/jpg"
                                            onChange={handlePhotoChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Preview Images */}
                        <div>
                            <div className="flex flex-wrap items-center justify-evenly">
                                {photoFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt="Uploaded"
                                            className="w-20 h-20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removePhotoFile(index)
                                            }
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
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
