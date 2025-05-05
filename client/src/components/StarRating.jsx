const StarRating = ({ rating }) => {
  const maxStars = 5;

  return (
    <div style={{ fontSize: '24px', color: '#FFD700' }}>
      {Array.from({ length: maxStars }, (_, index) => {
        return index < rating ? '★' : '☆';
      })}
    </div>
  );
};

export default StarRating;
