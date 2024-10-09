import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";
import { Heading } from "@/Components/ui/heading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { ProductColumn, columns } from "./columns";

interface ProductClientProps {
    data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
    const { setLoading } = useGlobalContext();

    const handleDeleteIds = (ids: string[]) => {
        setLoading(true);
        router.post(
            route("admin.product.destroy-bulk", { ids }),
            {},
            {
                onFinish: () => setLoading(false),
            }
        );
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
