import { useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import "./SearchBar.css";
import { BsUpcScan } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

type SearchBarProps = {
  barcode: string;
  onBarcodeChange: (value: string) => void;
  onSearchProduct: (code: string) => void;
};

export default function SearchBar({
  barcode,
  onBarcodeChange,
  onSearchProduct,
}: Readonly<SearchBarProps>) {
  const scannerTimeout = useRef<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function isEditableElement(element: Element | null): boolean {
      if (!(element instanceof HTMLElement)) return false;
      const tag = element.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        element.isContentEditable
      );
    }

    function handleGlobalKeyDown(event: globalThis.KeyboardEvent) {
      const input = inputRef.current;
      if (!input) return;

      // No robar el foco si el usuario está escribiendo en otro campo (ej. modal).
      if (isEditableElement(document.activeElement) && document.activeElement !== input) {
        return;
      }

      if (document.activeElement !== input) {
        input.focus();
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

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
      <div className="search-bar__field">
        <FiSearch className="search-bar__icon" />
        <input
          ref={inputRef}
          autoFocus
          type="search"
          value={barcode}
          placeholder="Escanea código de barras o busca por nombre"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        type="button"
        className="search-bar__scan"
        aria-label="Escanear código de barras"
        onClick={() => searchIfValid(barcode)}
      >
        <BsUpcScan />
      </button>
    </div>
  );
}
