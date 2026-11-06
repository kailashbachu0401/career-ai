import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

const STEPS = [
  'Analyzing student academic background & skills inventory...',
  'Benchmarking industry role requirements & skill gaps...',
  'Synthesizing personalized learning roadmap & curated resources...',
  'Generating 10 technical & 5 HR interview questions...'
];

export default function LoadingOverlay({ isGenerating }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isGenerating) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '2.5rem',
        maxWidth: '480px',
        width: '90%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        textAlign: 'center'
      }}>
        {/* Animated Glow Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
          margin: '0 auto 1.5rem auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)'
        }}>
          <Sparkles size={32} className="animate-spin" style={{ animationDuration: '4s' }} />
        </div>

        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
          Generating Career Profile
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.75rem' }}>
          CareerAI is tailoring professional content across all 4 pillars...
        </p>

        {/* Step Progress List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', textAlign: 'left' }}>
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: isCurrent ? '#f0f9ff' : (isCompleted ? '#f8fafc' : 'transparent'),
                  border: isCurrent ? '1px solid #bae6fd' : '1px solid transparent',
                  transition: 'all 0.25s ease'
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={18} color="#16a34a" />
                ) : isCurrent ? (
                  <Loader2 size={18} color="#0284c7" className="animate-spin" />
                ) : (
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '2px solid #cbd5e1'
                  }} />
                )}
                <span style={{
                  fontSize: '0.825rem',
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? '#0369a1' : (isCompleted ? '#334155' : '#94a3b8')
                }}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
