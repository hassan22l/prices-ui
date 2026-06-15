import "./BranchCard.css";

type BranchCardProps = {
  shop: string;
  price: number;
};

export default function BranchCard({ shop, price }: BranchCardProps) {
  return (
    <div className="branch-card">
      {shop} - ${price}
    </div>
  );
}
