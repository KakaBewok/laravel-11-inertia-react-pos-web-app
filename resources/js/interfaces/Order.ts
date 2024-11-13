import OrderProduct from "./OrderProduct";

export default interface Order {
    id: string;
    customer_name: string;
    payment_method_id: string;
    order_date: Date;
    total_amount: number;
    total_paid: number;
    changes: number;
    status: "pending" | "cancelled" | "completed";
    notes: string;
    transaction_id: string;
    order_products: OrderProduct[];
}
