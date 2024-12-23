import { AlertModal } from "@/Components/AlertModal";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";
import { Heading } from "@/Components/ui/heading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ProductColumn, columns } from "./columns";

interface ProductClientProps {
    data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
    const { loading, setLoading } = useGlobalContext();
    const [ids, setIds] = useState<string[]>([""]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleDeleteIds = () => {
        setLoading(true);
        router.post(
            route("admin.product.destroy-bulk", { ids }),
            {},
            {
                onSuccess: () => {
                    router.visit(route("admin.product.index")),
                        setTimeout(() => {
                            toast.success("Data deleted.", {
                                position: "top-center",
                            });
                        }, 1000);
                },
                onError: (error) => console.log("An error occurred: ", error),
                onFinish: () => setLoading(false),
            }
        );
    };

    const openDeleteModal = (ids: string[]) => {
        setIds(ids);
        setModalOpen(true);
    };

    const handleCreateProduct = () => {
        setLoading(true);
        router.get(
            route("admin.product.create"),
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
                <Button
                    onClick={handleCreateProduct}
                    variant="outline"
                    className="dark:bg-slate-200"
                >
                    <Plus className="w-4 h-4 dark:text-slate-900" />
                </Button>
            </div>
            <AlertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDeleteIds}
                loading={loading}
                description="Deleting these products will also remove them from any orders."
            />
            <DataTable
                onDelete={openDeleteModal}
                searchKey="name"
                columns={columns}
                data={data}
            />
        </>
    );
};
