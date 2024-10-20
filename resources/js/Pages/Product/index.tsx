"use client";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { ProductClient } from "./client";
import { ProductColumn } from "./columns";
import Category from "@/interfaces/Category";
import Product from "@/interfaces/Product";

type ProductProps = Product & { category: Category };

const ProductsPage = ({ products }: { products: ProductProps[] }) => {
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
