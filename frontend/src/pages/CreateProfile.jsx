import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Code, 
  Target, 
  AlertCircle,
  Wand2
} from 'lucide-react';

const SAMPLE_PROFILES = [
  {
    name: 'Full Stack Web Developer',
    data: {
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@example.edu',
      collegeName: 'National Institute of Technology',
      degree: 'B.Tech',
      branch: 'Computer Science & Engineering',
      academicYear: 'Final Year',
      cgpa: '8.8',
      technicalSkills: 'React.js, Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, Git/GitHub, Docker',
      programmingLanguages: 'JavaScript, TypeScript, Python',
      softSkills: 'Analytical Thinking, Team Collaboration, Problem Solving',
      areasOfInterest: 'Full Stack Web Development, Cloud Computing, Scalable APIs',
      preferredCareer: 'Full Stack Developer',
      careerGoal: 'Join a leading technology company as a Full Stack Engineer and engineer high-throughput web applications.',
      experienceLevel: 'Intermediate'
    }
  },
  {
    name: 'AI / Machine Learning Engineer',
    data: {
      fullName: 'Sneha Patel',
      email: 'sneha.patel@example.edu',
      collegeName: 'Indian Institute of Information Technology',
      degree: 'B.Tech',
      branch: 'Artificial Intelligence & Data Science',
      academicYear: 'Final Year',
      cgpa: '9.2',
      technicalSkills: 'PyTorch, TensorFlow, Scikit-Learn, NumPy, Pandas, Transformers, FastAPI, MLflow',
      programmingLanguages: 'Python, SQL, C++',
      softSkills: 'Critical Thinking, Research Methodology, Data Storytelling',
      areasOfInterest: 'Generative AI, Large Language Models, Deep Learning, Computer Vision',
      preferredCareer: 'AI / Machine Learning Engineer',
      careerGoal: 'Develop production-ready generative AI systems and advance foundation model deployment.',
      experienceLevel: 'Intermediate'
    }
  },
  {
    name: 'Cloud & DevOps Engineer',
    data: {
      fullName: 'Vikram Malhotra',
      email: 'vikram.m@example.edu',
      collegeName: 'Vellore Institute of Technology',
      degree: 'B.Tech',
      branch: 'Information Technology',
      academicYear: 'Final Year',
      cgpa: '8.5',
      technicalSkills: 'Linux, Docker, Kubernetes, GitHub Actions, AWS, Terraform, Prometheus, CI/CD',
      programmingLanguages: 'Python, Go, Bash',
      softSkills: 'Incident Response, Systematic Troubleshooting, Continuous Learning',
      areasOfInterest: 'Infrastructure as Code, Cloud Security, Kubernetes Orchestration',
      preferredCareer: 'Cloud & DevOps Engineer',
      careerGoal: 'Automate zero-downtime CI/CD pipelines and manage resilient multi-cloud container infrastructures.',
      experienceLevel: 'Intermediate'
    }
  }
];

const PRESET_TECH_SKILLS = ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Docker', 'Git/GitHub', 'PyTorch', 'AWS', 'Kubernetes'];
const PRESET_LANGUAGES = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'SQL'];
const PRESET_SOFT_SKILLS = ['Problem Solving', 'Team Collaboration', 'Effective Communication', 'Agile Mindset', 'Leadership'];
const PRESET_INTERESTS = ['Web Development', 'Artificial Intelligence', 'Cloud Architecture', 'Cybersecurity', 'System Design'];

export default function CreateProfile({ 
  onSubmit, 
  isGenerating, 
  initialData 
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    collegeName: '',
    degree: 'B.Tech',
    branch: '',
    academicYear: 'Final Year',
    cgpa: '',
    technicalSkills: 'React.js, Node.js, Express.js, REST APIs, Git/GitHub',
    programmingLanguages: 'JavaScript, Python',
    softSkills: 'Problem Solving, Teamwork, Communication',
    areasOfInterest: 'Web Development, Cloud Computing',
    preferredCareer: 'Full Stack Developer',
    careerGoal: 'Secure a challenging software engineering role and develop high-impact production applications.',
    experienceLevel: 'Intermediate'
  });

  const [errors, setErrors] = useState({});

  // Sync state whenever initialData changes (e.g. from Edit Student Details)
  useEffect(() => {
    if (initialData?.student_profile) {
      const sp = initialData.student_profile;
      setFormData({
        fullName: sp.fullName || '',
        email: sp.email || '',
        collegeName: sp.collegeName || '',
        degree: sp.degree || 'B.Tech',
        branch: sp.branch || '',
        academicYear: sp.academicYear || 'Final Year',
        cgpa: sp.cgpa || '',
        technicalSkills: Array.isArray(sp.technicalSkills) ? sp.technicalSkills.join(', ') : (sp.technicalSkills || ''),
        programmingLanguages: Array.isArray(sp.programmingLanguages) ? sp.programmingLanguages.join(', ') : (sp.programmingLanguages || ''),
        softSkills: Array.isArray(sp.softSkills) ? sp.softSkills.join(', ') : (sp.softSkills || ''),
        areasOfInterest: Array.isArray(sp.areasOfInterest) ? sp.areasOfInterest.join(', ') : (sp.areasOfInterest || ''),
        preferredCareer: sp.preferredCareer || 'Full Stack Developer',
        careerGoal: sp.careerGoal || '',
        experienceLevel: sp.experienceLevel || 'Intermediate'
      });
    }
  }, [initialData]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }

  function addPreset(field, item) {
    const current = formData[field] || '';
    const list = current.split(',').map(s => s.trim()).filter(Boolean);
    if (!list.includes(item)) {
      const updated = list.length > 0 ? `${current}, ${item}` : item;
      setFormData(prev => ({ ...prev, [field]: updated }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    }
  }

  function loadSample(sample) {
    setFormData({ ...sample.data });
    setErrors({});
  }

  function validate() {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College Name is required';
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.branch.trim()) newErrors.branch = 'Branch / Department is required';
    if (!formData.cgpa.trim()) newErrors.cgpa = 'CGPA / Percentage is required';
    if (!formData.technicalSkills.trim()) newErrors.technicalSkills = 'Please enter at least one technical skill';
    if (!formData.programmingLanguages.trim()) newErrors.programmingLanguages = 'Please enter at least one programming language';
    if (!formData.careerGoal.trim()) newErrors.careerGoal = 'Career Goal is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const payload = {
      ...formData,
      technicalSkills: formData.technicalSkills.split(',').map(s => s.trim()).filter(Boolean),
      programmingLanguages: formData.programmingLanguages.split(',').map(s => s.trim()).filter(Boolean),
      softSkills: formData.softSkills.split(',').map(s => s.trim()).filter(Boolean),
      areasOfInterest: formData.areasOfInterest.split(',').map(s => s.trim()).filter(Boolean)
    };

    onSubmit(payload);
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* 1-Click Sample Pre-fill Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: '#f0f9ff', borderColor: '#bae6fd' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wand2 size={18} color="#0284c7" />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0369a1' }}>
              Instant 1-Click Sample Profiles:
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {SAMPLE_PROFILES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadSample(sample)}
                className="btn btn-outline-primary btn-sm"
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Section 1: Academic Background */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <div className="card-title">
              <GraduationCap size={20} color="#0284c7" />
              <span>1. Student Academic Background</span>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Aarav Sharma"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              />
              {errors.fullName && <div className="invalid-feedback"><AlertCircle size={12} /> {errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g. aarav.sharma@example.edu"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback"><AlertCircle size={12} /> {errors.email}</div>}
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">
                College / University Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="collegeName"
                placeholder="e.g. National Institute of Technology"
                value={formData.collegeName}
                onChange={handleInputChange}
                className={`form-control ${errors.collegeName ? 'is-invalid' : ''}`}
              />
              {errors.collegeName && <div className="invalid-feedback"><AlertCircle size={12} /> {errors.collegeName}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Degree / Course <span className="required">*</span>
              </label>
              <select
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                <option value="B.E.">B.E. (Bachelor of Engineering)</option>
                <option value="B.Sc">B.Sc (Computer Science / IT)</option>
                <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                <option value="M.Tech">M.Tech / M.E.</option>
                <option value="MCA">MCA (Master of Computer Applications)</option>
                <option value="M.Sc">M.Sc (Data Science / AI)</option>
              </select>
            </div>
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">
                Branch / Department <span className="required">*</span>
              </label>
              <input
                type="text"
                name="branch"
                placeholder="e.g. Computer Science & Engineering"
                value={formData.branch}
                onChange={handleInputChange}
                className={`form-control ${errors.branch ? 'is-invalid' : ''}`}
              />
              {errors.branch && <div className="invalid-feedback"><AlertCircle size={12} /> {errors.branch}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Academic Year <span className="required">*</span>
              </label>
              <select
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="Final Year">Final Year (Senior)</option>
                <option value="Graduated">Recent Graduate</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                CGPA / Percentage <span className="required">*</span>
              </label>
              <input
                type="text"
                name="cgpa"
                placeholder="e.g. 8.8 or 85%"
                value={formData.cgpa}
                onChange={handleInputChange}
                className={`form-control ${errors.cgpa ? 'is-invalid' : ''}`}
              />
              {errors.cgpa && <div className="invalid-feedback"><AlertCircle size={12} /> {errors.cgpa}</div>}
            </div>
          </div>
        </div>

        {/* Section 2: Technical & Soft Skills */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <div className="card-title">
              <Code size={20} color="#0284c7" />
              <span>2. Technical Skills & Languages</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="form-group">
            <label className="form-label">
              Technical Skills & Tools <span className="required">*</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#64748b', marginLeft: '0.5rem' }}>
                (Comma-separated)
              </span>
            </label>
            <input
              type="text"
              name="technicalSkills"
              placeholder="e.g. React.js, Node.js, Express.js, MongoDB, Docker, Git"
              value={formData.technicalSkills}
              onChange={handleInputChange}
              className={`form-control ${errors.technicalSkills ? 'is-invalid' : ''}`}
            />
            {errors.technicalSkills && <div className="invalid-feedback"><AlertCircle size={12} /> {errors.technicalSkills}</div>}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', alignSelf: 'center' }}>Add:</span>
              {PRESET_TECH_SKILLS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => addPreset('technicalSkills', item)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    cursor: 'pointer',
                    color: '#334155'
                  }}
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>

          {/* Programming Languages */}
          <div className="form-group">
            <label className="form-label">
              Programming Languages <span className="required">*</span>
            </label>
            <input
              type="text"
              name="programmingLanguages"
              placeholder="e.g. JavaScript, TypeScript, Python, C++"
              value={formData.programmingLanguages}
              onChange={handleInputChange}
              className={`form-control ${errors.programmingLanguages ? 'is-invalid' : ''}`}
            />
            {errors.programmingLanguages && <div className="invalid-feedback"><AlertCircle size={12} /> {errors.programmingLanguages}</div>}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', alignSelf: 'center' }}>Add:</span>
              {PRESET_LANGUAGES.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => addPreset('programmingLanguages', item)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    cursor: 'pointer',
                    color: '#334155'
                  }}
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-2">
            {/* Soft Skills */}
            <div className="form-group">
              <label className="form-label">
                Soft Skills
              </label>
              <input
                type="text"
                name="softSkills"
                placeholder="e.g. Problem Solving, Teamwork, Communication"
                value={formData.softSkills}
                onChange={handleInputChange}
                className="form-control"
              />
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {PRESET_SOFT_SKILLS.slice(0, 3).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addPreset('softSkills', item)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.45rem',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      cursor: 'pointer',
                      color: '#475569'
                    }}
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="form-group">
              <label className="form-label">
                Areas of Interest
              </label>
              <input
                type="text"
                name="areasOfInterest"
                placeholder="e.g. Full Stack Development, Cloud Systems"
                value={formData.areasOfInterest}
                onChange={handleInputChange}
                className="form-control"
              />
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {PRESET_INTERESTS.slice(0, 3).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addPreset('areasOfInterest', item)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.45rem',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      cursor: 'pointer',
                      color: '#475569'
                    }}
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Target Role & Goals */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <div className="card-title">
              <Target size={20} color="#0284c7" />
              <span>3. Target Career & Professional Goals</span>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">
                Preferred Career Field <span className="required">*</span>
              </label>
              <select
                name="preferredCareer"
                value={formData.preferredCareer}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                <option value="Mobile App Developer">Mobile App Developer</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Experience Level <span className="required">*</span>
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="Beginner">Beginner (Foundational, Academic Projects)</option>
                <option value="Intermediate">Intermediate (Projects & Practical Experience)</option>
                <option value="Advanced">Advanced (Production Experience / Open-Source)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Career Goal & Vision <span className="required">*</span>
            </label>
            <textarea
              name="careerGoal"
              rows={3}
              placeholder="e.g. Join a leading technology company as a Full Stack Engineer and engineer high-throughput web applications."
              value={formData.careerGoal}
              onChange={handleInputChange}
              className={`form-control ${errors.careerGoal ? 'is-invalid' : ''}`}
            />
            {errors.careerGoal && <div className="invalid-feedback"><AlertCircle size={12} /> {errors.careerGoal}</div>}
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <button
            type="submit"
            disabled={isGenerating}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '320px', padding: '1rem 2.5rem', fontSize: '1.05rem' }}
          >
            {isGenerating ? (
              <>
                <Sparkles size={20} className="animate-spin" />
                <span>Generating Career Profile...</span>
              </>
            ) : (
              <>
                <Sparkles size={20} />
                <span>Generate My Career Profile</span>
              </>
            )}
          </button>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.6rem' }}>
            Generates Professional Summary, Skill Gap Analysis, Learning Recommendations, and Interview Prep.
          </p>
        </div>
      </form>
    </div>
  );
}
