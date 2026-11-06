import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ExternalLink, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  Compass, 
  ArrowRight,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export default function LearningRecommendations({ profile, setActiveTab }) {
  const [selectedPhase, setSelectedPhase] = useState(0);

  if (!profile || !profile.learning_recommendations) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          No learning recommendations generated yet. Please generate a career profile first.
        </p>
        <button onClick={() => setActiveTab('create')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Create Career Profile
        </button>
      </div>
    );
  }

  const lr = profile.learning_recommendations;
  const sp = profile.student_profile;
  const targetSkills = lr.target_skills || [];
  const courses = lr.recommended_courses || [];
  const resources = lr.learning_resources || [];
  const roadmap = lr.learning_roadmap || [];
  const weeklyPlan = lr.weekly_learning_plan || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner: Commitment & Target Skills */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
        border: '1px solid #bae6fd'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.825rem', marginBottom: '0.35rem' }}>
              <Compass size={18} />
              <span>Personalized Learning Strategy</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              Mastery Path for {sp?.preferredCareer}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.3rem' }}>
              Targeted curriculum formulated to systematically bridge your verified skill gaps.
            </p>
            
            {/* Target Skills Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Priority Focus:</span>
              {targetSkills.map((skill, idx) => (
                <span key={idx} className="badge badge-primary">{skill}</span>
              ))}
            </div>
          </div>

          <div style={{
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            textAlign: 'right'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end', color: '#0284c7', fontWeight: 700, fontSize: '0.8rem' }}>
              <Clock size={16} />
              <span>Estimated Commitment</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
              {lr.estimated_total_hours}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Paced at ~15-18 hours/week
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Courses & Topics */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <GraduationCap size={20} color="#0284c7" />
            <span>Recommended Courses & Learning Topics</span>
          </div>
          <span className="badge badge-primary">{courses.length} Vetted Courses</span>
        </div>

        <div className="grid-3">
          {courses.map((course, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                    {course.platform}
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                    {course.level}
                  </span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                  {course.title}
                </h4>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={12} /> {course.duration}
                </span>
                {course.link && (
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#0284c7',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>Course Info</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curated Learning Resources */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <BookOpen size={20} color="#0284c7" />
            <span>Suggested Learning Resources & Toolkits</span>
          </div>
          <span className="badge badge-neutral">Handpicked Documentation & Primers</span>
        </div>

        <div className="grid-2">
          {resources.map((res, idx) => (
            <div
              key={idx}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '10px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                gap: '0.75rem'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <BookOpen size={18} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h5 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0f172a' }}>
                    {res.name}
                  </h5>
                  <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>{res.type}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem', lineHeight: 1.4 }}>
                  {res.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beginner-to-Advanced Learning Roadmap */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Compass size={20} color="#0284c7" />
            <span>Beginner-to-Advanced Learning Roadmap</span>
          </div>
          <span className="badge badge-primary">{roadmap.length} Sequential Phases</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {roadmap.map((phase, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderLeft: '4px solid #0284c7'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                  {phase.phase}
                </h4>
                <span className="badge badge-primary">{phase.duration}</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.75rem', fontWeight: 500 }}>
                {phase.focus}
              </p>

              {phase.milestones && phase.milestones.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {phase.milestones.map((m, mIdx) => (
                    <div key={mIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: '#334155' }}>
                      <CheckCircle2 size={15} color="#16a34a" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Learning Plan (8-Week Detailed Schedule) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Calendar size={20} color="#0284c7" />
            <span>Structured Weekly Learning Plan</span>
          </div>
          <span className="badge badge-neutral">{weeklyPlan.length} Weekly Sprints</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '0.75rem 0.5rem', width: '90px' }}>Week</th>
                <th style={{ padding: '0.75rem 0.5rem', width: '220px' }}>Theme</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Topics Covered</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Practical Portfolio Task</th>
                <th style={{ padding: '0.75rem 0.5rem', width: '90px' }}>Hours</th>
              </tr>
            </thead>
            <tbody>
              {weeklyPlan.map((w, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc'
                  }}
                >
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#0284c7' }}>
                    {w.week}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600, color: '#0f172a' }}>
                    {w.theme}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', color: '#475569' }}>
                    {w.topics}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', color: '#334155', fontWeight: 500 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CheckCircle2 size={13} color="#16a34a" /> {w.practical_task}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600, color: '#64748b' }}>
                    {w.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA to Interview Preparation */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        color: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
              Ready for the Next Step? Prepare for Your Interviews
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#e0f2fe', marginTop: '0.2rem' }}>
              Practice 10 tailored technical questions and 5 HR behavioral questions structured with STAR.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('interview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
            <span>Practice Interview Questions</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
