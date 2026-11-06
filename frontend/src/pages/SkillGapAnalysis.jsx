import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  ArrowRight, 
  Target, 
  BookOpen, 
  Lightbulb,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function SkillGapAnalysis({ profile, setActiveTab }) {
  const [activeFilter, setActiveFilter] = useState('all');

  if (!profile || !profile.skill_gap_analysis) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          No profile generated yet. Please create a profile first to run Skill Gap Analysis.
        </p>
        <button onClick={() => setActiveTab('create')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Create Career Profile
        </button>
      </div>
    );
  }

  const sga = profile.skill_gap_analysis;
  const sp = profile.student_profile;
  const possessed = sga.possessed_skills || [];
  const needsImprovement = sga.needs_improvement_skills || [];
  const missing = sga.missing_skills || [];

  const matchScore = sga.overall_match_percentage || 70;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner: Benchmark Summary */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
        border: '1px solid #bbf7d0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontWeight: 700, fontSize: '0.825rem', marginBottom: '0.4rem' }}>
              <TrendingUp size={18} />
              <span>Industry Benchmark Analysis</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              Target Role: {sga.target_role}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.35rem', lineHeight: 1.5 }}>
              {sga.summary_insight}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Visual Circular Progress / Match Bar */}
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: `conic-gradient(#16a34a ${matchScore * 3.6}deg, #e2e8f0 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.15)'
            }}>
              <div style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#16a34a', lineHeight: 1 }}>
                  {matchScore}%
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Match
                </span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                {sga.readiness_level}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                {possessed.length} Possessed • {needsImprovement.length} Needs Work • {missing.length} Missing
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveFilter('all')}
          className={`btn btn-sm ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Categories ({possessed.length + needsImprovement.length + missing.length})
        </button>
        <button
          onClick={() => setActiveFilter('possessed')}
          className={`btn btn-sm ${activeFilter === 'possessed' ? 'btn-primary' : 'btn-secondary'}`}
          style={activeFilter === 'possessed' ? { background: '#16a34a' } : {}}
        >
          <CheckCircle2 size={14} /> Already Possessed ({possessed.length})
        </button>
        <button
          onClick={() => setActiveFilter('improvement')}
          className={`btn btn-sm ${activeFilter === 'improvement' ? 'btn-primary' : 'btn-secondary'}`}
          style={activeFilter === 'improvement' ? { background: '#d97706' } : {}}
        >
          <AlertTriangle size={14} /> Needs Improvement ({needsImprovement.length})
        </button>
        <button
          onClick={() => setActiveFilter('missing')}
          className={`btn btn-sm ${activeFilter === 'missing' ? 'btn-primary' : 'btn-secondary'}`}
          style={activeFilter === 'missing' ? { background: '#dc2626' } : {}}
        >
          <AlertCircle size={14} /> Missing Skills ({missing.length})
        </button>
      </div>

      {/* Category 1: Already Possessed Skills */}
      {(activeFilter === 'all' || activeFilter === 'possessed') && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CheckCircle2 size={20} color="#16a34a" />
              <span>1. Already Possessed Skills (Strengths)</span>
            </div>
            <span className="badge badge-success">{possessed.length} Validated</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Skills already in your repertoire matching core industry specifications for {sga.target_role}.
          </p>

          <div className="grid-2">
            {possessed.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.2rem',
                  borderRadius: '12px',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#166534' }}>
                      {item.skill || item}
                    </h4>
                    <span className="badge badge-success">{item.proficiency || 'Proficient'}</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: '#334155', lineHeight: 1.5 }}>
                    {item.relevance || 'Core competency directly utilized in daily engineering workflows.'}
                  </p>
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>
                  Ready for resume and technical interviews
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category 2: Needs Improvement */}
      {(activeFilter === 'all' || activeFilter === 'improvement') && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <AlertTriangle size={20} color="#d97706" />
              <span>2. Skills That Need Improvement (Deepen Proficiency)</span>
            </div>
            <span className="badge badge-warning">{needsImprovement.length} Gaps</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Skills you currently have foundational knowledge in, but need production-level depth to satisfy senior evaluations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {needsImprovement.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.2rem',
                  borderRadius: '12px',
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#92400e' }}>
                    {item.skill || item}
                  </h4>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '0.725rem' }}>Current: {item.current_level || 'Foundational'}</span>
                    <span className="badge badge-warning" style={{ fontSize: '0.725rem' }}>Target: {item.target_level || 'Production'}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#451a03', marginBottom: '0.65rem' }}>
                  <strong>Why it matters:</strong> {item.gap_reason || 'Essential baseline requirement for this career.'}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #fef3c7'
                }}>
                  <Lightbulb size={16} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.825rem', color: '#78350f', fontWeight: 500 }}>
                    <strong>Action Step:</strong> {item.improvement_tip || 'Build a dedicated mini-project implementing these concepts.'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category 3: Missing Skills */}
      {(activeFilter === 'all' || activeFilter === 'missing') && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <AlertCircle size={20} color="#dc2626" />
              <span>3. Missing High-Priority Skills (Acquisition Mandate)</span>
            </div>
            <span className="badge badge-danger">{missing.length} Missing</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Critical competencies required for {sga.target_role} currently absent from your profile.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {missing.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.2rem',
                  borderRadius: '12px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#991b1b' }}>
                    {item.skill || item}
                  </h4>
                  <span className="badge badge-danger">Priority: {item.importance || 'High'}</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#450a0a', marginBottom: '0.65rem' }}>
                  <strong>Industry Need:</strong> {item.why_needed || 'Crucial for modern engineering and team collaboration.'}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #fee2e2'
                }}>
                  <Zap size={16} color="#dc2626" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.825rem', color: '#7f1d1d', fontWeight: 500 }}>
                    <strong>Learning Strategy:</strong> {item.action_plan || 'Follow guided labs and build portfolio exercises.'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consistency CTA to Learning Recommendations */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        color: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
              Bridge These Gaps with Your Personalized 8-Week Learning Plan
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#e0f2fe', marginTop: '0.2rem' }}>
              We mapped each identified gap directly into verified courses, roadmaps, and weekly tasks.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('learning')}
            style={{
              backgroundColor: '#ffffff',
              color: '#0369a1',
              border: 'none',
              padding: '0.7rem 1.4rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
            }}
          >
            <span>Open Learning Recommendations</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
