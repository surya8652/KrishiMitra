export interface CareerSector {
  id: string
  title: string
  category: 'architecture' | 'engineering' | 'science' | 'design' | 'commerce' | 'medical'
  badge: string
  tagline: string
  overview: string
  whyFitsMathHigh: string
  entranceExams: string[]
  duration: string
  eligibility: string
  topColleges: string[]
  jobRoles: string[]
  averageSalary: string
  growthOutlook: string
  keySubjects: string[]
  mathImportance: number // 1 to 10
  biologyImportance: number // 1 to 10
  chemistryImportance: number // 1 to 10
  spatialDrawingImportance: number // 1 to 10
  codingLogicImportance: number // 1 to 10
  iconName: string
  roadmap: string[]
}

export interface StudyNoteItem {
  id: string
  title: string
  sectorId: string
  subject: string
  level: '10th' | '11th-12th' | 'Undergraduate' | 'All Levels'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  readTime: string
  description: string
  keyFormulasAndConcepts: string[]
  contentMarkdown: string
  downloadFileName: string
  tags: string[]
}

export interface YouTubeLectureItem {
  id: string
  title: string
  channel: string
  sectorId: string
  subject: string
  youtubeId: string // Real embeddable YouTube video ID
  duration: string
  views: string
  description: string
  keyTakeaways: string[]
  tags: string[]
}

export const CAREER_SECTORS: CareerSector[] = [
  {
    id: 'architecture',
    title: 'Architecture & Spatial Design (B.Arch)',
    category: 'architecture',
    badge: 'Top for Math + Spatial Minds',
    tagline: 'Blend geometrical mathematics, 3D visualization, and structural aesthetics.',
    overview: 'Architecture is the art and science of designing physical buildings, public spaces, and urban environments. It relies heavily on 3D geometry, proportion, spatial awareness, and trigonometry without requiring heavy memorization of biology or organic chemistry.',
    whyFitsMathHigh: 'PERFECT FIT FOR HIGH MATH: Architecture values geometry, spatial dimensions, and structural calculations. If you score high in Mathematics but dislike memorizing biology or organic chemistry, Architecture gives you pure spatial mathematics combined with creative structural design.',
    entranceExams: ['NATA (National Aptitude Test in Architecture)', 'JEE Main Paper 2 (B.Arch/B.Planning)', 'State Architecture CETs'],
    duration: '5 Years (B.Arch)',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics (PCM mandatory) with minimum 50% marks aggregate or 10+3 Diploma with Mathematics.',
    topColleges: ['School of Planning and Architecture (SPA) New Delhi / Bhopal', 'IIT Kharagpur & Roorkee (B.Arch)', 'CEPT University Ahmedabad', 'Sir J.J. College of Architecture Mumbai', 'NIT Trichy / Calicut'],
    jobRoles: ['Licensed Architect', 'Urban Planner', 'Structural Concept Designer', 'Landscape Architect', 'BIM / 3D Parametric Specialist'],
    averageSalary: '₹6.5 - 18 LPA (Scales rapidly with private practice)',
    growthOutlook: 'High (India infrastructure & smart city expansion boom)',
    keySubjects: ['Descriptive Geometry', 'Trigonometry & Mensuration', 'Architectural Graphics', 'Building Climatology', 'Structural Mechanics'],
    mathImportance: 9,
    biologyImportance: 1,
    chemistryImportance: 3,
    spatialDrawingImportance: 10,
    codingLogicImportance: 5,
    iconName: 'Building2',
    roadmap: [
      'Class 11-12: Master Geometry, 3D Coordinates, and Freehand 1-Point/2-Point Perspective Drawing.',
      'Crack NATA & JEE Main Paper 2: Practice Architectural Aptitude, Visual Memory & Composition.',
      'Enroll in 5-Year B.Arch COA recognized program.',
      'Build design portfolio, master AutoCAD, Rhino, Revit & Grasshopper.',
      'Register with Council of Architecture (COA) to practice independently.'
    ]
  },
  {
    id: 'computer-engineering',
    title: 'Computer Science & Software Engineering',
    category: 'engineering',
    badge: 'High Demand • Pure Logic',
    tagline: 'Transform mathematical algorithms into intelligent software, AI, and cloud systems.',
    overview: 'Computer Science Engineering (CSE) focuses on algorithms, computation theory, data structures, and software architecture. It is built upon discrete mathematics, boolean logic, and problem-solving, completely independent of biology.',
    whyFitsMathHigh: 'PERFECT FIT FOR HIGH MATH: Software engineering is applied logic and discrete mathematics. If your math score is high while biology/chemistry scores are low, programming and computer science harness your exact strengths in deductive reasoning and computational thinking.',
    entranceExams: ['JEE Main & Advanced', 'BITSAT', 'MHT-CET', 'WBJEE', 'KCET', 'VITEEE'],
    duration: '4 Years (B.Tech / B.E.)',
    eligibility: '10+2 with Physics and Mathematics as compulsory subjects along with Chemistry/CS/IT (min 60-75%).',
    topColleges: ['IIT Bombay / Delhi / Madras', 'IIIT Hyderabad & Bangalore', 'BITS Pilani', 'NIT Surathkal / Warangal', 'DTU & NSUT Delhi'],
    jobRoles: ['Full-Stack Software Engineer', 'AI & Machine Learning Engineer', 'Systems Architect', 'Algorithm Engineer', 'Cloud Infrastructure Architect'],
    averageSalary: '₹10 - 32 LPA (Top product companies offer ₹35-60+ LPA)',
    growthOutlook: 'Exceptional (Global digital transformation and generative AI surge)',
    keySubjects: ['Discrete Mathematics', 'Linear Algebra & Calculus', 'Data Structures & Algorithms', 'Operating Systems', 'Computer Networks'],
    mathImportance: 10,
    biologyImportance: 1,
    chemistryImportance: 2,
    spatialDrawingImportance: 4,
    codingLogicImportance: 10,
    iconName: 'Code2',
    roadmap: [
      'Class 11-12: Solidify Algebra, Calculus, Probability, and learn Python or C++ basics.',
      'Appear for JEE Main/Advanced and State Engineering Entrances.',
      'Earn B.Tech in CSE / IT / AI & Data Science.',
      'Practice LeetCode / competitive programming, build open-source web and AI apps.',
      'Pursue internships at tech firms and product startups.'
    ]
  },
  {
    id: 'civil-structural',
    title: 'Civil & Structural Engineering',
    category: 'engineering',
    badge: 'Nation Builders • Applied Mechanics',
    tagline: 'Design megastructures, bridges, high-speed rail, and sustainable cities.',
    overview: 'Civil Engineering applies statics, dynamics, material mechanics, and geometry to build safe civil infrastructure. It requires solid physics and mathematics (calculus & vectors) with zero biology requirements.',
    whyFitsMathHigh: 'STRONG FIT FOR HIGH MATH: Civil & structural design is essentially applied calculus, vectors, and force equilibrium equations. For students who love math and real-world physical structures without rote memorization.',
    entranceExams: ['JEE Main & Advanced', 'State Engineering Entrances (MHT-CET, WBJEE)', 'GATE (for Masters/PSUs)'],
    duration: '4 Years (B.Tech / B.E.)',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry with minimum 50-60%.',
    topColleges: ['IIT Roorkee & Kharagpur', 'IIT Madras & Delhi', 'NIT Trichy & Surathkal', 'College of Engineering Pune (COEP)', 'Jadavpur University'],
    jobRoles: ['Structural Design Engineer', 'Infrastructure Project Manager', 'Geotechnical Specialist', 'Bridges & Highways Engineer', 'PSU Officer (IOCL, NTPC, ONGC)'],
    averageSalary: '₹6 - 16 LPA (Plus government PSU Gazetted positions)',
    growthOutlook: 'Strong (Massive national highways, metros, bullet trains, and green ports boom)',
    keySubjects: ['Engineering Mechanics', 'Strength of Materials', 'Structural Analysis', 'Fluid Mechanics & Hydrology', 'Geotechnical Engineering'],
    mathImportance: 9,
    biologyImportance: 1,
    chemistryImportance: 4,
    spatialDrawingImportance: 8,
    codingLogicImportance: 5,
    iconName: 'HardHat',
    roadmap: [
      'Focus on Vectors, Calculus, Statics, and Kinematics in 11th & 12th.',
      'Crack JEE Main or State CETs for Civil Engineering.',
      'Learn STAAD.Pro, ETABS, AutoCAD Civil 3D, and GIS.',
      'Intern with construction giants (L&T, Shapoorji Pallonji, Afcons) or clear GATE for PSUs.'
    ]
  },
  {
    id: 'mechanical-robotics',
    title: 'Mechanical, Robotics & Aerospace Engineering',
    category: 'engineering',
    badge: 'Machines & Motion • Physical Physics',
    tagline: 'Invent autonomous robots, electric vehicles, turbines, and space exploration rockets.',
    overview: 'Mechanical engineering covers kinematics, thermodynamics, fluid dynamics, and robotics. It is mathematically intensive (differential equations and vector calculus) and appeals to students who enjoy understanding how physical objects move and work.',
    whyFitsMathHigh: 'HIGH MATH MATCH: Thermodynamics, vibrations, and robotics algorithms are purely mathematical physics. Requires almost zero biology and minimal chemistry.',
    entranceExams: ['JEE Main & Advanced', 'BITSAT', 'MET', 'VITEEE', 'State CETs'],
    duration: '4 Years (B.Tech / B.E.)',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry (min 60%).',
    topColleges: ['IIT Madras, Bombay & Kanpur', 'IISc Bangalore', 'NIT Trichy', 'BITS Pilani', 'IIEST Shibpur'],
    jobRoles: ['Robotics Engineer', 'EV Powertrain Engineer', 'Aerospace Flight Dynamics Analyst', 'CAE / FEA Simulation Specialist', 'Automation Engineer'],
    averageSalary: '₹7 - 20 LPA',
    growthOutlook: 'Very High (EV transition, drone tech, space startup revolution in India)',
    keySubjects: ['Engineering Thermodynamics', 'Theory of Machines & Kinematics', 'Finite Element Analysis (FEA)', 'Robotics & Control Systems', 'Calculus & Differential Equations'],
    mathImportance: 9,
    biologyImportance: 1,
    chemistryImportance: 3,
    spatialDrawingImportance: 7,
    codingLogicImportance: 7,
    iconName: 'Cpu',
    roadmap: [
      'Class 11-12: Excel in Newton mechanics, rotation, work-energy, and calculus.',
      'Secure admission via JEE / BITSAT into Mechanical, Mechatronics, or Aerospace.',
      'Learn CAD tools (SolidWorks, CATIA), simulation (ANSYS), and micro-controllers (ROS, Arduino).',
      'Join collegiate teams like Formula Student or Rover robotics competitions.'
    ]
  },
  {
    id: 'data-science-finance',
    title: 'Data Science, Statistics & Quantitative Finance',
    category: 'science',
    badge: 'Pure Math & Stats • High Pay',
    tagline: 'Use statistical probability and calculus to discover trends and model financial markets.',
    overview: 'Quantitative finance and data science apply pure probability, linear algebra, and mathematical statistics to solve complex economic and algorithmic problems. Zero biology or chemistry required.',
    whyFitsMathHigh: 'PURE MATHEMATICAL REASONING: If math is your greatest strength, this field places mathematics at the absolute forefront. High earnings, high intellectual stimulation, zero rote memorization.',
    entranceExams: ['ISI Entrance (B.Stat / B.Math)', 'CMI Entrance', 'JEE Main/Advanced', 'CUET (B.Sc Stats/Maths)', 'Actuarial Common Entrance (ACET)'],
    duration: '3 - 4 Years (B.Stat / B.Math / B.Sc / B.Tech Data Science)',
    eligibility: '10+2 with Mathematics (min 60-70%).',
    topColleges: ['Indian Statistical Institute (ISI) Kolkata/Bangalore', 'Chennai Mathematical Institute (CMI)', 'IIT Kanpur & Bombay (BS Mathematics)', 'Delhi University (St. Stephens, Hindu College)'],
    jobRoles: ['Quantitative Analyst (Quant)', 'Data Scientist', 'Risk Modeler', 'Actuary', 'Financial Algorithmic Trader'],
    averageSalary: '₹12 - 35 LPA (Global hedge funds offer ₹50-100+ LPA)',
    growthOutlook: 'Exponential (AI explosion & financial technology expansion)',
    keySubjects: ['Linear Algebra & Matrices', 'Probability & Stochastic Processes', 'Multivariate Calculus', 'Econometrics', 'Python / R Data Analysis'],
    mathImportance: 10,
    biologyImportance: 1,
    chemistryImportance: 1,
    spatialDrawingImportance: 2,
    codingLogicImportance: 8,
    iconName: 'LineChart',
    roadmap: [
      'Strengthen Permutations & Combinations, Probability, Functions, and Matrices in 11-12.',
      'Target ISI, CMI, IIT BS Math/Data Science, or Actuarial (IFoA / IAI).',
      'Master Python (Pandas, NumPy, Scikit-Learn) and SQL.',
      'Participate in Kaggle competitions and financial modeling challenges.'
    ]
  },
  {
    id: 'medical-biotech',
    title: 'Medicine, Healthcare & Biotechnology',
    category: 'medical',
    badge: 'Life Sciences • High Biology Need',
    tagline: 'Heal human lives through surgery, diagnostics, and biomedical therapeutics.',
    overview: 'Medicine, surgery, and pharmacology center entirely on human anatomy, physiology, cellular biology, and organic chemistry. Heavy memorization and clinical observation required; minimal advanced engineering math needed.',
    whyFitsMathHigh: 'NOTE FOR HIGH-MATH STUDENTS: If your math score is high but your biology/chemistry scores are low, traditional medicine (MBBS) may feel challenging due to high biological memorization. However, Bioinformatics or Biomedical Engineering uniquely bridges both!',
    entranceExams: ['NEET-UG (National Eligibility cum Entrance Test)'],
    duration: '5.5 Years (MBBS + Internship) or 4 Years (B.Pharm / B.Tech Biotech)',
    eligibility: '10+2 with Physics, Chemistry, and Biology/Biotechnology (PCB) with min 50% in PCB aggregate.',
    topColleges: ['AIIMS New Delhi & Rishikesh', 'CMC Vellore', 'JIPMER Puducherry', 'KGMU Lucknow', 'Grant Medical College Mumbai'],
    jobRoles: ['Physician / Surgeon', 'Biotech Researcher', 'Clinical Pharmacologist', 'Hospital Administrator', 'Radiology Specialist'],
    averageSalary: '₹8 - 25 LPA (Scales with MD/MS specialization)',
    growthOutlook: 'Constantly High (Healthcare is evergreen)',
    keySubjects: ['Human Anatomy', 'Physiology & Biochemistry', 'Pathology & Microbiology', 'Pharmacology', 'Genetics'],
    mathImportance: 3,
    biologyImportance: 10,
    chemistryImportance: 9,
    spatialDrawingImportance: 4,
    codingLogicImportance: 3,
    iconName: 'HeartPulse',
    roadmap: [
      'Class 11-12: Intense focus on NCERT Biology (Botany & Zoology) and Chemistry.',
      'Appear for NEET-UG and secure state/national rank.',
      'Complete 4.5 years MBBS followed by 1 year compulsory rotating clinical internship.',
      'Pursue NEET-PG for MD/MS specialization.'
    ]
  }
]

export const STUDY_NOTES: StudyNoteItem[] = [
  {
    id: 'note-arch-01',
    title: 'Architectural Perspective & 3D Spatial Geometry',
    sectorId: 'architecture',
    subject: 'Architecture & Design',
    level: '11th-12th',
    difficulty: 'Intermediate',
    readTime: '8 min read',
    description: 'Master 1-point, 2-point, and 3-point perspective projection, horizon lines, vanishing points, and orthographic views essential for NATA and B.Arch aptitude.',
    keyFormulasAndConcepts: [
      'Horizon Line (Eye Level): The horizontal line across the viewer\'s sight plane.',
      'Vanishing Points (VP): Points on the horizon line where parallel receding lines converge.',
      'Station Point (SP): The fixed observer vantage position.',
      'Cone of Vision: Usually 60 degrees to prevent perspective distortion.'
    ],
    contentMarkdown: `## Architectural Perspective & Spatial Drawing

### 1. Fundamentals of Perspective
Perspective is a graphic technique used to represent 3D objects and space on a 2D surface, reproducing the way human vision perceives depth and scale.

#### A. One-Point Perspective (Parallel Perspective)
- Used when viewing rooms directly facing a wall or long straight corridors/streets.
- All horizontal lines stay horizontal, all vertical lines stay vertical.
- All depth lines (orthogonal lines) converge towards a single **Central Vanishing Point (VP)** on the horizon line.

#### B. Two-Point Perspective (Angular Perspective)
- Used when viewing buildings from an angle (corner view).
- Vertical lines remain vertical.
- Receding planes converge to **two separate vanishing points** (Left VP and Right VP) along the horizon line.

### 2. Geometry for Architectural Aptitude
- **Scale and Proportion:** The Golden Ratio (phi ≈ 1.618) governs natural harmony in architectural facades (e.g., Parthenon).
- **Plan, Elevation & Section:**
  - *Plan:* Top view cut at window sill level (approx 1.2m above floor).
  - *Elevation:* Flat 2D orthographic projection of the exterior face.
  - *Section:* Vertical slice showing structural thickness, slab heights, and stairways.

### 3. NATA & JEE Paper 2 Quick Cheatsheet
- Keep shadows consistent: Establish one single light source (Sun) angle for all casts.
- Human figures give scale: Always draw human silhouettes at proper proportions to doorways and steps.`,
    downloadFileName: 'Architectural_Perspective_Notes.pdf',
    tags: ['Architecture', 'Perspective', 'NATA', 'Geometry', 'Spatial Design']
  },
  {
    id: 'note-math-01',
    title: 'Differential Calculus & Real-World Engineering Applications',
    sectorId: 'computer-engineering',
    subject: 'Mathematics',
    level: '11th-12th',
    difficulty: 'Advanced',
    readTime: '10 min read',
    description: 'Comprehensive engineering mathematics notes covering derivatives, maxima/minima, rate of change, and optimization in engineering models.',
    keyFormulasAndConcepts: [
      'Derivative Definition: f\'(x) = lim(h->0) [f(x+h) - f(x)] / h',
      'Chain Rule: d/dx [f(g(x))] = f\'(g(x)) * g\'(x)',
      'First Derivative Test: f\'(x) = 0 indicates critical points (slopes of tangent = 0).',
      'Second Derivative Test: f\'\'(x) < 0 indicates local maximum; f\'\'(x) > 0 indicates local minimum.'
    ],
    contentMarkdown: `## Differential Calculus for Engineering & Technology

### 1. Core Principles of Derivatives
Derivatives quantify instantaneous rates of change. In computer science, derivatives drive gradient descent in Artificial Intelligence; in civil engineering, they define shear forces along structural beams.

### 2. Essential Derivative Formulas
- d/dx [x^n] = n * x^(n-1)
- d/dx [e^x] = e^x
- d/dx [ln(x)] = 1/x
- d/dx [sin(x)] = cos(x)
- d/dx [cos(x)] = -sin(x)
- Product Rule: d/dx [u * v] = u\' * v + u * v\'
- Quotient Rule: d/dx [u / v] = (u\' * v - u * v\') / (v^2)

### 3. Engineering Optimization (Maxima & Minima)
Engineering design constantly seeks to maximize efficiency and minimize cost/weight:
1. Formulate the objective function $F(x)$ in terms of a single variable $x$.
2. Compute the first derivative $F'(x)$ and set $F'(x) = 0$ to find critical values.
3. Test $F''(x)$: If negative, it is an absolute maximum; if positive, an absolute minimum.

### 4. Connection to Coding & Algorithms
- Gradient Descent in AI: $W_{new} = W_{old} - \\alpha \\cdot \\nabla L(W)$
- Without differential calculus, neural network backpropagation would not exist!`,
    downloadFileName: 'Engineering_Calculus_Notes.pdf',
    tags: ['Calculus', 'Derivatives', 'Engineering Math', 'Optimization', 'Algorithms']
  },
  {
    id: 'note-cse-01',
    title: 'Data Structures & Algorithmic Complexity (Big-O)',
    sectorId: 'computer-engineering',
    subject: 'Computer Science',
    level: 'Undergraduate',
    difficulty: 'Intermediate',
    readTime: '7 min read',
    description: 'Learn computational thinking, asymptotic notation (O(1), O(log n), O(n), O(n log n)), Arrays, Linked Lists, Trees, and Graph fundamentals.',
    keyFormulasAndConcepts: [
      'Big-O: Worst-case upper bound of runtime growth as input size N grows to infinity.',
      'Binary Search: O(log N) runtime compared to Linear Search O(N).',
      'Array Access: O(1) random memory lookup by index.',
      'Hash Map Lookup: Average O(1) time complexity.'
    ],
    contentMarkdown: `## Data Structures & Computational Logic

### 1. Why Math Leads to Great Code
Computer Science is the child of mathematical logic. When you write an algorithm, you are constructing a formal proof that terminates in finite time with correct output.

### 2. Time Complexity Hierarchy
From fastest to slowest:
1. $O(1)$ - Constant Time (e.g., retrieving an element from array by index)
2. $O(\\log N)$ - Logarithmic Time (e.g., Binary Search in a sorted list)
3. $O(N)$ - Linear Time (e.g., scanning an array for maximum value)
4. $O(N \\log N)$ - Linearithmic Time (e.g., Merge Sort, Quick Sort)
5. $O(N^2)$ - Quadratic Time (e.g., nested loops, Bubble Sort)
6. $O(2^N)$ - Exponential Time (e.g., recursive Fibonacci without memoization)

### 3. Core Linear Data Structures
- **Array:** Contiguous block in memory. Fast lookup $O(1)$, slow insertion/deletion $O(N)$.
- **Stack:** LIFO (Last In First Out). Used for function call stacks and bracket balancing.
- **Queue:** FIFO (First In First Out). Used for print spoolers and breadth-first search.
- **Binary Search Tree (BST):** Left child < Root < Right child. Balanced trees provide $O(\\log N)$ search, insert, and delete.`,
    downloadFileName: 'Data_Structures_BigO_Cheatsheet.pdf',
    tags: ['Algorithms', 'Data Structures', 'Big-O', 'Computer Science', 'Coding']
  },
  {
    id: 'note-civil-01',
    title: 'Engineering Mechanics: Statics, Equilibrium & Forces',
    sectorId: 'civil-structural',
    subject: 'Civil & Mechanical Engineering',
    level: '11th-12th',
    difficulty: 'Intermediate',
    readTime: '9 min read',
    description: 'Free body diagrams, Newton\'s laws in static equilibrium, vector resolution of forces, and moment calculations for structural bridges and roofs.',
    keyFormulasAndConcepts: [
      'Conditions of Static Equilibrium: Σ Fx = 0, Σ Fy = 0, Σ M = 0',
      'Moment of a Force: M = Force * Perpendicular Distance (d)',
      'Lami\'s Theorem: For 3 concurrent coplanar forces in equilibrium: P/sin(α) = Q/sin(β) = R/sin(γ)',
      'Stress = Force / Area (σ = P / A); Strain = ΔL / L'
    ],
    contentMarkdown: `## Engineering Mechanics & Structural Statics

### 1. Vector Resolution of Forces
In structural engineering, forces acting on joints (trusses, pillars, cantilevers) are split into perpendicular orthogonal components:
- $F_x = F \\cdot \\cos(\\theta)$
- $F_y = F \\cdot \\sin(\\theta)$
- Resultant: $R = \\sqrt{F_x^2 + F_y^2}$

### 2. Moment & Rotational Equilibrium
A force does not just push or pull; if applied at a distance from a pivot point, it produces a rotational tendency called a **Moment**:
- Clockwise moments are balanced by counter-clockwise moments: $\\sum M_{pivot} = 0$.
- In bridge design, piers must resist both vertical dead loads (gravity) and horizontal wind/earthquake shear forces.

### 3. Truss Analysis (Method of Joints)
Trusses are frameworks made of straight structural members connected at pin joints:
- Tension members (ties) resist pulling forces.
- Compression members (struts) resist crushing forces and must be guarded against buckling.`,
    downloadFileName: 'Structural_Mechanics_Statics.pdf',
    tags: ['Civil', 'Mechanical', 'Statics', 'Forces', 'Structural Engineering']
  },
  {
    id: 'note-math-stats',
    title: 'Probability, Combinatorics & Statistical Modeling',
    sectorId: 'data-science-finance',
    subject: 'Statistics & Mathematics',
    level: '11th-12th',
    difficulty: 'Intermediate',
    readTime: '6 min read',
    description: 'Foundational probability theory, Bayes theorem, expected value, standard deviation, and normal distributions for high finance and data science.',
    keyFormulasAndConcepts: [
      'Probability of Event A: P(A) = Favorable Outcomes / Total Outcomes',
      'Bayes Theorem: P(A|B) = [P(B|A) * P(A)] / P(B)',
      'Permutations: nPr = n! / (n - r)! (Order matters)',
      'Combinations: nCr = n! / [r! * (n - r)!] (Order does not matter)',
      'Standard Deviation: σ = sqrt( Σ (x - μ)^2 / N )'
    ],
    contentMarkdown: `## Probability & Statistics for Data Science & Quant Finance

### 1. Combinatorics & Counting Logic
- **Permutation:** Arrangements where order is distinctive (e.g. ranking contestants, assigning passwords).
- **Combination:** Selections where group composition alone matters (e.g. choosing a committee of 4 from 10).

### 2. Conditional Probability & Bayes\' Rule
Bayes\' rule is the engine of machine learning spam filters and quantitative portfolio rebalancing:
$$P(Hypothesis|Evidence) = \\frac{P(Evidence|Hypothesis) \\cdot P(Hypothesis)}{P(Evidence)}$$
It updates prior beliefs with real evidence.

### 3. The Gaussian (Normal) Distribution
The Central Limit Theorem shows that the sum of independent random variables tends toward a bell curve (Normal distribution) regardless of the underlying distribution. In quantitative trading, risk volatility is modeled around deviations from the mean.`,
    downloadFileName: 'Probability_Stats_Cheatsheet.pdf',
    tags: ['Statistics', 'Probability', 'Finance', 'Data Science', 'Mathematics']
  }
]

export const YOUTUBE_LECTURES: YouTubeLectureItem[] = [
  {
    id: 'yt-3b1b-calc',
    title: 'Essence of Calculus (Chapter 1) - The Geometry of Derivatives',
    channel: '3Blue1Brown (Grant Sanderson)',
    sectorId: 'computer-engineering',
    subject: 'Mathematics',
    youtubeId: 'WUvTyaaNkzM',
    duration: '17:04',
    views: '8.4M views',
    description: 'Visually understand what a derivative is using geometry, area of circles, and smooth motion. Essential for any student who wants to fall in love with mathematics.',
    keyTakeaways: [
      'Visual intuition of d/dx through expanding geometric circles.',
      'Why tiny changes (dx) reveal instantaneous rates without division by zero.',
      'Building blocks for physics, machine learning, and structural engineering.'
    ],
    tags: ['Math', 'Calculus', '3Blue1Brown', 'Visual Math', 'Engineering']
  },
  {
    id: 'yt-arch-drawing',
    title: 'Architectural Drawing Tutorial - 2 Point Perspective Masterclass',
    channel: '30X40 Design Workshop',
    sectorId: 'architecture',
    subject: 'Architecture & Design',
    youtubeId: '3UQu7m1jG5g',
    duration: '14:22',
    views: '1.2M views',
    description: 'Professional architect Eric Reinholdt teaches how to set horizon lines, place vanishing points, and draft accurate structural elevations in 2-point perspective.',
    keyTakeaways: [
      'Proper station point positioning to avoid fish-eye perspective distortion.',
      'Techniques for measuring window bays and ceiling heights in deep space.',
      'Crucial practical skills for cracking NATA and JEE Paper 2 drawing sections.'
    ],
    tags: ['Architecture', 'Drawing', 'Perspective', 'NATA', 'Design']
  },
  {
    id: 'yt-cs50-intro',
    title: 'Harvard CS50 - Introduction to Computer Science & Algorithms',
    channel: 'CS50 / Harvard University',
    sectorId: 'computer-engineering',
    subject: 'Computer Science',
    youtubeId: '8mAITcNt710',
    duration: '2:14:00',
    views: '5.1M views',
    description: 'David J. Malan introduces computational thinking, binary notation, ASCII, algorithms, and how computers solve problems with pure mathematical logic.',
    keyTakeaways: [
      'How binary zeroes and ones encode instructions, text, and graphics.',
      'Algorithmic efficiency: How dividing phonebooks in half demonstrates O(log n).',
      'The foundational logic underlying software engineering and cyber systems.'
    ],
    tags: ['Computer Science', 'Harvard', 'Algorithms', 'Coding', 'Engineering']
  },
  {
    id: 'yt-eff-beam',
    title: 'Understanding and Analyzing Bending Moments & Shear Force Diagrams',
    channel: 'The Efficient Engineer',
    sectorId: 'civil-structural',
    subject: 'Civil & Mechanical Engineering',
    youtubeId: 'C-FEVzI8oe8',
    duration: '18:35',
    views: '3.6M views',
    description: 'A beautiful visual breakdown of how bridges, beams, and columns carry weight and how to calculate Shear Force (SFD) and Bending Moment Diagrams (BMD).',
    keyTakeaways: [
      'Internal resisting forces inside steel and concrete structures.',
      'Differential relationship between distributed load, shear force, and bending moment: V = dM/dx.',
      'Real-world failure points and why structural safety factors exist.'
    ],
    tags: ['Civil Engineering', 'Structural Mechanics', 'Beams', 'Forces', 'Physics']
  },
  {
    id: 'yt-real-rocket',
    title: 'How Rockets Work - The Rocket Equation & Orbital Mechanics',
    channel: 'Real Engineering',
    sectorId: 'mechanical-robotics',
    subject: 'Aerospace & Mechanical',
    youtubeId: '1yBwTmt_2TQ',
    duration: '16:48',
    views: '4.8M views',
    description: 'Explore Tsiolkovsky\'s rocket equation, specific impulse (Isp), delta-V, and the calculus that takes space shuttles and satellites to orbit.',
    keyTakeaways: [
      'Mathematical derivation of the rocket equation using conservation of momentum.',
      'Why staging is mathematically required to reach orbital velocity.',
      'Direct application of differential calculus and fluid kinematics.'
    ],
    tags: ['Aerospace', 'Mechanical', 'Physics', 'Space', 'Calculus']
  },
  {
    id: 'yt-3b1b-linalg',
    title: 'Essence of Linear Algebra - Vectors, Matrices & 3D Transformations',
    channel: '3Blue1Brown',
    sectorId: 'data-science-finance',
    subject: 'Mathematics',
    youtubeId: 'fNk_zzaMoSs',
    duration: '9:52',
    views: '6.7M views',
    description: 'Visualizing vectors not just as arrows or lists of numbers, but as spatial transformations. The bedrock for computer graphics, game physics, and AI.',
    keyTakeaways: [
      'Linear combinations, span, and basis vectors in 2D and 3D space.',
      'Matrix multiplication as composition of spatial transformations.',
      'Direct relevance to 3D architectural rendering and AI matrix math.'
    ],
    tags: ['Linear Algebra', 'Vectors', 'Matrices', 'Data Science', 'Graphics']
  }
]

export interface AnalyzerInput {
  qualification: string
  yearOrTarget: string
  marks: {
    math: number
    physics: number
    chemistry: number
    biology: number
    computerScience: number
    drawingAesthetics: number
    englishLang: number
    socialOrCommerce: number
  }
  interests: string[]
  desiredSector?: string
}

export interface RecommendationResult {
  sector: CareerSector
  matchPercentage: number
  reasons: string[]
  academicFitNotes: string
  divergenceHighlight?: string
}

export function analyzeStudentProfile(input: AnalyzerInput): {
  recommendations: RecommendationResult[]
  primaryHighlight: string
  isMathSignificantlyHigher: boolean
  mathAvgDivergence: number
} {
  const { marks, interests } = input
  const math = marks.math || 0
  const physics = marks.physics || 0
  const chemistry = marks.chemistry || 0
  const biology = marks.biology || 0
  const cs = marks.computerScience || 0
  const drawing = marks.drawingAesthetics || 0
  const nonMathAvg = (physics + chemistry + biology + marks.englishLang + marks.socialOrCommerce) / 5

  const mathDivergence = math - nonMathAvg
  const isMathSignificantlyHigher = math >= 75 && (math - Math.min(chemistry, biology) >= 20 || math - nonMathAvg >= 15)

  const scoredSectors = CAREER_SECTORS.map((sector) => {
    let score = 50 // Base

    // Math alignment
    const mathDelta = Math.abs(math - (sector.mathImportance * 10))
    score += Math.max(0, 30 - mathDelta * 0.5)

    // Specific sector boosts
    if (sector.id === 'architecture') {
      if (math >= 75) score += 20
      if (drawing >= 60) score += 20
      if (biology < 60) score += 10 // Not needing bio is a plus
      if (interests.some(i => i.toLowerCase().includes('building') || i.toLowerCase().includes('design') || i.toLowerCase().includes('structure') || i.toLowerCase().includes('draw'))) {
        score += 25
      }
    } else if (sector.id === 'computer-engineering') {
      if (math >= 75) score += 25
      if (cs >= 70) score += 20
      if (biology < 60) score += 10
      if (interests.some(i => i.toLowerCase().includes('code') || i.toLowerCase().includes('software') || i.toLowerCase().includes('algorithm') || i.toLowerCase().includes('logic'))) {
        score += 25
      }
    } else if (sector.id === 'civil-structural') {
      if (math >= 70 && physics >= 65) score += 22
      if (drawing >= 60) score += 12
      if (biology < 60) score += 8
      if (interests.some(i => i.toLowerCase().includes('structure') || i.toLowerCase().includes('bridge') || i.toLowerCase().includes('site') || i.toLowerCase().includes('building'))) {
        score += 22
      }
    } else if (sector.id === 'mechanical-robotics') {
      if (math >= 70 && physics >= 70) score += 25
      if (biology < 60) score += 8
      if (interests.some(i => i.toLowerCase().includes('machine') || i.toLowerCase().includes('robot') || i.toLowerCase().includes('car') || i.toLowerCase().includes('motion'))) {
        score += 24
      }
    } else if (sector.id === 'data-science-finance') {
      if (math >= 85) score += 30
      if (cs >= 65) score += 15
      if (biology < 60) score += 10
      if (interests.some(i => i.toLowerCase().includes('math') || i.toLowerCase().includes('puzzle') || i.toLowerCase().includes('finance') || i.toLowerCase().includes('stat'))) {
        score += 25
      }
    } else if (sector.id === 'medical-biotech') {
      if (biology >= 80 && chemistry >= 75) score += 35
      if (math > 80 && biology < 50) score -= 30 // Penalize if strong in math but very low in bio
      if (interests.some(i => i.toLowerCase().includes('doctor') || i.toLowerCase().includes('health') || i.toLowerCase().includes('human') || i.toLowerCase().includes('biology'))) {
        score += 30
      }
    }

    // Direct desired sector boost
    if (input.desiredSector && sector.id === input.desiredSector) {
      score += 15
    }

    // Clamp score between 40 and 99
    const matchPercentage = Math.min(99, Math.max(45, Math.round(score * 0.65)))

    const reasons: string[] = []
    if (sector.id === 'architecture') {
      reasons.push(`High analytical Mathematics (${math}%) matches geometric & spatial modeling requirements.`)
      if (drawing >= 65) reasons.push(`Strong visual aptitude (${drawing}%) makes you a natural fit for architectural drafting.`)
      if (biology <= 60) reasons.push(`Requires zero biological memorization, playing directly to your logical and spatial strengths.`)
    } else if (sector.id === 'computer-engineering') {
      reasons.push(`Strong Mathematical aptitude (${math}%) is the core prerequisite for algorithms & computation.`)
      reasons.push(`Focuses purely on algorithmic problem-solving rather than rote fact memorization.`)
      if (cs >= 60) reasons.push(`Demonstrated interest in computing (${cs}% score) provides an early head start.`)
    } else if (sector.id === 'civil-structural') {
      reasons.push(`Combines your Mathematics (${math}%) with physical mechanics and tangible infrastructure.`)
      reasons.push(`Minimal dependence on non-math subjects like chemistry or biology.`)
    } else if (sector.id === 'data-science-finance') {
      reasons.push(`Capitalizes on your top Math capability (${math}%) in probability, matrix algebra & predictive data.`)
      reasons.push(`One of the highest-paying domains worldwide for pure mathematical minds.`)
    } else {
      reasons.push(`Matches your interest profile and analytical score distribution.`)
    }

    let academicFitNotes = `Evaluated based on your score in Mathematics (${math}%), Physics (${physics}%), and interest selections.`
    if (isMathSignificantlyHigher && sector.id !== 'medical-biotech') {
      academicFitNotes += ` Since your math performance outperforms other subjects, this sector provides maximum leverage with zero friction from low biology/chemistry requirements.`
    }

    let divergenceHighlight = undefined
    if (isMathSignificantlyHigher) {
      divergenceHighlight = `Detected Math Dominance: Your Math score (${math}%) is significantly higher than other subjects (average: ${Math.round(nonMathAvg)}%). We prioritized sectors like ${sector.title} where pure mathematical logic rules!`
    }

    return {
      sector,
      matchPercentage,
      reasons,
      academicFitNotes,
      divergenceHighlight
    }
  })

  // Sort descending by match percentage
  scoredSectors.sort((a, b) => b.matchPercentage - a.matchPercentage)

  let primaryHighlight = 'Balanced Academic Profile: We evaluated your aptitude across all technical sectors.'
  if (isMathSignificantlyHigher) {
    primaryHighlight = `🎯 Special Analysis: We noticed you are exceptionally strong in Mathematics (${math}%), while scoring lower in other subjects (like Biology ${biology}% or Chemistry ${chemistry}%). We prioritized sectors like Architecture, Computer Science, and Data Science where advanced mathematics and spatial logic are prized and biological rote memorization is never required!`
  }

  return {
    recommendations: scoredSectors,
    primaryHighlight,
    isMathSignificantlyHigher,
    mathAvgDivergence: Math.round(mathDivergence)
  }
}
