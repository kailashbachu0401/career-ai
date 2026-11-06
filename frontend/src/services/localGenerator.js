/**
 * Local CareerAI Profile Generator
 * Ensures 100% reliable generation even if network or backend server restarts.
 */

const ROLE_BENCHMARKS = {
  "Full Stack Developer": {
    required_skills: ["HTML5/CSS3", "JavaScript (ES6+)", "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "RESTful APIs", "Git/GitHub", "Docker", "CI/CD Basics", "Unit Testing"],
    recommended_courses: [
      { title: "Full Stack Open (Modern Web Development)", platform: "University of Helsinki", duration: "80 Hours", level: "Intermediate", link: "https://fullstackopen.com/" },
      { title: "The Complete Web Development Bootcamp", platform: "Udemy", duration: "65 Hours", level: "Beginner to Intermediate", link: "https://udemy.com" },
      { title: "Node.js, Express, MongoDB & More Bootcamp", platform: "Coursera / Udemy", duration: "42 Hours", level: "Intermediate", link: "https://coursera.org" }
    ],
    tech_questions: [
      {
        id: 1,
        question: "Explain the Virtual DOM in React and how the reconciliation diffing algorithm works.",
        category: "React.js Architecture",
        difficulty: "Medium",
        detailed_answer: "The Virtual DOM is an in-memory lightweight representation of the actual DOM. When state changes, React creates a new VDOM tree and diffs it with the previous one (reconciliation). It calculates the minimal batch of mutations and applies them to the real browser DOM, minimizing expensive layout recalculations and repaints.",
        key_points_to_mention: ["Diffing algorithm O(n) heuristics", "Keys prop importance in list rendering", "Batching state updates in React 18+"],
        sample_code_or_example: "// React Reconciliation\nconst element = <h1>Hello, {name}</h1>;\n// React diffs element trees and patches only changed text nodes."
      },
      {
        id: 2,
        question: "What is the event loop in Node.js, and how does it process asynchronous tasks?",
        category: "Backend Architecture",
        difficulty: "Medium",
        detailed_answer: "Node.js uses a single-threaded event-driven architecture powered by libuv. The event loop consists of phases: Timers (setTimeout/setInterval), Pending Callbacks, Poll (I/O events), Check (setImmediate), and Close callbacks. Microtasks (process.nextTick and Promise callbacks) execute immediately between phase transitions.",
        key_points_to_mention: ["Call stack vs callback queue", "Microtask queue priority", "Non-blocking I/O with libuv"],
        sample_code_or_example: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\n// Output: 1, 3, 2"
      },
      {
        id: 3,
        question: "Compare SQL (PostgreSQL) and NoSQL (MongoDB). When would you choose which?",
        category: "Databases",
        difficulty: "Easy",
        detailed_answer: "SQL databases are relational, table-based, and enforce ACID compliance with structured schemas, making them ideal for complex joins, financial transactions, and relational data. NoSQL databases like MongoDB are document-based, horizontally scalable, and schema-flexible, ideal for rapid iterations, unstructured data, and high-velocity reads/writes.",
        key_points_to_mention: ["ACID vs BASE consistency", "Normalized schema vs embedded documents", "Horizontal vs vertical scalability"],
        sample_code_or_example: "// SQL: Strict schema with foreign keys\n// NoSQL: JSON-like documents with dynamic fields"
      },
      {
        id: 4,
        question: "What are RESTful API best practices regarding HTTP methods, status codes, and idempotency?",
        category: "API Design",
        difficulty: "Medium",
        detailed_answer: "REST uses standard HTTP verbs: GET (read, idempotent), POST (create, non-idempotent), PUT (replace, idempotent), PATCH (partial update), DELETE (remove, idempotent). Proper status codes include 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Internal Error). Endpoints should use nouns for resources.",
        key_points_to_mention: ["Stateless request handling", "Idempotence definitions", "Consistent JSON error payloads"],
        sample_code_or_example: "GET /api/v1/students/123\nPOST /api/v1/students"
      },
      {
        id: 5,
        question: "How do you handle JWT authentication and secure session management in a full-stack application?",
        category: "Security",
        difficulty: "Hard",
        detailed_answer: "JWTs consist of Header, Payload, and Signature. Store access tokens in short-lived memory or httpOnly SameSite secure cookies to prevent XSS. Use refresh tokens with token rotation stored in a database/Redis to securely grant new access tokens without forcing re-login.",
        key_points_to_mention: ["httpOnly cookie vs localStorage XSS risks", "Token expiration and refresh flow", "CSRF protection strategies"],
        sample_code_or_example: "// Set secure httpOnly cookie on response\nres.cookie('token', jwt, { httpOnly: true, secure: true, sameSite: 'strict' });"
      },
      {
        id: 6,
        question: "Explain CSS Flexbox vs CSS Grid and when to apply each in modern responsive layouts.",
        category: "Frontend CSS",
        difficulty: "Easy",
        detailed_answer: "Flexbox is one-dimensional (handles content along either a row or column), ideal for component internals like navbars, buttons, and aligning elements. CSS Grid is two-dimensional (handles rows and columns simultaneously), best for macroscopic page layout skeletons and responsive dashboards.",
        key_points_to_mention: ["1D vs 2D layout paradigms", "gap, justify-content, align-items", "auto-fit vs auto-fill in Grid"],
        sample_code_or_example: ".container { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }"
      },
      {
        id: 7,
        question: "What is state management in React, and how does Context API compare to Zustand or Redux?",
        category: "Frontend Architecture",
        difficulty: "Medium",
        detailed_answer: "Local state (useState) handles isolated component state. Context API passes state down the component tree without prop drilling, but can trigger unnecessary re-renders across all consumers on update. External stores like Zustand or Redux provide fine-grained selectors, middleware, and devtools for scalable global state.",
        key_points_to_mention: ["Prop drilling elimination", "Selective re-renders with selectors", "Zustand lightness vs Redux boilerplate"],
        sample_code_or_example: "const useStore = create((set) => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }));"
      },
      {
        id: 8,
        question: "How does indexing work in relational databases, and what are the trade-offs of B-Trees?",
        category: "Databases",
        difficulty: "Hard",
        detailed_answer: "B-Tree indexes create balanced search trees on indexed columns, reducing lookup time complexity from O(N) full table scans to O(log N). Trade-offs: Indexes consume additional disk space and slow down write operations (INSERT, UPDATE, DELETE) because the index tree must be rebalanced upon every write.",
        key_points_to_mention: ["B-Tree vs Hash index", "Composite index column ordering", "Write amplification overhead"],
        sample_code_or_example: "CREATE INDEX idx_user_email ON users(email);"
      },
      {
        id: 9,
        question: "Explain Middleware in Express.js and write a simple error-handling middleware.",
        category: "Backend Frameworks",
        difficulty: "Easy",
        detailed_answer: "Middleware functions have access to the req, res, and next functions. They execute sequentially in the request-response pipeline. Error-handling middleware has four arguments: (err, req, res, next). If called via next(err), Express skips remaining normal handlers and executes the error handler.",
        key_points_to_mention: ["req, res, next flow", "Four-argument error signature", "Common uses: auth, logging, body parsing"],
        sample_code_or_example: "app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: err.message });\n});"
      },
      {
        id: 10,
        question: "What is CI/CD, and how would you automate testing and deployment with GitHub Actions?",
        category: "DevOps",
        difficulty: "Medium",
        detailed_answer: "CI (Continuous Integration) automatically builds and tests code on every pull request to catch regressions early. CD (Continuous Deployment) deploys passing builds to staging or production automatically. In GitHub Actions, YAML workflows define runners, matrix tests, and secrets for zero-downtime deployment.",
        key_points_to_mention: ["Workflow triggers (push, PR)", "Automated linting and test suites", "Containerization deployment pipelines"],
        sample_code_or_example: "on: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm test"
      }
    ]
  },
  "AI / Machine Learning Engineer": {
    required_skills: ["Python", "PyTorch or TensorFlow", "Scikit-Learn", "NumPy & Pandas", "Mathematics & Linear Algebra", "Data Preprocessing", "Deep Learning Architectures (CNN/Transformers)", "Model Evaluation Metrics", "MLOps Basics (MLflow/Docker)", "Prompt Engineering & LLMs"],
    recommended_courses: [
      { title: "Machine Learning Specialization by Andrew Ng", platform: "DeepLearning.AI / Coursera", duration: "75 Hours", level: "Beginner to Intermediate", link: "https://coursera.org" },
      { title: "Deep Learning Specialization", platform: "DeepLearning.AI / Coursera", duration: "90 Hours", level: "Intermediate", link: "https://coursera.org" },
      { title: "Practical Deep Learning for Coders", platform: "fast.ai", duration: "60 Hours", level: "Intermediate to Advanced", link: "https://course.fast.ai" }
    ],
    tech_questions: [
      {
        id: 1,
        question: "Explain the difference between Overfitting and Underfitting, and how to detect and mitigate both.",
        category: "ML Fundamentals",
        difficulty: "Easy",
        detailed_answer: "Underfitting occurs when a model is too simplistic to capture underlying data patterns (high bias). Overfitting happens when a model learns training noise and fails to generalize (high variance). Mitigation: For overfitting, use L1/L2 regularization, dropout, data augmentation, early stopping, or cross-validation. For underfitting, increase model capacity, add features, or decrease regularization.",
        key_points_to_mention: ["Bias-variance tradeoff", "L1 Lasso vs L2 Ridge penalties", "K-fold cross validation"],
        sample_code_or_example: "// Dropout in PyTorch:\nself.dropout = nn.Dropout(p=0.3)"
      },
      {
        id: 2,
        question: "How does the Transformer attention mechanism (Scaled Dot-Product Attention) work mathematically?",
        category: "Deep Learning",
        difficulty: "Hard",
        detailed_answer: "Attention calculates softmax((Q * K^T) / sqrt(d_k)) * V. Query, Key, and Value matrices are linear projections of input embeddings. Scaling by sqrt(d_k) prevents vanishing gradients for large dimensions. Softmax computes attention weights representing how much focus each token should place on every other token.",
        key_points_to_mention: ["Query, Key, Value intuition", "Softmax normalization role", "Multi-Head Attention parallel subspaces"],
        sample_code_or_example: "Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V"
      },
      {
        id: 3,
        question: "Compare Gradient Descent, Stochastic Gradient Descent (SGD), and Adam optimizer.",
        category: "Optimization",
        difficulty: "Medium",
        detailed_answer: "Batch Gradient Descent computes gradients over the whole dataset (slow, smooth). SGD computes gradients using one sample at a time (noisy, escapes local minima). Adam combines AdaGrad (adaptive learning rates per parameter) and RMSProp (exponential moving average of squared gradients) with momentum for robust convergence.",
        key_points_to_mention: ["Learning rate tuning", "Momentum and velocity tracking", "Memory overhead of adaptive optimizers"],
        sample_code_or_example: "optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)"
      },
      {
        id: 4,
        question: "What is the vanishing/exploding gradient problem in deep networks and how is it addressed?",
        category: "Neural Networks",
        difficulty: "Medium",
        detailed_answer: "During backpropagation, gradients calculated by the chain rule can shrink exponentially towards zero (vanishing) or grow exponentially towards infinity (exploding) in deep layers. Solutions include ReLU/GeLU activation functions instead of sigmoid/tanh, Batch Normalization, Layer Normalization, Residual Connections (ResNet skip connections), and Gradient Clipping.",
        key_points_to_mention: ["Chain rule multiplicative effects", "Skip/residual connections", "Weight initialization schemes"],
        sample_code_or_example: "torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)"
      },
      {
        id: 5,
        question: "How do Precision, Recall, F1-Score, and ROC-AUC differ, especially on imbalanced datasets?",
        category: "Model Evaluation",
        difficulty: "Easy",
        detailed_answer: "Accuracy is misleading on imbalanced datasets. Precision measures true positives among predicted positives (minimizes false alarms). Recall measures true positives among actual positives (minimizes missed cases). F1-score is their harmonic mean. ROC-AUC evaluates tradeoff across all classification thresholds.",
        key_points_to_mention: ["Confusion matrix components", "Harmonic mean penalty for extreme values", "Precision-Recall curve for severe imbalance"],
        sample_code_or_example: "from sklearn.metrics import classification_report\nprint(classification_report(y_true, y_pred))"
      },
      {
        id: 6,
        question: "Explain the difference between Supervised, Unsupervised, and Self-Supervised Learning.",
        category: "Core AI",
        difficulty: "Easy",
        detailed_answer: "Supervised learning trains on labeled input-output pairs (classification, regression). Unsupervised finds hidden structures in unlabeled data (clustering, PCA). Self-supervised generates labels automatically from raw data (e.g. masked language modeling in BERT or predicting next token in GPT).",
        key_points_to_mention: ["Label requirement comparison", "Masked autoencoders & contrastive learning", "Clustering vs generative modeling"],
        sample_code_or_example: "// Masked token prediction: 'The [MASK] sat on the mat' -> 'cat'"
      },
      {
        id: 7,
        question: "What is the role of Vector Databases and Embeddings in Retrieval-Augmented Generation (RAG)?",
        category: "GenAI & LLMs",
        difficulty: "Medium",
        detailed_answer: "Embedding models convert text chunks into dense high-dimensional vectors capturing semantic meaning. Vector databases (e.g. Chroma, Pinecone, FAISS) index these embeddings using Approximate Nearest Neighbor (ANN) search like HNSW. During RAG, user query embeddings retrieve the most relevant context documents to ground LLM responses.",
        key_points_to_mention: ["Cosine similarity vs Euclidean distance", "HNSW / IVFFlat indexing algorithms", "Chunking strategies and token limits"],
        sample_code_or_example: "query_embedding = embed(query)\ncontext = vector_db.similarity_search(query_embedding, top_k=3)"
      },
      {
        id: 8,
        question: "What are the key differences between Fine-Tuning, LoRA, and In-Context Learning (Prompting)?",
        category: "LLM Adaptation",
        difficulty: "Hard",
        detailed_answer: "Prompting requires no weight updates but is constrained by context window and prompt drift. Full Fine-Tuning updates all model parameters (resource-intensive, prone to catastrophic forgetting). LoRA (Low-Rank Adaptation) freezes base weights and injects low-rank trainable decomposition matrices (A and B), achieving comparable performance with <1% trainable parameters.",
        key_points_to_mention: ["Rank decomposition intuition", "GPU VRAM requirements comparison", "Serving multiple adapted adapters from one base model"],
        sample_code_or_example: "// LoRA adds Delta W = B * A to frozen weight W"
      },
      {
        id: 9,
        question: "How do you handle missing values, categorical encoding, and feature scaling in a data pipeline?",
        category: "Data Preprocessing",
        difficulty: "Easy",
        detailed_answer: "Missing values can be imputed using median/mean (for numerical with normal distribution) or KNN/iterative imputer. Categorical features are encoded with One-Hot (low cardinality) or Target/Ordinal encoding. Feature scaling (StandardScaler or MinMaxScaler) prevents features with large magnitudes from dominating distance-based algorithms.",
        key_points_to_mention: ["One-Hot vs Target Encoding risks", "StandardScaler vs RobustScaler for outliers", "Fitting scalers only on training split"],
        sample_code_or_example: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler"
      },
      {
        id: 10,
        question: "Explain the concept of MLOps and what tools are used for tracking experiments and deployment.",
        category: "MLOps",
        difficulty: "Medium",
        detailed_answer: "MLOps brings DevOps practices to ML workflows: data versioning (DVC), experiment tracking and model registry (MLflow, Weights & Biases), pipeline orchestration (Airflow, Kubeflow), and containerized inference serving (Docker, FastAPI, Triton) with continuous monitoring for data and concept drift.",
        key_points_to_mention: ["Data drift vs concept drift", "Reproducibility in model training", "Automated deployment and monitoring"],
        sample_code_or_example: "mlflow.log_param('learning_rate', 0.01)\nmlflow.log_metric('accuracy', 0.94)"
      }
    ]
  }
};

const DEFAULT_HR_QUESTIONS = [
  {
    id: 1,
    question: "Tell me about yourself and why you are interested in this career path.",
    scenario_focus: "Professional Background & Career Motivation",
    star_framework_answer: "Situation: Throughout my academic journey in {degree} at {college}, I developed a strong interest in solving real-world challenges through technology.\nTask: I focused my efforts on mastering {skills_preview} and set a clear goal of becoming a {preferred_career}.\nAction: I applied theoretical principles to practical projects, worked through modern development practices, and actively expanded my technical expertise.\nResult: This disciplined approach gave me hands-on confidence and solidified my drive to join an innovative engineering team where I can contribute immediately.",
    key_tips: "Keep it under 2 minutes. Connect your academic background, core skills, and long-term career ambition into one cohesive narrative."
  },
  {
    id: 2,
    question: "Describe a difficult technical obstacle you encountered in a project and how you resolved it.",
    scenario_focus: "Problem Solving & Resilience",
    star_framework_answer: "Situation: While building a major project involving {skills_preview}, our team encountered a critical performance bottleneck that caused significant latency.\nTask: As the person responsible for the core logic, I needed to identify the root cause without delaying our delivery timeline.\nAction: I methodically profiled the execution flow, isolated the inefficient operations, consulted official documentation, and refactored the architecture to use optimized patterns.\nResult: The refactoring reduced latency by over 60%, improved application stability, and taught me the immense value of structured debugging under pressure.",
    key_tips: "Demonstrate systematic thinking rather than trial-and-error. Emphasize your thought process, research, and measurable outcome."
  },
  {
    id: 3,
    question: "How do you prioritize deadlines and manage your time when juggling multiple academic and project deliverables?",
    scenario_focus: "Time Management & Prioritization",
    star_framework_answer: "Situation: During my {academic_year} year, I had to manage rigorous coursework, prepare for competitive placement drives, and lead a technical team project simultaneously.\nTask: I needed to ensure all milestones were met without compromising the quality of our code or my academic GPA ({cgpa}).\nAction: I implemented the Eisenhower matrix to categorize tasks by urgency and importance, broke complex milestones into daily actionable sprints, and used GitHub Projects for progress tracking.\nResult: I successfully delivered our project two days ahead of schedule, maintained my academic standing, and developed reliable personal sprint habits.",
    key_tips: "Give specific organizational methodologies (Eisenhower matrix, Agile sprints, calendar time-blocking) rather than vague claims."
  },
  {
    id: 4,
    question: "Tell me about a time you had a disagreement with a team member. How did you handle it?",
    scenario_focus: "Team Collaboration & Conflict Resolution",
    star_framework_answer: "Situation: During a collaborative hackathon project, a team member and I had conflicting viewpoints regarding whether to use a familiar framework or adopt a newer architecture.\nTask: We had limited time and needed to reach consensus quickly without creating interpersonal friction.\nAction: I scheduled a brief whiteboard session where we objectively evaluated both approaches against our criteria: delivery speed, scalability, and existing team familiarity.\nResult: We chose a balanced hybrid solution that met our immediate deadline while accommodating future expansion. The project won an honorable mention, and our team synergy grew stronger.",
    key_tips: "Focus on mutual respect, data-driven decisions, and keeping the shared objective first. Avoid speaking negatively about teammates."
  },
  {
    id: 5,
    question: "Where do you see yourself in 3 to 5 years, and how does this entry-level opportunity align with your vision?",
    scenario_focus: "Career Vision & Growth Mindset",
    star_framework_answer: "Situation: As an aspiring {preferred_career}, my immediate priority is to immerse myself in a production engineering environment and learn from seasoned mentors.\nTask: My goal is to build deep domain expertise, write robust production-grade code, and understand scalable system design.\nAction: Over the next 3 to 5 years, I intend to take increasing ownership of core services, mentor incoming junior developers, and contribute to architectural decisions.\nResult: This role is the ideal foundation because it provides the technical challenges and growth culture that directly support my career goal: {career_goal}.",
    key_tips: "Show commitment to learning and longevity. Companies want candidates who are eager to grow internally and take ownership."
  }
];

export function generateLocalProfile(studentData) {
  const fullName = (studentData.fullName || 'Student').trim();
  const college = (studentData.collegeName || 'Engineering Institute').trim();
  const degree = (studentData.degree || 'B.Tech').trim();
  const branch = (studentData.branch || 'Computer Science and Engineering').trim();
  const academicYear = (studentData.academicYear || 'Final Year').trim();
  const cgpa = (studentData.cgpa || '8.5').trim();

  // Normalize skill arrays
  const parseList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val.map(s => String(s).trim()).filter(Boolean);
    return String(val).split(',').map(s => s.trim()).filter(Boolean);
  };

  const techSkills = parseList(studentData.technicalSkills);
  const progLanguages = parseList(studentData.programmingLanguages);
  const softSkills = parseList(studentData.softSkills);
  const interests = parseList(studentData.areasOfInterest);
  const preferredCareer = (studentData.preferredCareer || 'Full Stack Developer').trim();
  const careerGoal = (studentData.careerGoal || `Excel as a high-performing ${preferredCareer} in a leading technology company.`).trim();
  const experienceLevel = (studentData.experienceLevel || 'Intermediate').trim();

  // Select matching benchmark
  let benchmarkKey = 'Full Stack Developer';
  if (preferredCareer.toLowerCase().includes('ai') || preferredCareer.toLowerCase().includes('machine learning') || preferredCareer.toLowerCase().includes('data')) {
    benchmarkKey = 'AI / Machine Learning Engineer';
  }
  const benchmark = ROLE_BENCHMARKS[benchmarkKey] || ROLE_BENCHMARKS['Full Stack Developer'];

  const allUserSkills = new Set([...techSkills, ...progLanguages].map(s => s.toLowerCase()));
  const possessed = [];
  const needsImprovement = [];
  const missing = [];

  benchmark.required_skills.forEach(req => {
    const cleanReq = req.split('/')[0].split('(')[0].trim().toLowerCase();
    let matched = false;
    for (const u of allUserSkills) {
      if (cleanReq.includes(u) || u.includes(cleanReq)) {
        matched = true;
        break;
      }
    }

    if (matched) {
      possessed.push({
        skill: req,
        proficiency: experienceLevel === 'Beginner' ? 'Intermediate' : 'Proficient',
        relevance: `Directly utilized in ${preferredCareer} day-to-day engineering workflows.`
      });
    } else if (req.toLowerCase().includes('git') || req.toLowerCase().includes('rest') || req.toLowerCase().includes('sql') || req.toLowerCase().includes('testing')) {
      needsImprovement.push({
        skill: req,
        current_level: 'Foundational / Partial',
        target_level: 'Production Competency',
        gap_reason: `Essential baseline requirement for ${preferredCareer} roles; needs deeper project validation.`,
        improvement_tip: `Build a dedicated mini-project and implement test cases focusing specifically on ${req}.`
      });
    } else {
      missing.push({
        skill: req,
        importance: req.toLowerCase().includes('docker') || req.toLowerCase().includes('pytorch') ? 'Critical' : 'High',
        why_needed: `Crucial for modern ${preferredCareer} architecture and team collaboration.`,
        action_plan: `Dedicate 10-15 hours to follow practical hands-on labs and implement ${req} in your portfolio projects.`
      });
    }
  });

  if (possessed.length === 0) {
    const fallbackSkills = techSkills.length > 0 ? techSkills.slice(0, 3) : ['Core Programming', 'Data Structures'];
    fallbackSkills.forEach(sp => {
      possessed.push({
        skill: sp,
        proficiency: 'Intermediate',
        relevance: `Foundational programming pillar for ${preferredCareer}.`
      });
    });
  }

  if (needsImprovement.length === 0) {
    needsImprovement.push({
      skill: progLanguages[0] || 'System Optimization & Algorithms',
      current_level: 'Intermediate',
      target_level: 'Advanced System Efficiency',
      gap_reason: 'Writing performant code requires deep algorithmic insight and runtime profiling.',
      improvement_tip: 'Practice solving medium LeetCode/HackerRank problems and study time-space complexity tradeoffs.'
    });
  }

  if (missing.length === 0) {
    missing.push({
      skill: 'Cloud Deployment & Containerization',
      importance: 'High',
      why_needed: 'Modern teams require proficiency shipping applications in containerized cloud environments.',
      action_plan: 'Deploy your primary project to AWS, GCP, or Vercel with automated CI/CD pipelines.'
    });
  }

  const matchPercentage = Math.max(35, Math.min(92, Math.round((possessed.length / Math.max(1, benchmark.required_skills.length)) * 100 + 15)));

  const skillsPreview = [...techSkills.slice(0, 4), ...progLanguages.slice(0, 2)].join(', ') || 'modern software engineering';
  const interestsPreview = interests.slice(0, 3).join(', ') || preferredCareer;
  const softPreview = softSkills.slice(0, 3).join(', ') || 'problem-solving, team collaboration, and analytical thinking';

  const short_summary = `Dynamic and detail-oriented ${degree} candidate in ${branch} at ${college} (CGPA: ${cgpa}) with proven competency in ${skillsPreview}. Aspiring ${preferredCareer} equipped with strong analytical capabilities and a results-driven mindset aimed at delivering scalable, robust technology solutions.`;

  const full_summary = `Goal-oriented and technically proficient ${degree} in ${branch} student from ${college} maintaining a cumulative academic record of ${cgpa} CGPA. Demonstrates solid practical grounding in ${skillsPreview}, complemented by an active academic and project focus in ${interestsPreview}. Possesses strong interpersonal attributes including ${softPreview}, fostering effective cross-functional collaboration and resilient troubleshooting. Committed to pursuing a career as a ${preferredCareer}, with the overarching goal to ${careerGoal.toLowerCase().replace(/\.$/, '')}. Eager to leverage rigorous problem-solving skills, modern development practices, and rapid learning ability to create tangible value in a high-growth technology organization.`;

  const suggested_headline = `Aspiring ${preferredCareer} | ${degree} in ${branch} @ ${college} | Specializing in ${skillsPreview.split(',')[0] || 'Software Engineering'}`;

  const key_highlights = [
    `Strong academic foundation in ${branch} from ${college} with a CGPA of ${cgpa}.`,
    `Hands-on technical proficiency across ${skillsPreview}.`,
    `Demonstrated dedication to career objective: ${careerGoal}.`,
    `Blend of technical competency with refined soft skills (${softPreview}).`
  ];

  const learning_roadmap = [
    {
      phase: "Phase 1: Solidifying Foundations & Tooling",
      duration: "Weeks 1 - 2",
      focus: "Master core syntax, clean code conventions, and advanced version control.",
      milestones: [
        `Refactor existing codebases using idiomatic ${progLanguages[0] || 'modern language'} patterns.`,
        "Implement strict Git branching workflows, pull requests, and semantic versioning.",
        "Deep-dive into fundamental data structures and algorithmic complexity."
      ]
    },
    {
      phase: "Phase 2: Core Domain Specialization",
      duration: "Weeks 3 - 5",
      focus: `Address primary skill gaps identified in ${preferredCareer} engineering.`,
      milestones: [
        `Complete hands-on modules in ${missing[0]?.skill || 'Core Architecture'}.`,
        "Build a modular, well-documented component addressing real-world edge cases.",
        "Implement automated unit and integration tests achieving >80% test coverage."
      ]
    },
    {
      phase: "Phase 3: Production Capstone & Architecture",
      duration: "Weeks 6 - 7",
      focus: "Develop an industry-ready portfolio project featuring modern architectural patterns.",
      milestones: [
        `Design and engineer a full capstone application aligned with ${preferredCareer}.`,
        "Incorporate authentication, caching, error logging, and resilient API contracts.",
        "Prepare comprehensive architectural documentation and an interactive demo."
      ]
    },
    {
      phase: "Phase 4: Cloud Deployment & Interview Readiness",
      duration: "Week 8+",
      focus: "Containerize, deploy to the cloud, and practice mock technical rounds.",
      milestones: [
        "Containerize application with Docker and set up automated CI/CD deployment.",
        "Publish project on GitHub with an executive README and live deployment URL.",
        "Conduct mock interviews covering technical deep-dives and STAR behavioral questions."
      ]
    }
  ];

  const weekly_learning_plan = [
    { week: "Week 1", theme: "Foundation & Clean Architecture", topics: "Clean coding standards, Git branch strategy, data structure optimizations", practical_task: "Refactor a past project with linting, typing, and modular directory layout", hours: "14 hrs" },
    { week: "Week 2", theme: "Deep-Dive into Core Stack", topics: `Asynchronous programming, memory handling, and concurrency in ${progLanguages[0] || 'primary language'}`, practical_task: "Build a multi-threaded or async task processor with error recovery", hours: "15 hrs" },
    { week: "Week 3", theme: "Targeted Skill Gap Bridge", topics: `In-depth study of ${missing[0]?.skill || 'primary target framework'}`, practical_task: "Complete 3 guided coding exercises implementing the core library", hours: "16 hrs" },
    { week: "Week 4", theme: "Architecture & Data Layer", topics: "Database normalization, indexing, query optimization, and REST API design", practical_task: "Design a relational schema with foreign key constraints and indexed queries", hours: "16 hrs" },
    { week: "Week 5", theme: "Security, Testing & Quality", topics: "Unit testing frameworks, Mocking, JWT authorization, and input sanitization", practical_task: "Write end-to-end integration tests and benchmark endpoint response times", hours: "15 hrs" },
    { week: "Week 6", theme: "Capstone Project Kickoff", topics: "End-to-end feature planning, component design, and state management", practical_task: "Scaffold the capstone repository and implement user authentication workflows", hours: "18 hrs" },
    { week: "Week 7", theme: "Capstone Feature Completion", topics: "Complex business logic, external API integrations, and responsive UI polish", practical_task: "Finalize core capstone features, polish styling, and add interactive dashboards", hours: "18 hrs" },
    { week: "Week 8", theme: "Deployment, CI/CD & Interview Sprints", topics: "Docker containerization, GitHub Actions, cloud hosting, and mock Q&A", practical_task: "Deploy live capstone, record a 2-minute video walkthrough, and review interview questions", hours: "16 hrs" }
  ];

  const hr_questions = DEFAULT_HR_QUESTIONS.map(item => ({
    id: item.id,
    question: item.question,
    scenario_focus: item.scenario_focus,
    star_framework_answer: item.star_framework_answer
      .replace('{degree}', degree)
      .replace('{college}', college)
      .replace('{skills_preview}', skillsPreview)
      .replace('{preferred_career}', preferredCareer)
      .replace('{academic_year}', academicYear)
      .replace('{cgpa}', cgpa)
      .replace('{career_goal}', careerGoal),
    key_tips: item.key_tips
  }));

  const student_specific_advice = `As a ${academicYear} ${degree} student with a strong ${cgpa} CGPA, your primary advantage in interviews is demonstrating that you bridge academic rigor with modern industry practices. Focus your interview answers on your capstone projects using ${skillsPreview}. Speak with clarity on trade-offs and architectural decisions.`;

  return {
    id: 'prof_' + Date.now(),
    student_profile: {
      fullName,
      email: studentData.email || '',
      collegeName: college,
      degree,
      branch,
      academicYear,
      cgpa,
      technicalSkills: techSkills,
      programmingLanguages: progLanguages,
      softSkills,
      areasOfInterest: interests,
      preferredCareer,
      careerGoal,
      experienceLevel
    },
    professional_summary: {
      short_summary,
      full_summary,
      suggested_headline,
      key_highlights
    },
    skill_gap_analysis: {
      target_role: preferredCareer,
      overall_match_percentage: matchScore,
      readiness_level: matchScore >= 80 ? "Job Ready (Top Tier)" : (matchScore >= 60 ? "Internship & Junior Ready" : "Foundational Stage"),
      possessed_skills: possessed,
      needs_improvement_skills: needsImprovement,
      missing_skills: missing,
      summary_insight: `You possess a solid foundation matching ${matchScore}% of the core requirements for ${preferredCareer}. Prioritizing ${missing[0]?.skill || 'cloud practices'} and refining ${needsImprovement[0]?.skill || 'system optimization'} will elevate your profile to top-quartile industry candidates.`
    },
    learning_recommendations: {
      target_skills: [...missing.slice(0, 3), ...needsImprovement.slice(0, 2)].map(s => s.skill),
      recommended_courses: benchmark.recommended_courses,
      learning_resources: [
        { name: "Official Framework Documentation", type: "Documentation", description: "Prioritize official docs for up-to-date API references and patterns." },
        { name: "LeetCode & HackerRank", type: "Problem Solving", description: "Practice data structures and algorithmic challenges to keep problem solving agile." },
        { name: "System Design Primer", type: "Architecture Guide", description: "Comprehensive primer covering scalability, caching, load balancing, and database design." },
        { name: "FreeCodeCamp & Awesome Lists", type: "Curated Practice", description: "Curated roadmaps, practical code exercises, and open-source project inspirations." }
      ],
      learning_roadmap,
      weekly_learning_plan,
      estimated_total_hours: "120 - 140 Hours (approx. 8 Weeks at 15-18 hours/week)"
    },
    interview_preparation: {
      technical_questions: benchmark.tech_questions,
      hr_questions,
      interview_tips: {
        technical_tips: [
          "Clarify requirements and edge cases before coding.",
          "Think out loud to reveal your structured problem-solving approach.",
          "Proactively discuss Big-O time and space complexity.",
          "Explain architectural trade-offs (e.g. read-heavy vs write-heavy)."
        ],
        behavioral_tips: [
          "Structure every scenario using the STAR framework (Situation, Task, Action, Result).",
          "Quantify impact with concrete metrics wherever possible.",
          "Focus on mutual respect, intellectual humility, and growth.",
          "Prepare thoughtful questions for the interviewer about engineering standards."
        ],
        student_specific_advice
      }
    },
    metadata: {
      generated_at: new Date().toISOString(),
      is_demo_mode: true,
      engine: "CareerAI Dynamic Intelligence Engine",
      version: "1.0.0"
    }
  };
}
