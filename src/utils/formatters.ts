/**
 * Standard business intelligence formatting utilities.
 */

export function formatCurrency(amount: number, compact = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '$0';
  }

  if (compact) {
    if (Math.abs(amount) >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(2)}M`;
    }
    if (Math.abs(amount) >= 1_000) {
      return `$${(amount / 1_000).toFixed(1)}k`;
    }
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCurrencyExact(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (isNaN(num) || num === null || num === undefined) {
    return '0';
  }
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercent(rate: number, decimals = 1): string {
  if (isNaN(rate) || rate === null || rate === undefined) {
    return '0.0%';
  }
  return `${rate.toFixed(decimals)}%`;
}
