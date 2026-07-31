export type ProductPrice={
    shop: string;
    price: number;
    logo: string;
};

export type Product= {
    mainColor: string;
    backgroundColor?: string;
    barcode: string;
    name: string;
    image: string;
    prices: ProductPrice[];
    userPrice?: number | null;
    user_price?: number | string | null;
    my_price?: number | string | null;
}