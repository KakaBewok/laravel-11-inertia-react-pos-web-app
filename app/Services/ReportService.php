<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Order;
use App\Models\OrderProduct;

class ReportService
{
    public function getOmzetPerMonth()
    {
        $currentMonth = now()->format('Y-m');
        $daysInMonth = now()->daysInMonth;

        $omzetData = Order::selectRaw('DAY(order_date) as day, SUM(total_paid) as total')
            ->whereRaw("DATE_FORMAT(order_date, '%Y-%m') = ?", [$currentMonth])
            ->groupByRaw('DAY(order_date)')
            ->pluck('total', 'day');

        $omzetPerDaysInMonth = [];
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $omzetPerDaysInMonth[] = $omzetData->get($day, 0);
        }

        $omzetPerDaysInMonth = array_map(function ($value) {
            return number_format($value / 1000000, 2);
        }, $omzetPerDaysInMonth);

        $response = [
            'daysInMonth' => range(1, $daysInMonth),
            'omzetPerDaysInMonth' => $omzetPerDaysInMonth,
        ];
        return $response;
    }

    public function getOmzetPerWeek()
    {
        $startOfWeek = now()->startOfWeek();
        $endOfWeek = now()->endOfWeek();
        $daysInWeek = $startOfWeek->diffInDays($endOfWeek) + 1;

        $weeklyOmzetData = Order::selectRaw('DATE(order_date) as date, SUM(total_paid) as total')
            ->whereBetween('order_date', [$startOfWeek, $endOfWeek])
            ->groupByRaw('DATE(order_date)')
            ->pluck('total', 'date');

        $weeklyData = [];
        for ($i = 0; $i < $daysInWeek; $i++) {
            $date = $startOfWeek->copy()->addDays($i)->toDateString();
            $weeklyData[] = number_format($weeklyOmzetData->get($date, 0) / 1000000, 2);
        }
        return  $weeklyData;
    }

    public function getTotalOmzetPerMonth()
    {
        $currentMonth = now()->format('Y-m');

        $totalOmzet = Order::selectRaw('SUM(total_paid) as total_omzet')
            ->whereRaw("DATE_FORMAT(order_date, '%Y-%m') = ?", [$currentMonth])
            ->pluck('total_omzet')
            ->first();

        return $totalOmzet ?? 0;
    }

    public function getTotalExpensePerMonth()
    {
        $currentMonth = now()->format('Y-m');
        $totalExpense = Expense::selectRaw('SUM(amount) as total_expense')
            ->whereRaw("DATE_FORMAT(expense_date, '%Y-%m') = ?", [$currentMonth])
            ->pluck('total_expense')
            ->first();

        return $totalExpense ?? 0;
    }

    public function getTotalOrderPerMonth()
    {
        $currentMonth = now()->format('Y-m');
        $totalOrder = Order::selectRaw('COUNT(*) as total_order')
            ->whereRaw("DATE_FORMAT(order_date, '%Y-%m') = ?", [$currentMonth])
            ->where('status', 'Paid')
            ->pluck('total_order')
            ->first();

        return $totalOrder ?? 0;
    }

    public function getTotalItemPerMonth()
    {
        $currentMonth = now()->format('Y-m');

        $totalItems = OrderProduct::selectRaw('SUM(quantity) as total_quantity')
            ->join('orders', 'orders.id', '=', 'order_products.order_id')
            ->where('orders.status', 'Paid')
            ->whereRaw("DATE_FORMAT(orders.order_date, '%Y-%m') = ?", [$currentMonth])
            ->value('total_quantity');

        return $totalItems ?: 0;
    }
}
