import { Button } from "@/Components/ui/button";
import { BASE_URL } from "@/constants";
import PaymentMethod from "@/interfaces/PaymentMethod";

export function QrModal({
    paymentMethodId,
    paymentMethods,
    isVisible,
    onClose,
}: {
    paymentMethodId: string;
    paymentMethods: PaymentMethod[];
    isVisible: boolean;
    onClose: () => void;
}) {
    const qris = paymentMethods.find(
        (paymentMethod) => paymentMethod.id.toString() === paymentMethodId
    );

    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-5 bg-white rounded-sm shadow-md dark:bg-slate-800">
                <img
                    src={`${BASE_URL}/storage/${qris?.qris_image}`}
                    alt="QR Code"
                    className="object-cover h-64 md:w-96 md:h-80 w-72"
                />
                <Button
                    className="absolute flex items-center justify-center w-6 h-6 p-2 text-white bg-red-500 rounded-full hover:opacity-95 hover:bg-red-500 hover:text-white right-2 top-2"
                    type="button"
                    onClick={onClose}
                >
                    <span className="text-xs leading-none">X</span>
                </Button>
            </div>
        </div>
    );
}
