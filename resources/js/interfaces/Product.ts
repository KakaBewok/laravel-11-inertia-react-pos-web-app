export default interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    unit: string;
    stock_quantity: number;
    category_id: string;
}
