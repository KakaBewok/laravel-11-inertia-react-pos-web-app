<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function generateInvoice($id)
    {
        $order = Order::with(['paymentMethod', 'orderProducts.product'])->findOrFail($id);
        $pdf = Pdf::loadView('invoices.template', compact('order'));

        return response($pdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="invoice-' . $order->transaction_id . '.pdf"',
        ]);
    }
}
