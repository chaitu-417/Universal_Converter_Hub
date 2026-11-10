import Decimal from 'decimal.js';
export const dataStorageUnits = {
  'bit': { name: 'Bit (b)', factor: 0.125 },
  'byte': { name: 'Byte (B)', factor: 1 },
  'kilobyte': { name: 'Kilobyte (KB)', factor: 1024 },
  'megabyte': { name: 'Megabyte (MB)', factor: 1048576 },
  'gigabyte': { name: 'Gigabyte (GB)', factor: 1073741824 },
  'terabyte': { name: 'Terabyte (TB)', factor: 1099511627776 },
};

export const convertDataStorage = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return '';
  const baseValue = new Decimal(value).times(dataStorageUnits[fromUnit].factor);
  const result = baseValue.dividedBy(dataStorageUnits[toUnit].factor);
  return result.toDecimalPlaces(8).toString().replace(/\.?0+$/, '');
};
