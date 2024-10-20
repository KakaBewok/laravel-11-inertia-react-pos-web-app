import MainLayout from "@/Layouts/MainLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Product from "@/interfaces/Product";
import Category from "@/interfaces/Category";
import Photo from "@/interfaces/Photo";

interface DetailsProductProps {
    product: Product;
    category: Category;
    photos: Photo[];
}

export const DetailsProduct = ({
    product,
    category,
    photos,
}: DetailsProductProps) => {
    console.log(category);
    console.log(photos);
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <h1>{product.name}</h1>
                <h1>{category.name}</h1>
            </AuthenticatedLayout>
        </MainLayout>
    );
};
