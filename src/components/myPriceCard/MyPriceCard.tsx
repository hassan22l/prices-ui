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
}: MyPriceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async () => {
    await onSavePrice();
    setIsModalOpen(false);
  };

  return (
    <div className="my-price-card">
      <div className="my-price-card__header">
        <h3>Mi precio</h3>
        <button
          className="my-price-card__edit-button"
          onClick={() => setIsModalOpen(true)}
        >
          Editar Precio
        </button>
      </div>

      <p className="price">${userPrice || "0"}</p>

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
                className="my-price-card__cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
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
