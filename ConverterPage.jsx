import React from 'react';
import { useParams } from 'react-router-dom';
import { getToolBySlug } from '../utils/converterRegistry';
import SEOHead from '../components/common/SEOHead';
import UnitConverter from '../components/converters/UnitConverter';
import TemperatureConverter from '../components/converters/TemperatureConverter';
import NumberSystemConverter from '../components/converters/NumberSystemConverter';
import RomanNumeralConverter from '../components/converters/RomanNumeralConverter';
import ColorConverter from '../components/converters/ColorConverter';

// Utils
import { lengthUnits, convertLength } from '../utils/conversions/length';
import { weightUnits, convertWeight } from '../utils/conversions/weight';
import { timeUnits, convertTime } from '../utils/conversions/time';
import { speedUnits, convertSpeed } from '../utils/conversions/speed';
import { areaUnits, convertArea } from '../utils/conversions/area';
import { volumeUnits, convertVolume } from '../utils/conversions/volume';
import { dataStorageUnits, convertDataStorage } from '../utils/conversions/dataStorage';

const ConverterPage = () => {
  const { slug } = useParams();
  const converter = getToolBySlug(slug, 'converter');

  if (!converter) {
    return <div>Converter not found</div>;
  }

  const renderConverter = () => {
    switch (slug) {
      case 'length': return <UnitConverter title={converter.title} units={lengthUnits} convertFn={convertLength} />;
      case 'weight': return <UnitConverter title={converter.title} units={weightUnits} convertFn={convertWeight} />;
      case 'time': return <UnitConverter title={converter.title} units={timeUnits} convertFn={convertTime} />;
      case 'speed': return <UnitConverter title={converter.title} units={speedUnits} convertFn={convertSpeed} />;
      case 'area': return <UnitConverter title={converter.title} units={areaUnits} convertFn={convertArea} />;
      case 'volume': return <UnitConverter title={converter.title} units={volumeUnits} convertFn={convertVolume} />;
      case 'data-storage': return <UnitConverter title={converter.title} units={dataStorageUnits} convertFn={convertDataStorage} />;
      case 'temperature': return <TemperatureConverter />;
      case 'number-systems': return <NumberSystemConverter />;
      case 'roman-numerals': return <RomanNumeralConverter />;
      case 'color': return <ColorConverter />;
      default: return <div>Converter component under construction</div>;
    }
  };

  return (
    <>
      <SEOHead title={converter.title} description={converter.description} />
      {renderConverter()}
    </>
  );
};

export default ConverterPage;
