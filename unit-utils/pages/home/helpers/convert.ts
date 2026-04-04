import { Unit } from '../types';

export function convert(value: number, from: Unit, to: Unit): number {
  return to.fromBase(from.toBase(value));
}

export function formatResult(value: number): string {
  if (!isFinite(value)) return '—';
  if (value === 0) return '0';

  const abs = Math.abs(value);

  // Very large or very small numbers use exponential
  if (abs >= 1e12 || (abs > 0 && abs < 1e-6)) {
    return value.toExponential(4);
  }

  // Up to 8 significant digits, strip trailing zeros
  const result = parseFloat(value.toPrecision(8));
  return String(result);
}
