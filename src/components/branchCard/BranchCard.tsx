import { useState } from "react";
import "./BranchCard.css";

type BranchCardProps = {
  shop: string;
  price: number;
  logo?: string | null;
  variant?: "best" | "worst" | "default";
};

const PLACEHOLDER_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23e4e4e4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='%23757a7f' font-size='18' font-family='Arial,Helvetica,sans-serif'%3E?%3C/text%3E%3C/svg%3E";

export default function BranchCard({ shop, price, logo, variant = "default" }: Readonly<BranchCardProps>) {
  const [hasImageError, setHasImageError] = useState(false);

  const resolvedSrc = hasImageError ? PLACEHOLDER_LOGO : (logo || PLACEHOLDER_LOGO);

  function handleImageError() {
    if (!hasImageError) {
      setHasImageError(true);
    }
  }

  function handleImageLoad() {
    if (hasImageError) {
      setHasImageError(false);
    }
  }

  return (
    <div className="branch-card">
      <img className="branch-card__logo" src={resolvedSrc} alt={shop} onError={handleImageError} onLoad={handleImageLoad} />
      <div className="branch-card__name">{shop}</div>
      <div className={`branch-card__price branch-card__price--${variant}`}>
        ${Math.round(price).toLocaleString("es-CL")}
      </div>
    </div>
  );
}
