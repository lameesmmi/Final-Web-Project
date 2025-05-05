import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CardSlider = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          gap: '1rem',
          padding: '1rem 3rem', // give space inside for buttons
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="hide-scrollbar"
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 auto',
              width: '20rem',
              scrollSnapAlign: 'start',
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Left Button */}
      <Button
        variant="light"
        style={{
          position: 'absolute',
          top: '50%',
          left: '0.5rem',
          transform: 'translateY(-50%)',
          zIndex: 5,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          boxShadow: '0 0 6px rgba(0,0,0,0.1)',
        }}
        onClick={() => scroll('left')}
      >
        <FaChevronLeft />
      </Button>

      {/* Right Button */}
      <Button
        variant="light"
        style={{
          position: 'absolute',
          top: '50%',
          right: '0.5rem',
          transform: 'translateY(-50%)',
          zIndex: 5,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          boxShadow: '0 0 6px rgba(0,0,0,0.1)',
        }}
        onClick={() => scroll('right')}
      >
        <FaChevronRight />
      </Button>
    </div>
  );
};

export default CardSlider;


