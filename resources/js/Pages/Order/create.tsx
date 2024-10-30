import PaymentMethod from "@/interfaces/PaymentMethod";
import Product from "@/interfaces/Product";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
// import { OrderForm } from "./components/order-form";

interface CreatePageProps {
    paymentMethods: PaymentMethod[];
    products: Product[];
}

const CreatePage = ({ paymentMethods, products }: CreatePageProps) => {
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Create order" />
                <div className="flex-col">
                    <div className="flex-1 p-4 pt-5 space-y-4 md:p-8">
                        {/* <OrderForm
                            paymentMethods={paymentMethods}
                            products={products}
                        /> */}
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default CreatePage;
