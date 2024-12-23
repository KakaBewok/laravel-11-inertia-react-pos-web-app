import { CarouselPhoto } from "@/Components/CarouselPhoto";
import { Button } from "@/Components/ui/button";
import { Heading } from "@/Components/ui/heading";
import { Separator } from "@/Components/ui/separator";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Category from "@/interfaces/Category";
import Photo from "@/interfaces/Photo";
import Product from "@/interfaces/Product";
import { router } from "@inertiajs/react";

interface ProductDetailsProps {
    product: Product;
    category: Category;
    photos: Photo[];
}

const ProductDetails = ({ product, category, photos }: ProductDetailsProps) => {
    const { loading, setLoading } = useGlobalContext();

    const handleEditProduct = () => {
        setLoading(true);
        router.get(
            route("admin.product.edit", product.id),
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
                    title="Details product"
                    description="All about your product"
                />
                <div className="flex items-center gap-3">
                    <Button
                        disabled={loading}
                        variant="ghost"
                        className="h-8 p-0 w-9 bg-amber-400 hover:bg-amber-500"
                        onClick={handleEditProduct}
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 justify-items-center">
                <CarouselPhoto photos={photos} />
                <div className="w-full max-w-lg">
                    <div className="p-6 space-y-6 rounded-md md:p-10 bg-slate-50 dark:bg-slate-600">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">
                                {product.name}
                            </h1>
                            <Separator className="my-4 bg-slate-300 dark:bg-slate-700" />
                            <h2 className="text-xl font-semibold text-gray-400">
                                {category.name}
                            </h2>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                                Price:{" "}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                Rp. {product.price.toLocaleString("id-ID")}/
                                {product.unit}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                                Stock:{" "}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                {product.stock_quantity} {product.unit}
                            </p>
                        </div>
                        <div className="text-gray-800 dark:text-gray-200 ">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                                Description:{" "}
                            </h3>
                            <p className="text-sm leading-normal text-justify text-gray-500 md:leading-relaxed lg:leading-loose dark:text-gray-300">
                                {product.description ? (
                                    product.description
                                ) : (
                                    <span className="text-slate-400">
                                        No description.
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
