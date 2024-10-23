"use client";

import Category from "@/interfaces/Category";
import Product from "@/interfaces/Product";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

type CategoryProps = Category & { products: Product[] };

const CategoriesPage = ({ categories }: { categories: CategoryProps[] }) => {
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
