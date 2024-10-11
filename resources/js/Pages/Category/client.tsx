import { AlertModal } from "@/Components/AlertModal";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";
import { Heading } from "@/Components/ui/heading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { CategoryColumn, columns } from "./columns";

interface CategoryClientProps {
    data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    const { loading, setLoading } = useGlobalContext();
    const [ids, setIds] = useState<string[]>([""]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleDeleteIds = () => {
        setLoading(true);
        router.post(
            route("admin.category.destroy-bulk", { ids }),
            {},
            {
                onSuccess: () => {
                    router.visit(route("admin.category.index")),
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

    const handleProductDetail = (id: string) => {
        alert(id);
        //todo: menampilkan halaman detail product, termasuk foto-foto
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
            <AlertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDeleteIds}
                loading={loading}
                description="All products under this category will also be deleted."
            />
            <DataTable
                onDelete={openDeleteModal}
                searchKey="name"
                columns={columns}
                data={data}
                onRowClick={handleProductDetail}
            />
        </>
    );
};
