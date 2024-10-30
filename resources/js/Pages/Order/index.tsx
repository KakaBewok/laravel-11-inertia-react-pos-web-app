"use client";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { OrderColumn } from "@/Pages/Order/components/columns";
import Order from "@/interfaces/Order";
import { Head } from "@inertiajs/react";
import { OrderClient } from "./components/client";

const OrderPage = ({ orders }: { orders: Order[] }) => {
    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        customer_name: item.customer_name,
        total_amount: item.total_amount,
        total_paid: item.total_paid,
        changes: item.changes,
        status: item.status,
    }));

    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Order" />
                <div className="p-2 pt-6 space-y-7">
                    <OrderClient data={formattedOrders} />
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default OrderPage;
