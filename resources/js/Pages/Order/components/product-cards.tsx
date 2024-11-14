import { BASE_URL } from "@/constants";
import Product from "@/interfaces/Product";
import ImageNotFound from "../../../../../public/images/image-not-found.jpg";
import { CompleteProduct } from "./order-form";

interface ProductCardsProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filteredProducts: CompleteProduct[];
    addItem: (product: Product) => void;
}

const ProductCards = ({
    searchTerm,
    setSearchTerm,
    filteredProducts,
    addItem,
}: ProductCardsProps) => {
    return (
        <div className="p-3 rounded-md bg-slate-100 md:p-6 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
            {/* SEARCH FIELD */}
            <div className="px-3 py-4 md:px-6">
                <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border-gray-300 rounded-md dark:bg-slate-200 dark:text-slate-800"
                />
            </div>
            {filteredProducts.length === 0 && (
                <div className="mt-4 text-sm text-center text-gray-700 dark:text-slate-400">
                    No products found.
                </div>
            )}
            {/* PRODUCT CARDS */}
            <div className="grid grid-cols-1 gap-5 p-3 overflow-y-scroll cursor-pointer md:p-6 max-h-72 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 scrollbar-hidden">
                {filteredProducts.map((product) => (
                    <div
                        onClick={() => addItem(product)}
                        key={product.id}
                        className="relative p-3 bg-gray-100 rounded-md shadow-md group dark:bg-gray-800"
                    >
                        {/* PRODUCT IMAGE */}
                        <div className="w-full h-40 overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-85">
                            {product.photos?.length === 0 ? (
                                <img
                                    alt="Image not found"
                                    src={ImageNotFound}
                                    className="object-cover object-center w-full h-full"
                                />
                            ) : (
                                <img
                                    alt="Product image"
                                    src={`${BASE_URL}/storage/${product.photos?.[0].photo}`}
                                    className="object-cover object-center w-full h-full"
                                />
                            )}
                        </div>
                        {/* PRODUCT DESC */}
                        <div className="flex items-start justify-between mt-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-50">
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                    />
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400">
                                    Rp. {product.price.toLocaleString("id-ID")}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-slate-400">
                                {product.stock_quantity}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCards;
