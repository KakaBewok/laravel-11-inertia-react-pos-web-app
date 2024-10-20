import MainLayout from "@/Layouts/MainLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Product from "@/interfaces/Product";
import Category from "@/interfaces/Category";
import Photo from "@/interfaces/Photo";
import { Head } from "@inertiajs/react";
import { CarouselPhoto } from "@/Components/CarouselPhoto";

interface DetailsProductProps {
    product: Product;
    category: Category;
    photos: Photo[];
}

const DetailsProduct = ({ product, category, photos }: DetailsProductProps) => {
    return (
        <>
            <MainLayout>
                <AuthenticatedLayout>
                    <Head title="Details product" />
                    <div className="grid grid-cols-1 gap-4 border border-black md:grid-cols-2">
                        <div className="mx-auto border border-red-500">
                            Images carousel
                            <CarouselPhoto photos={photos}></CarouselPhoto>
                        </div>
                        <div className="border border-blue-500">
                            Desc product
                        </div>
                    </div>
                </AuthenticatedLayout>
            </MainLayout>
        </>
    );
};

export default DetailsProduct;

{
    /* <h1>{product.name}</h1>
                    <img
                        src={`http://localhost:8000/storage/${photos[0].photo}`}
                        alt=""
                        className="object-cover w-36 h-36"
                    /> */
}
