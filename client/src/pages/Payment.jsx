import React, { useState, useEffect } from 'react';
import './Payment.css';
import TouristMenuBar from '../components/TouristMenuBar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axiosInstance';

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activityName, numberOfTickets } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [activitySummary, setActivitySummary] = useState({
    title: activityName || '',
    description: '',
    pricePerSeat: '',
    numberOfTickets: numberOfTickets || ''
  });
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(null);
  const [nextPopup, setNextPopup] = useState(null);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const fetchActivityDetails = async () => {
      if (!activityName) return;
      try {
        const res = await axios.get('/activities');
        const matched = res.data.find(act => act.eventName === activityName);
        if (matched) {
          setActivitySummary(prev => ({
            ...prev,
            description: matched.description,
            pricePerSeat: matched.price
          }));
        }
      } catch (err) {
        console.error('Failed to fetch activity info:', err);
      }
    };
    fetchActivityDetails();
  }, [activityName]);

  useEffect(() => {
    if (nextPopup) {
      nextPopup();
      setNextPopup(null);
    }
  }, [nextPopup]);

  const validate = () => {
    const newErrors = {};
    if (!/\d{16}/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = 'Expiry must be in MM/YY format';
    }
    if (!/^\d{3}$/.test(cvc)) {
      newErrors.cvc = 'CVC must be 3 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const getTotalPrice = () => {
    const price = parseInt(activitySummary.pricePerSeat);
    const quantity = parseInt(activitySummary.numberOfTickets);
    return isNaN(price) || isNaN(quantity) ? '' : `${price * quantity} SAR`;
  };

  const handleSubmit = () => {
    if (paymentMethod === 'apple') {
      setPopup({
        title: 'Confirm Apple Pay',
        message: `Do you want to confirm paying ${getTotalPrice()} for ${activitySummary.title}?`,
        type: 'warning',
        buttons: [
          { label: 'Cancel', variant: 'outline-warning', onClick: () => navigate('/MyPlan') },
          {
            label: 'Confirm', variant: 'warning', onClick: () => {
              setPopup(null);
              setNextPopup(() => () => {
                setPopup({
                  title: 'Payment Successful',
                  message: 'Your payment has been successfully processed!',
                  type: 'success',
                  buttons: [
                    { label: 'See My Plan', variant: 'success', onClick: () => navigate('/MyPlan') }
                  ]
                });
              });
            }
          }
        ]
      });
    } else {
      if (validate()) {
        setPopup({
          title: 'Payment Successful',
          message: 'Your payment has been successfully processed!',
          type: 'success',
          buttons: [
            { label: 'See My Plan', variant: 'success', onClick: () => navigate('/MyPlan') }
          ]
        });
      } else {
        setPopup({
          title: 'Payment Declined',
          message: 'Please enter valid card credentials.',
          type: 'danger',
          buttons: [
            { label: 'OK', variant: 'danger', onClick: () => setPopup(null) }
          ]
        });
      }
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'success': return '#d4edda';
      case 'danger': return '#f8d7da';
      case 'warning': return '#fff3cd';
      default: return '#f8f9fa';
    }
  };

  return (
    <div className="payment-page">
      <div className="menu-bar-wrapper">
        <TouristMenuBar />
      </div>
      <h1 className="page-title" style={{ color: '#5c4033' }}>Pay & Confirm</h1>

      {popup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%',
          height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }}>
          <div style={{
            background: getAlertColor(popup.type),
            padding: '20px', borderRadius: '12px', maxWidth: '400px',
            width: '100%', textAlign: 'center'
          }}>
            <h4>{popup.title}</h4>
            <p>{popup.message}</p>
            <div className="d-flex justify-content-center gap-2 mt-4">
              {popup.buttons.map((btn, idx) => (
                <button key={idx} onClick={btn.onClick} className={`btn btn-${btn.variant}`}>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="payment-layout">
        <div className="payment-form">
          <div className="payment-methods">
            <label className="payment-option">
              <div className="d-flex align-items-center gap-3">
                <input type="radio" name="method" value="apple"
                  checked={paymentMethod === 'apple'}
                  onChange={() => setPaymentMethod('apple')} />
                <span className="payment-text">Apple Pay</span>
              </div>
              <img src="/apple-pay.png" alt="Apple Pay" className="payment-icon" />
            </label>

            <label className="payment-option">
              <div className="d-flex align-items-center gap-3">
                <input type="radio" name="method" value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')} />
                <span className="payment-text">Debit / Credit Card</span>
              </div>
              <div className="card-icons d-flex gap-2">
                <img src="/visa.png" alt="Visa" className="payment-icon" />
                <img src="/Master2.png" alt="Mastercard" className="payment-icon" />
                <img src="/Mada.png" alt="Mada" className="payment-icon" />
              </div>
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-info">
              <label>
                Card Number
                <input type="text" placeholder="1234 5678 9012 3456"
                  value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                  onBlur={() => handleBlur('cardNumber')} />
                {touched.cardNumber && errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </label>
              <div className="row">
                <div className="form-group half-width">
                  <label>
                    Expiry
                    <input type="text" placeholder="MM/YY"
                      value={expiry} onChange={(e) => setExpiry(e.target.value)}
                      onBlur={() => handleBlur('expiry')} />
                    {touched.expiry && errors.expiry && <span className="error-text">{errors.expiry}</span>}
                  </label>
                </div>
                <div className="form-group half-width">
                  <label>
                    CVC
                    <input type="text" placeholder="123"
                      value={cvc} onChange={(e) => setCvc(e.target.value)}
                      onBlur={() => handleBlur('cvc')} />
                    {touched.cvc && errors.cvc && <span className="error-text">{errors.cvc}</span>}
                  </label>
                </div>
              </div>
              <label>
                Total Price
                <input type="text" value={getTotalPrice()} readOnly />
              </label>
            </div>
          )}
        </div>

        <div className="summary-box">
          <h2>Summary</h2>
          <div className="summary-content">
            <p><strong>{activitySummary.title || 'Activity Title'}</strong></p>
            <p>{activitySummary.description || 'Description'}</p>
          </div>
          <div className="summary-footer">
            <div className="summary-line">
              <span>Price/Seat:</span>
              <span>{activitySummary.pricePerSeat || '-'}</span>
            </div>
            <div className="summary-line">
              <span>Number of Tickets:</span>
              <span>{activitySummary.numberOfTickets || '-'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="confirm-btn-wrapper">
        <button className="confirm-button" onClick={handleSubmit}>Pay & Confirm</button>
      </div>
    </div>
  );
}

export default PaymentPage;
