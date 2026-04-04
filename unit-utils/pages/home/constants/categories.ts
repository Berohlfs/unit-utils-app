import { Unit, UnitCategory } from '../types';

function linearUnit(
  key: string,
  label: string,
  abbreviation: string,
  factor: number
): Unit {
  return {
    key,
    label,
    abbreviation,
    toBase: (v) => v * factor,
    fromBase: (v) => v / factor,
  };
}

export const categories: UnitCategory[] = [
  {
    key: 'length',
    label: 'Length',
    icon: 'straighten',
    units: [
      linearUnit('meter', 'Meter', 'm', 1),
      linearUnit('kilometer', 'Kilometer', 'km', 1000),
      linearUnit('centimeter', 'Centimeter', 'cm', 0.01),
      linearUnit('millimeter', 'Millimeter', 'mm', 0.001),
      linearUnit('mile', 'Mile', 'mi', 1609.344),
      linearUnit('yard', 'Yard', 'yd', 0.9144),
      linearUnit('foot', 'Foot', 'ft', 0.3048),
      linearUnit('inch', 'Inch', 'in', 0.0254),
    ],
  },
  {
    key: 'weight',
    label: 'Weight',
    icon: 'fitness-center',
    units: [
      linearUnit('kilogram', 'Kilogram', 'kg', 1),
      linearUnit('gram', 'Gram', 'g', 0.001),
      linearUnit('milligram', 'Milligram', 'mg', 0.000001),
      linearUnit('pound', 'Pound', 'lb', 0.453592),
      linearUnit('ounce', 'Ounce', 'oz', 0.0283495),
      linearUnit('ton', 'Metric Ton', 't', 1000),
    ],
  },
  {
    key: 'temperature',
    label: 'Temp',
    icon: 'thermostat',
    units: [
      {
        key: 'celsius',
        label: 'Celsius',
        abbreviation: '°C',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        key: 'fahrenheit',
        label: 'Fahrenheit',
        abbreviation: '°F',
        toBase: (v) => ((v - 32) * 5) / 9,
        fromBase: (v) => (v * 9) / 5 + 32,
      },
      {
        key: 'kelvin',
        label: 'Kelvin',
        abbreviation: 'K',
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    ],
  },
  {
    key: 'volume',
    label: 'Volume',
    icon: 'local-drink',
    units: [
      linearUnit('liter', 'Liter', 'L', 1),
      linearUnit('milliliter', 'Milliliter', 'mL', 0.001),
      linearUnit('gallon', 'Gallon (US)', 'gal', 3.78541),
      linearUnit('quart', 'Quart (US)', 'qt', 0.946353),
      linearUnit('cup', 'Cup (US)', 'cup', 0.236588),
      linearUnit('fluidOunce', 'Fluid Ounce', 'fl oz', 0.0295735),
    ],
  },
  {
    key: 'speed',
    label: 'Speed',
    icon: 'speed',
    units: [
      linearUnit('mps', 'Meters/sec', 'm/s', 1),
      linearUnit('kph', 'Kilometers/hr', 'km/h', 1 / 3.6),
      linearUnit('mph', 'Miles/hr', 'mph', 0.44704),
      linearUnit('knot', 'Knot', 'kn', 0.514444),
    ],
  },
  {
    key: 'time',
    label: 'Time',
    icon: 'schedule',
    units: [
      linearUnit('second', 'Second', 's', 1),
      linearUnit('millisecond', 'Millisecond', 'ms', 0.001),
      linearUnit('minute', 'Minute', 'min', 60),
      linearUnit('hour', 'Hour', 'hr', 3600),
      linearUnit('day', 'Day', 'd', 86400),
      linearUnit('week', 'Week', 'wk', 604800),
    ],
  },
];
