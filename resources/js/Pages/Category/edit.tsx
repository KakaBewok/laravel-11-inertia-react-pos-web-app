import Category from "@/interfaces/Category";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { CategoryForm } from "./components/category-form";

const EditPage = ({ category }: { category: Category }) => {
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Edit category" />
                <div className="flex-col">
                    <div className="flex-1 p-4 pt-5 space-y-4 md:p-8">
                        <CategoryForm initialData={category} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default EditPage;
