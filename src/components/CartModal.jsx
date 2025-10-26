import React from 'react';
import CartItem from './CartItem.jsx';

const CartModal = ({ 
  cart, 
  isOpen, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  total 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Shopping Cart ({cart.length} items)</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
              <p>Your cart is empty</p>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemoveItem}
                  />
                ))}
              </div>
              
                <div className="cart-total">
                <div className="total-amount">
                  Total: ${total.toFixed(2)}
                </div>
                <button className="checkout-btn" onClick={onCheckout}>
                  Proceed to Checkout 💳
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;