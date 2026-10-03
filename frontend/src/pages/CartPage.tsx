import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, totalQuantity, fetchCart, updateQuantity, removeFromCart } = useStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '20px 24px' }}>
      <div style={{ maxWidth: '1480px', margin: '0 auto', display: 'flex', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Cart Items List */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          {cartItems.length === 0 ? (
            <div style={{ padding: '30px 10px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
                Your Amazon Cart is empty
              </h2>
              <p style={{ color: '#565959', fontSize: '14px', marginBottom: '20px' }}>
                Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics, and more.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="btn-amazon-yellow"
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  borderBottom: '1px solid #d5d9d9',
                  paddingBottom: '10px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#0f1111' }}>Shopping Cart</h1>
                  <span style={{ fontSize: '13px', color: '#007185', cursor: 'pointer' }}>
                    Deselect all items
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#565959', fontWeight: 500 }}>
                  Price
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid #e7e7e7',
                    }}
                  >
                    {/* Item checkbox & image */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <input
                        type="checkbox"
                        defaultChecked
                        style={{ width: '18px', height: '18px', marginTop: '10px', accentColor: '#e77600' }}
                      />
                      <div
                        onClick={() => navigate(`/product/${item.product.id}`)}
                        style={{
                          width: '160px',
                          height: '160px',
                          backgroundColor: '#f8f8f8',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <img
                          src={item.product.main_image}
                          alt={item.product.title}
                          style={{ maxHeight: '140px', maxWidth: '140px', objectFit: 'contain' }}
                        />
                      </div>
                    </div>

                    {/* Item Info */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Link
                        to={`/product/${item.product.id}`}
                        style={{
                          fontSize: '17px',
                          fontWeight: 500,
                          color: '#0f1111',
                          textDecoration: 'none',
                          lineHeight: 1.3,
                          marginBottom: '6px',
                        }}
                      >
                        {item.product.title}
                      </Link>

                      <div style={{ fontSize: '12px', color: '#007600', fontWeight: 600, marginBottom: '4px' }}>
                        In Stock
                      </div>

                      {item.product.is_prime && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                          <div className="prime-badge" style={{ fontSize: '14px' }}>
                            <Check size={14} strokeWidth={4} className="prime-check" />
                            <span>prime</span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#565959' }}>FREE One-Day delivery</span>
                        </div>
                      )}

                      <div style={{ fontSize: '12px', color: '#565959', marginBottom: '12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                          <input type="checkbox" style={{ accentColor: '#e77600' }} />
                          <span>This is a gift <span style={{ color: '#007185' }}>Learn more</span></span>
                        </label>
                      </div>

                      {/* Quantity & Delete Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '12px', color: '#565959' }}>Qty:</span>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.cartItemId, Number(e.target.value))}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '6px',
                              border: '1px solid #d5d9d9',
                              backgroundColor: '#f0f2f2',
                              fontSize: '13px',
                              cursor: 'pointer',
                              outline: 'none',
                            }}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </div>

                        <span style={{ color: '#d5d9d9' }}>|</span>

                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#007185',
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>

                        <span style={{ color: '#d5d9d9' }}>|</span>

                        <span
                          style={{ fontSize: '13px', color: '#007185', cursor: 'pointer' }}
                          onClick={() => alert('Item saved for later!')}
                        >
                          Save for later
                        </span>
                      </div>
                    </div>

                    {/* Price on right */}
                    <div style={{ textAlign: 'right', minWidth: '90px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f1111' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      {item.quantity > 1 && (
                        <div style={{ fontSize: '11px', color: '#565959', marginTop: '2px' }}>
                          (${item.product.price.toFixed(2)} each)
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal bar at bottom of list */}
              <div style={{ textAlign: 'right', paddingTop: '16px' }}>
                <span style={{ fontSize: '18px', color: '#0f1111' }}>
                  Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}):{' '}
                  <strong style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Checkout Summary Box */}
        {cartItems.length > 0 && (
          <div
            style={{
              width: '320px',
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              position: 'sticky',
              top: '80px',
            }}
          >
            {/* Free Shipping Callout */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div
                style={{
                  backgroundColor: '#007600',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <Check size={12} strokeWidth={3} />
              </div>
              <div style={{ fontSize: '12px', color: '#007600', lineHeight: 1.3 }}>
                <strong>Your order qualifies for FREE Shipping.</strong> Choose this option at checkout.
              </div>
            </div>

            {/* Subtotal */}
            <div style={{ fontSize: '18px', color: '#0f1111', marginBottom: '16px' }}>
              Subtotal ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}):{' '}
              <strong style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</strong>
            </div>

            <div style={{ fontSize: '13px', color: '#0f1111', marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#e77600' }} />
                <span>This order contains a gift</span>
              </label>
            </div>

            {/* Proceed to checkout button */}
            <button
              onClick={() => navigate('/checkout')}
              className="btn-amazon-yellow"
              style={{ width: '100%', padding: '10px 0', fontSize: '14px', fontWeight: 600 }}
            >
              Proceed to checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
