"""
CareerAI Demo Profile Generator
Generates realistic, personalized, and fully consistent career content
when running in Demo Mode or when the Gemini API key is not configured.
"""
import datetime

# Canonical industry skill databases for top career fields
ROLE_BENCHMARKS = {
    "Full Stack Developer": {
        "required_skills": ["HTML5/CSS3", "JavaScript (ES6+)", "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "RESTful APIs", "Git/GitHub", "Docker", "CI/CD Basics", "Unit Testing"],
        "recommended_courses": [
            {"title": "Full Stack Open (Modern Web Development)", "platform": "University of Helsinki", "duration": "80 Hours", "level": "Intermediate", "link": "https://fullstackopen.com/"},
            {"title": "The Complete 2026 Web Development Bootcamp", "platform": "Udemy", "duration": "65 Hours", "level": "Beginner to Intermediate", "link": "https://udemy.com"},
            {"title": "Node.js, Express, MongoDB & More: The Complete Bootcamp", "platform": "Coursera / Udemy", "duration": "42 Hours", "level": "Intermediate", "link": "https://coursera.org"}
        ],
        "tech_questions": [
            ("Explain the Virtual DOM in React and how the reconciliation diffing algorithm works.", "React.js Architecture", "Medium", "The Virtual DOM is an in-memory lightweight representation of the actual DOM. When state changes, React creates a new VDOM tree and diffs it with the previous one (reconciliation). It calculates the minimal batch of mutations and applies them to the real browser DOM, minimizing expensive layout recalculations and repaints.", ["Diffing algorithm O(n) heuristics", "Keys prop importance in list rendering", "Batching state updates in React 18+"]),
            ("What is the event loop in Node.js, and how does it process asynchronous tasks?", "Backend Architecture", "Medium", "Node.js uses a single-threaded event-driven architecture powered by libuv. The event loop consists of phases: Timers (setTimeout/setInterval), Pending Callbacks, Poll (I/O events), Check (setImmediate), and Close callbacks. Microtasks (process.nextTick and Promise callbacks) execute immediately between phase transitions.", ["Call stack vs callback queue", "Microtask queue priority", "Non-blocking I/O with libuv"]),
            ("Compare SQL (e.g. PostgreSQL) and NoSQL (e.g. MongoDB). When would you choose which?", "Databases", "Easy", "SQL databases are relational, table-based, and enforce ACID compliance with structured schemas, making them ideal for complex queries, financial transactions, and relational data. NoSQL databases like MongoDB are document-based, horizontally scalable, and schema-flexible, ideal for rapid iterations, unstructured data, and high-velocity reads/writes.", ["ACID vs BASE consistency", "Normalized schema vs embedded documents", "Horizontal vs vertical scalability"]),
            ("What are RESTful API best practices regarding HTTP methods, status codes, and idempotency?", "API Design", "Medium", "REST uses standard HTTP verbs: GET (read, idempotent), POST (create, non-idempotent), PUT (replace, idempotent), PATCH (partial update), DELETE (remove, idempotent). Proper status codes include 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Internal Error). Endpoints should use nouns for resources.", ["Stateless request handling", "Idempotence definitions", "Consistent JSON error payloads"]),
            ("How do you handle JWT authentication and secure session management in a full-stack application?", "Security", "Hard", "JWTs consist of Header, Payload, and Signature. Store access tokens in short-lived memory or httpOnly SameSite secure cookies to prevent XSS. Use refresh tokens with token rotation stored in a database/Redis to securely grant new access tokens without forcing re-login.", ["httpOnly cookie vs localStorage XSS risks", "Token expiration and refresh flow", "CSRF protection strategies"]),
            ("Explain CSS Flexbox vs CSS Grid and when to apply each in modern layouts.", "Frontend CSS", "Easy", "Flexbox is one-dimensional (handles content along either a row or column), ideal for component internals like navbars, buttons, and aligning elements. CSS Grid is two-dimensional (handles rows and columns simultaneously), best for macroscopic page layout skeletons and responsive dashboards.", ["1D vs 2D layout paradigms", "gap, justify-content, align-items", "auto-fit vs auto-fill in Grid"]),
            ("What is state management in React, and how does Context API compare to Zustand or Redux?", "Frontend Architecture", "Medium", "Local state (useState) handles isolated component state. Context API passes state down the component tree without prop drilling, but can trigger unnecessary re-renders across all consumers on update. External stores like Zustand or Redux provide fine-grained selectors, middleware, and devtools for scalable global state.", ["Prop drilling elimination", "Selective re-renders with selectors", "Zustand lightness vs Redux boilerplate"]),
            ("How does indexing work in relational databases, and what are the trade-offs of B-Trees?", "Databases", "Hard", "B-Tree indexes create balanced search trees on indexed columns, reducing lookup time complexity from O(N) full table scans to O(log N). Trade-offs: Indexes consume additional disk space and slow down write operations (INSERT, UPDATE, DELETE) because the index tree must be rebalanced upon every write.", ["B-Tree vs Hash index", "Composite index column ordering", "Write amplification overhead"]),
            ("Explain the concept of Middleware in Express.js and write a simple error-handling middleware.", "Backend Frameworks", "Easy", "Middleware functions have access to the req, res, and next functions. They execute sequentially in the request-response pipeline. Error-handling middleware has four arguments: (err, req, res, next). If called via next(err), Express skips remaining normal handlers and executes the error handler.", ["req, res, next flow", "Four-argument error signature", "Common uses: auth, logging, body parsing"]),
            ("What is CI/CD, and how would you automate testing and deployment with GitHub Actions?", "DevOps", "Medium", "CI (Continuous Integration) automatically builds and tests code on every pull request to catch regressions early. CD (Continuous Deployment) deploys passing builds to staging or production automatically. In GitHub Actions, YAML workflows define runners, matrix tests, and secrets for zero-downtime deployment.", ["Workflow triggers (push, PR)", "Automated linting and test suites", "Containerization deployment pipelines"])
        ]
    },
    "AI / Machine Learning Engineer": {
        "required_skills": ["Python", "PyTorch or TensorFlow", "Scikit-Learn", "NumPy & Pandas", "Mathematics & Linear Algebra", "Data Preprocessing", "Deep Learning Architectures (CNN/RNN/Transformers)", "Model Evaluation Metrics", "MLOps Basics (MLflow/Docker)", "Prompt Engineering & LLMs"],
        "recommended_courses": [
            {"title": "Machine Learning Specialization by Andrew Ng", "platform": "DeepLearning.AI / Coursera", "duration": "75 Hours", "level": "Beginner to Intermediate", "link": "https://coursera.org"},
            {"title": "Deep Learning Specialization", "platform": "DeepLearning.AI / Coursera", "duration": "90 Hours", "level": "Intermediate", "link": "https://coursera.org"},
            {"title": "Practical Deep Learning for Coders", "platform": "fast.ai", "duration": "60 Hours", "level": "Intermediate to Advanced", "link": "https://course.fast.ai"}
        ],
        "tech_questions": [
            ("Explain the difference between Overfitting and Underfitting, and how to detect and mitigate both.", "ML Fundamentals", "Easy", "Underfitting occurs when a model is too simplistic to capture underlying data patterns (high bias). Overfitting happens when a model learns training noise and fails to generalize (high variance). Mitigation: For overfitting, use L1/L2 regularization, dropout, data augmentation, early stopping, or cross-validation. For underfitting, increase model capacity, add features, or decrease regularization.", ["Bias-variance tradeoff", "L1 Lasso vs L2 Ridge penalties", "K-fold cross validation"]),
            ("How does the Transformer attention mechanism (Scaled Dot-Product Attention) work mathematically?", "Deep Learning", "Hard", "Attention calculates softmax((Q * K^T) / sqrt(d_k)) * V. Query, Key, and Value matrices are linear projections of input embeddings. Scaling by sqrt(d_k) prevents vanishing gradients for large dimensions. Softmax computes attention weights representing how much focus each token should place on every other token.", ["Query, Key, Value intuition", "Softmax normalization role", "Multi-Head Attention parallel subspaces"]),
            ("Compare Gradient Descent, Stochastic Gradient Descent (SGD), and Adam optimizer.", "Optimization", "Medium", "Batch Gradient Descent computes gradients over the whole dataset (slow, smooth). SGD computes gradients using one sample at a time (noisy, escapes local minima). Adam combines AdaGrad (adaptive learning rates per parameter) and RMSProp (exponential moving average of squared gradients) with momentum for robust convergence.", ["Learning rate tuning", "Momentum and velocity tracking", "Memory overhead of adaptive optimizers"]),
            ("What is the vanishing/exploding gradient problem in deep networks and how is it addressed?", "Neural Networks", "Medium", "During backpropagation, gradients calculated by the chain rule can shrink exponentially towards zero (vanishing) or grow exponentially towards infinity (exploding) in deep layers. Solutions include ReLU/GeLU activation functions instead of sigmoid/tanh, Batch Normalization, Layer Normalization, Residual Connections (ResNet skip connections), and Gradient Clipping.", ["Chain rule multiplicative effects", "Skip/residual connections", "Weight initialization schemes (He/Xavier)"]),
            ("How do Precision, Recall, F1-Score, and ROC-AUC differ, especially on imbalanced datasets?", "Model Evaluation", "Easy", "Accuracy is misleading on imbalanced datasets. Precision measures true positives among predicted positives (minimizes false alarms). Recall measures true positives among actual positives (minimizes missed cases). F1-score is their harmonic mean. ROC-AUC evaluates tradeoff across all classification thresholds.", ["Confusion matrix components", "Harmonic mean penalty for extreme values", "Precision-Recall curve for severe imbalance"]),
            ("Explain the difference between Supervised, Unsupervised, and Self-Supervised Learning.", "Core AI", "Easy", "Supervised learning trains on labeled input-output pairs (classification, regression). Unsupervised finds hidden structures in unlabeled data (clustering, PCA). Self-supervised generates labels automatically from raw data (e.g. masked language modeling in BERT or predicting next token in GPT).", ["Label requirement comparison", "Masked autoencoders & contrastive learning", "Clustering vs generative modeling"]),
            ("What is the role of Vector Databases and Embeddings in Retrieval-Augmented Generation (RAG)?", "GenAI & LLMs", "Medium", "Embedding models convert text chunks into dense high-dimensional vectors capturing semantic meaning. Vector databases (e.g. Chroma, Pinecone, FAISS) index these embeddings using Approximate Nearest Neighbor (ANN) search like HNSW. During RAG, user query embeddings retrieve the most relevant context documents to ground LLM responses.", ["Cosine similarity vs Euclidean distance", "HNSW / IVFFlat indexing algorithms", "Chunking strategies and token limits"]),
            ("What are the key differences between Fine-Tuning, LoRA, and In-Context Learning (Prompting)?", "LLM Adaptation", "Hard", "Prompting requires no weight updates but is constrained by context window and prompt drift. Full Fine-Tuning updates all model parameters (resource-intensive, prone to catastrophic forgetting). LoRA (Low-Rank Adaptation) freezes base weights and injects low-rank trainable decomposition matrices (A and B), achieving comparable performance with <1% trainable parameters.", ["Rank decomposition intuition", "GPU VRAM requirements comparison", "Serving multiple adapted adapters from one base model"]),
            ("How do you handle missing values, categorical encoding, and feature scaling in a data pipeline?", "Data Preprocessing", "Easy", "Missing values can be imputed using median/mean (for numerical with normal distribution) or KNN/iterative imputer. Categorical features are encoded with One-Hot (low cardinality) or Target/Ordinal encoding. Feature scaling (StandardScaler or MinMaxScaler) prevents features with large magnitudes from dominating distance-based algorithms.", ["One-Hot vs Target Encoding risks (data leakage)", "StandardScaler vs RobustScaler for outliers", "Fitting scalers only on training split"]),
            ("Explain the concept of MLOps and what tools are used for tracking experiments and deployment.", "MLOps", "Medium", "MLOps brings DevOps practices to ML workflows: data versioning (DVC), experiment tracking and model registry (MLflow, Weights & Biases), pipeline orchestration (Airflow, Kubeflow), and containerized inference serving (Docker, FastAPI, Triton) with continuous monitoring for data and concept drift.", ["Data drift vs concept drift", "Reproducibility in model training", "Automated deployment and monitoring"])
        ]
    },
    "Data Scientist": {
        "required_skills": ["Python", "SQL", "Pandas & NumPy", "Statistical Hypothesis Testing", "Data Visualization (Seaborn/Plotly)", "Scikit-Learn", "A/B Testing Methodologies", "Feature Engineering", "Storytelling & Communication", "Tableau or PowerBI"],
        "recommended_courses": [
            {"title": "Google Data Analytics Professional Certificate", "platform": "Coursera", "duration": "60 Hours", "level": "Beginner", "link": "https://coursera.org"},
            {"title": "Applied Data Science with Python Specialization", "platform": "University of Michigan / Coursera", "duration": "70 Hours", "level": "Intermediate", "link": "https://coursera.org"},
            {"title": "Statistics for Data Science and Business Analysis", "platform": "Udemy", "duration": "35 Hours", "level": "Beginner to Intermediate", "link": "https://udemy.com"}
        ],
        "tech_questions": [
            ("What is p-value in hypothesis testing, and what does a p-value < 0.05 signify?", "Statistics", "Easy", "The p-value is the probability of observing test results at least as extreme as the actual results, assuming the null hypothesis (H0) is true. A p-value < 0.05 indicates statistical significance: there is less than a 5% chance the observed effect was random variation, leading us to reject H0 in favor of the alternative hypothesis.", ["Null vs alternative hypothesis", "Type I (false positive) alpha threshold", "Practical significance vs statistical significance"]),
            ("Explain how to design and evaluate an online A/B test with sample size calculation.", "A/B Testing", "Medium", "Define clear null and alternative hypotheses with one primary metric (e.g., conversion rate). Calculate required sample size using baseline conversion, minimum detectable effect (MDE), significance level (alpha = 0.05), and statistical power (1 - beta = 0.80). Ensure randomized user hashing, monitor guardrail metrics, and run for full weekly business cycles.", ["Power analysis and sample size formula", "Avoiding early peeking (p-hacking)", "Guardrail and latency metrics"]),
            ("Explain window functions in SQL and provide examples of ROW_NUMBER(), RANK(), and DENSE_RANK().", "SQL", "Medium", "Window functions perform calculations across a set of table rows related to the current row without collapsing them into a single row like GROUP BY. ROW_NUMBER() assigns consecutive integers (1, 2, 3, 4). RANK() leaves gaps after ties (1, 2, 2, 4). DENSE_RANK() does not leave gaps after ties (1, 2, 2, 3).", ["OVER (PARTITION BY ... ORDER BY ...)", "Rolling aggregates and lead/lag functions", "Performance indexing for partitions"]),
            ("What is the Central Limit Theorem (CLT) and why is it fundamental to data science?", "Probability & Statistics", "Easy", "The CLT states that the sampling distribution of the sample mean approaches a normal distribution as the sample size increases (typically n >= 30), regardless of the shape of the underlying population distribution. This allows us to use parametric hypothesis tests (Z-test, t-test) and confidence intervals on diverse real-world distributions.", ["Sample mean convergence", "Requirements: i.i.d. samples", "Basis for confidence intervals"]),
            ("How do Random Forest and Gradient Boosted Trees (XGBoost/LightGBM) differ in their ensemble strategy?", "Machine Learning", "Medium", "Random Forest uses Bagging (Bootstrap Aggregating): trains independent deep trees in parallel on random sub-samples and averages predictions to reduce variance. Gradient Boosting uses Boosting: builds shallow trees sequentially, where each new tree is trained on the residual errors of the previous ensemble to reduce bias.", ["Bagging vs Boosting mechanics", "Parallel vs sequential computation", "Hyperparameters: max_depth, learning_rate, n_estimators"]),
            ("What is Data Leakage in machine learning, and how do you prevent it during feature engineering?", "Feature Engineering", "Medium", "Data leakage occurs when information from outside the training dataset (such as target values or test set statistics) is inadvertently used to create the model. Prevention: Always split data into train/test BEFORE any scaling, imputation, or feature encoding. Use scikit-learn Pipelines to enforce strict separation.", ["Target leakage vs train-test contamination", "Time-series forward-chaining splits", "Scikit-Learn Pipeline best practices"]),
            ("How do you handle skewed data distributions and what data transformations are appropriate?", "Data Wrangling", "Easy", "Right-skewed data can be normalized using Log transformation (log(x + 1)), Square Root, or Box-Cox / Yeo-Johnson power transformations. This reduces the leverage of extreme outliers and helps linear algorithms satisfy homoscedasticity and normality assumptions.", ["Log vs Box-Cox transformation", "Impact on linear regression residuals", "Reverse-transforming predictions"]),
            ("Explain the difference between L1 (Lasso) and L2 (Ridge) Regularization.", "Statistical Modeling", "Easy", "L1 regularization adds the sum of absolute coefficients (|w|) to the loss function, forcing non-informative weights to become exactly zero, acting as automatic feature selection. L2 adds the sum of squared coefficients (w^2), shrinking weights smoothly towards zero without eliminating them completely, handling multicollinearity.", ["L1 diamond constraint vs L2 circular constraint", "Sparse feature selection in Lasso", "Handling multicollinear predictors"]),
            ("What are Principal Component Analysis (PCA) and dimensionality reduction trade-offs?", "Unsupervised Learning", "Medium", "PCA is an orthogonal linear transformation that projects data onto principal components maximizing variance. Trade-offs: It reduces curse of dimensionality, speeds up model training, and removes multicollinearity, but components become linear combinations of original features, sacrificing direct feature interpretability.", ["Eigenvalues and explained variance ratio", "Standardization requirement prior to PCA", "Interpretability loss trade-off"]),
            ("How do you communicate complex statistical findings to non-technical business stakeholders?", "Data Storytelling", "Easy", "Focus on business impact and outcomes rather than p-values or mathematical derivations. Use clean visual hierarchies (highlighting insights rather than raw charts), translate metric changes into revenue or cost savings, provide actionable next steps, and keep technical caveats in appendix slides.", ["Focus on bottom-line business ROI", "Visual hierarchy and executive summaries", "Anticipating stakeholder objections"])
        ]
    },
    "Cloud & DevOps Engineer": {
        "required_skills": ["Linux & Bash Scripting", "Git & Version Control", "Docker & Containerization", "Kubernetes (K8s)", "CI/CD Pipelines (GitHub Actions / Jenkins)", "Cloud Provider (AWS/GCP/Azure)", "Terraform (IaC)", "Networking & Security (DNS, SSL, VPC)", "Monitoring & Observability (Prometheus/Grafana)", "Python or Go for Automation"],
        "recommended_courses": [
            {"title": "Docker & Kubernetes: The Practical Guide", "platform": "Udemy", "duration": "45 Hours", "level": "Intermediate", "link": "https://udemy.com"},
            {"title": "AWS Certified Solutions Architect Associate", "platform": "Coursera / Udemy", "duration": "60 Hours", "level": "Beginner to Intermediate", "link": "https://coursera.org"},
            {"title": "HashiCorp Certified: Terraform Associate", "platform": "Udemy / HashiCorp Learn", "duration": "30 Hours", "level": "Intermediate", "link": "https://hashicorp.com"}
        ],
        "tech_questions": [
            ("Explain the difference between a Virtual Machine and a Docker Container.", "Containerization", "Easy", "VMs virtualize hardware and run a complete guest OS with dedicated kernel and binaries, incurring high resource overhead and slower boot times. Docker containers virtualize the operating system kernel, sharing the host OS kernel via Linux namespaces and cgroups, making them lightweight, fast to start, and portable.", ["Host kernel sharing vs hypervisor", "cgroups (resource limits) and namespaces (isolation)", "Image layer caching"]),
            ("What is Infrastructure as Code (IaC) and how does Terraform manage state?", "IaC", "Medium", "IaC allows infrastructure provisioning and management through declarative configuration code rather than manual GUI clicks. Terraform uses a state file (terraform.tfstate) to track real-world resource IDs and metadata. When you run `terraform plan/apply`, it reconciles the declared configuration against the current state.", ["Declarative vs imperative IaC", "Remote state locking with S3 and DynamoDB", "State drift detection"]),
            ("What are Kubernetes Pods, Deployments, Services, and Ingress?", "Kubernetes", "Medium", "A Pod is the smallest deployable compute unit containing one or more containers sharing network and storage. A Deployment manages Pod replicas, rolling updates, and self-healing. A Service provides a stable internal IP and DNS name for dynamic Pods. Ingress manages external HTTP/HTTPS routing to internal Services.", ["Pod lifecycle and restart policies", "Rolling updates and zero downtime", "ClusterIP vs NodePort vs LoadBalancer"]),
            ("How do Blue-Green and Canary deployment strategies minimize downtime and risk?", "Deployment Strategies", "Medium", "Blue-Green maintains two identical production environments; new code deploys to Green, and traffic router switches instantly from Blue to Green once validated. Canary routes a tiny percentage of production traffic (e.g. 5%) to the new release to monitor error rates and latency before gradually scaling to 100%.", ["Instant rollback capability", "Canary metric analysis and automated rollback", "Database schema migration compatibility"]),
            ("What is the difference between Prometheus and Grafana in an observability stack?", "Observability", "Easy", "Prometheus is a time-series database and metric collection engine that pulls metrics via HTTP scraping endpoints and evaluates alert rules. Grafana is an analytics visualization platform that connects to data sources like Prometheus to build interactive dashboards and alert notifications.", ["Pull-based metric scraping", "PromQL query language", "The 4 Golden Signals: Latency, Traffic, Errors, Saturation"]),
            ("Explain the fundamentals of Virtual Private Clouds (VPC), Subnets, and Security Groups.", "Cloud Networking", "Medium", "A VPC is an isolated virtual network in your cloud account. Subnets segment the VPC IP range (CIDR) into public (routes to Internet Gateway) and private (routes through NAT Gateway). Security Groups act as stateful virtual firewalls at the instance level, while Network ACLs are stateless at the subnet level.", ["CIDR notation and IP allocation", "Public vs private subnet routing", "Stateful Security Groups vs stateless NACLs"]),
            ("How does CI/CD pipeline security (DevSecOps) integrate vulnerability scanning and secrets management?", "DevSecOps", "Medium", "DevSecOps injects security automated gates into pipelines: SAST (Static Analysis), dependency scanning (Trivy, Snyk), and container image vulnerability checks. Secrets (API keys, certificates) are never hardcoded in git; they are injected via Vault or cloud secret managers into ephemeral runners.", ["Shift-left security philosophy", "Secret scanning in pre-commit hooks", "Image signing and SBOM"]),
            ("What is GitOps and how do tools like ArgoCD or Flux work in Kubernetes?", "GitOps", "Hard", "GitOps is an operational framework where Git is the single source of truth for infrastructure and application configuration. ArgoCD runs as an in-cluster controller that continuously monitors Git repositories and synchronizes Kubernetes cluster state with the declared Git state, detecting and correcting configuration drift.", ["Pull-based vs push-based deployment", "Automated drift reconciliation", "Auditability and rollbacks via git revert"]),
            ("Explain Linux process management, file permissions (chmod/chown), and systemd services.", "Linux Fundamentals", "Easy", "Linux permissions use read (4), write (2), execute (1) across owner, group, and others. Systemd is the init system that manages system services (daemons); unit files (.service) define startup dependencies, restart policies, and environment variables. Commands include systemctl status/restart and journalctl.", ["Octal permissions (e.g. 755 vs 600)", "systemd unit configuration", "Process signals (SIGTERM vs SIGKILL)"]),
            ("How do you architect high availability and auto-scaling for a web application across multiple Availability Zones?", "Cloud Architecture", "Hard", "Deploy stateless application containers across at least two Availability Zones behind an Application Load Balancer. Use Auto Scaling Groups with dynamic scaling policies based on CPU/request count. For the database, use Multi-AZ replication with automatic failover and read replicas for read-heavy workloads.", ["Multi-AZ redundancy", "Stateless tier horizontal scaling", "RTO (Recovery Time) and RPO (Recovery Point)"])
        ]
    }
}

DEFAULT_HR_QUESTIONS = [
    {
        "id": 1,
        "question": "Tell me about yourself and why you are interested in this career path.",
        "scenario_focus": "Professional Background & Career Motivation",
        "star_framework_answer": "Situation: Throughout my academic journey in {degree} at {college}, I developed a strong passion for solving real-world challenges through technology.\nTask: I focused my efforts on mastering {skills_preview} and set a clear goal of becoming a {preferred_career}.\nAction: I applied theoretical principles to practical projects, worked through modern development practices, and actively expanded my technical expertise.\nResult: This disciplined approach gave me hands-on confidence and solidified my drive to join an innovative engineering team where I can contribute immediately.",
        "key_tips": "Keep it under 2 minutes. Connect your academic background, core skills, and long-term career ambition into one cohesive narrative."
    },
    {
        "id": 2,
        "question": "Describe a difficult technical obstacle you encountered in a project and how you resolved it.",
        "scenario_focus": "Problem Solving & Resilience",
        "star_framework_answer": "Situation: While building a major project involving {skills_preview}, our team encountered a critical performance bottleneck that caused significant latency.\nTask: As the person responsible for the core logic, I needed to identify the root cause without delaying our delivery timeline.\nAction: I methodically profiled the execution flow, isolated the inefficient operations, consulted official documentation, and refactored the architecture to use optimized patterns.\nResult: The refactoring reduced latency by over 60%, improved application stability, and taught me the immense value of structured debugging under pressure.",
        "key_tips": "Demonstrate systematic thinking rather than trial-and-error. Emphasize your thought process, research, and measurable outcome."
    },
    {
        "id": 3,
        "question": "How do you prioritize deadlines and manage your time when juggling multiple academic and project deliverables?",
        "scenario_focus": "Time Management & Prioritization",
        "star_framework_answer": "Situation: During my {academic_year} year, I had to manage rigorous coursework, prepare for competitive placement drives, and lead a technical team project simultaneously.\nTask: I needed to ensure all milestones were met without compromising the quality of our code or my academic GPA ({cgpa}).\nAction: I implemented the Eisenhower matrix to categorize tasks by urgency and importance, broke complex milestones into daily actionable sprints, and used GitHub Projects for progress tracking.\nResult: I successfully delivered our project two days ahead of schedule, maintained my academic standing, and developed reliable personal sprint habits.",
        "key_tips": "Give specific organizational methodologies (Eisenhower matrix, Agile sprints, calendar time-blocking) rather than vague claims."
    },
    {
        "id": 4,
        "question": "Tell me about a time you had a disagreement with a team member. How did you handle it?",
        "scenario_focus": "Team Collaboration & Conflict Resolution",
        "star_framework_answer": "Situation: During a collaborative hackathon project, a team member and I had conflicting viewpoints regarding whether to use a familiar framework or adopt a newer architecture.\nTask: We had limited time and needed to reach consensus quickly without creating interpersonal friction.\nAction: I scheduled a brief whiteboard session where we objectively evaluated both approaches against our criteria: delivery speed, scalability, and existing team familiarity.\nResult: We chose a balanced hybrid solution that met our immediate deadline while accommodating future expansion. The project won an honorable mention, and our team synergy grew stronger.",
        "key_tips": "Focus on mutual respect, data-driven decisions, and keeping the shared objective first. Avoid speaking negatively about teammates."
    },
    {
        "id": 5,
        "question": "Where do you see yourself in 3 to 5 years, and how does this entry-level opportunity align with your vision?",
        "scenario_focus": "Career Vision & Growth Mindset",
        "star_framework_answer": "Situation: As an aspiring {preferred_career}, my immediate priority is to immerse myself in a production engineering environment and learn from seasoned mentors.\nTask: My goal is to build deep domain expertise, write robust production-grade code, and understand scalable system design.\nAction: Over the next 3 to 5 years, I intend to take increasing ownership of core services, mentor incoming junior developers, and contribute to architectural decisions.\nResult: This role is the ideal foundation because it provides the technical challenges and growth culture that directly support my career goal: {career_goal}.",
        "key_tips": "Show commitment to learning and longevity. Companies want candidates who are eager to grow internally and take ownership."
    }
]

def generate_demo_profile(student_data: dict) -> dict:
    """
    Constructs a complete, consistent, high-fidelity career profile
    tailored to the student's exact inputs.
    """
    full_name = student_data.get("fullName", "Student").strip()
    college = student_data.get("collegeName", "Engineering Institute").strip()
    degree = student_data.get("degree", "B.Tech").strip()
    branch = student_data.get("branch", "Computer Science and Engineering").strip()
    academic_year = student_data.get("academicYear", "Final Year").strip()
    cgpa = student_data.get("cgpa", "8.5").strip()
    
    # Process skills lists
    raw_tech = student_data.get("technicalSkills", [])
    if isinstance(raw_tech, str):
        tech_skills = [s.strip() for s in raw_tech.split(",") if s.strip()]
    else:
        tech_skills = [str(s).strip() for s in raw_tech if str(s).strip()]
        
    raw_langs = student_data.get("programmingLanguages", [])
    if isinstance(raw_langs, str):
        prog_languages = [s.strip() for s in raw_langs.split(",") if s.strip()]
    else:
        prog_languages = [str(s).strip() for s in raw_langs if str(s).strip()]

    raw_soft = student_data.get("softSkills", [])
    if isinstance(raw_soft, str):
        soft_skills = [s.strip() for s in raw_soft.split(",") if s.strip()]
    else:
        soft_skills = [str(s).strip() for s in raw_soft if str(s).strip()]

    raw_interests = student_data.get("areasOfInterest", [])
    if isinstance(raw_interests, str):
        interests = [s.strip() for s in raw_interests.split(",") if s.strip()]
    else:
        interests = [str(s).strip() for s in raw_interests if str(s).strip()]

    preferred_career = student_data.get("preferredCareer", "Full Stack Developer").strip()
    career_goal = student_data.get("careerGoal", f"Excel as a high-performing {preferred_career} in a leading technology company.").strip()
    experience_level = student_data.get("experienceLevel", "Intermediate").strip()

    # Match benchmark data or fallback dynamically
    benchmark_key = None
    for key in ROLE_BENCHMARKS.keys():
        if key.lower() in preferred_career.lower() or preferred_career.lower() in key.lower():
            benchmark_key = key
            break
    if not benchmark_key:
        benchmark_key = "Full Stack Developer"

    benchmark = ROLE_BENCHMARKS[benchmark_key]
    
    # Combine user technical inventory
    all_user_skills = set([s.lower() for s in (tech_skills + prog_languages)])
    required_benchmark_skills = benchmark["required_skills"]
    
    possessed = []
    needs_improvement = []
    missing = []
    
    # Analyze benchmarks
    for req in required_benchmark_skills:
        req_clean = req.split("/")[0].split("(")[0].strip().lower()
        matched = False
        for u in all_user_skills:
            if req_clean in u or u in req_clean:
                matched = True
                break
        
        if matched:
            possessed.append({
                "skill": req,
                "proficiency": "Proficient" if experience_level in ["Intermediate", "Advanced"] else "Intermediate",
                "relevance": f"Directly utilized in {preferred_career} day-to-day engineering workflows."
            })
        else:
            # Distribute into needs improvement vs missing based on complexity
            if any(term in req.lower() for term in ["basics", "git", "rest", "sql", "testing"]):
                needs_improvement.append({
                    "skill": req,
                    "current_level": "Foundational / Partial",
                    "target_level": "Production Competency",
                    "gap_reason": f"Essential baseline requirement for {preferred_career} roles; needs deeper project validation.",
                    "improvement_tip": f"Build a dedicated mini-project and implement test cases focusing specifically on {req}."
                })
            else:
                missing.append({
                    "skill": req,
                    "importance": "Critical" if "docker" in req.lower() or "pytorch" in req.lower() or "react" in req.lower() else "High",
                    "why_needed": f"Crucial for modern {preferred_career} architecture and team collaboration.",
                    "action_plan": f"Dedicate 10-15 hours to follow practical hands-on labs and implement {req} in your portfolio projects."
                })

    # Ensure each bucket has at least some items for a rich report
    if not possessed:
        sample_possessed = tech_skills[:3] if tech_skills else ["Core Programming", "Data Structures"]
        for sp in sample_possessed:
            possessed.append({
                "skill": sp,
                "proficiency": "Intermediate",
                "relevance": f"Serves as the foundational programming pillar for {preferred_career}."
            })

    if not needs_improvement:
        needs_improvement.append({
            "skill": prog_languages[0] if prog_languages else "Advanced Algorithms & Optimization",
            "current_level": "Intermediate",
            "target_level": "Advanced System Efficiency",
            "gap_reason": "Writing performant code requires deep algorithmic insight and runtime profiling.",
            "improvement_tip": "Practice solving medium LeetCode/HackerRank problems and study time-space complexity tradeoffs."
        })

    if not missing:
        missing.append({
            "skill": "Cloud Deployment & Production Monitoring",
            "importance": "High",
            "why_needed": "Industry standards demand knowing how to ship and maintain applications in cloud environments.",
            "action_plan": "Deploy your primary project to AWS, GCP, or Vercel with automated CI/CD pipelines."
        })

    # Calculate match percentage
    total_req = len(required_benchmark_skills)
    match_score = max(35, min(92, int((len(possessed) / max(1, total_req)) * 100 + 15)))

    # A. Professional Summary
    skills_preview = ", ".join((tech_skills[:4] + prog_languages[:2])) if (tech_skills or prog_languages) else "modern programming paradigms"
    interests_preview = ", ".join(interests[:3]) if interests else preferred_career
    soft_preview = ", ".join(soft_skills[:3]) if soft_skills else "problem-solving, team collaboration, and analytical thinking"

    short_summary = (
        f"Dynamic and detail-oriented {degree} candidate in {branch} at {college} (CGPA: {cgpa}) "
        f"with proven competency in {skills_preview}. Aspiring {preferred_career} equipped with strong analytical "
        f"capabilities and a results-driven mindset aimed at delivering scalable, robust technology solutions."
    )

    full_summary = (
        f"Goal-oriented and technically proficient {degree} in {branch} student from {college} "
        f"maintaining a cumulative academic record of {cgpa} CGPA. Demonstrates solid practical grounding in "
        f"{skills_preview}, complemented by an active academic and project focus in {interests_preview}. "
        f"Possesses strong interpersonal attributes including {soft_preview}, fostering effective cross-functional "
        f"collaboration and resilient troubleshooting. Committed to pursuing a career as a {preferred_career}, "
        f"with the overarching goal to {career_goal.lower().rstrip('.')}. "
        f"Eager to leverage rigorous problem-solving skills, modern development practices, and rapid learning ability "
        f"to create tangible value in a high-growth technology organization."
    )

    suggested_headline = f"Aspiring {preferred_career} | {degree} in {branch} @ {college} | Specializing in {skills_preview.split(',')[0] if skills_preview else 'Software Engineering'}"

    key_highlights = [
        f"Strong academic foundation in {branch} from {college} with a CGPA of {cgpa}.",
        f"Hands-on technical proficiency across {skills_preview}.",
        f"Demonstrated dedication to career objective: {career_goal}.",
        f"Blend of technical competency with refined soft skills ({soft_preview})."
    ]

    # C. Learning Recommendations & Roadmap
    learning_roadmap = [
        {
            "phase": "Phase 1: Solidifying Foundations & Tooling",
            "duration": "Weeks 1 - 2",
            "focus": f"Master core syntax, clean code conventions, and advanced version control.",
            "milestones": [
                f"Refactor existing codebases using idiomatic {prog_languages[0] if prog_languages else 'modern language'} patterns.",
                "Implement strict Git branching workflows, pull requests, and semantic versioning.",
                "Deep-dive into fundamental data structures and algorithmic complexity."
            ]
        },
        {
            "phase": "Phase 2: Core Domain Specialization",
            "duration": "Weeks 3 - 5",
            "focus": f"Address primary skill gaps identified in {preferred_career} engineering.",
            "milestones": [
                f"Complete hands-on modules in {missing[0]['skill'] if missing else 'Core Architecture'}.",
                "Build a modular, well-documented component addressing real-world edge cases.",
                "Implement automated unit and integration tests achieving >80% test coverage."
            ]
        },
        {
            "phase": "Phase 3: Production Capstone & Architecture",
            "duration": "Weeks 6 - 7",
            "focus": "Develop an industry-ready portfolio project featuring modern architectural patterns.",
            "milestones": [
                f"Design and engineer a full capstone application aligned with {preferred_career}.",
                "Incorporate authentication, caching, error logging, and resilient API contracts.",
                "Prepare comprehensive architectural documentation and an interactive demo."
            ]
        },
        {
            "phase": "Phase 4: Cloud Deployment & Interview Readiness",
            "duration": "Week 8+",
            "focus": "Containerize, deploy to the cloud, and practice mock technical rounds.",
            "milestones": [
                "Containerize application with Docker and set up automated CI/CD deployment.",
                "Publish project on GitHub with an executive README and live deployment URL.",
                "Conduct mock interviews covering technical deep-dives and STAR behavioral questions."
            ]
        }
    ]

    weekly_plan = [
        {"week": "Week 1", "theme": "Foundation & Version Control", "topics": "Clean coding standards, Git branch strategy, data structure optimizations", "practical_task": "Refactor a past project with linting, typing, and modular directory layout", "hours": "14 hrs"},
        {"week": "Week 2", "theme": "Deep-Dive into Core Language", "topics": f"Asynchronous programming, memory handling, and concurrency in {prog_languages[0] if prog_languages else 'core stack'}", "practical_task": "Build a multi-threaded or async task processor with error recovery", "hours": "15 hrs"},
        {"week": "Week 3", "theme": "Targeted Skill Gap Bridge", "topics": f"In-depth study of {missing[0]['skill'] if missing else 'primary target framework'}", "practical_task": "Complete 3 guided coding exercises implementing the core library", "hours": "16 hrs"},
        {"week": "Week 4", "theme": "Architecture & Data Layer", "topics": "Database normalization, indexing, query optimization, and REST API design", "practical_task": "Design a relational schema with foreign key constraints and indexed queries", "hours": "16 hrs"},
        {"week": "Week 5", "theme": "Security, Testing & Quality", "topics": "Unit testing frameworks, Mocking, JWT authorization, and input sanitization", "practical_task": "Write end-to-end integration tests and benchmark endpoint response times", "hours": "15 hrs"},
        {"week": "Week 6", "theme": "Capstone Project Kickoff", "topics": "End-to-end feature planning, component design, and state management", "practical_task": "Scaffold the capstone repository and implement user authentication workflows", "hours": "18 hrs"},
        {"week": "Week 7", "theme": "Capstone Feature Completion", "topics": "Complex business logic, external API integrations, and responsive UI polish", "practical_task": "Finalize core capstone features, polish styling, and add interactive dashboards", "hours": "18 hrs"},
        {"week": "Week 8", "theme": "Deployment, CI/CD & Interview Sprints", "topics": "Docker containerization, GitHub Actions, cloud hosting, and mock Q&A", "practical_task": "Deploy live capstone, record a 2-minute video walkthrough, and review interview questions", "hours": "16 hrs"}
    ]

    # D. Interview Preparation
    tech_qs = []
    benchmark_qs = benchmark["tech_questions"]
    for i, (q, cat, diff, ans, keypts) in enumerate(benchmark_qs[:10], start=1):
        tech_qs.append({
            "id": i,
            "question": q,
            "category": cat,
            "difficulty": diff,
            "detailed_answer": ans,
            "key_points_to_mention": keypts,
            "sample_code_or_example": f"// Industry Best Practice for {cat}\n// Ensure modularity, error handling, and separation of concerns."
        })

    hr_qs = []
    for item in DEFAULT_HR_QUESTIONS:
        hr_qs.append({
            "id": item["id"],
            "question": item["question"],
            "scenario_focus": item["scenario_focus"],
            "star_framework_answer": item["star_framework_answer"].format(
                degree=degree,
                college=college,
                skills_preview=skills_preview,
                preferred_career=preferred_career,
                academic_year=academic_year,
                cgpa=cgpa,
                career_goal=career_goal
            ),
            "key_tips": item["key_tips"]
        })

    student_specific_advice = (
        f"As a {academic_year} {degree} student with a strong {cgpa} CGPA, your primary advantage in interviews "
        f"is demonstrating that you bridge academic rigor with modern industry practices. Focus your interview answers "
        f"on your capstone projects using {skills_preview}. Speak with clarity on trade-offs and architectural decisions."
    )

    return {
        "student_profile": {
            "fullName": full_name,
            "email": student_data.get("email", ""),
            "collegeName": college,
            "degree": degree,
            "branch": branch,
            "academicYear": academic_year,
            "cgpa": cgpa,
            "technicalSkills": tech_skills,
            "programmingLanguages": prog_languages,
            "softSkills": soft_skills,
            "areasOfInterest": interests,
            "preferredCareer": preferred_career,
            "careerGoal": career_goal,
            "experienceLevel": experience_level
        },
        "professional_summary": {
            "short_summary": short_summary,
            "full_summary": full_summary,
            "suggested_headline": suggested_headline,
            "key_highlights": key_highlights
        },
        "skill_gap_analysis": {
            "target_role": preferred_career,
            "overall_match_percentage": match_score,
            "readiness_level": "Job Ready (Top Tier)" if match_score >= 80 else ("Internship & Junior Ready" if match_score >= 60 else "Foundational Stage"),
            "possessed_skills": possessed,
            "needs_improvement_skills": needs_improvement,
            "missing_skills": missing,
            "summary_insight": f"You possess a solid foundation matching {match_score}% of the core requirements for {preferred_career}. Prioritizing {missing[0]['skill'] if missing else 'advanced cloud practices'} and refining {needs_improvement[0]['skill'] if needs_improvement else 'system optimization'} will elevate your profile to top-quartile industry candidates."
        },
        "learning_recommendations": {
            "target_skills": [s["skill"] for s in (missing[:3] + needs_improvement[:2])],
            "recommended_courses": benchmark["recommended_courses"],
            "learning_resources": [
                {"name": "Official Framework Documentation", "type": "Documentation", "description": "Always prioritize the official up-to-date documentation for accurate API references and deprecation notes."},
                {"name": "LeetCode / HackerRank", "type": "Problem Solving", "description": "Practice 2-3 data structure and algorithmic challenges weekly to keep problem-solving agile."},
                {"name": "System Design Primer by Donne Martin", "type": "Architecture Guide", "description": "Comprehensive open-source primer covering scalability, caching, load balancing, and database design."},
                {"name": "FreeCodeCamp & GitHub Awesome Lists", "type": "Interactive & Curated", "description": "Curated roadmaps, practical code exercises, and open-source project inspirations."}
            ],
            "learning_roadmap": learning_roadmap,
            "weekly_learning_plan": weekly_plan,
            "estimated_total_hours": "120 - 140 Hours (approx. 8 Weeks at 15-18 hours/week)"
        },
        "interview_preparation": {
            "technical_questions": tech_qs,
            "hr_questions": hr_qs,
            "interview_tips": {
                "technical_tips": [
                    "Clarify requirements before jumping to the solution. Ask clarifying questions regarding edge cases and constraints.",
                    "Think out loud. Interviewers care just as much about your problem-solving trajectory as the final syntax.",
                    "State time and space complexity (Big-O notation) proactively for every algorithmic implementation.",
                    "Discuss architectural trade-offs (e.g. read-heavy vs write-heavy, memory vs CPU performance)."
                ],
                "behavioral_tips": [
                    "Structure every scenario response using the STAR method (Situation, Task, Action, Result).",
                    "Quantify your results with concrete metrics whenever possible (e.g., 'reduced load time by 35%').",
                    "Keep answers concise and centered around collaboration, intellectual humility, and continuous growth.",
                    "Prepare 2-3 thoughtful questions for the interview panel regarding their team culture and engineering roadmap."
                ],
                "student_specific_advice": student_specific_advice
            }
        },
        "metadata": {
            "generated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "is_demo_mode": True,
            "engine": "CareerAI Dynamic Intelligence Engine (Demo Mode)",
            "version": "1.0.0"
        }
    }
