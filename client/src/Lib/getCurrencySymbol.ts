export enum CurrencyType {
  INR = "INR",
}

export const getCurrencySymbol = (currency: CurrencyType): string => {
  const currencySymbols: Record<CurrencyType, string> = {
    INR: "₹",
  };

  return currencySymbols[currency] || currency; // Default to currency code if not found
};
