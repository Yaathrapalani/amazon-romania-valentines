import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import type { Order } from '../types';
import { api } from '../services/api';

export const OrderSuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.getOrder(id).then((res) => {
      setOrder(res.order);
      setIsLoading(false);
    }).catch((err) => {
      console.error('Failed to load order:', err);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '30px 20px' }}>
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        {/* Top Success Banner */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', paddingBottom: '24px', borderBottom: '1px solid #e7e7e7' }}>
          <CheckCircle2 size={42} color="#007600" style={{ flexShrink: 0 }} />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#007600', marginBottom: '6px' }}>
              Order placed, thanks!
            </h1>
            <p style={{ fontSize: '14px', color: '#565959', marginBottom: '8px' }}>
              Confirmation will be sent to your email.
            </p>
            <div style={{ fontSize: '13px', color: '#0f1111' }}>
              <strong>Order #{id}</strong>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div style={{ padding: '24px 0', borderBottom: '1px solid #e7e7e7', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f1111', marginBottom: '6px' }}>
              Estimated delivery:
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#007600' }}>
              Tomorrow by 8:00 PM
            </div>
            <div style={{ fontSize: '13px', color: '#565959', marginTop: '4px' }}>
              FREE Prime Delivery
            </div>
          </div>

          {order?.shippingAddress && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f1111', marginBottom: '4px' }}>
                Shipping to:
              </div>
              <div style={{ fontSize: '13px', color: '#565959', lineHeight: 1.4 }}>
                <div>{order.shippingAddress.fullName}</div>
                <div>{order.shippingAddress.streetAddress}</div>
                <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
              </div>
            </div>
          )}

          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f1111', marginBottom: '4px' }}>
              Total Amount:
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f1111' }}>
              ${order?.totalAmount?.toFixed(2) || '0.00'}
            </div>
            <div style={{ fontSize: '12px', color: '#565959' }}>
              Paid via {order?.paymentMethod || 'Visa'}
            </div>
          </div>
        </div>

        {/* Ordered items preview */}
        {order?.items && order.items.length > 0 && (
          <div style={{ padding: '20px 0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Items ordered:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {order.items.map((it, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <img
                    src={it.image}
                    alt={it.title}
                    style={{ width: '65px', height: '65px', objectFit: 'contain', backgroundColor: '#f8f8f8', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{it.title}</div>
                    <div style={{ fontSize: '13px', color: '#565959' }}>Qty: {it.quantity} × ${it.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '14px', paddingTop: '16px' }}>
          <button
            onClick={() => navigate('/orders')}
            className="btn-amazon-yellow"
            style={{ padding: '10px 24px', fontSize: '14px', fontWeight: 600 }}
          >
            View Your Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-amazon-white"
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
