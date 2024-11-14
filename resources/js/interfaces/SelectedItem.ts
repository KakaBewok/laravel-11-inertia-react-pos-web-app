import Photo from "./Photo";

export default interface SelectedItem {
    id: string;
    product_name: string;
    price: number;
    unit: string;
    quantity: number;
    total_price: number;
    photos?: Photo[];
}
