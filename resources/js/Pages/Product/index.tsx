import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProductClient } from "./client";
import { ProductColumn } from "./columns";

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    unit: string;
    stock_quantity: string;
    category_id: string;
    category: Category;
}

const ProductsPage = ({ products }: { products: Product[] }) => {
    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        unit: item.unit,
        stock_quantity: item.stock_quantity,
        category: item.category.name,
    }));

    return (
        <AuthenticatedLayout>
            <div className="p-2 pt-6 space-y-7">
                <ProductClient data={formattedProducts} />
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductsPage;
