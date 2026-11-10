import Decimal from 'decimal.js';
export const volumeUnits = {
  'cubic-meter': { name: 'Cubic Meter (m³)', factor: 1 },
  'liter': { name: 'Liter (L)', factor: 0.001 },
  'milliliter': { name: 'Milliliter (mL)', factor: 0.000001 },
  'gallon-us': { name: 'Gallon (US)', factor: 0.00378541 },
  'fluid-ounce-us': { name: 'Fluid Ounce (US)', factor: 0.0000295735 },
};

export const convertVolume = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return '';
  const baseValue = new Decimal(value).times(volumeUnits[fromUnit].factor);
  const result = baseValue.dividedBy(volumeUnits[toUnit].factor);
  return result.toDecimalPlaces(8).toString().replace(/\.?0+$/, '');
};
