import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency formatting utilities
export function formatCurrency(amount: number | string, currency = "KSh"): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : amount;
  
  if (isNaN(numAmount)) {
    return `${currency} 0`;
  }
  
  // Format with commas for thousands
  const formatted = numAmount.toLocaleString('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return `${currency} ${formatted}`;
}

// Parse currency string to get numeric value
export function parseCurrency(currencyString: string): number {
  if (!currencyString) return 0;
  const cleanString = currencyString.replace(/[^\d.-]/g, '');
  return parseFloat(cleanString) || 0;
}

// Convert amount to display format (e.g., for input placeholders)
export function getCurrencyPlaceholder(amount: number | string = 5000): string {
  return formatCurrency(amount);
}
