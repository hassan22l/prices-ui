export type ProductPrice={
    shop: string;
    price: number;
};

export type Product= {
    barcode: string;
    name: string;
    image: string;
    prices: ProductPrice[];
    userPrice: number | null;
}