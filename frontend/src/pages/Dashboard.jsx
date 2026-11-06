import React from 'react';
import { 
  Sparkles, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  MessageSquare, 
  ArrowRight, 
  UserPlus, 
  FileText, 
  Clock, 
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
  Trash2
} from 'lucide-react';

export default function Dashboard({ 
  activeProfile, 
  savedProfiles, 
  setActiveTab, 
  onSelectProfile, 
  onDeleteProfile
}) {
  const sp = activeProfile?.student_profile;
  const sga = activeProfile?.skill_gap_analysis;
  const lr = activeProfile?.learning_recommendations;
  const ip = activeProfile?.interview_preparation;
  const ps = activeProfile?.professional_summary;

  const totalSaved = savedProfiles?.length || 0;
  const matchPercentage = sga?.overall_match_percentage || 0;
  const possessedCount = sga?.possessed_skills?.length || (sp?.technicalSkills?.length || 0);
  const gapCount = (sga?.missing_skills?.length || 0) + (sga?.needs_improvement_skills?.length || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        borderRadius: '20px',
        padding: '2rem 2.5rem',
        color: '#ffffff',
        boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={14} />
            <span>AI-Driven Career Intelligence Engine</span>
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            {sp ? `Welcome back, ${sp.fullName}!` : 'Welcome to CareerAI!'}
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#e0f2fe', marginTop: '0.5rem', lineHeight: 1.5 }}>
            {sp ? (
              <>
                Targeting <strong style={{ color: '#ffffff' }}>{sp.preferredCareer}</strong> from{' '}
                <strong style={{ color: '#ffffff' }}>{sp.collegeName}</strong>. Your personalized career profile,
                skill-gap analysis, and interview preparation are ready for review.
              </>
            ) : (
              'Empowering students with AI-generated professional summaries, skill gap assessments, personalized learning roadmaps, and interview preparation material.'
            )}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            {sp ? (
              <>
                <button
                  onClick={() => setActiveTab('profile')}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#0369a1',
                    border: 'none',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <FileText size={16} />
                  <span>View Full Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('create')}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <UserPlus size={16} />
                  <span>Update Profile Data</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setActiveTab('create')}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0369a1',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <UserPlus size={18} />
                <span>Create Your Career Profile Now</span>
              </button>
            )}
          </div>
        </div>

        {/* Readiness Circular / Stat Badge */}
        {sp && (
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '1.25rem 1.75rem',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            textAlign: 'center',
            minWidth: '160px'
          }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#bae6fd', fontWeight: 700 }}>
              Readiness Match
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, margin: '0.2rem 0' }}>
              {matchPercentage}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#e0f2fe' }}>
              {sga?.readiness_level || 'Role Evaluation'}
            </div>
          </div>
        )}
      </div>

      {/* Metric Stat Cards */}
      <div className="grid-4">
        {/* Metric 1 */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#e0f2fe',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Target size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Target Career</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>
              {sp?.preferredCareer || 'Not Set'}
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Possessed Skills</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              {possessedCount} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>verified</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#fffbeb',
            color: '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Identified Skill Gaps</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              {gapCount} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>to bridge</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#faf5ff',
            color: '#9333ea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Layers size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Total Profiles Saved</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              {totalSaved} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>in LocalStorage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Career Goal Card */}
      {sp && (
        <div className="card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <Award size={18} />
                <span>Selected Career Goal & Objective</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700 }}>
                "{sp.careerGoal}"
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.35rem' }}>
                Academic: {sp.degree} in {sp.branch} | {sp.collegeName} | CGPA: {sp.cgpa} | Level: {sp.experienceLevel}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              className="btn btn-outline-primary btn-sm"
              style={{ flexShrink: 0 }}
            >
              Full Profile <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Quick Access to All Generated Sections */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
            Quick Access to Career Sections
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Generated content maintained across all formats
          </span>
        </div>

        <div className="grid-2">
          {/* Card 1: Professional Summary */}
          <div 
            onClick={() => setActiveTab('profile')}
            className="card" 
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={20} />
                </div>
                <span className="badge badge-primary">Pillar 1</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                Professional Summary
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.5 }}>
                {ps?.short_summary 
                  ? ps.short_summary.slice(0, 140) + '...'
                  : 'Tailored summary highlighting your academic background, strengths, and career objectives.'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#0284c7', fontWeight: 700, fontSize: '0.825rem', marginTop: '1rem' }}>
              <span>View & Copy Summary</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card 2: Skill Gap Analysis */}
          <div 
            onClick={() => setActiveTab('skill-gap')}
            className="card" 
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#f0fdf4',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp size={20} />
                </div>
                <span className="badge badge-success">Pillar 2</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                Skill Gap Analysis
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.5 }}>
                {sga?.summary_insight
                  ? sga.summary_insight.slice(0, 140) + '...'
                  : 'Industry benchmarking categorizing skills into Possessed, Needs Improvement, and Missing.'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#16a34a', fontWeight: 700, fontSize: '0.825rem', marginTop: '1rem' }}>
              <span>Analyze Gaps ({matchPercentage}% Match)</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card 3: Learning Recommendations */}
          <div 
            onClick={() => setActiveTab('learning')}
            className="card" 
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#fffbeb',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BookOpen size={20} />
                </div>
                <span className="badge badge-warning">Pillar 3</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                Learning Recommendations
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.5 }}>
                {lr?.estimated_total_hours
                  ? `Structured 8-week roadmap with verified courses requiring ~${lr.estimated_total_hours}.`
                  : 'Targeted technical skills, courses, roadmap, and weekly plan to bridge your skill gaps.'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#d97706', fontWeight: 700, fontSize: '0.825rem', marginTop: '1rem' }}>
              <span>Explore 8-Week Roadmap</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card 4: Interview Preparation */}
          <div 
            onClick={() => setActiveTab('interview')}
            className="card" 
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#faf5ff',
                  color: '#9333ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MessageSquare size={20} />
                </div>
                <span className="badge badge-neutral" style={{ color: '#9333ea', borderColor: '#e9d5ff' }}>Pillar 4</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                Interview Preparation
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.5 }}>
                {ip?.technical_questions
                  ? `${ip.technical_questions.length} Technical Questions and ${ip.hr_questions?.length || 5} STAR Behavioral Questions with answers.`
                  : 'Tailored technical and HR interview questions with sample answers and personalized tips.'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#9333ea', fontWeight: 700, fontSize: '0.825rem', marginTop: '1rem' }}>
              <span>Practice Questions & Answers</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Saved Profiles Section (LocalStorage) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Layers size={18} color="#0284c7" />
            <span>Saved Profiles in Browser LocalStorage</span>
          </div>
          <span className="badge badge-neutral">{savedProfiles.length} Profiles</span>
        </div>

        {savedProfiles && savedProfiles.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {savedProfiles.map((p) => {
              const student = p.student_profile;
              const isCurrent = activeProfile?.id === p.id;

              return (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: isCurrent ? '#f0f9ff' : '#f8fafc',
                    border: isCurrent ? '1px solid #bae6fd' : '1px solid #e2e8f0',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: isCurrent ? '#0284c7' : '#cbd5e1',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      {student?.fullName ? student.fullName.charAt(0).toUpperCase() : 'S'}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                          {student?.fullName}
                        </span>
                        {isCurrent && (
                          <span className="badge badge-primary">Active</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.775rem', color: '#64748b' }}>
                        {student?.preferredCareer} • {student?.degree} ({student?.branch}) • CGPA: {student?.cgpa}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {!isCurrent && (
                      <button
                        onClick={() => onSelectProfile(p)}
                        className="btn btn-secondary btn-sm"
                      >
                        Switch
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteProfile(p.id)}
                      className="btn btn-secondary btn-sm"
                      title="Delete profile from LocalStorage"
                      style={{ color: '#ef4444' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#64748b' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              No saved career profiles found yet.
            </p>
            <button
              onClick={() => setActiveTab('create')}
              className="btn btn-primary btn-sm"
            >
              + Create Your First Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
