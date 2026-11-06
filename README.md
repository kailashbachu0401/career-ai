# CareerAI – AI-Based Personalized Career Content Generator

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0%2B-green.svg)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-3.8%20Flash-4285F4.svg)](https://aistudio.google.com/)

An AI-powered full-stack web application designed for college students to generate comprehensive, personalized career profiles based on their academic background, technical skills, and target career goals.

---

## 🌟 Key Features

1. **Personalized Professional Summary**
   - Generates an executive, resume-ready professional summary and LinkedIn bio.
   - Highlights academic background, CGPA, technical skills, and career vision.
   - One-click copy to clipboard with toast notification.

2. **Industry Skill Gap Analysis**
   - Benchmarks student skills against real-world industry requirements for their target role.
   - Categorizes skills into:
     - **Already Possessed** (Verified strengths)
     - **Needs Improvement** (Foundational gaps with practical improvement tips)
     - **Missing Skills** (High-priority missing skills with structured action plans)
   - Visual readiness gauge and percentage match score.

3. **Personalized Learning Recommendations**
   - Prioritizes target technical skills needed to close identified gaps.
   - Recommends vetted courses (Coursera, Udemy, University of Helsinki, fast.ai) with estimated hours and levels.
   - 4-Phase Learning Roadmap (Foundations -> Domain Specialization -> Production Capstone -> Cloud Deployment).
   - Structured 8-week weekly study plan with practical portfolio tasks.

4. **Comprehensive Interview Preparation**
   - **10 Technical Interview Questions**: Tailored to the chosen career field and stack, complete with in-depth answers, key points to mention, and sample code snippets.
   - **5 HR & Behavioral Questions**: Solved using the industry-standard **STAR Framework** (Situation, Task, Action, Result) with recruiter tips.
   - Personalized interview strategies based on student CGPA, degree, and projects.

5. **Multi-Format Consistency & Export**
   - Central student profile maintains 100% consistency across all generated outputs.
   - **Download as PDF**: Generates a multi-page, executive career report using jsPDF.
   - **Browser LocalStorage**: Persistent saving, switching, and deleting of student profiles.
   - **Dual-Engine Architecture**: Seamlessly switches between live **Google Gemini AI (gemini-3.8-flash)** and an **Intelligent Offline Demo Mode** when an API key is not configured.

---

## 🏗️ Technology Stack

- **Frontend**: React 18, Vite 5, Lucide React Icons, jsPDF, Canvas Confetti.
- **Backend**: Python 3, Flask, Flask-CORS, python-dotenv, google-genai SDK.
- **AI Integration**: Google Gemini API (`gemini-3.8-flash`).
- **Storage**: Browser LocalStorage.
- **Styling**: Modern responsive CSS design system (Clean white and light-blue theme).

---

## 📁 Project Structure

```
career-ai/
├── backend/
│   ├── app.py                 # Flask REST API server (Endpoints: /api/generate-profile, /api/health, /api/regenerate-profile)
│   ├── demo_generator.py      # Intelligent fallback & demo engine for offline presentation
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example           # Environment template
│   └── .env                   # Local environment file
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx          # Modern sidebar navigation & mode indicator
│   │   │   ├── Header.jsx           # Top header with actions & API status
│   │   │   ├── LoadingOverlay.jsx   # Animated 4-step generation overlay
│   │   │   ├── Toast.jsx            # Toast notifications (copy, save, errors)
│   │   │   └── ApiKeyModal.jsx      # Gemini API key instructions modal
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx               # Student dashboard with readiness metrics
│   │   │   ├── CreateProfile.jsx           # Student input form with sample pre-fill
│   │   │   ├── MyProfile.jsx               # Executive profile view & action buttons
│   │   │   ├── SkillGapAnalysis.jsx        # 3-tier gap report & match percentage
│   │   │   ├── LearningRecommendations.jsx # Courses, resources & 8-week plan
│   │   │   └── InterviewPreparation.jsx    # 10 Tech Qs + 5 HR STAR Qs
│   │   ├── services/
│   │   │   └── api.js               # REST client & LocalStorage helpers
│   │   ├── utils/
│   │   │   └── pdfGenerator.js      # jsPDF report generation
│   │   ├── App.jsx                  # Main application state & routing
│   │   ├── main.jsx                 # React root entry
│   │   └── index.css                # Global white & light-blue design system
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

---

## 🚀 Quick Start Guide

### Step 1: Clone or Navigate to the Project

```bash
git clone https://github.com/kailashbachu0401/career-ai.git
cd career-ai
```

---

### Step 2: Start the Backend (Flask)

1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Activate the Python virtual environment:
   ```bash
   source venv/bin/activate
   ```
3. Run the Flask application:
   ```bash
   python3 app.py
   ```
   The backend will start on **`http://localhost:5001`**.

---

### Step 3: Start the Frontend (React + Vite)

1. Open a second terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and visit: **`http://localhost:5173`**.

---

## 🔑 Configuring Google Gemini API Key

The application works out-of-the-box in **Demo Mode** without requiring an API key.

To activate live Google Gemini AI generation:

1. Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Open `backend/.env` and insert your key:
   ```env
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   PORT=5001
   ```
3. Restart the Flask backend:
   ```bash
   python3 app.py
   ```
4. In the web interface, the mode badge in the sidebar will immediately update to **"AI Engine (Gemini 3.8)"**.

---

## 🧪 Testing and Feature Verification

| Feature | How to Test | Expected Result |
| :--- | :--- | :--- |
| **Pre-fill Sample Data** | On "Create Career Profile", click any sample button (e.g., "Full Stack Web Developer"). | All form fields populate with complete realistic student data. |
| **Profile Generation** | Click "Generate My Career Profile". | 4-step loading overlay displays, confetti triggers, and redirects to "My Career Profile". |
| **Copy Summary** | Click "Copy Summary" in My Career Profile. | Summary copied to clipboard; green toast notification confirms. |
| **Download PDF** | Click "Download as PDF" in My Career Profile. | Executive multi-page PDF generates and downloads automatically. |
| **Skill Gap Analysis** | Navigate to "Skill Gap Analysis". | View match score, filter by Possessed, Needs Improvement, or Missing skills. |
| **Learning Roadmap** | Navigate to "Learning Recommendations". | View vetted courses, 4 roadmap phases, and 8-week weekly study plan. |
| **Interview Prep** | Navigate to "Interview Preparation". | 10 Technical and 5 HR questions with expandable answers and STAR framework. |
| **Regenerate Profile** | Click "Regenerate Content" in My Career Profile. | Backend re-analyzes student data and updates all sections consistently. |
| **LocalStorage Persistence** | Refresh the browser or check Dashboard. | Saved profile loads automatically from LocalStorage. |

---

## 👥 Authors & Academic Attribution

- **Author / Developer**: Mokshitha Bachu ([@MokshithaBachu](https://github.com/MokshithaBachu))
- **Email**: `bsmokshi44@gmail.com`
- **Project**: M1-P1 AI-Based Personalized Career Content Generator
- **System**: CareerAI
- **License**: MIT
