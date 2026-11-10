import Decimal from 'decimal.js';
export const temperatureUnits = {
  celsius: { name: 'Celsius (°C)' },
  fahrenheit: { name: 'Fahrenheit (°F)' },
  kelvin: { name: 'Kelvin (K)' },
};

export const convertTemperature = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return '';
  const baseValue = new Decimal(value).times(temperatureUnits[fromUnit].factor);
  const result = baseValue.dividedBy(temperatureUnits[toUnit].factor);
  return result.toDecimalPlaces(8).toString().replace(/\.?0+$/, '');
};
