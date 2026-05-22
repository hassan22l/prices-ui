import { useState } from "react";
import { getProduct, saveMyPrice} from "../services/api";
import type { Product } from "../interfaces/product";


function Home() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [userPrice, setUserPrice] = useState("");
  async function searchProduct(code: string) {
    if (!code) return;
    try {
      const data = await getProduct(code);
      setProduct(data);
      setUserPrice(data.userPrice !== null ? String(data.userPrice) : "");
      setBarcode("");
    } catch (error) {
      console.error(error);
    }
  }

  async function savePrice() {
    if (!product) return;
    const priceValue = Number(userPrice);
    if (Number.isNaN(priceValue)) {
      alert("Ingresa un precio válido");
      return;
    }

    try {
      await saveMyPrice(product.barcode, priceValue);
      await searchProduct(product.barcode);
      alert("Precio guardado");
    } catch (error) {
      console.error(error);
      alert("Error al guardar el precio");
    }
  }

  return (
    <div>
      <h1>Precios</h1>
      <input
        autoFocus
        value={barcode}
        placeholder="Escanear producto"
        onChange={(e) => setBarcode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchProduct(barcode);
          }
        }}
      />
      {product && (
        <div>
          <h2>{product.name}</h2>
          <img
          src={product.image}
          alt={product.name} />
          <h3>Precios</h3>
          {product.prices.map((p, index) => (
            <div key={index}>
              {p.shop}
              {"-$"}
              {p.price}
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <h3>Mi precio</h3>
            <input
            type="number"
            value={userPrice}
            placeholder="Ingresar mi precio"
            onChange={(e) => setUserPrice(e.target.value)}
          />
          <button onClick={savePrice}>Guardar precio</button>
        </div>
        </div>
      )}
    </div>
  );
}
export default Home;
