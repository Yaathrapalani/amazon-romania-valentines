import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Check, Lock, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import type { Product } from '../types';
import { api } from '../services/api';
import { StarRating } from '../components/common/StarRating';
import { useStore } from '../store/useStore';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    api.getProduct(id).then((res) => {
      setProduct(res.product);
      setSelectedImage(res.product.main_image);
      setIsLoading(false);
    }).catch((err) => {
      console.error('Failed to load product:', err);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#fff', minHeight: '80vh' }}>
        <div style={{ fontSize: '18px', fontWeight: 600, color: '#565959' }}>Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#fff', minHeight: '80vh' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>Product not found</h2>
        <button onClick={() => navigate('/')} className="btn-amazon-yellow">
          Return to Home
        </button>
      </div>
    );
  }

  const discountPct = product.list_price > product.price
    ? Math.round(((product.list_price - product.price) / product.list_price) * 100)
    : 0;

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = async () => {
    await addToCart(product, quantity);
    navigate('/checkout');
  };

  const allImages = [product.main_image, ...(product.images || [])].filter(
    (v, i, a) => a.indexOf(v) === i
  );

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '16px 24px' }}>
      
      {/* Breadcrumbs */}
      <div style={{ fontSize: '12px', color: '#565959', marginBottom: '16px', display: 'flex', gap: '6px' }}>
        <Link to="/" style={{ color: '#565959' }}>Home</Link>
        <span>›</span>
        <Link to={`/search?category=${encodeURIComponent(product.category)}`} style={{ color: '#565959' }}>
          {product.category}
        </Link>
        <span>›</span>
        <span style={{ color: '#0f1111', fontWeight: 600 }}>{product.brand}</span>
      </div>

      {/* Main 3-column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr 300px',
          gap: '30px',
          alignItems: 'start',
        }}
      >
        
        {/* Left Column: Image Gallery */}
        <div style={{ display: 'flex', gap: '16px', position: 'sticky', top: '80px' }}>
          
          {/* Thumbnails strip */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {allImages.map((img, i) => (
              <div
                key={i}
                onMouseEnter={() => setSelectedImage(img)}
                onClick={() => setSelectedImage(img)}
                style={{
                  width: '50px',
                  height: '50px',
                  border: selectedImage === img ? '2px solid #e77600' : '1px solid #d5d9d9',
                  borderRadius: '4px',
                  padding: '2px',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  boxShadow: selectedImage === img ? '0 0 3px 2px rgba(228,121,17,0.5)' : 'none',
                }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>

          {/* Main Large Image */}
          <div
            style={{
              flex: 1,
              height: '480px',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #f0f0f0',
              borderRadius: '4px',
              padding: '16px',
            }}
          >
            <img
              src={selectedImage}
              alt={product.title}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                transition: 'transform 0.2s',
              }}
            />
          </div>
        </div>

        {/* Center Column: Product Information */}
        <div>
          {/* Title */}
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#0f1111', lineHeight: 1.3, marginBottom: '8px' }}>
            {product.title}
          </h1>

          {/* Brand */}
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#007185' }}>
              Brand: <strong>{product.brand}</strong>
            </span>
          </div>

          {/* Ratings & Best Seller Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <StarRating rating={product.rating} reviewsCount={product.reviews_count} size={16} />
            <span style={{ color: '#565959', fontSize: '13px' }}>|</span>
            <span style={{ fontSize: '13px', color: '#007185', cursor: 'pointer' }}>1,000+ answered questions</span>
          </div>

          {product.badge && (
            <div style={{ marginBottom: '12px' }}>
              <span
                style={{
                  backgroundColor: '#232f3e',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '2px',
                }}
              >
                {product.badge}
              </span>
            </div>
          )}

          <div style={{ height: '1px', backgroundColor: '#e7e7e7', margin: '14px 0' }} />

          {/* Price Box */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              {discountPct > 0 && (
                <span style={{ color: '#cc0c39', fontSize: '28px', fontWeight: 300 }}>
                  -{discountPct}%
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14px', verticalAlign: 'super', fontWeight: 600 }}>$</span>
                <span style={{ fontSize: '28px', fontWeight: 700, color: '#0f1111' }}>
                  {Math.floor(product.price)}
                </span>
                <span style={{ fontSize: '14px', verticalAlign: 'super', fontWeight: 600 }}>
                  {(product.price % 1).toFixed(2).substring(2)}
                </span>
              </div>
            </div>

            {product.list_price > product.price && (
              <div style={{ fontSize: '13px', color: '#565959', marginTop: '4px' }}>
                Typical price: <span style={{ textDecoration: 'line-through' }}>${product.list_price.toFixed(2)}</span>
              </div>
            )}

            <div style={{ fontSize: '13px', color: '#007185', marginTop: '6px' }}>
              FREE Returns & Replacements
            </div>
          </div>

          {/* Value Props Row */}
          <div style={{ display: 'flex', gap: '20px', margin: '16px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '12px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '80px' }}>
              <RotateCcw size={22} color="#007185" />
              <span style={{ fontSize: '11px', color: '#007185', marginTop: '4px' }}>30 days Returnable</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '80px' }}>
              <Truck size={22} color="#007185" />
              <span style={{ fontSize: '11px', color: '#007185', marginTop: '4px' }}>Amazon Delivered</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '80px' }}>
              <ShieldCheck size={22} color="#007185" />
              <span style={{ fontSize: '11px', color: '#007185', marginTop: '4px' }}>Top Brand</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '80px' }}>
              <Lock size={22} color="#007185" />
              <span style={{ fontSize: '11px', color: '#007185', marginTop: '4px' }}>Secure transaction</span>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>About this item</h3>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: 1.45 }}>
              {product.features?.map((feat, idx) => (
                <li key={idx} style={{ color: '#0f1111' }}>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Amazon Buy Box */}
        <div
          style={{
            border: '1px solid #d5d9d9',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 5px rgba(213,217,217,0.5)',
          }}
        >
          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', verticalAlign: 'super', fontWeight: 600 }}>$</span>
            <span style={{ fontSize: '26px', fontWeight: 700, color: '#0f1111' }}>
              {Math.floor(product.price)}
            </span>
            <span style={{ fontSize: '13px', verticalAlign: 'super', fontWeight: 600 }}>
              {(product.price % 1).toFixed(2).substring(2)}
            </span>
          </div>

          {/* Prime and Delivery */}
          {product.is_prime && (
            <div style={{ marginBottom: '10px' }}>
              <div className="prime-badge" style={{ fontSize: '16px', marginBottom: '4px' }}>
                <Check size={16} strokeWidth={4} className="prime-check" />
                <span>prime</span>
              </div>
              <div style={{ fontSize: '13px', color: '#0f1111', fontWeight: 600 }}>
                FREE delivery <strong>Tomorrow, Oct 4</strong>
              </div>
              <div style={{ fontSize: '12px', color: '#565959', marginTop: '2px' }}>
                Or fastest delivery <strong>Today 5 PM - 10 PM</strong>
              </div>
            </div>
          )}

          {/* Deliver to address */}
          <div style={{ fontSize: '12px', color: '#007185', marginBottom: '12px' }}>
            📍 Deliver to New York 10016
          </div>

          {/* Stock */}
          <div style={{ fontSize: '18px', color: '#007600', fontWeight: 600, marginBottom: '12px' }}>
            In Stock
          </div>

          {/* Quantity Selector */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#565959', display: 'block', marginBottom: '4px' }}>
              Quantity:
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '6px 10px',
                borderRadius: '8px',
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

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="btn-amazon-yellow"
            style={{ width: '100%', padding: '10px 0', fontSize: '14px', marginBottom: '10px' }}
          >
            Add to Cart
          </button>

          {/* Buy Now button */}
          <button
            onClick={handleBuyNow}
            className="btn-amazon-orange"
            style={{ width: '100%', padding: '10px 0', fontSize: '14px', marginBottom: '14px' }}
          >
            Buy Now
          </button>

          {/* Toast on Add to Cart */}
          {addedToast && (
            <div
              style={{
                backgroundColor: '#e7f4e8',
                border: '1px solid #a6cca8',
                borderRadius: '4px',
                padding: '8px 12px',
                marginBottom: '12px',
                fontSize: '13px',
                color: '#007600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Check size={16} />
              <span>Added to Cart!</span>
            </div>
          )}

          {/* Transaction trust details */}
          <div style={{ fontSize: '12px', color: '#565959', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Ships from</span>
              <span style={{ color: '#0f1111' }}>Amazon.com</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Sold by</span>
              <span style={{ color: '#0f1111' }}>Amazon.com</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Returns</span>
              <span style={{ color: '#007185' }}>30-day refund/replacement</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Payment</span>
              <span style={{ color: '#007185' }}>Secure transaction</span>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e7e7e7', margin: '14px 0' }} />

          <button
            onClick={() => alert('Added to your Wish List!')}
            className="btn-amazon-white"
            style={{ width: '100%', fontSize: '12px' }}
          >
            Add to List
          </button>
        </div>

      </div>
    </div>
  );
};
