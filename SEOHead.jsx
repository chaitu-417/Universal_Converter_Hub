import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, url, type = 'website' }) => {
  const siteTitle = title ? `${title} | Universal Converter Hub` : 'Universal Converter Hub';
  const siteDescription = description || 'The ultimate all-in-one platform for unit conversions, calculators, and text tools.';
  const siteUrl = url ? `https://converterhub.app${url}` : 'https://converterhub.app';

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <link rel="canonical" href={siteUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
    </Helmet>
  );
};

export default SEOHead;
