import { AlertModal } from "@/Components/AlertModal";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";
import { Heading } from "@/Components/ui/heading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ExpenseColumn, columns } from "./columns";

interface ExpenseClientProps {
    data: ExpenseColumn[];
}

export const ExpenseClient: React.FC<ExpenseClientProps> = ({ data }) => {
    const { loading, setLoading } = useGlobalContext();
    const [ids, setIds] = useState<string[]>([""]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleDeleteIds = () => {
        setLoading(true);
        router.post(
            route("admin.expense.destroy-bulk", { ids }),
            {},
            {
                onSuccess: () => {
                    router.visit(route("admin.expense.index")),
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

    const handleCreateExpense = () => {
        setLoading(true);
        router.get(
            route("admin.expense.create"),
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
                    title={`Expenses (${data.length})`}
                    description="Manage expenses for your store"
                />
                <Button
                    onClick={handleCreateExpense}
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
