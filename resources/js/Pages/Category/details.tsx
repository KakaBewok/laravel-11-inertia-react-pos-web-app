import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import Category from "@/interfaces/Category";
import Product from "@/interfaces/Product";
import { Head } from "@inertiajs/react";
import CategoryDetails from "./components/category-details";

interface DetailsPageProps {
    products: Product[];
    category: Category;
}

const DetailsPage = ({ products, category }: DetailsPageProps) => {
    return (
        <>
            <MainLayout>
                <AuthenticatedLayout>
                    <Head title="Details category" />
                    <CategoryDetails products={products} category={category} />
                </AuthenticatedLayout>
            </MainLayout>
        </>
    );
};

export default DetailsPage;
