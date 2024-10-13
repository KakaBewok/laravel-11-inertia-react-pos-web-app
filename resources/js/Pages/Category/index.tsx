"use client";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { Product } from "../Product";
import { CategoryClient } from "./client";
import { CategoryColumn } from "./columns";

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    products: Product[];
}

const CategoriesPage = ({ categories }: { categories: Category[] }) => {
    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        product_quantity: item.products.length,
    }));

    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Category" />
                <div className="p-2 pt-6 space-y-7">
                    <CategoryClient data={formattedCategories} />
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default CategoriesPage;
