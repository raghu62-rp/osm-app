import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ cart, total, onClose, onConfirm }) => {
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [card, setCard] = useState({ number: '', name: '', exp: '', cvv: '' });

  const handlePay = async (e) => {
    e.preventDefault();
    setError('');

    // Very small client-side validation
    if (method === 'card') {
      if (!card.number || !card.name || !card.exp || !card.cvv) {
        setError('Please fill card details');
        return;
      }
    }

    // Simulate payment processing
    setProcessing(true);
    try {
      // In a real integration you'd call a gateway SDK here (Stripe/Razorpay/etc.)
      // We simulate a network/payment delay
      await new Promise((r) => setTimeout(r, 1200));

      // Simulate success and call the provided confirm callback which should create the order
      await onConfirm();

      // close is handled by parent after order success
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h3>Proceed to Payment</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="checkout-body">
          <div className="order-summary">
            <h4>Order Summary</h4>
            <div className="summary-list">
              {cart.map((it) => (
                <div key={it.id} className="summary-item">
                  <span>{it.name} × {it.quantity}</span>
                  <strong>${(it.price * it.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
            <div className="summary-total">Total: <strong>${total.toFixed(2)}</strong></div>
          </div>

          <form className="payment-form" onSubmit={handlePay}>
            <h4>Payment Method</h4>
            <div className="methods">
              <label>
                <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} /> Card
              </label>
              <label>
                <input type="radio" name="method" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} /> UPI
              </label>
              <label>
                <input type="radio" name="method" value="wallet" checked={method === 'wallet'} onChange={() => setMethod('wallet')} /> Wallet
              </label>
            </div>

            {method === 'card' && (
              <div className="card-fields">
                <input type="text" placeholder="Card number" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                <input type="text" placeholder="Name on card" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
                <div className="row">
                  <input type="text" placeholder="MM/YY" value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} />
                  <input type="password" placeholder="CVV" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                </div>
              </div>
            )}

            {method === 'upi' && (
              <div className="upi-field">
                <input type="text" placeholder="Enter UPI ID (e.g. alice@bank)" />
              </div>
            )}

            {method === 'wallet' && (
              <div className="wallet-field">
                <p>Choose your wallet in production (Paytm, PhonePe) — simulated here.</p>
              </div>
            )}

            {error && <div className="checkout-error">{error}</div>}

            <button className="pay-btn" type="submit" disabled={processing}>
              {processing ? 'Processing…' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
