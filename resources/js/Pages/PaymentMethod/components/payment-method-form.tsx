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
import urlToFile from "@/lib/file-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import {
    ACCEPTED_IMAGE_TYPES,
    BASE_URL,
    MAX_FILE_SIZE,
} from "../../../constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

interface FilesToProcessType {
    key: "bank_logo" | "qris_image";
    ref: React.RefObject<HTMLInputElement>;
    setFile: (file: File | undefined) => void;
}

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must contain at least 3 character(s)" }),
    bank_name: z.string().optional(),
    status: z.boolean({
        required_error: "Status is required",
        invalid_type_error: "Status must be a boolean",
    }),
    account_number: z.string().optional(),
    account_holder: z.string().optional(),
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

export const PaymentMethodForm = ({
    initialData,
}: {
    initialData?: PaymentMethod | null;
}) => {
    const [bankLogoFile, setBankLogoFile] = useState<File | undefined>();
    const [qrisImageFile, setQrisImageFile] = useState<File | undefined>();
    const bankLogoInputRef = useRef<HTMLInputElement | null>(null);
    const qrisImageInputRef = useRef<HTMLInputElement | null>(null);
    const [isCreateAnother, setIsCreateAnother] = useState<boolean>(false);
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
            account_number: initialData?.account_number || "",
            account_holder: initialData?.account_holder || "",
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
                        const filePath = `${BASE_URL}/storage/${imageUrl}`;
                        const file = await urlToFile(
                            filePath,
                            `${fileData.key}-${randomId}.jpg`,
                            "image/jpeg"
                        );
                        fileData.setFile(file);

                        const dt = new DataTransfer();
                        dt.items.add(file);
                        if (fileData.ref?.current) {
                            fileData.ref.current.files = dt.files;
                        }
                        form.setValue(fileData.key, file);
                    }
                }
            }
        };

        convertUrlsToFiles();
    }, [initialData, form]);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            if (key === "bank_logo") {
                setBankLogoFile(file);
                form.setValue("bank_logo", file);
            } else if (key === "qris_image") {
                setQrisImageFile(file);
                form.setValue("qris_image", file);
            }
        }
    };

    const removePhotoFile = (key: string) => {
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

        const fileData = filesToProcess.find(
            (fileData) => fileData.key === key
        );
        if (fileData && fileData?.ref.current) {
            fileData.setFile(undefined);
            fileData.ref.current.value = "";
            form.setValue(fileData.key, undefined);
        }
    };

    const onSubmit = (data: PaymentMethodFormValues) => {
        setLoading(true);

        const clearForm = () => {
            form.reset();
            setBankLogoFile(undefined);
            setQrisImageFile(undefined);
            if (bankLogoInputRef.current && qrisImageInputRef.current) {
                bankLogoInputRef.current.value = "";
                qrisImageInputRef.current.value = "";
            }
        };

        const handleSuccess = () => {
            clearForm();

            isCreateAnother
                ? router.visit(route("admin.payment_method.create"))
                : router.visit(route("admin.payment_method.index"));

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
                  route("admin.payment_method.update", initialData?.id),
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
            : router.post(route("admin.payment_method.store"), data, {
                  onSuccess: handleSuccess,
                  onError: handleError,
                  onFinish: handleFinish,
              });
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
                                        Payment Method
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl className="dark:bg-slate-700">
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        placeholder="Select a payment method"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Bank Transfer">
                                                    Bank Transfer
                                                </SelectItem>
                                                <SelectItem value="QRIS">
                                                    QRIS
                                                </SelectItem>
                                                <SelectItem value="Cash">
                                                    Cash
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl className="dark:bg-slate-700">
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        placeholder="Select a bank name"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="BCA">
                                                    BCA
                                                </SelectItem>
                                                <SelectItem value="BRI">
                                                    BRI
                                                </SelectItem>
                                                <SelectItem value="BSI">
                                                    BSI
                                                </SelectItem>
                                                <SelectItem value="BNI">
                                                    BNI
                                                </SelectItem>
                                                <SelectItem value="Mandiri">
                                                    Mandiri
                                                </SelectItem>
                                                <SelectItem value="Permata">
                                                    Permata
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />

                        {/* account number */}
                        <FormField
                            control={form.control}
                            name="account_number"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            fieldState.error
                                                ? "text-red-500"
                                                : "dark:text-gray-300"
                                        }
                                    >
                                        Account Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="dark:bg-slate-700"
                                            disabled={loading}
                                            type="number"
                                            placeholder="1330013617493"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />

                        {/* account holder */}
                        <FormField
                            control={form.control}
                            name="account_holder"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel
                                        className={
                                            fieldState.error
                                                ? "text-red-500"
                                                : "dark:text-gray-300"
                                        }
                                    >
                                        Account Holder
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="dark:bg-slate-700"
                                            disabled={loading}
                                            placeholder="PT Mencari Cinta Sejati"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="dark:text-red-500" />
                                </FormItem>
                            )}
                        />

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
                                        <FormControl>
                                            <Input
                                                className="w-full md:w-[48%] dark:bg-slate-700"
                                                ref={bankLogoInputRef}
                                                type="file"
                                                accept="image/jpeg, image/png, image/jpg, image/webp"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        e,
                                                        "bank_logo"
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Max. {MAX_FILE_SIZE}
                                            KB (jpg, jpeg, png, webp only).
                                        </FormDescription>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Preview Images */}
                            {bankLogoFile && (
                                <div className="relative overflow-hidden border rounded-md shadow-md dark:border-gray-200 border-slate-300 w-52 h-52">
                                    <img
                                        src={URL.createObjectURL(bankLogoFile)}
                                        alt="Bank logo uploaded"
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        className="absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full top-2 right-2"
                                        type="button"
                                        onClick={() =>
                                            removePhotoFile("bank_logo")
                                        }
                                    >
                                        <span className="text-xs leading-none">
                                            ✕
                                        </span>
                                    </button>
                                </div>
                            )}
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

                                        <FormControl>
                                            <Input
                                                className="w-full md:w-[48%] dark:bg-slate-700"
                                                ref={qrisImageInputRef}
                                                type="file"
                                                accept="image/jpeg, image/png, image/jpg, image/webp"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        e,
                                                        "qris_image"
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Max. {MAX_FILE_SIZE}
                                            KB (jpg, jpeg, png, webp only).
                                        </FormDescription>
                                        <FormMessage className="dark:text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Preview Images */}
                            {qrisImageFile && (
                                <div className="relative overflow-hidden border rounded-md shadow-md dark:border-gray-200 border-slate-300 w-52 h-52">
                                    <img
                                        src={URL.createObjectURL(qrisImageFile)}
                                        alt="QRIS image uploaded"
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        className="absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full top-2 right-2"
                                        type="button"
                                        onClick={() =>
                                            removePhotoFile("qris_image")
                                        }
                                    >
                                        <span className="text-xs leading-none">
                                            ✕
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>

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
                                        <div>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={loading}
                                                aria-readonly
                                            />
                                        </div>
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
