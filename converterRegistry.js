export const converters = [
  { slug: 'length', title: 'Length Converter', description: 'Convert between meters, feet, inches, etc.', category: 'basic', icon: '📏' },
  { slug: 'weight', title: 'Weight Converter', description: 'Convert kilograms, pounds, ounces.', category: 'basic', icon: '⚖️' },
  { slug: 'temperature', title: 'Temperature Converter', description: 'Celsius, Fahrenheit, Kelvin.', category: 'basic', icon: '🌡️' },
  { slug: 'time', title: 'Time Converter', description: 'Seconds, minutes, hours, days.', category: 'basic', icon: '⏱️' },
  { slug: 'speed', title: 'Speed Converter', description: 'km/h, mph, m/s, knots.', category: 'science', icon: '🚀' },
  { slug: 'area', title: 'Area Converter', description: 'Square meters, acres, hectares.', category: 'basic', icon: '📐' },
  { slug: 'volume', title: 'Volume Converter', description: 'Liters, gallons, cubic meters.', category: 'basic', icon: '🧊' },
  { slug: 'data-storage', title: 'Data Storage', description: 'Bytes, KB, MB, GB, TB.', category: 'computing', icon: '💾' },
  { slug: 'number-systems', title: 'Number Systems', description: 'Binary, Decimal, Hexadecimal, Octal.', category: 'computing', icon: '🔢', component: 'NumberSystemConverter' },
  { slug: 'roman-numerals', title: 'Roman Numerals', description: 'Convert numbers to Roman numerals.', category: 'math', icon: '🏛️', component: 'RomanNumeralConverter' },
  { slug: 'color', title: 'Color Converter', description: 'HEX, RGB, HSL, CMYK.', category: 'design', icon: '🎨', component: 'ColorConverter' }
];

export const calculators = [
  { slug: 'bmi', title: 'BMI Calculator', description: 'Calculate Body Mass Index.', icon: '⚕️' },
  { slug: 'age', title: 'Age Calculator', description: 'Calculate exact age from DOB.', icon: '🎂' },
  { slug: 'percentage', title: 'Percentage Calculator', description: 'Calculate percentages easily.', icon: '💯' },
];

export const textTools = [
  { slug: 'word-counter', title: 'Word Counter', description: 'Count words, characters, paragraphs.', icon: '📝' },
  { slug: 'case-converter', title: 'Case Converter', description: 'UPPERCASE, lowercase, Title Case.', icon: 'Aa' },
  { slug: 'base64', title: 'Base64 Encode/Decode', description: 'Encode or decode base64 strings.', icon: '🔒' },
];

export const generators = [
  { slug: 'password', title: 'Password Generator', description: 'Generate secure passwords.', icon: '🔑' },
  { slug: 'uuid', title: 'UUID Generator', description: 'Generate random UUIDs.', icon: '🆔' },
  { slug: 'qrcode', title: 'QR Code Generator', description: 'Create QR codes from text or URLs.', icon: '📱' },
];

export const getToolBySlug = (slug, type) => {
  const collection = type === 'calculator' ? calculators :
                     type === 'text-tool' ? textTools :
                     type === 'generator' ? generators : converters;
  return collection.find(t => t.slug === slug);
};
