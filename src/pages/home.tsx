import { useState } from "react";
import { getProduct, saveMyPrice } from "../services/api";
import type { Product } from "../interfaces/product";
import SearchBar from "../components/searchBar/SearchBar";
import ProductInfo from "../components/productInfo/ProductInfo";
import BranchCard from "../components/branchCard/BranchCard";
import "./home.css";

function Home() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [userPrice, setUserPrice] = useState("");

  function normalizeUserPrice(value: unknown): string {
    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }

    if (typeof value === "string") {
      const trimmedValue = value.trim();
      return trimmedValue === "" ? "" : trimmedValue;
    }

    return "";
  }

  async function searchProduct(code: string) {
    if (!code) return;
    try {
      const data = await getProduct(code);
      const normalizedUserPrice = normalizeUserPrice(
        data.userPrice ?? data.user_price ?? data.my_price
      );

      setProduct(data);
      setUserPrice(normalizedUserPrice);
      setBarcode("");
    } catch (error) {
      console.error(error);
    }
  }

  async function savePrice() {
    if (!product) return;

    const priceValue = Number(userPrice);
    if (Number.isNaN(priceValue) || userPrice.trim() === "") {
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
    <div className="home-page">
      <div className="home-page__content">
        <SearchBar
          barcode={barcode}
          onBarcodeChange={setBarcode}
          onSearchProduct={searchProduct}
        />

        {product && (
          <div className="home-page__details">
            <ProductInfo
              product={product}
              userPrice={userPrice}
              onUserPriceChange={setUserPrice}
              onSavePrice={savePrice}
            />

            <div className="prices-panel">
              <div className="prices-panel__group prices-panel__group--top">
                {product.prices.slice(0, 3).map((price, index) => (
                  <BranchCard
                    key={`top-${index}`}
                    shop={price.shop}
                    price={price.price}
                    logo={price.logo}
                  />
                ))}
              </div>

              <div className="prices-panel__group prices-panel__group--bottom">
                {product.prices.slice(3, 6).map((price, index) => (
                  <BranchCard
                    key={`bottom-${index}`}
                    shop={price.shop}
                    price={price.price}
                    logo={price.logo}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;