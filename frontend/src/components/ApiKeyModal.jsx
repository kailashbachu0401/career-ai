import React, { useState } from 'react';
import { X, Sparkles, Key, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { checkBackendHealth } from '../services/api';

export default function ApiKeyModal({ isOpen, onClose, backendStatus, onStatusUpdated }) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  async function handleRefreshHealth() {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await checkBackendHealth();
      setTestResult(res);
      if (onStatusUpdated) onStatusUpdated(res);
    } catch (err) {
      setTestResult({ status: 'offline', error: err.message });
    } finally {
      setTesting(false);
    }
  }

  const isAiMode = backendStatus?.is_ai_mode;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 105
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '540px',
        width: '92%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '0.3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#e0f2fe',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Key size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              Gemini AI & Engine Settings
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Dual-Engine Configuration (Gemini API & Demo Mode)
            </p>
          </div>
        </div>

        {/* Current Status Box */}
        <div style={{
          padding: '1rem',
          borderRadius: '12px',
          backgroundColor: isAiMode ? '#f0fdf4' : '#f0f9ff',
          border: isAiMode ? '1px solid #bbf7d0' : '1px solid #bae6fd',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isAiMode ? (
                <CheckCircle2 size={18} color="#16a34a" />
              ) : (
                <Sparkles size={18} color="#0284c7" />
              )}
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: isAiMode ? '#15803d' : '#0369a1' }}>
                Active Mode: {backendStatus?.mode || 'Demo Engine'}
              </span>
            </div>
            <span className={`badge ${isAiMode ? 'badge-success' : 'badge-primary'}`}>
              {isAiMode ? 'Live AI' : 'Demo Active'}
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: '0.4rem', lineHeight: 1.4 }}>
            {isAiMode
              ? 'Requests are processed using Google Gemini 3.8 Flash via the Python Flask backend.'
              : 'Running in Demo Mode: Generates fully realistic, dynamic, consistent career profiles based on student inputs without requiring an API key.'}
          </p>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
            How to switch to Live Google Gemini AI:
          </h4>
          <ol style={{ fontSize: '0.825rem', color: '#475569', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
            <li>
              Get a free API key from{' '}
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}
              >
                Google AI Studio <ExternalLink size={12} />
              </a>.
            </li>
            <li>
              Open <code style={{ background: '#f1f5f9', padding: '0.1rem 0.35rem', borderRadius: '4px', fontFamily: 'monospace' }}>backend/.env</code> in your project.
            </li>
            <li>
              Set: <code style={{ background: '#f1f5f9', padding: '0.1rem 0.35rem', borderRadius: '4px', fontFamily: 'monospace' }}>GEMINI_API_KEY=AIzaSy...</code>
            </li>
            <li>Restart the Flask backend server.</li>
          </ol>
        </div>

        {/* Status Check / Refresh */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
          <button
            onClick={handleRefreshHealth}
            disabled={testing}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={14} className={testing ? 'animate-spin' : ''} />
            <span>{testing ? 'Testing...' : 'Check Backend Health'}</span>
          </button>

          <button
            onClick={onClose}
            className="btn btn-primary btn-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
