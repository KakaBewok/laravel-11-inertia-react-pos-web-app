// "use client";

// import { Button } from "@/Components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/Components/ui/form";
// import { Heading } from "@/Components/ui/heading";
// import { Input } from "@/Components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/Components/ui/select";
// import { Textarea } from "@/Components/ui/textarea";
// import { useGlobalContext } from "@/hooks/useGlobalContext";
// import Order from "@/interfaces/Order";
// import PaymentMethod from "@/interfaces/PaymentMethod";
// import Product from "@/interfaces/Product";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { router } from "@inertiajs/react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import * as z from "zod";
// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../../../config";

// // "payment_method_id",
// //     "customer_name",
// //     "order_date",
// //     "total_amount",
// //     "total_paid",
// //     "changes",
// //     "status",
// //     "notes",
// //     "transaction_id";

// const formSchema = z.object({
//     customer_name: z
//         .string()
//         .min(3, { message: "Name must contain at least 3 character(s)" }),
//     order_date: z.date().refine(
//         (inputDate) => {
//             const today = new Date();
//             today.setHours(0, 0, 0, 0);

//             const tomorrow = new Date(today);
//             tomorrow.setDate(today.getDate() + 1);

//             return inputDate < tomorrow;
//         },
//         {
//             message: "Order date cannot be tomorrow or in the future.",
//         }
//     ),
//     total_amount: z.coerce
//         .number()
//         .min(0, { message: "Total amount must be greater than or equal to 0" }),
//     total_paid: z.coerce
//         .number()
//         .min(0, { message: "Total paid must be greater than or equal to 0" }),
//     changes: z.coerce
//         .number()
//         .min(0, { message: "Changes must be greater than or equal to 0" }),
//     status: z
//         .string()
//         .min(3, { message: "Status must contain at least 3 character(s)" }),
//     notes: z.string().optional(),
//     payment_method_id: z
//         .string()
//         .min(1, { message: "Payment method is required" }),
//     photos: z
//         .array(
//             z.union([
//                 z
//                     .instanceof(File)
//                     .refine(
//                         (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
//                         {
//                             message: " must be jpg, jpeg, png or webp formats",
//                         }
//                     )
//                     .refine((file) => file.size <= MAX_FILE_SIZE * 1024, {
//                         message: ` is more than ${MAX_FILE_SIZE}KB`,
//                     }),
//                 z.string(),
//             ])
//         )
//         .optional(),
// });

// type OrderFormValues = z.infer<typeof formSchema>;

// interface OrderFormProps {
//     initialData?:
//         | (Order & {
//               products: Product[];
//           })
//         | null;
//     paymentMethods: PaymentMethod[];
//     products: Product[];
// }

// export const OrderForm: React.FC<OrderFormProps> = ({
//     initialData,
//     paymentMethods,
//     products,
// }) => {
//     const { loading, setLoading } = useGlobalContext();

//     const title = initialData ? "Edit order" : "Create order";
//     const description = initialData ? "Edit an order" : "Add a new order";
//     const toastMessage = initialData ? "Order updated." : "Order created.";
//     const action = initialData ? "Save changes" : "Create";

//     const form = useForm<OrderFormValues>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: initialData?.name || "",
//             price: initialData?.price || 0,
//             category_id: initialData?.category_id || "",
//             description: initialData?.description || "",
//             unit: initialData?.unit || "",
//             stock_quantity: initialData?.stock_quantity || 0,
//             photos: initialData?.photos,
//         },
//     });

//     const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             const files = Array.from(e.target.files);
//             setPhotoFiles([...photoFiles, ...files]);
//             form.setValue("photos", [...photoFiles, ...files]);
//         }
//     };

//     const removePhotoFile = (index: number) => {
//         const updatedPhotoFiles = photoFiles.filter((_, i) => i !== index);
//         setPhotoFiles(updatedPhotoFiles);

//         const dt = new DataTransfer();
//         updatedPhotoFiles.forEach((file) => dt.items.add(file));
//         if (fileInputRef.current) {
//             fileInputRef.current.files = dt.files;
//         }
//         form.setValue("photos", updatedPhotoFiles);
//     };

//     const onSubmit = (data: ProductFormValues) => {
//         setLoading(true);

//         const clearForm = () => {
//             form.reset();
//             setPhotoFiles([]);
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }
//         };

//         const handleSuccess = () => {
//             clearForm();
//             router.visit(route("admin.product.index"));
//             setTimeout(() => {
//                 toast.success(toastMessage, {
//                     position: "top-center",
//                 });
//             }, 1000);
//         };

//         const handleError = (error: any) => {
//             console.log("An error occurred: ", error);
//         };

//         const handleFinish = () => setLoading(false);

//         initialData
//             ? router.post(
//                   route("admin.product.update", initialData?.id),
//                   {
//                       ...data,
//                       _method: "PATCH",
//                   },
//                   {
//                       onSuccess: handleSuccess,
//                       onError: handleError,
//                       onFinish: handleFinish,
//                   }
//               )
//             : router.post(route("admin.product.store"), data, {
//                   onSuccess: handleSuccess,
//                   onError: handleError,
//                   onFinish: handleFinish,
//               });
//     };

//     return (
//         <>
//             <div className="flex items-center justify-between">
//                 <Heading title={title} description={description} />
//                 <Button
//                     variant="outline"
//                     onClick={() => window.history.back()}
//                     className="dark:bg-slate-200 dark:text-slate-900"
//                 >
//                     Back
//                 </Button>
//             </div>
//             <Form {...form}>
//                 <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="w-full p-8 space-y-8 rounded-md bg-slate-50 dark:bg-gradient-to-tr md:dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
//                 >
//                     <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
//                         {/* name */}
//                         <FormField
//                             control={form.control}
//                             name="name"
//                             render={({ field, fieldState }) => (
//                                 <FormItem>
//                                     <FormLabel
//                                         className={
//                                             fieldState.error
//                                                 ? "text-red-500"
//                                                 : "dark:text-gray-300"
//                                         }
//                                     >
//                                         Name
//                                     </FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             className="dark:bg-slate-700"
//                                             disabled={loading}
//                                             placeholder="Arabica coffe beans"
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     <FormMessage className="dark:text-red-500" />
//                                 </FormItem>
//                             )}
//                         />
//                         {/* price */}
//                         <FormField
//                             control={form.control}
//                             name="price"
//                             render={({ field, fieldState }) => (
//                                 <FormItem>
//                                     <FormLabel
//                                         className={
//                                             fieldState.error
//                                                 ? "text-red-500"
//                                                 : "dark:text-gray-300"
//                                         }
//                                     >
//                                         Price
//                                     </FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             className="dark:bg-slate-700"
//                                             type="number"
//                                             disabled={loading}
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     <FormMessage className="dark:text-red-500" />
//                                 </FormItem>
//                             )}
//                         />
//                         {/* category */}
//                         <FormField
//                             control={form.control}
//                             name="category_id"
//                             render={({ field, fieldState }) => (
//                                 <FormItem>
//                                     <FormLabel
//                                         className={
//                                             fieldState.error
//                                                 ? "text-red-500"
//                                                 : "dark:text-gray-300"
//                                         }
//                                     >
//                                         Category
//                                     </FormLabel>
//                                     <Select
//                                         disabled={loading}
//                                         onValueChange={field.onChange}
//                                         value={field.value.toString()}
//                                         defaultValue={field.value.toString()}
//                                     >
//                                         <FormControl className="dark:bg-slate-700">
//                                             <SelectTrigger className="w-full">
//                                                 <SelectValue
//                                                     defaultValue={field.value.toString()}
//                                                     placeholder="Select a category"
//                                                 />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             {categories.map((category) => (
//                                                 <SelectItem
//                                                     key={category.id.toString()}
//                                                     value={category.id.toString()}
//                                                 >
//                                                     {category.name}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage className="dark:text-red-500" />
//                                 </FormItem>
//                             )}
//                         />
//                         {/* unit */}
//                         <FormField
//                             control={form.control}
//                             name="unit"
//                             render={({ field, fieldState }) => (
//                                 <FormItem>
//                                     <FormLabel
//                                         className={
//                                             fieldState.error
//                                                 ? "text-red-500"
//                                                 : "dark:text-gray-300"
//                                         }
//                                     >
//                                         Unit
//                                     </FormLabel>
//                                     <FormControl>
//                                         <Select
//                                             disabled={loading}
//                                             onValueChange={field.onChange}
//                                             value={field.value}
//                                             defaultValue={field.value}
//                                         >
//                                             <FormControl className="dark:bg-slate-700">
//                                                 <SelectTrigger className="w-full">
//                                                     <SelectValue
//                                                         defaultValue={
//                                                             field.value
//                                                         }
//                                                         placeholder="Select a unit"
//                                                     />
//                                                 </SelectTrigger>
//                                             </FormControl>
//                                             <SelectContent>
//                                                 <SelectItem value="Gram">
//                                                     Gram
//                                                 </SelectItem>
//                                                 <SelectItem value="Kilogram">
//                                                     Kilogram
//                                                 </SelectItem>
//                                                 <SelectItem value="Pcs">
//                                                     Pcs
//                                                 </SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     </FormControl>
//                                     <FormMessage className="dark:text-red-500" />
//                                 </FormItem>
//                             )}
//                         />
//                         {/* stock_quantity */}
//                         <FormField
//                             control={form.control}
//                             name="stock_quantity"
//                             render={({ field, fieldState }) => (
//                                 <FormItem>
//                                     <FormLabel
//                                         className={
//                                             fieldState.error
//                                                 ? "text-red-500"
//                                                 : "dark:text-gray-300"
//                                         }
//                                     >
//                                         Stock
//                                     </FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             className="dark:bg-slate-700"
//                                             type="number"
//                                             disabled={loading}
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     <FormMessage className="dark:text-red-500" />
//                                 </FormItem>
//                             )}
//                         />
//                         {/* description */}
//                         <FormField
//                             control={form.control}
//                             name="description"
//                             render={({ field, fieldState }) => (
//                                 <FormItem>
//                                     <FormLabel
//                                         className={
//                                             fieldState.error
//                                                 ? "text-red-500"
//                                                 : "dark:text-gray-300"
//                                         }
//                                     >
//                                         Description
//                                     </FormLabel>
//                                     <FormControl>
//                                         <Textarea
//                                             className="w-full h-32 max-w-lg max-h-40 dark:bg-slate-700"
//                                             disabled={loading}
//                                             placeholder="Description of Arabica coffe beans like size, color etc."
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     <FormMessage className="dark:text-red-500" />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>

//                     {/* images */}
//                     <div className="flex flex-col gap-8">
//                         <FormField
//                             control={form.control}
//                             name="photos"
//                             render={({ fieldState }) => (
//                                 <FormItem>
//                                     <FormLabel
//                                         className={
//                                             fieldState.error
//                                                 ? "text-red-500"
//                                                 : "dark:text-gray-300"
//                                         }
//                                     >
//                                         Product Images
//                                     </FormLabel>
//                                     <FormDescription>
//                                         Upload each image up to {MAX_FILE_SIZE}
//                                         KB (jpg, jpeg, png, webp only).
//                                     </FormDescription>
//                                     <FormControl>
//                                         <Input
//                                             className="w-full md:w-[48%] dark:bg-slate-700"
//                                             ref={fileInputRef}
//                                             type="file"
//                                             multiple
//                                             accept="image/jpeg, image/png, image/jpg, image/webp"
//                                             onChange={handlePhotoChange}
//                                         />
//                                     </FormControl>
//                                     {fieldState.error && (
//                                         <ul className="flex flex-col gap-6 py-2 text-sm text-red-500 md:gap-3">
//                                             {(Array.isArray(fieldState.error)
//                                                 ? fieldState.error
//                                                 : [fieldState.error]
//                                             ).map((error, index) => (
//                                                 <li key={index}>
//                                                     {`- Image number ${
//                                                         index + 1
//                                                     } ${
//                                                         error?.message ||
//                                                         "Unknown error"
//                                                     }`}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     )}
//                                 </FormItem>
//                             )}
//                         />

//                         {/* Preview Images */}
//                         <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
//                             {photoFiles.map((file, index) => (
//                                 <div
//                                     key={index}
//                                     className="relative overflow-hidden border rounded-md shadow-md dark:border-gray-200 border-slate-300 w-52 h-52"
//                                 >
//                                     <img
//                                         key={index}
//                                         src={URL.createObjectURL(file)}
//                                         alt={`Uploaded ${index}`}
//                                         className="object-cover w-full h-full"
//                                     />
//                                     <button
//                                         className="absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full top-2 right-2"
//                                         type="button"
//                                         onClick={() => removePhotoFile(index)}
//                                     >
//                                         <span className="text-xs leading-none">
//                                             ✕
//                                         </span>
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <Button
//                         disabled={loading}
//                         className="w-full lg:w-1/2"
//                         type="submit"
//                     >
//                         {action}
//                     </Button>
//                 </form>
//             </Form>
//         </>
//     );
// };
