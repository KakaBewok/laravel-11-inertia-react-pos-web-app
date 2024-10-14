import MainLayout from "@/Layouts/MainLayout";
import { Category, ProductForm } from "./product-form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

interface Photo {
    id: string;
    photo: string;
    product_id: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    unit: string;
    stock_quantity: number;
    category_id: string;
}

interface EditProductProps {
    product: Product;
    photos: Photo[];
    categories: Category[];
}

const EditProduct: React.FC<EditProductProps> = ({
    product,
    photos,
    categories,
}) => {
    const initialData: Product & { photos: string[] } = {
        ...product,
        photos: photos.map((photo: Photo) => photo.photo),
    };
    console.log(initialData);
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

export default EditProduct;
