import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";
import { Heading } from "@/Components/ui/heading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { ProductColumn, columns } from "./columns";
import { toast } from "react-toastify";

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
                onSuccess: () => {
                    router.visit(route("admin.product.index")),
                        setTimeout(() => {
                            toast.success("Deleted success.", {
                                position: "top-center",
                            });
                        }, 1000);
                },
                onError: (error) => console.log("An error occurred: ", error),
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
