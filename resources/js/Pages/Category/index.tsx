import { CategoryClient } from "./client";
import { CategoryColumn } from "./columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
    // const categories = //get all categories from db

    // const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    //   id: item.id,
    //   name: item.name,
    //   description: item.description,
    // }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                {/* <CategoryClient data={formattedCategories} /> */}
            </div>
        </div>
    );
};

export default CategoriesPage;
