import React, { useState } from 'react';
import { 
  MessageSquare, 
  Code, 
  UserCheck, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb, 
  Search,
  BookOpen,
  Award
} from 'lucide-react';

export default function InterviewPreparation({ profile, setActiveTab }) {
  const [activeTabFilter, setActiveTabFilter] = useState('technical'); // 'technical', 'hr', 'tips'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({ 'tech_1': true, 'hr_1': true });

  if (!profile || !profile.interview_preparation) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          No interview preparation questions generated yet. Please create a career profile first.
        </p>
        <button onClick={() => setActiveTab('create')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Create Career Profile
        </button>
      </div>
    );
  }

  const ip = profile.interview_preparation;
  const sp = profile.student_profile;
  const techQuestions = ip.technical_questions || [];
  const hrQuestions = ip.hr_questions || [];
  const tips = ip.interview_tips || {};

  function toggleExpand(key) {
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function expandAll() {
    const all = {};
    techQuestions.forEach(q => { all[`tech_${q.id}`] = true; });
    hrQuestions.forEach(q => { all[`hr_${q.id}`] = true; });
    setExpandedItems(all);
  }

  function collapseAll() {
    setExpandedItems({});
  }

  const filteredTech = techQuestions.filter(q => 
    (q.question || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (q.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHr = hrQuestions.filter(q => 
    (q.question || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (q.scenario_focus || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #faf5ff 0%, #ffffff 100%)',
        border: '1px solid #e9d5ff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#9333ea', fontWeight: 700, fontSize: '0.825rem', marginBottom: '0.35rem' }}>
              <MessageSquare size={18} />
              <span>Interview Readiness Suite</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              Interview Question Bank: {sp?.preferredCareer}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.3rem' }}>
              Comprehensive technical and behavioral interview preparation with complete model answers.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0284c7' }}>
                {techQuestions.length}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Technical Qs</div>
            </div>

            <div style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#9333ea' }}>
                {hrQuestions.length}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>HR Behavioral Qs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Filter Tabs & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTabFilter('technical')}
            className={`btn btn-sm ${activeTabFilter === 'technical' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Code size={14} /> Technical Questions ({techQuestions.length})
          </button>
          <button
            onClick={() => setActiveTabFilter('hr')}
            className={`btn btn-sm ${activeTabFilter === 'hr' ? 'btn-primary' : 'btn-secondary'}`}
            style={activeTabFilter === 'hr' ? { background: '#9333ea', borderColor: '#9333ea' } : {}}
          >
            <UserCheck size={14} /> HR Behavioral Questions ({hrQuestions.length})
          </button>
          <button
            onClick={() => setActiveTabFilter('tips')}
            className={`btn btn-sm ${activeTabFilter === 'tips' ? 'btn-primary' : 'btn-secondary'}`}
            style={activeTabFilter === 'tips' ? { background: '#0369a1' } : {}}
          >
            <Sparkles size={14} /> Personalized Interview Tips
          </button>
        </div>

        {activeTabFilter !== 'tips' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.45rem 0.75rem 0.45rem 2rem',
                  fontSize: '0.825rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  width: '200px'
                }}
              />
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <button onClick={expandAll} className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>Expand All</button>
            <button onClick={collapseAll} className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>Collapse</button>
          </div>
        )}
      </div>

      {/* 1. Technical Questions (10 Questions) */}
      {activeTabFilter === 'technical' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredTech.map((q, idx) => {
            const key = `tech_${q.id}`;
            const isExpanded = !!expandedItems[key];
            const diffColor = q.difficulty === 'Easy' ? '#16a34a' : (q.difficulty === 'Medium' ? '#d97706' : '#dc2626');

            return (
              <div
                key={q.id}
                className="card"
                style={{
                  padding: '0',
                  overflow: 'hidden',
                  borderColor: isExpanded ? '#bae6fd' : '#e2e8f0',
                  boxShadow: isExpanded ? '0 4px 12px rgba(2, 132, 199, 0.08)' : 'var(--shadow-sm)'
                }}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleExpand(key)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    backgroundColor: isExpanded ? '#f0f9ff' : '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontWeight: 800,
                      color: '#0284c7',
                      fontSize: '0.875rem',
                      width: '32px'
                    }}>
                      Q{q.id}.
                    </span>
                    <span style={{ fontSize: '0.975rem', fontWeight: 700, color: '#0f172a' }}>
                      {q.question}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {q.category}
                    </span>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: `${diffColor}15`,
                        color: diffColor,
                        border: `1px solid ${diffColor}40`,
                        fontSize: '0.7rem'
                      }}
                    >
                      {q.difficulty}
                    </span>
                    {isExpanded ? <ChevronUp size={18} color="#0284c7" /> : <ChevronDown size={18} color="#94a3b8" />}
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0369a1', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Model Professional Answer:
                    </h5>
                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {q.detailed_answer}
                    </p>

                    {q.key_points_to_mention && q.key_points_to_mention.length > 0 && (
                      <div style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        marginBottom: '0.75rem'
                      }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.4rem' }}>
                          Key Points You Must Mention:
                        </div>
                        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.825rem', color: '#475569', lineHeight: 1.5 }}>
                          {q.key_points_to_mention.map((pt, pIdx) => (
                            <li key={pIdx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {q.sample_code_or_example && (
                      <div style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        backgroundColor: '#0f172a',
                        color: '#f8fafc',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {q.sample_code_or_example}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 2. HR Questions (5 STAR Questions) */}
      {activeTabFilter === 'hr' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredHr.map((q, idx) => {
            const key = `hr_${q.id}`;
            const isExpanded = !!expandedItems[key];

            return (
              <div
                key={q.id}
                className="card"
                style={{
                  padding: '0',
                  overflow: 'hidden',
                  borderColor: isExpanded ? '#e9d5ff' : '#e2e8f0'
                }}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleExpand(key)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    backgroundColor: isExpanded ? '#faf5ff' : '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontWeight: 800,
                      color: '#9333ea',
                      fontSize: '0.875rem',
                      width: '42px'
                    }}>
                      HR {q.id}.
                    </span>
                    <span style={{ fontSize: '0.975rem', fontWeight: 700, color: '#0f172a' }}>
                      {q.question}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {q.scenario_focus}
                    </span>
                    {isExpanded ? <ChevronUp size={18} color="#9333ea" /> : <ChevronDown size={18} color="#94a3b8" />}
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9', backgroundColor: '#ffffff' }}>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#9333ea', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      STAR Framework Answer Structure:
                    </h5>
                    <div style={{
                      padding: '1.2rem',
                      borderRadius: '10px',
                      backgroundColor: '#faf5ff',
                      border: '1px solid #f3e8ff',
                      marginBottom: '1rem',
                      whiteSpace: 'pre-line',
                      fontSize: '0.875rem',
                      color: '#3b0764',
                      lineHeight: 1.6
                    }}>
                      {q.star_framework_answer}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0'
                    }}>
                      <Lightbulb size={16} color="#9333ea" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.825rem', color: '#475569' }}>
                        <strong>Recruiter Insight:</strong> {q.key_tips}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Interview Tips & Advice */}
      {activeTabFilter === 'tips' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Personalized Student Advice Card */}
          {tips.student_specific_advice && (
            <div className="card" style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: '#ffffff',
              border: 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Award size={28} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                    Personalized Advice for {sp?.fullName} ({sp?.degree} - {sp?.branch})
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#e0f2fe', lineHeight: 1.6 }}>
                    {tips.student_specific_advice}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid-2">
            {/* Technical Interview Tips */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <Code size={20} color="#0284c7" />
                  <span>Technical Round Strategies</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(tips.technical_tips || []).map((tip, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavioral & HR Tips */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <UserCheck size={20} color="#9333ea" />
                  <span>Behavioral & HR Round Strategies</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(tips.behavioral_tips || []).map((tip, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle2 size={16} color="#9333ea" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
