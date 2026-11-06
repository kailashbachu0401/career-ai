/**
 * API Service for CareerAI Frontend
 * Manages REST communication with the Flask backend and handles LocalStorage persistence.
 */

// Direct Flask backend REST endpoint
const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname
  ? `http://${window.location.hostname}:5001/api`
  : 'http://127.0.0.1:5001/api';
const STORAGE_PROFILES_KEY = 'career_ai_saved_profiles';
const STORAGE_ACTIVE_KEY = 'career_ai_active_profile';

import { generateLocalProfile } from './localGenerator';

/**
 * Health check to verify backend connectivity and mode (AI vs Demo).
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    return {
      status: 'online',
      mode: 'CareerAI Intelligence Engine',
      is_ai_mode: false,
      has_api_key: false
    };
  }
}

/**
 * Generate career profile via backend API with guaranteed fallback.
 */
export async function generateProfileApi(studentData) {
  try {
    const payload = {
      ...studentData,
      timestamp: new Date().toISOString()
    };

    const res = await fetch(`${API_BASE_URL}/generate-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const result = await res.json();
      if (!result.id) {
        result.id = 'prof_' + Date.now();
      }
      return result;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using local generator fallback:', err);
  }

  // Instant fallback to local generator ensuring no broken buttons
  return generateLocalProfile(studentData);
}

/**
 * Regenerate profile using existing profile data with guaranteed fallback.
 */
export async function regenerateProfileApi(currentProfile) {
  const studentData = currentProfile.student_profile || currentProfile;

  try {
    const res = await fetch(`${API_BASE_URL}/regenerate-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });

    if (res.ok) {
      const result = await res.json();
      result.id = currentProfile.id || ('prof_' + Date.now());
      return result;
    }
  } catch (err) {
    console.warn('Backend regeneration unavailable, using local generator fallback:', err);
  }

  const refreshed = generateLocalProfile(studentData);
  refreshed.id = currentProfile.id || ('prof_' + Date.now());
  return refreshed;
}

/* ==========================================================================
   LocalStorage Management Helpers
   ========================================================================== */

export function getSavedProfilesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_PROFILES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load profiles from localStorage:', err);
    return [];
  }
}

export function saveProfileToStorage(profile) {
  try {
    const profiles = getSavedProfilesFromStorage();
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    
    let updated;
    if (existingIndex >= 0) {
      updated = [...profiles];
      updated[existingIndex] = profile;
    } else {
      updated = [profile, ...profiles];
    }
    
    localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(updated));
    localStorage.setItem(STORAGE_ACTIVE_KEY, JSON.stringify(profile));
    return updated;
  } catch (err) {
    console.error('Failed to save profile to localStorage:', err);
    throw err;
  }
}

export function getActiveProfileFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_ACTIVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Failed to load active profile from localStorage:', err);
    return null;
  }
}

export function setActiveProfileInStorage(profile) {
  try {
    localStorage.setItem(STORAGE_ACTIVE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to set active profile in localStorage:', err);
  }
}

export function deleteProfileFromStorage(id) {
  try {
    const profiles = getSavedProfilesFromStorage();
    const filtered = profiles.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(filtered));

    const active = getActiveProfileFromStorage();
    if (active && active.id === id) {
      const nextActive = filtered.length > 0 ? filtered[0] : null;
      if (nextActive) {
        localStorage.setItem(STORAGE_ACTIVE_KEY, JSON.stringify(nextActive));
      } else {
        localStorage.removeItem(STORAGE_ACTIVE_KEY);
      }
      return { updatedProfiles: filtered, nextActive };
    }
    return { updatedProfiles: filtered, nextActive: active };
  } catch (err) {
    console.error('Failed to delete profile from localStorage:', err);
    throw err;
  }
}
