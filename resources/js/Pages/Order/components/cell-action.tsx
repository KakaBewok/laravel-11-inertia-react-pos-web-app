import { AlertModal } from "@/Components/AlertModal";
import { Button } from "@/Components/ui/button";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { OrderColumn } from "./columns";

export const CellAction = ({ data }: { data: OrderColumn }) => {
    const { loading, setLoading } = useGlobalContext();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleDeleteId = (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();

        setLoading(true);
        router.delete(route("admin.order.destroy", data.id), {
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

    const handleEditOrder = (
        e: React.MouseEvent<HTMLButtonElement>,
        isPaid: boolean
    ) => {
        e.stopPropagation();
        if (!isPaid) {
            setLoading(true);
            router.get(
                route("admin.order.edit", data.id),
                {},
                {
                    onFinish: () => setLoading(false),
                }
            );
        }
    };

    const handleShowDetailsOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        setLoading(true);
        router.get(
            route("admin.order.show", data.id),
            {},
            {
                onFinish: () => setLoading(false),
            }
        );
    };

    const handleModalDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setModalOpen(true);
    };

    const handlePrintOrder = (
        e: React.MouseEvent<HTMLButtonElement>,
        isPaid: boolean
    ) => {
        e.stopPropagation();
        if (!isPaid) {
            window.open(route("invoice.generate", data.id), "_blank");
        }
    };

    return (
        <div>
            <AlertModal
                isOpen={modalOpen}
                onClose={(e) => {
                    e?.stopPropagation();
                    setModalOpen(false);
                }}
                onConfirm={(e) => handleDeleteId(e)}
                loading={loading}
            />
            <div className="flex items-center gap-2">
                <Button
                    disabled={loading}
                    variant="destructive"
                    onClick={(e) => handleModalDelete(e)}
                    className="h-8 p-0 bg-red-500 w-9 hover:bg-red-600"
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
                    disabled={loading}
                    variant="ghost"
                    className={`${
                        data.status == "Paid" ? "opacity-45" : ""
                    } h-8 p-0 w-9 bg-amber-400 hover:bg-amber-500`}
                    onClick={(e) => handleEditOrder(e, data.status == "Paid")}
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
                <Button
                    disabled={loading}
                    variant="ghost"
                    className="h-8 p-0 w-9 bg-sky-500 hover:bg-sky-600"
                    onClick={(e) => handleShowDetailsOrder(e)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="eye"
                        className="fill-current"
                        width="21"
                        height="21"
                        fill="none"
                    >
                        <path
                            fill="#F9F9FC"
                            d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"
                        ></path>
                    </svg>
                </Button>
                <Button
                    disabled={loading}
                    variant="ghost"
                    className={`${
                        data.status != "Paid" ? "opacity-45" : ""
                    } h-8 p-0 bg-green-500 w-9 hover:bg-green-600`}
                    onClick={(e) => handlePrintOrder(e, data.status != "Paid")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="print"
                        className="fill-current"
                        width="21"
                        height="21"
                        fill="none"
                    >
                        <path
                            fill="#F9F9FC"
                            d="M7,10a1,1,0,1,0,1,1A1,1,0,0,0,7,10ZM19,6H18V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3V6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3H6v3a1,1,0,0,0,1,1H17a1,1,0,0,0,1-1V18h1a3,3,0,0,0,3-3V9A3,3,0,0,0,19,6ZM8,4h8V6H8Zm8,16H8V16h8Zm4-5a1,1,0,0,1-1,1H18V15a1,1,0,0,0-1-1H7a1,1,0,0,0-1,1v1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H19a1,1,0,0,1,1,1Z"
                        ></path>
                    </svg>
                </Button>
            </div>
        </div>
    );
};
