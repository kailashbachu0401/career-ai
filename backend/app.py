import os
import json
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from demo_generator import generate_demo_profile

# Load environment variables
load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("CareerAI")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
PORT = int(os.getenv("PORT", 5001))

# Initialize GenAI Client if key exists
genai_client = None
if GEMINI_API_KEY and GEMINI_API_KEY != "your_api_key_here":
    try:
        from google import genai
        genai_client = genai.Client(api_key=GEMINI_API_KEY)
        logger.info("Google GenAI client initialized successfully.")
    except Exception as e:
        logger.warning(f"Failed to initialize google-genai client: {e}")
        genai_client = None


def build_gemini_prompt(student_data: dict) -> str:
    """Creates a comprehensive, structured prompt for Gemini."""
    return f"""You are CareerAI, an expert senior career counselor, principal engineering hiring manager, and talent strategist.
Generate a complete, personalized, highly consistent career profile for this student:

STUDENT PROFILE DATA:
- Full Name: {student_data.get('fullName')}
- College: {student_data.get('collegeName')}
- Degree / Course: {student_data.get('degree')}
- Branch / Department: {student_data.get('branch')}
- Current Academic Year: {student_data.get('academicYear')}
- CGPA / Percentage: {student_data.get('cgpa')}
- Technical Skills: {', '.join(student_data.get('technicalSkills', []))}
- Programming Languages: {', '.join(student_data.get('programmingLanguages', []))}
- Soft Skills: {', '.join(student_data.get('softSkills', []))}
- Areas of Interest: {', '.join(student_data.get('areasOfInterest', []))}
- Preferred Career Field: {student_data.get('preferredCareer')}
- Career Goal: {student_data.get('careerGoal')}
- Experience Level: {student_data.get('experienceLevel')}

IMPORTANT CONSISTENCY MANDATE:
All 4 sections must remain 100% consistent with each other and grounded in the student's actual background and target career.
- The professional summary must reference their real skills and target career goal.
- The skill gap analysis must benchmark their existing skills directly against standard industry expectations for {student_data.get('preferredCareer')}.
- The learning recommendations and 8-week plan must prioritize closing the EXACT missing/needs-improvement skills identified in the skill gap report.
- The interview preparation questions must be tailored to {student_data.get('preferredCareer')} and their specific stack.

OUTPUT FORMAT:
You MUST respond with valid, parseable JSON only. Do not wrap in markdown ```json or backticks. Return a single raw JSON object matching this exact schema:

{{
  "professional_summary": {{
    "short_summary": "1-2 concise sentences for resume top/LinkedIn bio",
    "full_summary": "Comprehensive 3-4 sentence professional summary highlighting education, skills, academic record, and goal",
    "suggested_headline": "Professional LinkedIn / Resume headline",
    "key_highlights": [
      "Highlight 1",
      "Highlight 2",
      "Highlight 3",
      "Highlight 4"
    ]
  }},
  "skill_gap_analysis": {{
    "target_role": "{student_data.get('preferredCareer')}",
    "overall_match_percentage": 75,
    "readiness_level": "Job Ready | Internship & Junior Ready | Foundational Stage",
    "possessed_skills": [
      {{ "skill": "Skill Name", "proficiency": "Proficient | Intermediate", "relevance": "Why relevant" }}
    ],
    "needs_improvement_skills": [
      {{ "skill": "Skill Name", "current_level": "Level", "target_level": "Target", "gap_reason": "Reason", "improvement_tip": "Practical advice" }}
    ],
    "missing_skills": [
      {{ "skill": "Skill Name", "importance": "Critical | High", "why_needed": "Why required", "action_plan": "How to learn" }}
    ],
    "summary_insight": "Actionable executive insight summarizing the gaps and next steps"
  }},
  "learning_recommendations": {{
    "target_skills": ["Skill1", "Skill2", "Skill3", "Skill4"],
    "recommended_courses": [
      {{ "title": "Course Title", "platform": "Platform", "duration": "Duration", "level": "Level", "link": "https://..." }}
    ],
    "learning_resources": [
      {{ "name": "Resource Name", "type": "Documentation | Book | Practice", "description": "Description" }}
    ],
    "learning_roadmap": [
      {{
        "phase": "Phase 1: Title",
        "duration": "Duration",
        "focus": "Focus description",
        "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"]
      }}
    ],
    "weekly_learning_plan": [
      {{ "week": "Week 1", "theme": "Theme", "topics": "Topics", "practical_task": "Task", "hours": "15 hrs" }}
    ],
    "estimated_total_hours": "Estimated total hours"
  }},
  "interview_preparation": {{
    "technical_questions": [
      {{
        "id": 1,
        "question": "Question text",
        "category": "Category",
        "difficulty": "Easy | Medium | Hard",
        "detailed_answer": "Complete professional answer explaining concepts",
        "key_points_to_mention": ["Point 1", "Point 2", "Point 3"],
        "sample_code_or_example": "Code snippet or example illustration"
      }}
    ],
    "hr_questions": [
      {{
        "id": 1,
        "question": "Behavioral question text",
        "scenario_focus": "Focus area",
        "star_framework_answer": "Situation: ... Task: ... Action: ... Result: ...",
        "key_tips": "Recruiter tip"
      }}
    ],
    "interview_tips": {{
      "technical_tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4"],
      "behavioral_tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4"],
      "student_specific_advice": "Advice tailored to this specific student profile"
    }}
  }}
}}
"""


def call_gemini_api(prompt: str) -> dict:
    """Invokes Gemini API using the google-genai client."""
    global genai_client
    if not genai_client:
        raise ValueError("Gemini API client is not configured.")

    try:
        # Use gemini-3.8-flash per gemini-api-dev guidelines
        response = genai_client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json"
            }
        )
        raw_text = response.text.strip()
        
        # Clean any backticks if model included them
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
            
        return json.loads(raw_text.strip())
    except Exception as e:
        logger.error(f"Gemini API invocation error: {e}")
        # Try fallback model if available
        try:
            logger.info("Attempting fallback call with gemini-2.5-flash...")
            response = genai_client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config={"response_mime_type": "application/json"}
            )
            raw_text = response.text.strip()
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]
            return json.loads(raw_text.strip())
        except Exception as e2:
            logger.error(f"Fallback model also failed: {e2}")
            raise e


@app.route("/api/health", methods=["GET"])
def health_check():
    """Returns system status, active mode (AI or Demo), and model info."""
    api_key_configured = bool(GEMINI_API_KEY and GEMINI_API_KEY != "your_api_key_here")
    return jsonify({
        "status": "online",
        "app": "CareerAI Backend Service",
        "mode": "AI Mode (Gemini 3.8 Flash)" if api_key_configured else "Demo Mode (Realistic Career Intelligence)",
        "is_ai_mode": api_key_configured,
        "has_api_key": api_key_configured,
        "model": "gemini-3.8-flash" if api_key_configured else "CareerAI Intelligent Rule Engine"
    }), 200


def execute_profile_generation(data: dict):
    """Core logic to generate or benchmark a career profile."""
    # Basic field validation
    required_fields = ["fullName", "collegeName", "degree", "branch", "preferredCareer", "careerGoal"]
    missing_fields = [f for f in required_fields if not data.get(f)]
    if missing_fields:
        return jsonify({
            "error": "Validation Error",
            "message": f"Missing required fields: {', '.join(missing_fields)}"
        }), 400

    api_key_configured = bool(GEMINI_API_KEY and GEMINI_API_KEY != "your_api_key_here" and genai_client)

    if api_key_configured:
        try:
            logger.info(f"Generating AI career profile for {data.get('fullName')} using Gemini API...")
            prompt = build_gemini_prompt(data)
            ai_result = call_gemini_api(prompt)

            # Ensure student_profile is bundled
            ai_result["student_profile"] = data
            ai_result["metadata"] = {
                "generated_at": data.get("timestamp") or "now",
                "is_demo_mode": False,
                "engine": "Gemini 3.8 Flash (Google GenAI)",
                "version": "1.0.0"
            }
            return jsonify(ai_result), 200
        except Exception as e:
            logger.warning(f"AI generation failed ({e}), seamlessly activating high-fidelity Demo Mode generator.")
            demo_profile = generate_demo_profile(data)
            demo_profile["metadata"]["fallback_reason"] = str(e)
            demo_profile["metadata"]["is_fallback"] = True
            return jsonify(demo_profile), 200
    else:
        logger.info(f"No GEMINI_API_KEY configured. Generating high-fidelity demo profile for {data.get('fullName')}.")
        demo_profile = generate_demo_profile(data)
        return jsonify(demo_profile), 200


@app.route("/api/generate-profile", methods=["POST"])
def generate_profile():
    """Generates a complete, personalized career profile."""
    data = request.get_json(silent=True) or {}
    return execute_profile_generation(data)


@app.route("/api/regenerate-profile", methods=["POST"])
def regenerate_profile():
    """Regenerates a profile using existing student data."""
    data = request.get_json(silent=True) or {}
    student_data = data.get("student_profile") if "student_profile" in data else data
    
    if not student_data or not isinstance(student_data, dict) or not student_data.get("fullName"):
        return jsonify({
            "error": "Validation Error",
            "message": "Student profile data is required for regeneration."
        }), 400

    return execute_profile_generation(student_data)


@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Resource not found", "path": request.path}), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error", "details": str(e)}), 500


if __name__ == "__main__":
    logger.info(f"Starting CareerAI backend server on http://localhost:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=False)
