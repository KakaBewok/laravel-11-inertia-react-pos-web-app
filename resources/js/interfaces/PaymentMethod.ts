export default interface PaymentMethod {
    id: string;
    name: string;
    bank_name: string;
    bank_logo: string;
    qris_image: string;
    status: boolean;
    description: string;
}
