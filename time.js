import Decimal from 'decimal.js';
export const timeUnits = {
  second: { name: 'Second (s)', factor: 1 },
  minute: { name: 'Minute (min)', factor: 60 },
  hour: { name: 'Hour (h)', factor: 3600 },
  day: { name: 'Day (d)', factor: 86400 },
  week: { name: 'Week (wk)', factor: 604800 },
  month: { name: 'Month (mo)', factor: 2592000 },
  year: { name: 'Year (yr)', factor: 31536000 },
};

export const convertTime = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return '';
  const baseValue = new Decimal(value).times(timeUnits[fromUnit].factor);
  const result = baseValue.dividedBy(timeUnits[toUnit].factor);
  return result.toDecimalPlaces(8).toString().replace(/\.?0+$/, '');
};
