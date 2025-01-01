<!DOCTYPE html>
<html>

<head>
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .invoice {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
        }

        .total {
            text-align: right;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="invoice">
        <div class="header">
            <h2>Invoice</h2>
            <p>Invoice ID: {{ $newOrder['transaction_id'] }}</p>
            <p>Date: {{ $newOrder['order_date'] }}</p>
        </div>
        <p>Customer: {{ $newOrder['customer_name'] }}</p>
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            {{-- <tbody>
                @foreach ($newOrder['items'] as $item)
                    <tr>
                        <td>{{ $item['description'] }}</td>
                        <td>{{ $item['quantity'] }}</td>
                        <td>${{ number_format($item['price'], 2) }}</td>
                        <td>${{ number_format($item['quantity'] * $item['price'], 2) }}</td>
                    </tr>
                @endforeach
            </tbody> --}}
        </table>
        {{-- <p class="total">Total: ${{ number_format($newOrder['total'], 2) }}</p> --}}
    </div>
</body>

</html>
