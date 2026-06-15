import "./MyPriceCard.css";

type MyPriceCardProps = {
  userPrice: string;
  onUserPriceChange: (value: string) => void;
  onSavePrice: () => void;
};

export default function MyPriceCard({
  userPrice,
  onUserPriceChange,
  onSavePrice,
}: MyPriceCardProps) {
  return (
    <div className="my-price-card">
      <h3>Mi precio</h3>
      <p>${userPrice || "0"}</p>
      <input
        type="number"
        value={userPrice}
        placeholder="Ingresar mi precio"
        onChange={(e) => onUserPriceChange(e.target.value)}
      />
      <button onClick={onSavePrice}>Guardar precio</button>
    </div>
  );
}
