<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Services\ReportService;
use Inertia\Inertia;

class ReportController extends Controller
{
    protected $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    public function index()
    {
        $omzetPerMonth = $this->reportService->getOmzetPerMonth();
        $omzetPerWeek = $this->reportService->getOmzetPerWeek();
        $totalOmzetPerMonth = $this->reportService->getTotalOmzetPerMonth();
        $totalExpensePerMonth = $this->reportService->getTotalExpensePerMonth();
        $totalOrderPerMonth = $this->reportService->getTotalOrderPerMonth();
        $totalItemPerMonth = $this->reportService->getTotalItemPerMonth();

        // total product (jumlah)

        return Inertia::render('Statistic/index', [
            'daysInMonth' => $omzetPerMonth['daysInMonth'],
            'omzetPerDaysInMonth' => $omzetPerMonth['omzetPerDaysInMonth'],
            'omzetPerDaysInWeek' => $omzetPerWeek,
            'totalOmzetPerMonth' => $totalOmzetPerMonth,
            'totalExpensePerMonth' => $totalExpensePerMonth,
            'totalOrderPerMonth' => $totalOrderPerMonth,
            'totalItemPerMonth' => $totalItemPerMonth
        ]);
    }
}
