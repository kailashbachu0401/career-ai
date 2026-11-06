import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoadingOverlay from './components/LoadingOverlay';
import Toast from './components/Toast';

import Dashboard from './pages/Dashboard';
import CreateProfile from './pages/CreateProfile';
import MyProfile from './pages/MyProfile';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import LearningRecommendations from './pages/LearningRecommendations';
import InterviewPreparation from './pages/InterviewPreparation';

import {
  generateProfileApi,
  regenerateProfileApi,
  getSavedProfilesFromStorage,
  saveProfileToStorage,
  getActiveProfileFromStorage,
  setActiveProfileInStorage,
  deleteProfileFromStorage
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeProfile, setActiveProfile] = useState(null);
  const [savedProfiles, setSavedProfiles] = useState([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [toast, setToast] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    // Load profiles from LocalStorage
    const storedList = getSavedProfilesFromStorage();
    const storedActive = getActiveProfileFromStorage();

    if (storedActive) {
      setActiveProfile(storedActive);
      setSavedProfiles(storedList);
    } else if (storedList.length > 0) {
      setActiveProfile(storedList[0]);
      setSavedProfiles(storedList);
    } else {
      // Auto-seed with initial high-fidelity sample for instant evaluation
      const defaultSample = {
        fullName: 'Aarav Sharma',
        email: 'aarav.sharma@example.edu',
        collegeName: 'National Institute of Technology',
        degree: 'B.Tech',
        branch: 'Computer Science & Engineering',
        academicYear: 'Final Year',
        cgpa: '8.8',
        technicalSkills: ['HTML5/CSS3', 'React.js', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Git/GitHub'],
        programmingLanguages: ['JavaScript', 'TypeScript', 'Python'],
        softSkills: ['Analytical Thinking', 'Team Collaboration', 'Problem Solving'],
        areasOfInterest: ['Full Stack Web Development', 'Cloud Systems'],
        preferredCareer: 'Full Stack Developer',
        careerGoal: 'Join a leading technology company as a Full Stack Engineer and engineer high-throughput web applications.',
        experienceLevel: 'Intermediate'
      };

      generateProfileApi(defaultSample)
        .then(profile => {
          const updated = saveProfileToStorage(profile);
          setSavedProfiles(updated);
          setActiveProfile(profile);
        })
        .catch(err => {
          console.warn('Initial default sample seed error:', err);
        });
    }
  }, []);

  function triggerCelebration() {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  }

  async function handleGenerate(formData) {
    setIsGenerating(true);
    try {
      const generated = await generateProfileApi(formData);
      
      // Save to LocalStorage
      const updated = saveProfileToStorage(generated);
      setSavedProfiles(updated);
      setActiveProfile(generated);

      setIsGenerating(false);
      triggerCelebration();

      setToast({
        type: 'success',
        message: 'Career Profile generated successfully!'
      });

      // Redirect to My Profile
      setActiveTab('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setIsGenerating(false);
      console.error('Generation failed:', err);
      setToast({
        type: 'error',
        message: err.message || 'Generation failed'
      });
    }
  }

  async function handleRegenerate() {
    if (!activeProfile) return;
    setIsRegenerating(true);

    try {
      const refreshed = await regenerateProfileApi(activeProfile);
      
      const updated = saveProfileToStorage(refreshed);
      setSavedProfiles(updated);
      setActiveProfile(refreshed);

      setIsRegenerating(false);
      triggerCelebration();

      setToast({
        type: 'success',
        message: 'Career Profile regenerated and updated!'
      });
    } catch (err) {
      setIsRegenerating(false);
      console.error('Regeneration error:', err);
      setToast({
        type: 'error',
        message: err.message || 'Regeneration failed'
      });
    }
  }

  function handleSaveProfile(profileToSave) {
    try {
      const updated = saveProfileToStorage(profileToSave);
      setSavedProfiles(updated);
      setToast({
        type: 'success',
        message: 'Profile saved to browser LocalStorage!'
      });
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Failed to save profile'
      });
    }
  }

  function handleSelectProfile(p) {
    setActiveProfile(p);
    setActiveProfileInStorage(p);
    setToast({
      type: 'info',
      message: `Active profile: ${p.student_profile?.fullName}`
    });
  }

  function handleDeleteProfile(id) {
    try {
      const { updatedProfiles, nextActive } = deleteProfileFromStorage(id);
      setSavedProfiles(updatedProfiles);
      setActiveProfile(nextActive);
      setToast({
        type: 'success',
        message: 'Profile removed'
      });
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Failed to remove profile'
      });
    }
  }

  function handleEditDetails() {
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeProfile={activeProfile}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeProfile={activeProfile}
          onToggleMobileMenu={() => setIsMobileOpen(prev => !prev)}
        />

        <main className="page-body">
          {activeTab === 'dashboard' && (
            <Dashboard
              activeProfile={activeProfile}
              savedProfiles={savedProfiles}
              setActiveTab={setActiveTab}
              onSelectProfile={handleSelectProfile}
              onDeleteProfile={handleDeleteProfile}
            />
          )}

          {activeTab === 'create' && (
            <CreateProfile
              onSubmit={handleGenerate}
              isGenerating={isGenerating}
              initialData={activeProfile}
            />
          )}

          {activeTab === 'profile' && (
            <MyProfile
              profile={activeProfile}
              onEditDetails={handleEditDetails}
              onRegenerate={handleRegenerate}
              onSaveProfile={handleSaveProfile}
              onShowToast={setToast}
              setActiveTab={setActiveTab}
              isRegenerating={isRegenerating}
            />
          )}

          {activeTab === 'skill-gap' && (
            <SkillGapAnalysis
              profile={activeProfile}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'learning' && (
            <LearningRecommendations
              profile={activeProfile}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'interview' && (
            <InterviewPreparation
              profile={activeProfile}
              setActiveTab={setActiveTab}
            />
          )}
        </main>
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay isGenerating={isGenerating || isRegenerating} />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
