import DefaultLayout from "@/Layouts/DefaultLayout";
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
        <DefaultLayout>
            <div className="flex-col">
                <div className="flex-1 p-8 pt-6 space-y-4">
                    <CategoryClient data={formattedCategories} />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CategoriesPage;
