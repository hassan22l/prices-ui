import type { Product } from "../../interfaces/product";
import "./ProductInfo.css";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="product-info">
      <div className="product-header">
        <img src={product.image} alt={product.name} />
        <div className="product-name">{product.name}</div>
      </div>
    </div>
  );
}
