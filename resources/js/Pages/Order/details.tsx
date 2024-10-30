import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import Order from "@/interfaces/Order";
import PaymentMethod from "@/interfaces/PaymentMethod";
import { ProductOrdered } from "@/interfaces/ProductsOrdered";
import { Head } from "@inertiajs/react";
import OrderDetails from "./components/order-details";

interface DetailsPageProps {
    order: Order;
    paymentMethod: PaymentMethod;
    productsOrdered: ProductOrdered[];
}

const DetailsPage = ({
    order,
    paymentMethod,
    productsOrdered,
}: DetailsPageProps) => {
    return (
        <>
            <MainLayout>
                <AuthenticatedLayout>
                    <Head title="Details order" />
                    <OrderDetails
                        order={order}
                        paymentMethod={paymentMethod}
                        productsOrdered={productsOrdered}
                    />
                </AuthenticatedLayout>
            </MainLayout>
        </>
    );
};

export default DetailsPage;
