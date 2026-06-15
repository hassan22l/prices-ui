import { useState } from "react";
import { getProduct, saveMyPrice } from "../services/api";
import type { Product } from "../interfaces/product";
import SearchBar from "../components/searchBar/SearchBar";
import ProductInfo from "../components/productInfo/ProductInfo";
import MyPriceCard from "../components/myPriceCard/MyPriceCard";
import "./home.css";

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
      <SearchBar
        barcode={barcode}
        onBarcodeChange={setBarcode}
        onSearchProduct={searchProduct}
      />

      {product && (
        <div className="home-page__details">
          <ProductInfo product={product} />
          <MyPriceCard
            userPrice={userPrice}
            onUserPriceChange={setUserPrice}
            onSavePrice={savePrice}
          />
        </div>
      )}
    </div>
  );
}
export default Home;