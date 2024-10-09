import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";
import { Heading } from "@/Components/ui/heading";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CategoryColumn, columns } from "./columns";

interface CategoryClientProps {
    data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleDeleteIds = (ids: string[]) => {
        setSelectedIds(ids);
        // call delete api
        console.log("IDs to delete:", ids);
    };

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
            <DataTable
                onDeleteIds={handleDeleteIds}
                searchKey="name"
                columns={columns}
                data={data}
            />
        </>
    );
};
