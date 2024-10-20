import MainLayout from "@/Layouts/MainLayout";
import { ProductForm } from "./product-form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Category from "@/interfaces/Category";

const CreateProduct = ({ categories }: { categories: Category[] }) => {
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Create product" />
                <div className="flex-col">
                    <div className="flex-1 p-4 pt-5 space-y-4 md:p-8">
                        <ProductForm categories={categories} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default CreateProduct;
