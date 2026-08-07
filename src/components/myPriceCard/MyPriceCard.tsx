import { useState } from "react";
import "./MyPriceCard.css";

type MyPriceCardProps = {
  userPrice: string;
  onUserPriceChange: (value: string) => void;
  onSavePrice: () => Promise<void> | void;
};

export default function MyPriceCard({
  userPrice,
  onUserPriceChange,
  onSavePrice,
}: Readonly<MyPriceCardProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async () => {
    await onSavePrice();
    setIsModalOpen(false);
  };

  const numericPrice = Number(userPrice);
  const formattedPrice =
    userPrice.trim() !== "" && Number.isFinite(numericPrice)
      ? Math.round(numericPrice).toLocaleString("es-CL")
      : "0";

  return (
    <div className="local-price">
      <button
        className="local-price__edit"
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        Editar
      </button>
      <span className="local-price__label">PRECIO LOCAL</span>
      <span className="local-price__sub">(en tu tienda)</span>
      <span className="local-price__value">${formattedPrice}</span>

      {isModalOpen && (
        <div className="my-price-card__modal-overlay">
          <div className="my-price-card__modal">
            <h4>Actualizar mi precio</h4>
            <input
              type="number"
              value={userPrice}
              placeholder="Ingresar mi precio"
              onChange={(e) => onUserPriceChange(e.target.value)}
            />
            <div className="my-price-card__modal-actions">
              <button
                type="button"
                className="my-price-card__cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="my-price-card__save-button"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
