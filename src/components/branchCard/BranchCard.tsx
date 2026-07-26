import { useEffect, useState } from "react";
import "./BranchCard.css";

type BranchCardProps = {
  shop: string;
  price: number;
  logo?: string | null;
};

const PLACEHOLDER_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23e4e4e4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='%23757a7f' font-size='18' font-family='Arial,Helvetica,sans-serif'%3E?%3C/text%3E%3C/svg%3E";

export default function BranchCard({ shop, price, logo }: BranchCardProps) {
  const [src, setSrc] = useState<string>(logo || PLACEHOLDER_LOGO);

  useEffect(() => {
    setSrc(logo || PLACEHOLDER_LOGO);
  }, [logo]);

  function handleImageError() {
    if (src !== PLACEHOLDER_LOGO) {
      setSrc(PLACEHOLDER_LOGO);
    }
  }

  return (
    <div className="branch-card">
      <img src={src} alt={shop} onError={handleImageError} />
      <div className="branch-name">{shop}</div>
      <div className="branch-price">${price.toFixed(2)}</div>
    </div>
  );
}
