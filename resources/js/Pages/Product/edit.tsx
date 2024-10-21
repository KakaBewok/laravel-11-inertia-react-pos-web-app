import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { ProductForm } from "./components/product-form";
import Product from "@/interfaces/Product";
import Category from "@/interfaces/Category";
import Photo from "@/interfaces/Photo";

interface EditPageProps {
    product: Product;
    photos: Photo[];
    categories: Category[];
}

const EditPage: React.FC<EditPageProps> = ({ product, photos, categories }) => {
    const initialData: Product & { photos: string[] } = {
        ...product,
        photos: photos.map((photo: Photo) => photo.photo),
    };
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Edit product" />
                <div className="flex-col">
                    <div className="flex-1 p-4 pt-5 space-y-4 md:p-8">
                        <ProductForm
                            initialData={initialData}
                            categories={categories}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default EditPage;
