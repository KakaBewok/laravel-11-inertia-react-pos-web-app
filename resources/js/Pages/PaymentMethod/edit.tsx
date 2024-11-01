import PaymentMethod from "@/interfaces/PaymentMethod";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { PaymentMethodForm } from "./components/payment-method-form";

const EditPage = ({ paymentMethod }: { paymentMethod: PaymentMethod }) => {
    const initialData = {
        ...paymentMethod,
        status: paymentMethod.status ? true : false,
        is_cash: paymentMethod.is_cash ? true : false,
    };
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Edit payment method" />
                <div className="flex-col">
                    <div className="flex-1 p-4 pt-5 space-y-4 md:p-8">
                        <PaymentMethodForm initialData={initialData} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default EditPage;
