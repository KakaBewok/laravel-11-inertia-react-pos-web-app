import Order from "@/interfaces/Order";
import PaymentMethod from "@/interfaces/PaymentMethod";
import Product from "@/interfaces/Product";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { CompleteProduct, OrderForm } from "./components/order-form";

interface EditPageProps {
    order: Order;
    productOrdered: CompleteProduct[];
    paymentMethods: PaymentMethod[];
    products: Product[];
}

const EditPage: React.FC<EditPageProps> = ({
    order,
    productOrdered,
    paymentMethods,
    products,
}) => {
    const initialData: Order & { productOrdered: CompleteProduct[] } = {
        ...order,
        productOrdered: productOrdered,
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
