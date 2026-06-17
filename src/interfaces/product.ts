export type ProductPrice={
    shop: string;
    price: number;
    logo: string;
};

export type Product= {
    barcode: string;
    name: string;
    image: string;
    prices: ProductPrice[];
    userPrice: number | null;
}