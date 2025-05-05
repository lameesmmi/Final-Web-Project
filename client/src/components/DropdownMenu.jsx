import React, { useState, useRef } from 'react';
import './DropdownMenu.css';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

// Cities list
const saudiCities = [
  "Abha", "Alahssa", "Alqasim", "Alula", "Dammam",
  "Dhahran", "Hail", "Jazan", "Jeddah", "Jubail", "Khobar",
  "Makkah", "Medina", "Najran", "Qatif", "Riyadh",
  "Tabuk", "Taif"
];

function DropdownMenu({ onSelectCity }) {
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);
  const inputRef = useRef(null);

  const filteredCities = saudiCities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (city) => {
    setSearch(city);
    setShowList(false);
    inputRef.current.blur(); // closes dropdown immediately

    // Notify parent component of selection
    if (onSelectCity) {
      onSelectCity(city);
    }
  };

  return (
    <div className="dropdown-wrapper">
      <div className="search-container">
        <FiMenu
          className="icon-left"
          style={{ fontSize: '20px', flexShrink: 0 }}
          onClick={() => setShowList(prev => !prev)}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Where To?"
          value={search}
          ref={inputRef}
          onFocus={() => setShowList(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowList(true);
          }}
        />
        {search && (
          <FiX
            className="icon-clear"
            onClick={() => {
              setSearch('');
              setShowList(false);
              if (onSelectCity) onSelectCity(null); // Clear selection
            }}
          />
        )}
        <FiSearch className="icon-right" style={{ fontSize: '20px', flexShrink: 0 }} />
      </div>

      {showList && (
        <div className="custom-dropdown">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              className="dropdown-item-custom"
              onMouseDown={() => handleSelect(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
