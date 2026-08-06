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
}: ProductInfoProps) {
  return (
    <div className="product-info">
      <div className="product-header">
        <img src={product.image} alt={product.name} />
        <div className="product-details">
          <div className="product-name">{product.name}</div>
          <MyPriceCard
            userPrice={userPrice}
            onUserPriceChange={onUserPriceChange}
            onSavePrice={onSavePrice}
          />
        </div>
      </div>
    </div>
  );
}
