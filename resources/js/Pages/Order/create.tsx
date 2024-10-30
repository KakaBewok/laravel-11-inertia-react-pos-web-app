import Category from "@/interfaces/Category";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { OrderForm } from "./components/order-form";

const CreatePage = ({ categories }: { categories: Category[] }) => {
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Create order" />
                <div className="flex-col">
                    <div className="flex-1 p-4 pt-5 space-y-4 md:p-8">
                        <OrderForm categories={categories} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default CreatePage;
