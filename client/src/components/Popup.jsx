import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Popup = ({
  message = "Something went wrong!",
  title = "Error",
  type = "danger",
  showConfirm = false,
  showCancel = false,
  onConfirm,
  onCancel
}) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // Optional external logic
    }
    setVisible(false); // Hide the component
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Optional external logic
    } else {
      navigate(-1); // Default: go back
    }
    setVisible(false); // Hide the component
  };

  if (!visible) return null; // Don't render if closed

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <Alert variant={type} className="text-center shadow-lg p-4">
          <h4 className="mb-3">{title}</h4>
          <p>{message}</p>

          {(showConfirm || showCancel) && (
            <div className="d-flex justify-content-center gap-3 mt-4">
              {showConfirm && (
                <Button variant="success" onClick={handleConfirm}>
                  Confirm
                </Button>
              )}
              {showCancel && (
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          )}
        </Alert>
      </div>
    </div>
  );
};

export default Popup;
