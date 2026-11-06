import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Sparkles, 
  X 
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'create', label: 'Create Career Profile', icon: UserPlus },
  { id: 'profile', label: 'My Career Profile', icon: FileText },
  { id: 'skill-gap', label: 'Skill Gap Analysis', icon: TrendingUp },
  { id: 'learning', label: 'Learning Recommendations', icon: BookOpen },
  { id: 'interview', label: 'Interview Preparation', icon: MessageSquare },
];

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  activeProfile, 
  isMobileOpen, 
  setIsMobileOpen 
}) {
  function handleNavClick(tabId) {
    setActiveTab(tabId);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  }

  return (
    <>
      {isMobileOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}
      <aside 
        className={`sidebar-container ${isMobileOpen ? 'open' : ''}`}
        style={{
          width: '270px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 20
        }}
      >
        {/* Brand Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(2, 132, 199, 0.25)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                  Career<span style={{ color: '#0284c7' }}>AI</span>
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.1rem 0.4rem',
                  borderRadius: '6px',
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1'
                }}>
                  Pro
                </span>
              </div>
              <p style={{ fontSize: '0.72rem', color: '#64748b' }}>
                Career Content Generator
              </p>
            </div>
          </div>
          {isMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.3rem', border: 'none' }}
              title="Close menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav style={{ padding: '1.25rem 0.85rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ 
            fontSize: '0.7rem', 
            fontWeight: 700, 
            color: '#94a3b8', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            padding: '0 0.65rem 0.6rem 0.65rem'
          }}>
            Navigation
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: isActive ? '#f0f9ff' : 'transparent',
                    color: isActive ? '#0284c7' : '#475569',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: isActive ? 'inset 0 0 0 1px #bae6fd' : 'none'
                  }}
                >
                  <Icon size={18} color={isActive ? '#0284c7' : '#64748b'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Active Student Pill at Bottom */}
        <div style={{
          padding: '1.25rem',
          borderTop: '1px solid #f1f5f9',
          backgroundColor: '#fafbfc'
        }}>
          {activeProfile ? (
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Active Profile
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                fontWeight: 700, 
                color: '#0f172a',
                marginTop: '0.2rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {activeProfile.student_profile?.fullName || 'Student'}
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#0284c7',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {activeProfile.student_profile?.preferredCareer || 'Target Role'}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => handleNavClick('create')}
                className="btn btn-outline-primary btn-sm"
                style={{ width: '100%' }}
              >
                + Create Profile
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
