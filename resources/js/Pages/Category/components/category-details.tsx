import { Button } from "@/Components/ui/button";
import { Heading } from "@/Components/ui/heading";
import { Separator } from "@/Components/ui/separator";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Category from "@/interfaces/Category";
import Product from "@/interfaces/Product";
import { router } from "@inertiajs/react";
import ProductTable from "./products-table";

interface CategoryDetailsProps {
    products: Product[];
    category: Category;
}

const CategoryDetails = ({ products, category }: CategoryDetailsProps) => {
    const { loading, setLoading } = useGlobalContext();

    const handleEditCategory = () => {
        setLoading(true);
        router.get(
            route("admin.category.edit", category.id),
            {},
            {
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <>
            <div className="flex items-center justify-between pt-6 pb-10">
                <Heading
                    title="Details category"
                    description="All about your category"
                />
                <div className="flex items-center gap-3">
                    <Button
                        disabled={loading}
                        variant="ghost"
                        className="h-8 p-0 w-9 bg-amber-400 hover:bg-amber-500"
                        onClick={handleEditCategory}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="edit-alt"
                            className="fill-current"
                            width="21"
                            height="21"
                            fill="none"
                        >
                            <path
                                fill="#F9F9FC"
                                d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
                            ></path>
                        </svg>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="dark:bg-slate-200 dark:text-slate-900"
                    >
                        Back
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="w-full max-w-lg p-6 space-y-6 rounded-md md:p-7 bg-slate-50 dark:bg-slate-600">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">
                        {category.name}
                    </h1>
                    <Separator className="bg-slate-300 dark:bg-slate-700" />
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Total products:{" "}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {products.length}
                        </p>
                    </div>
                    <div className="text-gray-800 dark:text-gray-200 ">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                            Description:{" "}
                        </h3>
                        <p className="text-sm leading-normal text-justify text-gray-500 md:leading-relaxed lg:leading-loose dark:text-gray-300">
                            {category.description ? (
                                category.description
                            ) : (
                                <span className="text-slate-400">
                                    No description.
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                <div className="w-full max-w-lg p-6 mx-auto rounded-md md:p-7 bg-slate-50 dark:bg-slate-600">
                    <h1 className="pb-5 font-bold text-md text-slate-700 dark:text-white">
                        List of products
                    </h1>
                    {products != null && products.length > 0 ? (
                        <ProductTable products={products} />
                    ) : (
                        <p className="font-normal text-center text-muted-foreground text-md">
                            No result.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default CategoryDetails;

//TODO: add table list of products
