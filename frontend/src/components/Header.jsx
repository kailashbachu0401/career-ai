import React from 'react';
import { UserPlus, Menu } from 'lucide-react';

const PAGE_META = {
  dashboard: {
    title: 'Student Career Dashboard',
    subtitle: 'Unified overview of your career readiness, strengths, and personalized recommendations.'
  },
  create: {
    title: 'Create Career Profile',
    subtitle: 'Enter your academic background, skills, and goals to generate AI career content.'
  },
  profile: {
    title: 'My Career Profile',
    subtitle: 'Comprehensive career portfolio, executive summary, and multi-format export.'
  },
  'skill-gap': {
    title: 'Skill Gap Analysis',
    subtitle: 'Benchmarking your technical and soft skills against target industry standards.'
  },
  learning: {
    title: 'Learning Recommendations',
    subtitle: 'Tailored courses, curated resources, and structured 8-week learning roadmap.'
  },
  interview: {
    title: 'Interview Preparation',
    subtitle: 'Targeted technical & behavioral HR questions with comprehensive answer models.'
  }
};

export default function Header({ 
  activeTab, 
  setActiveTab, 
  activeProfile, 
  onToggleMobileMenu 
}) {
  const meta = PAGE_META[activeTab] || PAGE_META.dashboard;

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '1.25rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={onToggleMobileMenu}
          className="btn btn-secondary btn-sm mobile-menu-btn"
          style={{ padding: '0.45rem', border: '1px solid #cbd5e1' }}
          title="Open Navigation Menu"
        >
          <Menu size={18} color="#0284c7" />
        </button>

        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
            {meta.title}
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            {meta.subtitle}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {activeProfile?.student_profile?.fullName && (
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
            Student: <strong style={{ color: '#0284c7' }}>{activeProfile.student_profile.fullName}</strong>
          </span>
        )}
        {/* Quick New Profile Button */}
        <button
          onClick={() => setActiveTab('create')}
          className="btn btn-primary btn-sm"
        >
          <UserPlus size={14} />
          <span>New Profile</span>
        </button>
      </div>
    </header>
  );
}
