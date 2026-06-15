import type { Product } from "../../interfaces/product";
import "./ProductInfo.css";
import BranchCard from "../branchCard/BranchCard";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="product-info">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <h3>Precios</h3>
      <div className="product-info__prices">
        {product.prices.map((price, index) => (
          <BranchCard key={index} shop={price.shop} price={price.price} />
        ))}
      </div>
    </div>
  );
}
