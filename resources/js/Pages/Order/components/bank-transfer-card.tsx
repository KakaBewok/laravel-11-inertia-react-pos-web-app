import { Separator } from "@/Components/ui/separator";
import { BASE_URL } from "@/constants";
import PaymentMethod from "@/interfaces/PaymentMethod";

export const BankTransferCard = ({
    paymentMethodId,
    paymentMethods,
}: {
    paymentMethodId: string;
    paymentMethods: PaymentMethod[];
}) => {
    const bankTransfer = paymentMethods.find(
        (paymentMethod) => paymentMethod.id.toString() === paymentMethodId
    );

    return (
        <div className="flex flex-col w-full gap-2 py-5 rounded-sm shadow-md px-7 bg-slate-100 dark:bg-slate-700">
            <div className="flex items-center gap-3">
                {bankTransfer?.bank_logo && (
                    <img
                        src={`${BASE_URL}/storage/${bankTransfer.bank_logo}`}
                        alt={"Bank logo"}
                        className="object-contain w-10 h-8"
                    />
                )}
                <h1 className="font-semibold text-md dark:text-slate-300">
                    {bankTransfer?.bank_name}
                </h1>
            </div>
            <Separator className="bg-slate-300 dark:bg-slate-500" />
            <p className="font-semibold text-gray-700 text-md dark:text-slate-300">
                {bankTransfer?.account_holder ?? "Account holder not found"}
            </p>
            <p className="text-sm text-gray-700 dark:text-slate-300">
                {bankTransfer?.account_number ?? "Account number not found"}
            </p>
        </div>
    );
};
