import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import type { Product } from '../types';
import { api } from '../services/api';
import { StarRating } from '../components/common/StarRating';
import { useStore } from '../store/useStore';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'All';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  const ratingParam = searchParams.get('rating') || '';
  const primeParam = searchParams.get('prime') === 'true';
  const sortParam = searchParams.get('sort') || 'featured';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [minPriceInput, setMinPriceInput] = useState(minPriceParam);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPriceParam);

  useEffect(() => {
    setIsLoading(true);
    api.getProducts({
      search: query,
      category: categoryParam !== 'All' ? categoryParam : undefined,
      minPrice: minPriceParam ? Number(minPriceParam) : undefined,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
      rating: ratingParam ? Number(ratingParam) : undefined,
      prime: primeParam ? true : undefined,
      sort: sortParam !== 'featured' ? sortParam : undefined,
    }).then((res) => {
      setProducts(res.products || []);
      setIsLoading(false);
    }).catch((err) => {
      console.error('Failed to load search results:', err);
      setIsLoading(false);
    });
  }, [query, categoryParam, minPriceParam, maxPriceParam, ratingParam, primeParam, sortParam]);

  const updateParam = (key: string, value: string | null) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === null || value === '' || value === 'All') {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams);
  };

  const handlePriceFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    if (minPriceInput) nextParams.set('minPrice', minPriceInput);
    else nextParams.delete('minPrice');
    if (maxPriceInput) nextParams.set('maxPrice', maxPriceInput);
    else nextParams.delete('maxPrice');
    setSearchParams(nextParams);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '16px 24px' }}>
      
      {/* Top Banner / Filter Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '12px',
          borderBottom: '1px solid #e7e7e7',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ fontSize: '14px', color: '#565959' }}>
          <span>
            {products.length} results {query && <span>for <strong style={{ color: '#c45500' }}>"{query}"</strong></span>}
            {categoryParam !== 'All' && <span> in <strong style={{ color: '#0f1111' }}>{categoryParam}</strong></span>}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', color: '#565959' }}>Sort by:</label>
          <select
            value={sortParam}
            onChange={(e) => updateParam('sort', e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #d5d9d9',
              backgroundColor: '#f0f2f2',
              fontSize: '13px',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 2px 5px rgba(213,217,217,0.5)',
            }}
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Avg. Customer Review</option>
            <option value="reviews_desc">Most Reviews</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px' }}>
        
        {/* Left Filter Sidebar */}
        <aside style={{ width: '230px', flexShrink: 0 }}>
          
          {/* Prime filter */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>Amazon Prime</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={primeParam}
                onChange={(e) => updateParam('prime', e.target.checked ? 'true' : null)}
                style={{ width: '16px', height: '16px', accentColor: '#e77600' }}
              />
              <div className="prime-badge" style={{ fontSize: '15px' }}>
                <Check size={14} strokeWidth={4} className="prime-check" />
                <span>prime</span>
              </div>
            </label>
          </div>

          {/* Department */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>Department</div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
              {['All', 'Electronics', 'Computers & Accessories', 'Smart Home', 'Home & Kitchen', 'Fashion', 'Books'].map((cat) => (
                <li key={cat}>
                  <span
                    onClick={() => updateParam('category', cat)}
                    style={{
                      cursor: 'pointer',
                      color: categoryParam === cat ? '#0f1111' : '#007185',
                      fontWeight: categoryParam === cat ? 700 : 400,
                    }}
                  >
                    {categoryParam === cat && '◀ '}
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Reviews */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>Customer Reviews</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[4, 3, 2, 1].map((stars) => (
                <div
                  key={stars}
                  onClick={() => updateParam('rating', ratingParam === String(stars) ? null : String(stars))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    padding: '2px 0',
                    backgroundColor: ratingParam === String(stars) ? '#f0f8ff' : 'transparent',
                    borderRadius: '3px',
                  }}
                >
                  <div style={{ display: 'flex', color: '#de7921' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        fill={i < stars ? '#de7921' : 'none'}
                        stroke="#de7921"
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '13px', color: '#007185', marginLeft: '4px' }}>& Up</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>Price</div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
              <li>
                <span onClick={() => { updateParam('minPrice', null); updateParam('maxPrice', '25'); }} style={{ color: '#007185', cursor: 'pointer' }}>
                  Under $25
                </span>
              </li>
              <li>
                <span onClick={() => { updateParam('minPrice', '25'); updateParam('maxPrice', '50'); }} style={{ color: '#007185', cursor: 'pointer' }}>
                  $25 to $50
                </span>
              </li>
              <li>
                <span onClick={() => { updateParam('minPrice', '50'); updateParam('maxPrice', '100'); }} style={{ color: '#007185', cursor: 'pointer' }}>
                  $50 to $100
                </span>
              </li>
              <li>
                <span onClick={() => { updateParam('minPrice', '100'); updateParam('maxPrice', '300'); }} style={{ color: '#007185', cursor: 'pointer' }}>
                  $100 to $300
                </span>
              </li>
              <li>
                <span onClick={() => { updateParam('minPrice', '300'); updateParam('maxPrice', null); }} style={{ color: '#007185', cursor: 'pointer' }}>
                  $300 & Above
                </span>
              </li>
            </ul>

            {/* Custom Price Range Form */}
            <form onSubmit={handlePriceFilterSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
              <input
                type="number"
                placeholder="$ Min"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                style={{ width: '60px', padding: '5px', fontSize: '12px', border: '1px solid #888', borderRadius: '3px' }}
              />
              <span style={{ color: '#565959' }}>-</span>
              <input
                type="number"
                placeholder="$ Max"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                style={{ width: '60px', padding: '5px', fontSize: '12px', border: '1px solid #888', borderRadius: '3px' }}
              />
              <button
                type="submit"
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #888',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Go
              </button>
            </form>
          </div>

          {/* Reset Filters */}
          {(query || categoryParam !== 'All' || minPriceParam || maxPriceParam || ratingParam || primeParam) && (
            <button
              onClick={() => {
                navigate('/search');
                setMinPriceInput('');
                setMaxPriceInput('');
              }}
              className="btn-amazon-white"
              style={{ width: '100%', fontSize: '12px' }}
            >
              Clear All Filters
            </button>
          )}

        </aside>

        {/* Results Grid */}
        <main style={{ flex: 1 }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#565959' }}>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>Loading results...</div>
            </div>
          ) : products.length === 0 ? (
            <div style={{ padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>No results found</h3>
              <p style={{ color: '#565959', marginBottom: '16px' }}>
                Try checking your spelling or use more general terms.
              </p>
              <button onClick={() => navigate('/search')} className="btn-amazon-yellow">
                View all products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {products.map((p) => {
                const discountPct = p.list_price > p.price ? Math.round(((p.list_price - p.price) / p.list_price) * 100) : 0;
                return (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      border: '1px solid #e7e7e7',
                      borderRadius: '4px',
                      padding: '16px',
                      backgroundColor: '#ffffff',
                      gap: '20px',
                      transition: 'box-shadow 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                  >
                    {/* Product Image */}
                    <div
                      onClick={() => navigate(`/product/${p.id}`)}
                      style={{
                        width: '210px',
                        height: '210px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={p.main_image}
                        alt={p.title}
                        style={{
                          maxHeight: '190px',
                          maxWidth: '190px',
                          objectFit: 'contain',
                          transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                      />
                    </div>

                    {/* Product Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      {/* Badges */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                        {p.is_best_seller && (
                          <span
                            style={{
                              backgroundColor: '#e67a00',
                              color: '#fff',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 6px',
                              borderRadius: '2px',
                            }}
                          >
                            #1 Best Seller
                          </span>
                        )}
                        {p.is_amazons_choice && (
                          <span
                            style={{
                              backgroundColor: '#232f3e',
                              color: '#fff',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 6px',
                              borderRadius: '2px',
                            }}
                          >
                            Amazon's <span style={{ color: '#f90' }}>Choice</span>
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => navigate(`/product/${p.id}`)}
                        style={{
                          fontSize: '17px',
                          fontWeight: 500,
                          lineHeight: 1.35,
                          color: '#0f1111',
                          cursor: 'pointer',
                          marginBottom: '6px',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#c45500')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#0f1111')}
                      >
                        {p.title}
                      </h3>

                      {/* Rating */}
                      <div style={{ marginBottom: '8px' }}>
                        <StarRating rating={p.rating} reviewsCount={p.reviews_count} size={15} />
                      </div>

                      {/* Price Section */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                        {discountPct > 0 && <span className="deal-badge">-{discountPct}%</span>}
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                          <span style={{ fontSize: '13px', verticalAlign: 'super', fontWeight: 600 }}>$</span>
                          <span style={{ fontSize: '26px', fontWeight: 700, color: '#0f1111' }}>
                            {Math.floor(p.price)}
                          </span>
                          <span style={{ fontSize: '13px', verticalAlign: 'super', fontWeight: 600 }}>
                            {(p.price % 1).toFixed(2).substring(2)}
                          </span>
                        </div>
                        {p.list_price > p.price && (
                          <span style={{ fontSize: '13px', color: '#565959', textDecoration: 'line-through' }}>
                            Typical: ${p.list_price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Prime and Delivery */}
                      {p.is_prime && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                          <div className="prime-badge">
                            <Check size={14} strokeWidth={4} className="prime-check" />
                            <span>prime</span>
                          </div>
                          <span style={{ fontSize: '13px', color: '#0f1111', fontWeight: 700 }}>
                            FREE delivery Tomorrow, Oct 4
                          </span>
                        </div>
                      )}

                      <div style={{ fontSize: '12px', color: '#007600', fontWeight: 600, marginBottom: '10px' }}>
                        In Stock
                      </div>

                      {/* Add to Cart button */}
                      <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="btn-amazon-yellow"
                          style={{ padding: '7px 24px', fontSize: '13px' }}
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={() => navigate(`/product/${p.id}`)}
                          className="btn-amazon-white"
                          style={{ padding: '7px 18px', fontSize: '13px' }}
                        >
                          See options
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
