import { useRef } from "react";
import type { ChangeEvent } from "react";
import "./SearchBar.css";
import { BsUpcScan } from "react-icons/bs";

type SearchBarProps = {
  barcode: string;
  onBarcodeChange: (value: string) => void;
  onSearchProduct: (code: string) => void;
};

export default function SearchBar({
  barcode,
  onBarcodeChange,
  onSearchProduct,
}: SearchBarProps) {
  const scannerTimeout = useRef<number | undefined>(undefined);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onBarcodeChange(value);

    if (scannerTimeout.current !== undefined) {
      window.clearTimeout(scannerTimeout.current);
    }

    scannerTimeout.current = window.setTimeout(() => {
      if (value.length >= 8) {
        onSearchProduct(value);
      }
    }, 100);
  }

  return (
    <div className="search-bar">
      <BsUpcScan />
      <input
        autoFocus
        value={barcode}
        placeholder="Escanear producto"
        onChange={handleChange}
      />
    </div>
  );
}
