import Decimal from 'decimal.js';
export const weightUnits = {
  kilogram: { name: 'Kilogram (kg)', factor: 1 },
  gram: { name: 'Gram (g)', factor: 0.001 },
  milligram: { name: 'Milligram (mg)', factor: 0.000001 },
  metric_ton: { name: 'Metric Ton (t)', factor: 1000 },
  pound: { name: 'Pound (lb)', factor: 0.45359237 },
  ounce: { name: 'Ounce (oz)', factor: 0.02834952 },
};

export const convertWeight = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return '';
  const baseValue = new Decimal(value).times(weightUnits[fromUnit].factor);
  const result = baseValue.dividedBy(weightUnits[toUnit].factor);
  return result.toDecimalPlaces(8).toString().replace(/\.?0+$/, '');
};
