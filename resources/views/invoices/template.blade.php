<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice #{{ $order->id }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        .invoice-container {
            max-width: 80mm;
            /* Ukuran kertas thermal */
            margin: 0 auto;
            background: #fff;
            padding: 10px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .header,
        .footer {
            text-align: center;
            margin-bottom: 10px;
        }

        .header h1 {
            font-size: 16px;
            margin: 0;
        }

        .header p {
            font-size: 12px;
            margin: 0;
        }

        .invoice-details,
        table {
            font-size: 12px;
        }

        .invoice-details p {
            margin: 4px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table th,
        table td {
            padding: 4px;
            text-align: left;
            border: none;
        }

        table th {
            text-align: center;
        }

        table td {
            border-bottom: 1px dashed #ddd;
        }

        .total {
            font-weight: bold;
            text-align: right;
        }

        .footer p {
            font-size: 10px;
            margin: 0;
            margin-top: 7px;
        }

        @media print {
            body {
                margin: 0;
                background-color: #fff;
            }

            .invoice-container {
                box-shadow: none;
                margin: 0;
            }

            .footer {
                display: none;
            }
        }
    </style>
</head>

<body>
    <div class="invoice-container">
        <div class="header">
            <h1>Home Roastery</h1>
            <p>Invoice #{{ $order->id }}</p>
            <p>Date: {{ $order->order_date->format('d M Y') }}</p>
        </div>

        <div class="invoice-details">
            <p><strong>Customer:</strong> {{ $order->customer_name }}</p>
            <p><strong>Payment:</strong> {{ $order->paymentMethod->name }}</p>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($order->orderProducts as $orderProduct)
                    <tr>
                        <td>{{ $orderProduct->product->name }}</td>
                        <td>{{ $orderProduct->quantity }}</td>
                        <td>{{ number_format($orderProduct->price, 0, ',', '.') }}</td>
                        <td>{{ number_format($orderProduct->quantity * $orderProduct->price, 0, ',', '.') }}</td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="total">Grand Total:</td>
                    <td>{{ number_format($order->total_amount, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <td colspan="3" class="total">Paid:</td>
                    <td>{{ number_format($order->total_paid, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <td colspan="3" class="total">Change:</td>
                    <td>{{ number_format($order->changes, 0, ',', '.') }}</td>
                </tr>
            </tfoot>
        </table>

        <div class="footer">
            <p>Thank you for shopping!</p>
            <p>instagram: @home.roastery</p>
        </div>
    </div>
</body>

</html>
