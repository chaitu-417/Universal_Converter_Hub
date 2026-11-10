import Decimal from 'decimal.js';
export const lengthUnits = {
  meter: { name: 'Meter (m)', factor: 1 },
  kilometer: { name: 'Kilometer (km)', factor: 1000 },
  centimeter: { name: 'Centimeter (cm)', factor: 0.01 },
  millimeter: { name: 'Millimeter (mm)', factor: 0.001 },
  mile: { name: 'Mile (mi)', factor: 1609.344 },
  yard: { name: 'Yard (yd)', factor: 0.9144 },
  foot: { name: 'Foot (ft)', factor: 0.3048 },
  inch: { name: 'Inch (in)', factor: 0.0254 },
};

export const convertLength = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return '';
  const baseValue = new Decimal(value).times(lengthUnits[fromUnit].factor);
  const result = baseValue.dividedBy(lengthUnits[toUnit].factor);
  return result.toDecimalPlaces(8).toString().replace(/\.?0+$/, '');
};
