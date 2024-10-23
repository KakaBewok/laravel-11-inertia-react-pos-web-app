import Expense from "@/interfaces/Expense";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { ExpenseForm } from "./components/expense-form";

const EditPage = ({ expense }: { expense: Expense }) => {
    const initialData = {
        ...expense,
        expense_date: new Date(expense.expense_date),
    };
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Edit expense" />
                <div className="flex-col">
                    <div className="flex-1 p-4 pt-5 space-y-4 md:p-8">
                        <ExpenseForm initialData={initialData} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default EditPage;
