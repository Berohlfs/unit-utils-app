export type Unit = {
  key: string;
  label: string;
  abbreviation: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

export type UnitCategory = {
  key: string;
  label: string;
  icon: string;
  units: Unit[];
};
