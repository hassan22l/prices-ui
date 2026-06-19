import { useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
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

  function clearPendingSearch() {
    if (scannerTimeout.current !== undefined) {
      window.clearTimeout(scannerTimeout.current);
      scannerTimeout.current = undefined;
    }
  }

  function searchIfValid(value: string) {
    const cleanValue = value.trim();
    if (cleanValue.length >= 8) {
      onSearchProduct(cleanValue);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onBarcodeChange(value);

    clearPendingSearch();

    scannerTimeout.current = window.setTimeout(() => {
      searchIfValid(value);
    }, 150);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      clearPendingSearch();
      searchIfValid(barcode);
    }
  }

  return (
    <div className="search-bar">
      <BsUpcScan className="search-bar-icon" />
      <input
        autoFocus
        type="search"
        value={barcode}
        placeholder="Escanear producto"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
