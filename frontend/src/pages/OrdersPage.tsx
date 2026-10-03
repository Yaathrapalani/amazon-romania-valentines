import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, PackageCheck } from 'lucide-react';
import type { Order } from '../types';
import { api } from '../services/api';
import { useStore } from '../store/useStore';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, addToCart } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'buy_again' | 'not_shipped'>('orders');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getOrders().then((res) => {
      setOrders(res.orders || []);
      setIsLoading(false);
    }).catch((err) => {
      console.error('Failed to load orders:', err);
      setIsLoading(false);
    });
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (!filterQuery) return true;
    return o.id.includes(filterQuery) || o.items.some((it) => it.title.toLowerCase().includes(filterQuery.toLowerCase()));
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header & Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#0f1111' }}>Your Orders</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} color="#888" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search all orders"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 34px',
                  borderRadius: '6px',
                  border: '1px solid #888',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #d5d9d9', marginBottom: '20px', fontSize: '14px', fontWeight: 600 }}>
          <span
            onClick={() => setActiveTab('orders')}
            style={{
              paddingBottom: '8px',
              cursor: 'pointer',
              color: activeTab === 'orders' ? '#0f1111' : '#007185',
              borderBottom: activeTab === 'orders' ? '2px solid #e77600' : 'none',
            }}
          >
            Orders ({orders.length})
          </span>
          <span
            onClick={() => setActiveTab('buy_again')}
            style={{
              paddingBottom: '8px',
              cursor: 'pointer',
              color: activeTab === 'buy_again' ? '#0f1111' : '#007185',
              borderBottom: activeTab === 'buy_again' ? '2px solid #e77600' : 'none',
            }}
          >
            Buy Again
          </span>
          <span
            onClick={() => setActiveTab('not_shipped')}
            style={{
              paddingBottom: '8px',
              cursor: 'pointer',
              color: activeTab === 'not_shipped' ? '#0f1111' : '#007185',
              borderBottom: activeTab === 'not_shipped' ? '2px solid #e77600' : 'none',
            }}
          >
            Not Yet Shipped
          </span>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#565959' }}>
            Loading your orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ border: '1px solid #d5d9d9', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
            <PackageCheck size={48} color="#888" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>No orders found</h3>
            <p style={{ color: '#565959', fontSize: '14px', marginBottom: '16px' }}>
              Looks like you haven't placed an order yet or no orders match your search.
            </p>
            <button onClick={() => navigate('/search')} className="btn-amazon-yellow">
              Explore Today's Deals
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredOrders.map((ord) => (
              <div
                key={ord.id}
                style={{
                  border: '1px solid #d5d9d9',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                }}
              >
                {/* Order Top Meta Bar */}
                <div
                  style={{
                    backgroundColor: '#f0f2f2',
                    padding: '14px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    fontSize: '12px',
                    color: '#565959',
                  }}
                >
                  <div style={{ display: 'flex', gap: '30px' }}>
                    <div>
                      <div>ORDER PLACED</div>
                      <div style={{ fontWeight: 600, color: '#0f1111', marginTop: '2px' }}>
                        {new Date(ord.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>

                    <div>
                      <div>TOTAL</div>
                      <div style={{ fontWeight: 600, color: '#0f1111', marginTop: '2px' }}>
                        ${ord.totalAmount.toFixed(2)}
                      </div>
                    </div>

                    <div>
                      <div>SHIP TO</div>
                      <div style={{ fontWeight: 600, color: '#007185', marginTop: '2px', cursor: 'pointer' }}>
                        {ord.shippingAddress?.fullName || user?.name || 'Alex Mercer'} ▾
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div>ORDER # {ord.id}</div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '2px' }}>
                      <span style={{ color: '#007185', cursor: 'pointer' }}>View order details</span>
                      <span>|</span>
                      <span style={{ color: '#007185', cursor: 'pointer' }}>Invoice ▾</span>
                    </div>
                  </div>
                </div>

                {/* Order Items Body */}
                <div style={{ padding: '20px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#007600', marginBottom: '16px' }}>
                    Delivering Tomorrow by 8 PM
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {ord.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '20px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1, minWidth: '280px' }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: '90px',
                              height: '90px',
                              objectFit: 'contain',
                              backgroundColor: '#f8f8f8',
                              borderRadius: '4px',
                            }}
                          />
                          <div>
                            <Link
                              to={`/product/${item.productId}`}
                              style={{
                                fontSize: '15px',
                                fontWeight: 600,
                                color: '#007185',
                                textDecoration: 'none',
                                lineHeight: 1.3,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                marginBottom: '4px',
                              }}
                            >
                              {item.title}
                            </Link>
                            <div style={{ fontSize: '13px', color: '#565959' }}>
                              Quantity: {item.quantity} · ${item.price.toFixed(2)}
                            </div>
                            <div style={{ fontSize: '12px', color: '#565959', marginTop: '4px' }}>
                              Eligible for return until Nov 3, 2026
                            </div>
                          </div>
                        </div>

                        {/* Action buttons on right */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '180px' }}>
                          <button
                            onClick={() => {
                              navigate(`/product/${item.productId}`);
                            }}
                            className="btn-amazon-yellow"
                            style={{ width: '100%', fontSize: '13px', padding: '6px 12px' }}
                          >
                            Buy it again
                          </button>
                          <button
                            onClick={() => alert(`Tracking package #${ord.id}: Carrier on route`)}
                            className="btn-amazon-white"
                            style={{ width: '100%', fontSize: '13px', padding: '6px 12px' }}
                          >
                            Track package
                          </button>
                          <button
                            onClick={() => alert('Product review modal opened')}
                            className="btn-amazon-white"
                            style={{ width: '100%', fontSize: '13px', padding: '6px 12px' }}
                          >
                            Write a review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
