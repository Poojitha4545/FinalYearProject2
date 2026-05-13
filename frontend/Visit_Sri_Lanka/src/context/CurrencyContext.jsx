// src/context/CurrencyContext.jsx
import { createContext, useContext, useState } from "react";

export const CURRENCIES = [
  { code: "USD", symbol: "$",    flag: "🇺🇸", rate: 1 },
  { code: "EUR", symbol: "€",    flag: "🇪🇺", rate: 0.92 },
  { code: "GBP", symbol: "£",    flag: "🇬🇧", rate: 0.79 },
  { code: "LKR", symbol: "Rs",   flag: "🇱🇰", rate: 320 },
  { code: "AUD", symbol: "A$",   flag: "🇦🇺", rate: 1.53 },
  { code: "INR", symbol: "₹",    flag: "🇮🇳", rate: 83.5 },
  { code: "JPY", symbol: "¥",    flag: "🇯🇵", rate: 149 },
  { code: "CAD", symbol: "C$",   flag: "🇨🇦", rate: 1.36 },
  { code: "SGD", symbol: "S$",   flag: "🇸🇬", rate: 1.34 },
  { code: "AED", symbol: "د.إ",  flag: "🇦🇪", rate: 3.67 },
];

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  /** Format a USD amount into the selected currency */
  const format = (usdAmount) => {
    const converted = usdAmount * selectedCurrency.rate;
    const rounded =
      selectedCurrency.code === "JPY" || selectedCurrency.code === "LKR"
        ? Math.round(converted)
        : converted.toFixed(2);
    return `${selectedCurrency.symbol}${rounded}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}