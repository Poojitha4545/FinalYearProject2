// src/components/CurrencySelector.jsx
import { useCurrency } from "../context/CurrencyContext";

export default function CurrencySelector() {
  const { currency, setCurrency, CURRENCIES } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
    >
      {CURRENCIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.code}
        </option>
      ))}
    </select>
  );
}