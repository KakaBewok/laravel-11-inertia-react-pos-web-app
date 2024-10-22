"use client";

import Expense from "@/interfaces/Expense";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { ExpenseClient } from "./components/client";
import { ExpenseColumn } from "./components/columns";

const ExpensePage = ({ expenses }: { expenses: Expense[] }) => {
    const formattedExpenses: ExpenseColumn[] = expenses.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        amount: item.amount,
        expense_date: item.expense_date,
    }));
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Expense" />
                <div className="p-2 pt-6 space-y-7">
                    <ExpenseClient data={formattedExpenses} />
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
};

export default ExpensePage;
