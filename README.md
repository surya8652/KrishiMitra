# KrishiMitra AI (कृषीमित्र) & Student Career Hub 🌾🎓

A full-stack, multilingual agricultural intelligence and rural youth career exploration platform built with React 19, TypeScript, Tailwind CSS v4, and Vite.

---

## 🌟 Key Features

### 🎓 1. Student Career & Guidance Hub (`/students`)
Designed to guide high school and collegiate rural students through engineering, architecture, and technology pathways:
- **Intelligent Career Analyzer (`/students`)**:
  - Dynamically assesses marks across Mathematics, Physics, Chemistry, Biology, Computer Science, and English.
  - **Math-Dominant Bias Detection**: If a student is exceptional in Mathematics (≥75%) while scoring lower in Chemistry/Biology, the algorithm pinpoints streams where pure quantitative reasoning thrives (Architecture, Computer Science & AI, Data Science & Analytics, Civil Engineering) while steering away from pure biology/chemistry-heavy tracks.
  - **Strength & Gap Analysis**: Highlights academic strengths, potential bottlenecks, and compensatory preparation strategies.
  - **Printable Assessment Report**: Export personalized career analysis directly.
- **Curated Study Material & Notes (`/students/study-material`)**:
  - Subject-categorized study notes with formulas, concept cheat sheets, and downloadable markdown/PDF formats.
  - In-app interactive note reader modal with difficulty indicators.
- **Curated YouTube Lectures (`/students/youtube`)**:
  - Handpicked high-yield lectures from NPTEL, Khan Academy, MIT OCW, and top Indian educators.
  - In-app embedded YouTube player with key learning takeaways and external links.
- **Career Sectors & Engineering Dossiers (`/students/sectors`)**:
  - In-depth profiles for **Architecture (B.Arch)**, **Computer Science & AI**, **Civil Engineering**, **Mechanical & Robotics**, **Data Science**, and **Biomedical & Healthcare**.
  - Eligibility, premier entrance exams (JEE Main/Adv, NATA, NEET, GATE), top colleges (IITs, NITs, SPAs), and step-by-step career pathways.

---

### 🌾 2. Smart Farmer Dashboard & Telemetry (`/farmer`)
- **Smart Advisory & Field Telemetry**: Real-time soil moisture, weather forecast, N-P-K recommendation, and irrigation schedules.
- **Crop Disease AI Detection (`/farmer/disease`)**: Upload plant photos to detect pest/fungal pathogens and get organic + chemical treatment plans.
- **Mandi Price Live Ticker (`/farmer/prices`)**: Real-time mandi rates across Indian APMCs with price trend forecasting.
- **Farmer Marketplace (`/farmer/marketplace`)**: Direct farm-to-buyer crop listing and contact inquiries.
- **All-India Location Switcher**: State and district-level hyper-local agricultural profiling.

---

### 🌐 3. Multilingual Regional Support
KrishiMitra supports 8 Indian languages with seamless instant switching across all pages:
1. **English**
2. **हिंदी (Hindi)**
3. **मराठी (Marathi)**
4. **ગુજરાતી (Gujarati)**
5. **తెలుగు (Telugu)**
6. **தமிழ் (Tamil)**
7. **ಕನ್ನಡ (Kannada)**
8. **বাংলা (Bengali)**

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```
