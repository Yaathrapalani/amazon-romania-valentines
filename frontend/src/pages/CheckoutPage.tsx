import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Check, CreditCard, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import { api } from '../services/api';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, shippingAddress, setShippingAddress, clearCart } = useStore();

  const [addressForm, setAddressForm] = useState(shippingAddress);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'amazon_pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardHolder, setCardHolder] = useState(addressForm.fullName || 'Alex Mercer');
  const [expMonth, setExpMonth] = useState('12');
  const [expYear, setExpYear] = useState('28');
  const [cvv, setCvv] = useState('123');
  const [deliverySpeed, setDeliverySpeed] = useState<'free' | 'priority'>('free');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const shippingCost = deliverySpeed === 'priority' ? 4.99 : 0.00;
  const orderTotal = Math.round((subtotal + shippingCost) * 100) / 100;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      // 1. Process Demo Payment if card chosen
      if (paymentMethod === 'card') {
        await api.processPayment({
          amount: orderTotal,
          cardNumber: cardNumber.replace(/\s+/g, ''),
          cardHolder,
          expMonth,
          expYear,
          cvv,
        });
      }

      // 2. Create Order in Backend SQLite
      const orderPayload = {
        shippingAddress: addressForm,
        paymentMethod: paymentMethod === 'card' ? 'Visa ending in ' + cardNumber.slice(-4) : (paymentMethod === 'amazon_pay' ? 'Amazon Pay' : 'Cash on Delivery'),
        items: cartItems.map((item) => ({
          productId: item.product.id,
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.main_image,
        })),
        totalAmount: orderTotal,
      };

      const result = await api.createOrder(orderPayload);
      setShippingAddress(addressForm);
      await clearCart();

      // Navigate to order confirmation
      navigate(`/order-success/${result.orderId}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMsg(err.message || 'Payment processing failed. Please check card details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      
      {/* Amazon Checkout Clean Header */}
      <header
        style={{
          borderBottom: '1px solid #d5d9d9',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fcfcfc',
        }}
      >
        <Link to="/">
          <svg viewBox="0 0 100 35" width="105" height="32" fill="none">
            <text x="0" y="24" fill="#131921" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="22">
              amazon
            </text>
            <path d="M 5 28 C 30 38 65 37 88 28" stroke="#ff9900" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <polygon points="86,24 93,28 85,32" fill="#ff9900" />
          </svg>
        </Link>

        <h1 style={{ fontSize: '24px', fontWeight: 400, color: '#333333' }}>Checkout</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#565959', fontSize: '13px' }}>
          <Lock size={16} />
          <span>Secure transaction</span>
        </div>
      </header>

      {/* Main Checkout Body */}
      <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', display: 'flex', gap: '30px', alignItems: 'start' }}>
        
        {/* Left Column: Multi-Step Forms */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {errorMsg && (
            <div
              style={{
                backgroundColor: '#fff0f0',
                border: '1px solid #d00',
                borderRadius: '4px',
                padding: '12px 16px',
                color: '#d00',
                fontSize: '14px',
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Step 1: Shipping Address */}
          <div style={{ border: '1px solid #d5d9d9', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f1111' }}>
                1. Shipping address
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Full name
                </label>
                <input
                  type="text"
                  value={addressForm.fullName}
                  onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Phone number
                </label>
                <input
                  type="text"
                  value={addressForm.phoneNumber || ''}
                  onChange={(e) => setAddressForm({ ...addressForm, phoneNumber: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Street address
                </label>
                <input
                  type="text"
                  value={addressForm.streetAddress}
                  onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  City
                </label>
                <input
                  type="text"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    State
                  </label>
                  <input
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px' }}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={addressForm.zipCode}
                    onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px' }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div style={{ border: '1px solid #d5d9d9', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f1111', marginBottom: '16px' }}>
              2. Payment method
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Demo Credit Card option */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px',
                  border: paymentMethod === 'card' ? '1px solid #e77600' : '1px solid #e7e7e7',
                  borderRadius: '6px',
                  backgroundColor: paymentMethod === 'card' ? '#fcf9f2' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  style={{ marginTop: '4px', accentColor: '#e77600' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={18} color="#007185" />
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Credit or debit card (Instant Demo)</span>
                    <span style={{ fontSize: '11px', color: '#007600', backgroundColor: '#e7f4e8', padding: '2px 6px', borderRadius: '3px' }}>
                      Pre-filled Demo Card
                    </span>
                  </div>

                  {paymentMethod === 'card' && (
                    <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '12px', color: '#565959', display: 'block' }}>Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          style={{ width: '100%', padding: '6px 8px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: '#565959', display: 'block' }}>Exp (MM/YY)</label>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <input
                            type="text"
                            placeholder="MM"
                            value={expMonth}
                            onChange={(e) => setExpMonth(e.target.value)}
                            style={{ width: '45px', padding: '6px 4px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px', textAlign: 'center' }}
                          />
                          <input
                            type="text"
                            placeholder="YY"
                            value={expYear}
                            onChange={(e) => setExpYear(e.target.value)}
                            style={{ width: '45px', padding: '6px 4px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px', textAlign: 'center' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: '#565959', display: 'block' }}>CVV</label>
                        <input
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength={4}
                          style={{ width: '60px', padding: '6px 8px', border: '1px solid #888', borderRadius: '4px', fontSize: '13px' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Amazon Pay Balance */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  border: paymentMethod === 'amazon_pay' ? '1px solid #e77600' : '1px solid #e7e7e7',
                  borderRadius: '6px',
                  backgroundColor: paymentMethod === 'amazon_pay' ? '#fcf9f2' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'amazon_pay'}
                  onChange={() => setPaymentMethod('amazon_pay')}
                  style={{ accentColor: '#e77600' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Amazon Pay Balance</span>
                  <span style={{ fontSize: '13px', color: '#007600', fontWeight: 600 }}>$500.00 Available</span>
                </div>
              </label>

              {/* Cash On Delivery */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  border: paymentMethod === 'cod' ? '1px solid #e77600' : '1px solid #e7e7e7',
                  borderRadius: '6px',
                  backgroundColor: paymentMethod === 'cod' ? '#fcf9f2' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  style={{ accentColor: '#e77600' }}
                />
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Cash on Delivery / Pay on Arrival</span>
              </label>

            </div>
          </div>

          {/* Step 3: Review items & Delivery speed */}
          <div style={{ border: '1px solid #d5d9d9', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f1111', marginBottom: '16px' }}>
              3. Review items and shipping
            </h2>

            {/* Delivery speed selector */}
            <div style={{ backgroundColor: '#f9f9f9', padding: '14px', borderRadius: '6px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Choose your Prime delivery option:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="speed"
                    checked={deliverySpeed === 'free'}
                    onChange={() => setDeliverySpeed('free')}
                    style={{ accentColor: '#e77600' }}
                  />
                  <span style={{ fontSize: '13px' }}>
                    <strong style={{ color: '#007600' }}>Tomorrow, Oct 4</strong> — FREE Prime Two-Day Shipping
                  </span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="speed"
                    checked={deliverySpeed === 'priority'}
                    onChange={() => setDeliverySpeed('priority')}
                    style={{ accentColor: '#e77600' }}
                  />
                  <span style={{ fontSize: '13px' }}>
                    <strong style={{ color: '#c45500' }}>Today by 10 PM</strong> — $4.99 Priority Same-Day Delivery
                  </span>
                </label>
              </div>
            </div>

            {/* Items summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cartItems.map((item) => (
                <div key={item.cartItemId} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <img
                    src={item.product.main_image}
                    alt={item.product.title}
                    style={{ width: '60px', height: '60px', objectFit: 'contain', backgroundColor: '#f8f8f8', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.product.title}</div>
                    <div style={{ fontSize: '12px', color: '#565959' }}>Qty: {item.quantity} × ${item.product.price.toFixed(2)}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div
          style={{
            width: '320px',
            border: '1px solid #d5d9d9',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 5px rgba(213,217,217,0.5)',
            position: 'sticky',
            top: '80px',
          }}
        >
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing || cartItems.length === 0}
            className="btn-amazon-yellow"
            style={{ width: '100%', padding: '12px 0', fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}
          >
            {isProcessing ? 'Processing order...' : 'Place your order'}
          </button>

          <p style={{ fontSize: '11px', color: '#565959', lineHeight: 1.3, marginBottom: '16px', textAlign: 'center' }}>
            By placing your order, you agree to Amazon's <span style={{ color: '#007185' }}>privacy notice</span> and <span style={{ color: '#007185' }}>conditions of use</span>.
          </p>

          <div style={{ height: '1px', backgroundColor: '#e7e7e7', margin: '14px 0' }} />

          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Order Summary</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Items ({cartItems.reduce((acc, it) => acc + it.quantity, 0)}):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping & handling:</span>
              <span>{shippingCost === 0 ? '$0.00 (FREE)' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Estimated tax to be collected:</span>
              <span>$0.00</span>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e7e7e7', margin: '6px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700, color: '#cc0c39' }}>
              <span>Order total:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#fcfcfc',
              borderTop: '1px solid #eee',
              marginTop: '16px',
              paddingTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#565959',
            }}
          >
            <Shield size={14} color="#007600" />
            <span>Safe & Secure 256-Bit SSL Demo Checkout</span>
          </div>
        </div>

      </div>
    </div>
  );
};
