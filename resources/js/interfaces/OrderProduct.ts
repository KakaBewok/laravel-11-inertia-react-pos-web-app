import Order from "./Order";
import Product from "./Product";

export default interface OrderProduct {
    id: string;
    order_id: string;
    product_id: string;
    price: number;
    quantity: number;
    product: Product;
    order: Order;
}
