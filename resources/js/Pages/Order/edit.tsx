import Order from "@/interfaces/Order";
import PaymentMethod from "@/interfaces/PaymentMethod";
import Product from "@/interfaces/Product";
import SelectedItem from "@/interfaces/SelectedItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { InitialData, OrderForm } from "./components/order-form";

interface EditPageProps {
    order: Order;
    selectedItems: SelectedItem[];
    paymentMethods: PaymentMethod[];
    products: Product[];
}

const EditPage: React.FC<EditPageProps> = ({
    order,
    selectedItems,
    paymentMethods,
    products,
}) => {
    const selectedPaymentMethod = paymentMethods.find(
        (paymentMethod) => paymentMethod.id == order.payment_method_id
    );
    const initialData: InitialData = {
        ...order,
        payment_method_id: order.payment_method_id.toString(),
        order_date: new Date(order.order_date),
        selectedItems: selectedItems,
        selectedPaymentMethod: selectedPaymentMethod,
    };

    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Edit order" />
                <div className="flex-col">
                    <div className="flex-1 p-4 pt-5 space-y-4 md:p-8">
                        <OrderForm
                            initialData={initialData}
                            paymentMethods={paymentMethods}
                            products={products}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default EditPage;
