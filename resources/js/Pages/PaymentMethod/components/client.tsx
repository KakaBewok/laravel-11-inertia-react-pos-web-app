import { AlertModal } from "@/Components/AlertModal";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/data-table";
import { Heading } from "@/Components/ui/heading";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { PaymentMethodColumn, columns } from "./columns";

interface PaymentMethodClientProps {
    data: PaymentMethodColumn[];
}

export const PaymentMethodClient: React.FC<PaymentMethodClientProps> = ({
    data,
}) => {
    const { loading, setLoading } = useGlobalContext();
    const [ids, setIds] = useState<string[]>([""]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleDeleteIds = () => {
        setLoading(true);
        router.post(
            route("admin.payment_method.destroy-bulk", { ids }),
            {},
            {
                onSuccess: () => {
                    router.visit(route("admin.payment_method.index")),
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

    const handleCreatePaymentMethod = () => {
        setLoading(true);
        router.get(
            route("admin.payment_method.create"),
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
                    title={`Payment Methods (${data.length})`}
                    description="Manage payment method for your store"
                />
                <Button
                    onClick={handleCreatePaymentMethod}
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
