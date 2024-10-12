import { Button } from "@/Components/ui/button";
import { ProductColumn } from "./columns";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { useState } from "react";
import { AlertModal } from "@/Components/AlertModal";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

export const CellAction = ({ data }: { data: ProductColumn }) => {
    const { loading, setLoading } = useGlobalContext();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleDeleteId = () => {
        setLoading(true);
        router.delete(route("admin.product.destroy", data.id), {
            onSuccess: () => {
                toast.success("Data deleted.", {
                    position: "top-center",
                }),
                    setModalOpen(false);
            },
            onError: (error) => console.log("An error occurred: ", error),
            onFinish: () => setLoading(false),
        });
    };

    return (
        <div>
            <AlertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDeleteId}
                loading={loading}
            />
            <div className="flex items-center gap-2">
                <Button
                    variant="destructive"
                    onClick={() => setModalOpen(true)}
                    className="bg-red-500 hover:bg-red-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="trash-alt"
                        className="fill-current"
                        width="21"
                        height="21"
                        fill="none"
                    >
                        <path
                            fill="#F9F9FC"
                            d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"
                        ></path>
                    </svg>
                </Button>
                <Button
                    variant="outline"
                    className="bg-yellow-500 hover:bg-yellow-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="edit-alt"
                        className="fill-current"
                        width="21"
                        height="21"
                        fill="none"
                    >
                        <path
                            fill="#F9F9FC"
                            d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
                        ></path>
                    </svg>
                </Button>
            </div>
        </div>
    );
};
