"use client";

import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Heading } from "@/Components/ui/heading";
import { Input } from "@/Components/ui/input";
import { Switch } from "@/Components/ui/switch";
import { Textarea } from "@/Components/ui/textarea";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import PaymentMethod from "@/interfaces/PaymentMethod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../../../config";

//  "name", "bank_name", "bank_logo", "qris_image", "status";

interface FilesToProcessType {
    key: "bank_logo" | "qris_image";
    ref: React.RefObject<HTMLInputElement>;
    setFile: (file: File) => void;
}

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must contain at least 3 character(s)" }),
    bank_name: z
        .string()
        .min(3, { message: "Bank name must contain at least 3 character(s)" }),
    status: z.boolean({
        required_error: "Status is required",
        invalid_type_error: "Status must be a boolean",
    }),
    description: z.string().optional(),
    bank_logo: z
        .union([
            z
                .instanceof(File)
                .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
                    message: "Bank logo must be jpg, jpeg, png or webp formats",
                })
                .refine((file) => file.size <= MAX_FILE_SIZE * 1024, {
                    message: `Bank logo is more than ${MAX_FILE_SIZE}KB`,
                }),
            z.string(),
        ])
        .optional(),
    qris_image: z
        .union([
            z
                .instanceof(File)
                .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
                    message:
                        "QRIS Image must be jpg, jpeg, png or webp formats",
                })
                .refine((file) => file.size <= MAX_FILE_SIZE * 1024, {
                    message: `QRIS Image is more than ${MAX_FILE_SIZE}KB`,
                }),
            z.string(),
        ])
        .optional(),
});

type PaymentMethodFormValues = z.infer<typeof formSchema>;

const urlToFile = async (
    url: string,
    fileName: string,
    mimeType: string
): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
};

export const PaymentMethodForm = ({
    initialData,
}: {
    initialData?: PaymentMethod | null;
}) => {
    const [bankLogoFile, setBankLogoFile] = useState<File | undefined>();
    const [qrisImageFile, setQrisImageFile] = useState<File>();
    const bankLogoInputRef = useRef<HTMLInputElement | null>(null);
    const qrisImageInputRef = useRef<HTMLInputElement | null>(null);
    const { loading, setLoading } = useGlobalContext();

    const title = initialData ? "Edit payment method" : "Create payment method";
    const description = initialData
        ? "Edit a payment method"
        : "Add a new payment method";
    const toastMessage = initialData
        ? "Payment method updated."
        : "Payment method created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<PaymentMethodFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            bank_name: initialData?.bank_name || "",
            description: initialData?.description || "",
            status: initialData?.status || false,
            bank_logo: initialData?.bank_logo,
            qris_image: initialData?.qris_image,
        },
    });

    useEffect(() => {
        const convertUrlsToFiles = async () => {
            const filesToProcess: FilesToProcessType[] = [
                {
                    key: "bank_logo",
                    ref: bankLogoInputRef,
                    setFile: setBankLogoFile,
                },
                {
                    key: "qris_image",
                    ref: qrisImageInputRef,
                    setFile: setQrisImageFile,
                },
            ];

            if (initialData?.bank_logo || initialData?.qris_image) {
                for (const fileData of filesToProcess) {
                    const imageUrl = initialData?.[fileData.key];
                    if (imageUrl) {
                        const randomId =
                            Math.floor(Math.random() * 90000) + 10000;
                        const filePath = `${
                            import.meta.env.VITE_APP_URL
                        }/storage/${imageUrl}`;
                        const file = await urlToFile(
                            filePath,
                            `${fileData.key}-${randomId}.jpg`,
                            "image/jpeg"
                        );
                        fileData.setFile(file);

                        const dt = new DataTransfer();
                        dt.items.add(file);
                        if (fileData.ref.current) {
                            fileData.ref.current.files = dt.files;
                        }
                        form.setValue(fileData.key, file);
                    }
                }
            }
        };

        convertUrlsToFiles();
    }, [initialData, form]);

    const handleBankLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            setBankLogoFile(file);
            form.setValue("bank_logo", bankLogoFile);
        }
    };

    const handleQrisImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            setQrisImageFile(file);
            form.setValue("qris_image", qrisImageFile);
        }
    };

    // const removePhotoFile = (index: number) => {
    //     const updatedPhotoFiles = photoFiles.filter((_, i) => i !== index);
    //     setPhotoFiles(updatedPhotoFiles);

    //     const dt = new DataTransfer();
    //     updatedPhotoFiles.forEach((file) => dt.items.add(file));
    //     if (fileInputRef.current) {
    //         fileInputRef.current.files = dt.files;
    //     }
    //     form.setValue("photos", updatedPhotoFiles);
    // };

    // const onSubmit = (data: ProductFormValues) => {
    //     setLoading(true);

    //     const clearForm = () => {
    //         form.reset();
    //         setPhotoFiles([]);
    //         if (fileInputRef.current) {
    //             fileInputRef.current.value = "";
    //         }
    //     };

    //     const handleSuccess = () => {
    //         clearForm();
    //         router.visit(route("admin.product.index"));
    //         setTimeout(() => {
    //             toast.success(toastMessage, {
    //                 position: "top-center",
    //             });
    //         }, 1000);
    //     };

    //     const handleError = (error: any) => {
    //         console.log("An error occurred: ", error);
    //     };

    //     const handleFinish = () => setLoading(false);

    //     initialData
    //         ? router.post(
    //               route("admin.product.update", initialData?.id),
    //               {
    //                   ...data,
    //                   _method: "PATCH",
    //               },
    //               {
    //                   onSuccess: handleSuccess,
    //                   onError: handleError,
    //                   onFinish: handleFinish,
    //               }
    //           )
    //         : router.post(route("admin.product.store"), data, {
    //               onSuccess: handleSuccess,
    //               onError: handleError,
    //               onFinish: handleFinish,
    //           });
    // };

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
            <Form {...form}>
                <form
                    // onSubmit={form.handleSubmit(onSubmit)}
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
                                            placeholder="Bank transfer"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />

                        {/* bank name */}
                        <FormField
                            control={form.control}
                            name="bank_name"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            fieldState.error
                                                ? "text-red-500"
                                                : "dark:text-gray-300"
                                        }
                                    >
                                        Bank Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="dark:bg-slate-700"
                                            disabled={loading}
                                            placeholder="Bank Central Asia (BCA)"
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
                                            placeholder="Account number: 0894387263"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />

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
                                        Active
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={loading}
                                            aria-readonly
                                        />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* bank_logo */}
                    <div className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="bank_logo"
                            render={({ fieldState }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            fieldState.error
                                                ? "text-red-500"
                                                : "dark:text-gray-300"
                                        }
                                    >
                                        Bank Logo
                                    </FormLabel>
                                    <FormDescription>
                                        Upload image up to {MAX_FILE_SIZE}
                                        KB (jpg, jpeg, png, webp only).
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            className="w-full md:w-[48%] dark:bg-slate-700"
                                            ref={bankLogoInputRef}
                                            type="file"
                                            accept="image/jpeg, image/png, image/jpg, image/webp"
                                            onChange={handleBankLogoChange}
                                        />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />

                        {/* Preview Images */}
                        <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
                            <div className="relative overflow-hidden border rounded-md shadow-md dark:border-gray-200 border-slate-300 w-52 h-52">
                                {bankLogoFile && (
                                    <img
                                        src={URL.createObjectURL(bankLogoFile)}
                                        alt="Uploaded"
                                        className="object-cover w-full h-full"
                                    />
                                )}
                                <button
                                    className="absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full top-2 right-2"
                                    type="button"
                                    // onClick={() => removePhotoFile(index)}
                                >
                                    <span className="text-xs leading-none">
                                        ✕
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* qris_image */}
                    <div className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="qris_image"
                            render={({ fieldState }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            fieldState.error
                                                ? "text-red-500"
                                                : "dark:text-gray-300"
                                        }
                                    >
                                        QRIS image
                                    </FormLabel>
                                    <FormDescription>
                                        Upload image up to {MAX_FILE_SIZE}
                                        KB (jpg, jpeg, png, webp only).
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            className="w-full md:w-[48%] dark:bg-slate-700"
                                            ref={qrisImageInputRef}
                                            type="file"
                                            accept="image/jpeg, image/png, image/jpg, image/webp"
                                            onChange={handleQrisImageChange}
                                        />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />

                        {/* Preview Images */}
                        <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
                            <div className="relative overflow-hidden border rounded-md shadow-md dark:border-gray-200 border-slate-300 w-52 h-52">
                                {qrisImageFile && (
                                    <img
                                        src={URL.createObjectURL(qrisImageFile)}
                                        alt="Uploaded"
                                        className="object-cover w-full h-full"
                                    />
                                )}
                                <button
                                    className="absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full top-2 right-2"
                                    type="button"
                                    // onClick={() => removePhotoFile(index)}
                                >
                                    <span className="text-xs leading-none">
                                        ✕
                                    </span>
                                </button>
                            </div>
                        </div>
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
