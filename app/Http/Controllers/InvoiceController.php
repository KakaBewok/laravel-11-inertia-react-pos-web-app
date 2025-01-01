<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function generateInvoice($id)
    {
        // $newOrder = [
        //     'transaction_id' => $id,
        //     'order_date' => now()->format('Y-m-d'),
        //     'customer_name' => 'John Doe',
        //     'items' => [
        //         ['description' => 'Product 1', 'quantity' => 2, 'price' => 100],
        //         ['description' => 'Product 2', 'quantity' => 1, 'price' => 200],
        //     ],
        //     'total' => 400,
        // ];
        $newOrder = Order::find($id);
        $pdf = Pdf::loadView('invoices.template', compact('newOrder'));

        return response($pdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="invoice-1.pdf"',
        ]);
    }
}
