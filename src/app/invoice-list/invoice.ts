export interface Invoice {
    id: number;
    price: number;
    discount: number;
    sentDate: Date;
    paymentDate: Date;
    companyName: string;
}