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

const COMPOUND_FORMATS: Record<string, (value: number) => string | null> = {
  foot: (decimalFeet) => {
    const totalInches = Math.abs(decimalFeet) * 12;
    const ft = Math.floor(totalInches / 12);
    const inches = Math.round((totalInches % 12) * 100) / 100;
    if (ft === 0 && inches === 0) return null;
    const sign = decimalFeet < 0 ? '-' : '';
    if (ft === 0) return `${sign}${inches} in`;
    if (inches === 0) return `${sign}${ft} ft`;
    return `${sign}${ft} ft ${inches} in`;
  },
  inch: (decimalInches) => {
    const totalInches = Math.abs(decimalInches);
    const ft = Math.floor(totalInches / 12);
    if (ft === 0) return null;
    const inches = Math.round((totalInches % 12) * 100) / 100;
    const sign = decimalInches < 0 ? '-' : '';
    if (inches === 0) return `${sign}${ft} ft`;
    return `${sign}${ft} ft ${inches} in`;
  },
  minute: (decimalMinutes) => {
    const total = Math.abs(decimalMinutes);
    const h = Math.floor(total / 60);
    if (h === 0) return null;
    const m = Math.round((total % 60) * 100) / 100;
    const sign = decimalMinutes < 0 ? '-' : '';
    if (m === 0) return `${sign}${h} hr`;
    return `${sign}${h} hr ${m} min`;
  },
  hour: (decimalHours) => {
    const total = Math.abs(decimalHours);
    const h = Math.floor(total);
    const m = Math.round((total - h) * 60 * 100) / 100;
    if (h === 0 || m === 0) return null;
    const sign = decimalHours < 0 ? '-' : '';
    return `${sign}${h} hr ${m} min`;
  },
  second: (decimalSeconds) => {
    const total = Math.abs(decimalSeconds);
    if (total < 60) return null;
    const m = Math.floor(total / 60);
    const s = Math.round((total % 60) * 100) / 100;
    const sign = decimalSeconds < 0 ? '-' : '';
    if (s === 0) return `${sign}${m} min`;
    return `${sign}${m} min ${s} s`;
  },
};

export function getCompoundHint(
  unitKey: string,
  value: number
): string | null {
  const formatter = COMPOUND_FORMATS[unitKey];
  if (!formatter) return null;
  if (!isFinite(value) || value === 0) return null;
  return formatter(value);
}
