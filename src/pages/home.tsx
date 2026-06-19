import { useState } from "react";
import { getProduct, saveMyPrice } from "../services/api";
import type { Product } from "../interfaces/product";
import SearchBar from "../components/searchBar/SearchBar";
import ProductInfo from "../components/productInfo/ProductInfo";
import MyPriceCard from "../components/myPriceCard/MyPriceCard";
import BranchCard from "../components/branchCard/BranchCard";
import "./home.css";
import Grainient from "./backgrounGrandient";

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
    <div className="home-page">
      <div className="home-page__gradient">
        <Grainient
          color1="#9d1717"
          color2="#4423c7"
          color3="#B497CF"
          timeSpeed={0.25}
          colorBalance={0.03}
          warpStrength={1.55}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={102}
          blendSoftness={0.2}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div className="home-page__content">
        <h1>Precios</h1>
        <SearchBar
          barcode={barcode}
          onBarcodeChange={setBarcode}
          onSearchProduct={searchProduct}
        />

        {product && (
          <div className="home-page__details">
            <ProductInfo product={product} />

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

              <MyPriceCard
                userPrice={userPrice}
                onUserPriceChange={setUserPrice}
                onSavePrice={savePrice}
              />

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