export const convertNumberSystem = (value, fromBase, toBase) => {
  if (!value) return '';
  try {
    const decimal = parseInt(value, fromBase);
    if (isNaN(decimal)) return 'Invalid Input';
    return decimal.toString(toBase).toUpperCase();
  } catch {
    return 'Error';
  }
};
