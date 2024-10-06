import { Heading } from "@/Components/ui/heading";
import { ProductColumn, columns } from "./columns";
import { Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";

interface ProductClientProps {
    data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
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
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};
