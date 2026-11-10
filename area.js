import Decimal from 'decimal.js';
export const areaUnits = {
  'sq-meter': { name: 'Square Meter (m²)', factor: 1 },
  'sq-kilometer': { name: 'Square Kilometer (km²)', factor: 1000000 },
  'hectare': { name: 'Hectare (ha)', factor: 10000 },
  'acre': { name: 'Acre (ac)', factor: 4046.85642 },
  'sq-foot': { name: 'Square Foot (ft²)', factor: 0.092903 },
  'sq-mile': { name: 'Square Mile (mi²)', factor: 2589988.11 },
};

export const convertArea = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return '';
  const baseValue = new Decimal(value).times(areaUnits[fromUnit].factor);
  const result = baseValue.dividedBy(areaUnits[toUnit].factor);
  return result.toDecimalPlaces(8).toString().replace(/\.?0+$/, '');
};
