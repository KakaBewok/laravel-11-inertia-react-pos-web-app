import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CategoryClient } from "./client";
import { CategoryColumn } from "./columns";

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

const CategoriesPage = ({ categories }: { categories: Category[] }) => {
    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
    }));

    return (
        <AuthenticatedLayout>
            <div className="p-2 pt-6 space-y-7">
                <CategoryClient data={formattedCategories} />
            </div>
        </AuthenticatedLayout>
    );
};

export default CategoriesPage;
