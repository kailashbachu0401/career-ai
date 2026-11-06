import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Download, 
  RefreshCw, 
  Save, 
  Edit3, 
  Check, 
  Sparkles, 
  Award, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { generatePdfReport } from '../utils/pdfGenerator';

export default function MyProfile({ 
  profile, 
  onEditDetails, 
  onRegenerate, 
  onSaveProfile, 
  onShowToast, 
  setActiveTab,
  isRegenerating 
}) {
  const [copied, setCopied] = useState(false);

  if (!profile || !profile.student_profile) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: '#e0f2fe',
          color: '#0284c7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto'
        }}>
          <FileText size={28} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          No Career Profile Loaded Yet
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
          Fill in your academic background and skills in the form to generate your personalized career profile.
        </p>
        <button
          onClick={() => setActiveTab('create')}
          className="btn btn-primary"
        >
          Create Profile Now
        </button>
      </div>
    );
  }

  const sp = profile.student_profile;
  const ps = profile.professional_summary;
  const sga = profile.skill_gap_analysis;
  const lr = profile.learning_recommendations;
  const ip = profile.interview_preparation;

  async function handleCopySummary() {
    const summaryText = ps?.full_summary || ps?.short_summary || '';
    if (!summaryText) return;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      onShowToast({ type: 'success', message: 'Professional summary copied to clipboard!' });
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      onShowToast({ type: 'error', message: 'Failed to copy summary to clipboard' });
    }
  }

  function handleDownloadPdf() {
    try {
      generatePdfReport(profile);
      onShowToast({ type: 'success', message: 'Career profile PDF downloaded successfully!' });
    } catch (err) {
      console.error('PDF error:', err);
      onShowToast({ type: 'error', message: 'Failed to generate PDF document' });
    }
  }

  function handleSave() {
    onSaveProfile(profile);
  }

  function handleViewProfile() {
    const el = document.getElementById('profile-view');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onShowToast({ type: 'info', message: 'Viewing complete student profile' });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Required Action Toolbar (All 6 Working Buttons) */}
      <div className="card" style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
              Profile Actions:
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* 1. View Profile Button */}
            <button
              onClick={handleViewProfile}
              className="btn btn-secondary btn-sm"
              title="View full generated profile"
            >
              <Eye size={14} color="#0284c7" />
              <span>View Profile</span>
            </button>

            {/* 2. Edit Student Details Button */}
            <button
              onClick={onEditDetails}
              className="btn btn-secondary btn-sm"
              title="Edit Student Information"
            >
              <Edit3 size={14} />
              <span>Edit Details</span>
            </button>

            {/* 3. Regenerate Content Button */}
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="btn btn-secondary btn-sm"
              title="Regenerate all sections"
            >
              <RefreshCw size={14} className={isRegenerating ? 'animate-spin' : ''} />
              <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
            </button>

            {/* 4. Copy Professional Summary Button */}
            <button
              onClick={handleCopySummary}
              className="btn btn-secondary btn-sm"
              title="Copy Professional Summary to Clipboard"
            >
              {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            {/* 5. Save Profile Button */}
            <button
              onClick={handleSave}
              className="btn btn-secondary btn-sm"
              title="Save Profile to LocalStorage"
            >
              <Save size={14} color="#0284c7" />
              <span>Save Profile</span>
            </button>

            {/* 6. Download as PDF Button */}
            <button
              onClick={handleDownloadPdf}
              className="btn btn-primary btn-sm"
              title="Download executive PDF career report"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Executive Header Card */}
      <div 
        id="profile-view"
        className="card" 
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
          border: '1px solid #bae6fd'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.6rem',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
            }}>
              {sp.fullName ? sp.fullName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                  {sp.fullName}
                </h2>
                <span className="badge badge-primary">{sp.preferredCareer}</span>
                <span className="badge badge-neutral">{sp.experienceLevel}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.2rem' }}>
                {sp.degree} in {sp.branch} • {sp.collegeName} • Standing: {sp.academicYear} (CGPA: {sp.cgpa})
              </p>
              {ps?.suggested_headline && (
                <p style={{ fontSize: '0.825rem', color: '#0284c7', fontWeight: 600, marginTop: '0.25rem' }}>
                  {ps.suggested_headline}
                </p>
              )}
            </div>
          </div>

          <div style={{
            padding: '0.85rem 1.25rem',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Skill Match Index
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0284c7' }}>
              {sga?.overall_match_percentage || 75}%
            </div>
            <div style={{ fontSize: '0.725rem', color: '#16a34a', fontWeight: 600 }}>
              {sga?.readiness_level || 'Role Ready'}
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Professional Summary */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileText size={20} color="#0284c7" />
            <span>1. Professional Summary</span>
          </div>
          <button
            onClick={handleCopySummary}
            className="btn btn-outline-primary btn-sm"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          padding: '1.25rem',
          borderLeft: '4px solid #0284c7',
          marginBottom: '1.25rem'
        }}>
          <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.6, fontWeight: 500 }}>
            {ps?.full_summary || ps?.short_summary}
          </p>
        </div>

        {Array.isArray(ps?.key_highlights) && ps.key_highlights.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '0.6rem' }}>
              Core Strengths & Profile Highlights:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {ps.key_highlights.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <Award size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.825rem', color: '#334155', lineHeight: 1.4 }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Skill Gap Analysis Summary Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <TrendingUp size={20} color="#16a34a" />
            <span>2. Skill Gap Analysis</span>
          </div>
          <button
            onClick={() => setActiveTab('skill-gap')}
            className="btn btn-outline-primary btn-sm"
          >
            <span>View Full Gap Report</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.5 }}>
          {sga?.summary_insight}
        </p>

        <div className="grid-3">
          <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Already Possessed ({sga?.possessed_skills?.length || 0})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {sga?.possessed_skills?.slice(0, 4).map((s, idx) => (
                <span key={idx} className="badge badge-success">{s.skill || s}</span>
              ))}
              {(sga?.possessed_skills?.length || 0) > 4 && (
                <span className="badge badge-neutral">+{sga.possessed_skills.length - 4} more</span>
              )}
            </div>
          </div>

          <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Needs Improvement ({sga?.needs_improvement_skills?.length || 0})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {sga?.needs_improvement_skills?.slice(0, 3).map((s, idx) => (
                <span key={idx} className="badge badge-warning">{s.skill || s}</span>
              ))}
            </div>
          </div>

          <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Missing High-Priority ({sga?.missing_skills?.length || 0})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {sga?.missing_skills?.slice(0, 3).map((s, idx) => (
                <span key={idx} className="badge badge-danger">{s.skill || s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sections 3 & 4 Navigation Cards */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <BookOpen size={18} color="#0284c7" />
              <span>3. Learning Recommendations</span>
            </div>
            <button onClick={() => setActiveTab('learning')} className="btn btn-outline-primary btn-sm">
              <span>View 8-Week Plan</span>
              <ArrowRight size={14} />
            </button>
          </div>
          <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '0.75rem' }}>
            Curriculum formulated to close verified skill gaps. Estimated effort: {lr?.estimated_total_hours || '120-140 Hours'}.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {lr?.learning_roadmap?.slice(0, 2).map((phase, idx) => (
              <div key={idx} style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369a1' }}>
                  {phase.phase} ({phase.duration})
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                  {phase.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <MessageSquare size={18} color="#9333ea" />
              <span>4. Interview Preparation</span>
            </div>
            <button onClick={() => setActiveTab('interview')} className="btn btn-outline-primary btn-sm">
              <span>Practice Q&A</span>
              <ArrowRight size={14} />
            </button>
          </div>
          <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '0.75rem' }}>
            {ip?.technical_questions?.length || 10} Technical questions and {ip?.hr_questions?.length || 5} STAR Behavioral questions ready.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {ip?.technical_questions?.slice(0, 2).map((q, idx) => (
              <div key={idx} style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9333ea' }}>
                  Q{idx + 1}: {q.category} ({q.difficulty})
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                  {q.question}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
