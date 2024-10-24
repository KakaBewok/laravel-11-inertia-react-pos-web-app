import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import Expense from "@/interfaces/Expense";
import { Head } from "@inertiajs/react";
import ExpenseDetails from "./components/category-details";

const DetailsPage = ({ expense }: { expense: Expense }) => {
    return (
        <>
            <MainLayout>
                <AuthenticatedLayout>
                    <Head title="Details Expense" />
                    <ExpenseDetails expense={expense} />
                </AuthenticatedLayout>
            </MainLayout>
        </>
    );
};

export default DetailsPage;
