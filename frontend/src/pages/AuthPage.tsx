import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register, isAuthenticated } = useStore();

  const [isRegister, setIsRegister] = useState(searchParams.get('mode') === 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error('Name is required');
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err: any) {
      console.error('Auth error:', err);
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setIsRegister(false);
    setEmail('demo@amazon.com');
    setPassword('amazon123');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px' }}>
      
      {/* Amazon Logo */}
      <Link to="/" style={{ marginBottom: '20px' }}>
        <svg viewBox="0 0 100 35" width="110" height="34" fill="none">
          <text x="0" y="24" fill="#131921" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="22">
            amazon
          </text>
          <path d="M 5 28 C 30 38 65 37 88 28" stroke="#ff9900" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <polygon points="86,24 93,28 85,32" fill="#ff9900" />
        </svg>
      </Link>

      {/* Main Auth Box */}
      <div
        style={{
          width: '350px',
          maxWidth: '100%',
          border: '1px solid #d5d9d9',
          borderRadius: '8px',
          padding: '24px 28px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: 400, color: '#0f1111', marginBottom: '18px' }}>
          {isRegister ? 'Create account' : 'Sign in'}
        </h1>

        {errorMsg && (
          <div
            style={{
              backgroundColor: '#fff0f0',
              border: '1px solid #c40000',
              borderRadius: '4px',
              padding: '10px 14px',
              color: '#c40000',
              fontSize: '13px',
              marginBottom: '16px',
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Demo Fast Login Shortcut */}
        <div
          onClick={handleFillDemo}
          style={{
            backgroundColor: '#fbf5ea',
            border: '1px dashed #e77600',
            borderRadius: '6px',
            padding: '8px 12px',
            marginBottom: '16px',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>⚡ Use Demo Account (Alex Mercer)</span>
          <span style={{ color: '#007185', fontWeight: 600 }}>Auto-fill</span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f1111', display: 'block', marginBottom: '4px' }}>
                Your name
              </label>
              <input
                type="text"
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegister}
                style={{
                  width: '100%',
                  padding: '7px 9px',
                  borderRadius: '3px',
                  border: '1px solid #888',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f1111', display: 'block', marginBottom: '4px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '7px 9px',
                borderRadius: '3px',
                border: '1px solid #888',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f1111' }}>Password</label>
              {!isRegister && (
                <span style={{ fontSize: '12px', color: '#007185', cursor: 'pointer' }}>
                  Forgot password?
                </span>
              )}
            </div>
            <input
              type="password"
              placeholder={isRegister ? 'At least 6 characters' : ''}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '7px 9px',
                borderRadius: '3px',
                border: '1px solid #888',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-amazon-yellow"
            style={{ width: '100%', padding: '8px 0', fontSize: '13px', marginTop: '6px' }}
          >
            {isSubmitting ? 'Please wait...' : isRegister ? 'Create your Amazon account' : 'Continue'}
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#0f1111', lineHeight: 1.4, marginTop: '16px' }}>
          By continuing, you agree to Amazon's{' '}
          <span style={{ color: '#007185', cursor: 'pointer' }}>Conditions of Use</span> and{' '}
          <span style={{ color: '#007185', cursor: 'pointer' }}>Privacy Notice</span>.
        </p>

        <div style={{ height: '1px', backgroundColor: '#e7e7e7', margin: '20px 0' }} />

        <div style={{ fontSize: '13px' }}>
          {isRegister ? (
            <div>
              Already have an account?{' '}
              <span
                onClick={() => setIsRegister(false)}
                style={{ color: '#007185', cursor: 'pointer', fontWeight: 600 }}
              >
                Sign in ‣
              </span>
            </div>
          ) : (
            <div>
              <div style={{ position: 'relative', textAlign: 'center', marginBottom: '14px' }}>
                <div style={{ height: '1px', backgroundColor: '#e7e7e7', position: 'absolute', top: '50%', left: 0, right: 0 }} />
                <span style={{ backgroundColor: '#ffffff', padding: '0 8px', color: '#767676', fontSize: '12px', position: 'relative' }}>
                  New to Amazon?
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="btn-amazon-white"
                style={{ width: '100%', padding: '7px 0', fontSize: '13px' }}
              >
                Create your Amazon account
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Footer minimal legal links */}
      <div style={{ borderTop: '1px solid #e7e7e7', width: '350px', paddingTop: '20px', textAlign: 'center', fontSize: '11px', color: '#565959' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '8px' }}>
          <span style={{ color: '#007185', cursor: 'pointer' }}>Conditions of Use</span>
          <span style={{ color: '#007185', cursor: 'pointer' }}>Privacy Notice</span>
          <span style={{ color: '#007185', cursor: 'pointer' }}>Help</span>
        </div>
        <div>© 1996-2026, Amazon.com, Inc. or its affiliates</div>
      </div>
    </div>
  );
};
