import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";
import { Heading } from "@/Components/ui/heading";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProductColumn, columns } from "./columns";

interface ProductClientProps {
    data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
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
                    title={`Products (${data.length})`}
                    description="Manage products for your store"
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
