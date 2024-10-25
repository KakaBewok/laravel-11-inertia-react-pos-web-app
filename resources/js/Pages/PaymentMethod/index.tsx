"use client";

import PaymentMethod from "@/interfaces/PaymentMethod";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { PaymentMethodClient } from "./components/client";
import { PaymentMethodColumn } from "./components/columns";

const PaymentMethodPage = ({
    paymentMethods,
}: {
    paymentMethods: PaymentMethod[];
}) => {
    const formattedPaymentMethods: PaymentMethodColumn[] = paymentMethods.map(
        (item) => ({
            id: item.id,
            name: item.name,
            bank_name: item.bank_name,
            status: item.status,
        })
    );

    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Payment Method" />
                <div className="p-2 pt-6 space-y-7">
                    <PaymentMethodClient data={formattedPaymentMethods} />
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default PaymentMethodPage;
