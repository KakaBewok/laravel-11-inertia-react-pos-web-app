import PaymentMethod from "@/interfaces/PaymentMethod";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import PaymentMethodDetails from "./components/payment-method-details";

const DetailsPage = ({ paymentMethod }: { paymentMethod: PaymentMethod }) => {
    return (
        <>
            <MainLayout>
                <AuthenticatedLayout>
                    <Head title="Details payment method" />
                    <PaymentMethodDetails paymentMethod={paymentMethod} />
                </AuthenticatedLayout>
            </MainLayout>
        </>
    );
};

export default DetailsPage;
