import { useEffect, useState } from "react";
import { getProduct, saveMyPrice } from "../services/api";
import type { Product } from "../interfaces/product";
import SearchBar from "../components/searchBar/SearchBar";
import ProductInfo from "../components/productInfo/ProductInfo";
import BranchCard from "../components/branchCard/BranchCard";
import {
  FiHome,
  FiSearch,
  FiClock,
  FiTag,
  FiSettings,
  FiInfo,
  FiRefreshCw,
} from "react-icons/fi";
import "./home.css";

const NAV_ITEMS = [
  { icon: FiHome, label: "Inicio" },
  { icon: FiSearch, label: "Buscar" },
  { icon: FiClock, label: "Historial" },
  { icon: FiTag, label: "Ofertas" },
  { icon: FiSettings, label: "Ajustes" },
];

function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return { time, date };
}

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

function getPriceVariant(
  price: number,
  cheapest: number | null,
  dearest: number | null
): "best" | "worst" | "default" {
  if (price === cheapest) return "best";
  if (price === dearest) return "worst";
  return "default";
}

function Home() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [userPrice, setUserPrice] = useState("");
  const { time, date } = useClock();

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

  const cheapest = product
    ? Math.min(...product.prices.map((p) => p.price))
    : null;
  const dearest = product
    ? Math.max(...product.prices.map((p) => p.price))
    : null;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">P</div>
        <nav className="sidebar__nav">
          {NAV_ITEMS.map(({ icon: Icon, label }, index) => (
            <button
              key={label}
              className={`sidebar__item${
                index === 0 ? " sidebar__item--active" : ""
              }`}
              type="button"
            >
              <Icon className="sidebar__icon" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="app-main">
        <header className="app-header">
          <h1 className="app-header__title">Consulta de productos</h1>
          <SearchBar
            barcode={barcode}
            onBarcodeChange={setBarcode}
            onSearchProduct={searchProduct}
          />
          <div className="app-header__clock">
            <span className="app-header__time">{time}</span>
            <span className="app-header__date">{date}</span>
          </div>
        </header>

        <section className="app-body">
          {product ? (
            <div className="product-layout">
              <ProductInfo
                product={product}
                userPrice={userPrice}
                onUserPriceChange={setUserPrice}
                onSavePrice={savePrice}
              />

              <div className="prices-panel">
                <h2 className="prices-panel__title">Precios en otras tiendas</h2>
                <div className="prices-panel__list">
                  {product.prices.map((price, index) => (
                    <BranchCard
                      key={`${price.shop}-${index}`}
                      shop={price.shop}
                      price={price.price}
                      logo={price.logo}
                      variant={getPriceVariant(price.price, cheapest, dearest)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <FiSearch className="empty-state__icon" />
              <p className="empty-state__title">Busca o escanea un producto</p>
              <p className="empty-state__hint">
                Usa el buscador de arriba para comparar precios entre tiendas.
              </p>
            </div>
          )}
        </section>

        <footer className="app-footer">
          <span className="app-footer__note">
            <FiInfo className="app-footer__info" />
            Los precios pueden variar según la fecha y la tienda.
          </span>
          <span className="app-footer__updated">
            <FiRefreshCw className="app-footer__refresh" />
            Actualizado hoy {time}
          </span>
        </footer>
      </main>
    </div>
  );
}

export default Home;