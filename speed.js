import Decimal from 'decimal.js';
export const speedUnits = {
  'm/s': { name: 'Meter per second (m/s)', factor: 1 },
  'km/h': { name: 'Kilometer per hour (km/h)', factor: 0.277778 },
  'mph': { name: 'Miles per hour (mph)', factor: 0.44704 },
  'knot': { name: 'Knot (kn)', factor: 0.514444 },
};

export const convertSpeed = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return '';
  const baseValue = new Decimal(value).times(speedUnits[fromUnit].factor);
  const result = baseValue.dividedBy(speedUnits[toUnit].factor);
  return result.toDecimalPlaces(8).toString().replace(/\.?0+$/, '');
};
