import "./BranchCard.css";

type BranchCardProps = {
  shop: string;
  price: number;
  logo: string;
};

export default function BranchCard({ shop, price, logo}: BranchCardProps) {
  return (
    <div className="branch-card">
      <img src={logo} alt={shop} />
      <div className="branch-name">{shop}</div>
      <div className="branch-price">${price.toFixed(2)}</div>
      </div>
  );
}
