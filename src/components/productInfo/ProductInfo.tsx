import type { Product } from "../../interfaces/product";
import "./ProductInfo.css";
import MyPriceCard from "../myPriceCard/MyPriceCard";

type ProductInfoProps = {
  product: Product;
  userPrice: string;
  onUserPriceChange: (value: string) => void;
  onSavePrice: () => Promise<void> | void;
};

export default function ProductInfo({
  product,
  userPrice,
  onUserPriceChange,
  onSavePrice,
}: Readonly<ProductInfoProps>) {
  return (
    <div className="product-info">
      <div className="product-info__image">
        <img src={product.image} alt={product.name} />
      </div>
      <h2 className="product-info__name">{product.name}</h2>
      <MyPriceCard
        userPrice={userPrice}
        onUserPriceChange={onUserPriceChange}
        onSavePrice={onSavePrice}
      />
    </div>
  );
}
