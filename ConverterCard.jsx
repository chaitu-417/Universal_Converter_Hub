import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

const ConverterCard = ({ title, description, slug, icon, type = 'converter' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(slug);

  const basePath = type === 'calculator' ? '/calculators' : 
                   type === 'text-tool' ? '/text-tools' : 
                   type === 'generator' ? '/generators' : '/converter';

  // Determine pastel styling for the icon background
  const getIconStyle = () => {
    switch (type) {
      case 'calculator':
        return { backgroundColor: 'rgba(30, 142, 62, 0.08)', color: '#1e8e3e' };
      case 'text-tool':
        return { backgroundColor: 'rgba(217, 48, 37, 0.08)', color: '#d93025' };
      case 'generator':
        return { backgroundColor: 'rgba(249, 171, 0, 0.08)', color: '#b06000' };
      default: // converter
        return { backgroundColor: 'rgba(26, 115, 232, 0.08)', color: '#1a73e8' };
    }
  };

  const iconStyle = getIconStyle();

  return (
    <Link to={`${basePath}/${slug}`} className="tool-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="tool-card-header">
        <div className="tool-card-icon-wrapper" style={iconStyle}>
          {icon}
        </div>
        <button 
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            toggleFavorite(slug); 
          }}
          className="tool-card-favorite-btn"
          style={{ background: 'none', border: 'none', color: favorite ? '#f4b400' : 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
        >
          <Star fill={favorite ? "#f4b400" : "none"} size={18} />
        </button>
      </div>
      <h3 className="tool-card-title">{title}</h3>
      <p className="tool-card-description">{description}</p>
    </Link>
  );
};

export default ConverterCard;

