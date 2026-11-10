export const convertRomanNumerals = (value, isToRoman) => {
  if (!value) return '';
  if (isToRoman) {
    let num = parseInt(value, 10);
    if (isNaN(num) || num < 1 || num > 3999) return '1-3999 only';
    const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '';
    for ( let i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  } else {
    const roman = value.toUpperCase();
    const lookup = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    let num = 0;
    for (let i = 0; i < roman.length; i++) {
      if (lookup[roman[i]] < lookup[roman[i+1]]) {
        num -= lookup[roman[i]];
      } else {
        num += lookup[roman[i]];
      }
    }
    return isNaN(num) ? 'Invalid Roman' : num.toString();
  }
};
