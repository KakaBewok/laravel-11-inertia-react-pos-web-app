import { Heading } from "@/Components/ui/heading";
import { CategoryColumn, columns } from "./columns";
import { Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { DataTable } from "@/Components/ui/data-table";

interface CategoryClientProps {
    data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage categories for your store"
                />
                <Button>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} />
        </>
    );
};
