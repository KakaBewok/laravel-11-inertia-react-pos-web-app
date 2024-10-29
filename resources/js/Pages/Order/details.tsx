import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import Order from "@/interfaces/Order";
import PaymentMethod from "@/interfaces/PaymentMethod";
import { Head } from "@inertiajs/react";
import OrderDetails from "./components/order-details";

const DetailsPage = ({
    order,
    paymentMethod,
}: {
    order: Order;
    paymentMethod: PaymentMethod;
}) => {
    return (
        <>
            <MainLayout>
                <AuthenticatedLayout>
                    <Head title="Details order" />
                    <OrderDetails order={order} paymentMethod={paymentMethod} />
                </AuthenticatedLayout>
            </MainLayout>
        </>
    );
};

export default DetailsPage;
