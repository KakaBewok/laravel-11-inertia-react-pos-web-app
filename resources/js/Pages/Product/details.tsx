import MainLayout from "@/Layouts/MainLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Product from "@/interfaces/Product";
import Category from "@/interfaces/Category";
import Photo from "@/interfaces/Photo";
import { Head } from "@inertiajs/react";
import ProductDetails from "./components/product-details";

interface DetailsPageProps {
    product: Product;
    category: Category;
    photos: Photo[];
}

const DetailsPage = ({ product, category, photos }: DetailsPageProps) => {
    return (
        <>
            <MainLayout>
                <AuthenticatedLayout>
                    <Head title="Details product" />
                    <ProductDetails
                        product={product}
                        category={category}
                        photos={photos}
                    />
                </AuthenticatedLayout>
            </MainLayout>
        </>
    );
};

export default DetailsPage;
