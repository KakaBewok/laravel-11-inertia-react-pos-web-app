import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { PaymentMethodForm } from "./components/payment-method-form";
import PaymentMethod from "@/interfaces/PaymentMethod";

const EditPage = ({ paymentMethod }: { paymentMethod: PaymentMethod }) => {
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Edit payment method" />
                <div className="flex-col">
                    <div className="flex-1 p-4 pt-5 space-y-4 md:p-8">
                        <PaymentMethodForm initialData={paymentMethod} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default EditPage;
