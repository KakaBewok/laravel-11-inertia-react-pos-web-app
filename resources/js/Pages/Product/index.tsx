"use client";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { ProductClient } from "./client";
import { ProductColumn } from "./columns";

interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Product {
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
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Product" />
                <div className="p-2 pt-6 space-y-7">
                    <ProductClient data={formattedProducts} />
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default ProductsPage;
