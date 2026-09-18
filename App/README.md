# Arohan SEE (आरोहण SEE) — Complete Interaction Flow, Screen Wiring & Navigation Architecture Specification

**Specification Version:** 2.0.0 (Production Wiring Ready)  
**Target Platform:** Mobile App & Desktop Cockpit Dual Experience  
**Core Purpose:** Comprehensive routing graph, state transitions, trigger element wiring, modal interactions, parameter passing, and recovery loop paths for downstream AI agent screen wiring and prototype linking.

---

## 1. Global Information Architecture & Navigation Schema

Arohan SEE uses a **dual-role, state-synchronized architecture** with two primary operational modes: **Candidate (Student)** and **Examiner (Teacher)**.

```
                                 ┌───────────────────────────────┐
                                 │      UNIVERSAL LOGIN GATEWAY  │
                                 │     (Screen 57 / Desktop 4)   │
                                 └───────────────┬───────────────┘
                                                 │
                        ┌────────────────────────┴────────────────────────┐
                        │ Role Switcher Toggle                            │
                        ▼                                                 ▼
      ┌───────────────────────────────────┐             ┌───────────────────────────────────┐
      │       STUDENT EXPERIENCE          │             │        TEACHER EXPERIENCE         │
      │       (Role: Student Aspirant)    │             │        (Role: Senior Examiner)    │
      └─────────────────┬─────────────────┘             └─────────────────┬─────────────────┘
                        │                                                 │
        ┌───────────────┼───────────────┐                 ┌───────────────┼───────────────┐
        ▼               ▼               ▼                 ▼               ▼               ▼
     [Home]        [Subjects]       [Practice]       [Dashboard/     [Notes Studio]   [Q-Bank &
    (Screen 53)    (Screen 61)     (Screen 56)        Q-Studio]       (Screen 46)     Moderation]
        │               │                                (Screen 59)          │       (Screen 42)
        ▼               ▼                                     │               │            │
    [Progress]       [Tests &                                 ▼               ▼            ▼
   (Screen 64)      Diagnostics]                         [Cohort PTM]    [Curriculum   [AI Script
   [Profile &       (Screen 58)                          (Screen 48)     SSOT Base]   Calibration]
    Settings]           │                                                     │       (Screen 44)
  (50 & 60)             ▼                                                     ▼            │
                 [Active Exam HUD] ───────────────────────────────────────────────► [Faculty Sign-off]
                    (Screen 65)
                        │
                        ▼
                [AI Insights & Diagnostic] (Screen 54 & 51)
                        │
                        ▼
                [Targeted Recovery Sortie] (Loopback to Screen 56)
```

---

## 2. Global Persistent Navigation Rails & Shell Wiring

### 2.1 Student Global Bottom Navigation Bar (Mobile Shell)
Present on: `Screen 53`, `Screen 61`, `Screen 56`, `Screen 58`, `Screen 64`, `Screen 50`, `Screen 60`.

| Nav Tab | Icon | Label | Destination Screen | Active Condition / Route State | Parameters Passed |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tab 1** | `heroicons:home` | Home | **Screen 53** (`Student Home`) | `route == '/student/home'` | `{ candidateId: "SEE-2081-0492", streak: 5 }` |
| **Tab 2** | `heroicons:book-open` | Subjects | **Screen 61** (`Subjects Listing`) | `route.startsWith('/student/subjects')` | `{ activeSyllabusFilter: "all" }` |
| **Tab 3** | `heroicons:bolt` | Practice | **Screen 56** (`Practice Drill Sortie`) | `route == '/student/practice'` | `{ sortieMode: "quick-fire", qIndex: 4 }` |
| **Tab 4** | `heroicons:clock` | Tests | **Screen 58** (`Tests & Evaluation Hub`) | `route.startsWith('/student/tests')` | `{ viewMode: "all-tests" }` |
| **Tab 5** | `heroicons:chart-bar`| Progress | **Screen 64** (`Progress & Achievements`)| `route == '/student/progress'` | `{ cohortBenchmarked: true }` |

**Global Header Micro-Interactions (Student):**
- **Streak Pill (`🔥 5`):** Tap triggers `Modal: StreakFreezeDetails` (shows 5-day active streak, 1 shield remaining, daily recovery clock).
- **Notification Bell (`🔔`):** Tap triggers `Drawer: ExaminerBroadcasts` (shows 2 audio memos from Ramesh Sir).
- **Candidate Avatar (`Subham Shrestha`):** Tap navigates directly to **Screen 50** (`Student Profile`).

---

### 2.2 Teacher Global Bottom Navigation Bar (Mobile Shell)
Present on: `Screen 59`, `Screen 46`, `Screen 42`, `Screen 48`, `Screen 63`.

| Nav Tab | Icon | Label | Destination Screen | Active Condition / Route State | Parameters Passed |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tab 1** | `heroicons:squares-2x2`| Dashboard | **Screen 59** (`Teacher Dashboard & Q-Studio`) | `route == '/teacher/dashboard'` | `{ facultyId: "TCH-2081-0894" }` |
| **Tab 2** | `heroicons:book-open`  | Notes Studio | **Screen 46** (`Curriculum SSOT Studio`) | `route == '/teacher/notes'` | `{ activeUnit: 12, subject: "Compulsory Science" }` |
| **Tab 3** | `heroicons:folder`     | Q-Bank | **Screen 42** (`Unified Question Bank Hub`) | `route == '/teacher/qbank'` | `{ tab: "drafts", count: 4 }` |
| **Tab 4** | `heroicons:chart-bar`  | Analytics | **Screen 48** (`Cohort Performance & PTM`) | `route == '/teacher/cohort'` | `{ section: "10-A", cohortSize: 34 }` |
| **Tab 5** | `heroicons:adjustments-horizontal` | Settings | **Screen 63** (`Teacher Profile & Settings`) | `route == '/teacher/settings'` | `{ verificationThreshold: 70 }` |

---

## 3. End-to-End Screen Wiring & User Flow Graphs

### Flow 1: Authentication, Role Handoff & Session Bootstrap
*Entrypoint: Screen 57 (Mobile) / Screen 4 (Desktop)*

```
[Screen 57: Universal Gateway]
   │
   ├── Trigger: Tap "Student Aspirant" Segment Tab
   │      └── Updates state: `authRole = 'student'`; sets input placeholder to "SEE-2081-0492"
   │
   ├── Trigger: Tap "Teacher / Examiner" Segment Tab
   │      └── Updates state: `authRole = 'teacher'`; sets input placeholder to "TCH-2081-XXXX"
   │
   ├── Trigger: Input SEE Symbol ID + PIN (6 Digits)
   │      └── Validates format: Regex `/^SEE-\d{4}-\d{4}[A-Z]?$/`
   │
   ├── Trigger: Tap "Launch SEE Journey →" Button
   │      ├── IF `authRole == 'student'`:
   │      │     └── Slide Transition Right ──► [Screen 53: Student Home Dashboard]
   │      │
   │      └── IF `authRole == 'teacher'`:
   │            └── Slide Transition Right ──► [Screen 59: Teacher Dashboard]
   │
   ├── Trigger: Tap "School Google" SSO
   │      └── OAuth2 Handshake (Google Workspace for Ed) ──► Direct into authenticated role home
   │
   └── Trigger: Tap "Register with School Code" Link
          └── Bottom Sheet Modal: School Registration with CDC Token
```

---

### Flow 2: Student Learning Progression, Unit Deep-Dive & Notes
*Route: Screen 53 ──► Screen 61 ──► Screen 52 ──► Screen 55 ──► Screen 62*

```
[Screen 53: Student Home Dashboard]
   │
   ├── Trigger: Tap "Continue Learning: Hydrocarbon and its Compounds" Card
   │      └── Slide Transition ──► [Screen 55: Chapter Detail — Hydrocarbon Learning Journey]
   │            └── Carries: `{ unitId: 12, subject: "Science", progress: "68%" }`
   │
   ├── Trigger: Tap "Needs Attention: Organic Compounds (Practice Now ⚡)"
   │      └── Direct Jump ──► [Screen 56: Practice Drill (Question 04/10)]
   │
   └── Trigger: Tap Bottom Nav "Subjects" (Tab 2)
          └── Fade Transition ──► [Screen 61: Subjects Matrix]
                 │
                 ├── Trigger: Filter Pill "Compulsory (6)"
                 │      └── Filters list to only compulsory CDC board subjects
                 │
                 └── Trigger: Tap "Compulsory Science (Explore Chapters →)"
                        └── Slide Transition ──► [Screen 52: Science Chapter Listing]
                               │
                               ├── Trigger: Toggle "Prioritize Board High-Yield Units"
                               │      └── Re-orders chapter list by CDC 2081 mark weight (Ch 12 & Ch 5 first)
                               │
                               ├── Trigger: Tap "Ch. 12 Hydrocarbon & its Compounds (Resume Chapter →)"
                               │      └── Slide Transition ──► [Screen 55: Chapter Detail Journey]
                               │             │
                               │             ├── Trigger: Tactical Sortie Path "1. Learn (4/6 Docs)"
                               │             │      └── Scrolls to "Curriculum Flight Notes"
                               │             │
                               │             └── Trigger: Tap "4. Saturated vs Unsaturated Hydrocarbons (Read 60%)"
                               │                    └── Slide Transition ──► [Screen 62: Smart Notes Studio]
                               │                           │
                               │                           ├── Trigger: Tap Audio Player Icon (🔊 8 min)
                               │                           │      └── Opens sticky mini-player with Ramesh Sir audio
                               │                           │
                               │                           ├── Trigger: Tap "Tap to inspect" on Comparison Matrix
                               │                           │      └── Opens side-by-side Alkane vs Alkene vs Alkyne breakdown
                               │                           │
                               │                           ├── Trigger: Toggle "Topic 4 Marked as Understood"
                               │                           │      └── Confirms +25 Mastery XP toast alert
                               │                           │
                               │                           └── Trigger: Tap "Ready for Practice? Launch 5-Question Drill →"
                               │                                  └── Instant Transition ──► [Screen 56: Practice Drill Sortie]
```

---

### Flow 3: Adaptive Practice Drills & Instant Diagnostic Feedback
*Route: Screen 56 ──► Screen 62 / Screen 54*

```
[Screen 56: Practice Drill & Instant Feedback]
   │
   ├── State: Question 04 / 10 | Timer: 01:27 (Countdown) | Mode: Group B (2 Marks)
   │
   ├── Trigger: Tap Option Card "C: Ethene (C₂H₄ • Unsaturated Alkene)"
   │      ├── Radio selection state changes to `SELECTED` (Solid blue fill + Checkmark)
   │      ├── Triggers immediate answer validation:
   │      │     ├── Card transitions to Green/Blue Success Glow
   │      │     ├── "Target Acquired! Correct 🎉 (+20 Mastery XP)" banner slides in
   │      │     ├── Authoritative CDC Curriculum Rationale unlocks below
   │      │     ├── Bromine decolorization chemical equation renders with SVG flask visual
   │      │     └── Ramesh Sir Examiner Tip (Group B) reveals
   │      │
   │      └── Options A, B, D disabled with muted opacity
   │
   ├── Trigger: Tap "Explain Concept ✨"
   │      └── Opens contextual bottom-sheet explaining Pi-bond cleavage
   │
   ├── Trigger: Tap "Saved to Drills" (Bookmark icon)
   │      └── Adds Question #04 to student's offline "Error & High-Yield Vault"
   │
   └── Trigger: Tap "Next Question (Q05) →"
          ├── IF `qIndex < 10`:
          │     └── Re-renders Screen 56 with Question 05, increments streak to 4 (+50 XP bonus)
          │
          └── IF `qIndex == 10` (Drill Complete):
                └── Full Screen Modal: Drill Completion Summary (+100 XP, Hydrocarbons Badge unlocked)
```

---

### Flow 4: Summative Board Mock Exam & Active Cockpit HUD
*Route: Screen 58 ──► Screen 65 ──► Screen 54 ──► Screen 51 ──► Recovery Loop*

```
[Screen 58: Tests & Summative Evaluation Hub]
   │
   ├── Trigger: Tap "Start Evaluation Now →" on Featured Banner (Units 1 to 4 Cumulative)
   │      └── Launches Exam Countdown Modal (Instructions, Camera check for handwritten scans)
   │            └── Tap "Begin 45-Min Timed Exam" ──► [Screen 65: Active Test Cockpit HUD]
   │
   └── Trigger: Tap "CDC Specification Model Set 2081 — Compulsory Science"
          └── Launches full 3-hour simulator (75 Marks)

[Screen 65: Active Test Cockpit HUD]
   │
   ├── State: Question 12 / 25 | Timer: 01:14:19 (Urgent Clock) | Group C (3 Marks)
   │
   ├── Trigger: Tap Question Index Bubble (e.g. 1 to 25)
   │      └── Smooth auto-scrolls question viewport to selected item; status indicators:
   │            - Blue: Answered
   │            - Orange: Flagged for Review
   │            - Grey: Blank / Pending
   │
   ├── Trigger: Tap Input Mode Switcher
   │      ├── Option "⌨️ Type Answer" (Active):
   │      │     ├── Unlocks scientific symbol inserter bar (`=`, `≡`, `→`, `⇌`, `Δ`, `π`, `σ`, `sub`, `sup`)
   │      │     └── Real-time character count and "Formatting OK" validator
   │      │
   │      └── Option "📷 Scan Sheet":
   │            └── Opens native camera viewport with boundary snapping for pencil sketches
   │
   ├── Trigger: Checkbox "Flag for second pass verification"
   │      └── Changes Question 12 indicator on top index bar to Orange circle
   │
   ├── Trigger: Tap "Next Question (Q13) →"
   │      └── Saves draft answer to local SQLite cache (`Draft Autosaved` indicator pulses)
   │
   └── Trigger: Tap "Finish" (Top Right Red Button)
          └── Confirmation Modal: "Submit Unit 3 Summative Exam? 24 of 25 Answered, 1 Flagged"
                └── Confirm Submit ──► Loading Screen (4.2s Neural OCR Evaluation)
                      └── Auto-Route ──► [Screen 54: Test AI Insights & Expected Answers]
```

---

### Flow 5: Post-Exam Stepwise AI Diagnostic Audit & Remediation Loop
*Route: Screen 54 ──► Screen 51 ──► Targeted Recovery Sortie*

```
[Screen 54: Test AI Insights & Expected Answers]
   │
   ├── Header: Score 39/50 (78% Grade A) | Rank 4/34 in Cohort | 4.2s Diagnostic Badge
   │
   ├── Key Learning Gap Detected Banner:
   │      └── "Alkene/Alkyne Addition Reaction Proofs (Group C) — Lost 1.5 marks in Q12"
   │
   ├── Trigger: Tap Question 12 Audit Accordion
   │      ├── Expands candidate's submitted text vs CDC marking rubric criteria:
   │      │     - Criterion 1: Electronic Structure (+1.0 / 1.0) [Correct]
   │      │     - Criterion 2: Balanced Stepwise Equation (+0.5 / 1.0) [Partial]
   │      │     - Criterion 3: Catalyst & Conditions (0.0 / 1.0) [Missed Ni at 150-200°C]
   │      └── Displays Official CDC Model Scheme with color-coded syntax
   │
   ├── Trigger: Tap "Listen Voice Note (0:24s)" on Ramesh Sir Card
   │      └── Audio player streams personalized teacher feedback: "Remember Subham..."
   │
   ├── Trigger: Tap "Launch Targeted Recovery Drill (+30 XP)" [PRIMARY CTA]
   │      └── Instant Transition ──► Opens dynamic 5-question sortie covering strictly
   │            reaction conditions and catalytic temperatures to repair learning gap.
   │
   ├── Trigger: Tap "Discuss with Ramesh Sir"
   │      └── Opens Teacher Q&A messenger pre-populating Question 12 reference
   │
   └── Trigger: Tap "View Full Diagnostic Summary →"
          └── Slide Transition ──► [Screen 51: Test Results & Weak Area Diagnostic]
                 │
                 ├── Review Objective (36/40) vs Subjective (40/60) splits
                 ├── Time strategy audit (Warning: 14 mins spent on long questions vs 8 min budget)
                 └── Trigger: "Review Full Answer Sheet & Marking Scheme" (PDF View)
```

---

### Flow 6: Student Profile, Achievements & Parent Telemetry
*Route: Screen 64 ──► Screen 50 ──► Screen 60*

```
[Screen 64: Student Progress & Achievement Center]
   │
   ├── 68% SEE Readiness Radar with projected 3.85 GPA target
   │
   ├── Trigger: Tap "Targeted Vulnerabilities: Priority Fix"
   │      └── Launch AI Recovery Sortie (15 Qs) covering Hydrocarbons & Circle Theorems
   │
   ├── Trigger: Tap "Subject Command Deck" rows (Science 74%, Math 62%, etc.)
   │      └── Navigates to corresponding subject detail in Screen 52
   │
   ├── Trigger: Tap "Generate Personalized Weekly Study Plan"
   │      └── Downloads automated 7-day revision schedule (PDF)
   │
   ├── Trigger: Tap "Export Performance Dossier for Ramesh Sir"
   │      └── Transmits progress telemetry directly to Teacher Calibration Console
   │
   └── Trigger: Tap Top Avatar ──► [Screen 50: Student Tactical Candidate Dossier]
          │
          ├── Displays candidate registration: Roll #14, CDC Code `0208149A`, Province 3
          │
          ├── Trigger: Tap "Mastery Badges: View All"
          │      └── Badges grid: First Model Exam, Chemistry Master, Night Owl Scholar
          │
          ├── Trigger: Tap "Guardian Telemetry: Configure"
          │      └── Expands automated WhatsApp/SMS dispatch setup for Sita Shrestha (Mother)
          │
          ├── Trigger: Tap "Edit Academic Target"
          │      └── Modal: Recalibrate Target GPA (3.60 to 4.00)
          │
          ├── Trigger: Tap "Download Official SEE Readiness Dossier (PDF)"
          │      └── Compiles comprehensive 3-page readiness certificate
          │
          └── Trigger: Tap Gear Icon (⚙️) ──► [Screen 60: Settings & Preferences]
                 │
                 ├── Target exam date: Chaitra 15, 2081 (42 Days Left)
                 ├── Toggle: Daily Sortie Quota (45 mins/day)
                 ├── Toggle: Audio Formula Pronunciation (Nepali & English)
                 ├── Toggle: Haptic Feedback on Drills
                 ├── Storage: Offline Cached Syllabi (12 Chapters, 48.2 MB)
                 └── Danger Zone: Terminate Session / Log Out ──► Redirects to Screen 57
```

---

### Flow 7: Teacher Dashboard, AI Question Studio & CDC Synthesis
*Route: Screen 59 ──► Screen 46 ──► Screen 42*

```
[Screen 59: Teacher Dashboard & AI Question Studio]
   │
   ├── Top KPI Bar: 34 Pupils (100% Active) | 68% Syllabus | 4 Urgent Reviews
   │
   ├── Urgent Banner: "AI Evaluation Calibration Required (Confidence 64%)"
   │      └── Trigger: Tap "Review Student Script & Adjust Score →"
   │             └── Direct Route ──► [Screen 44: AI Script Calibration Deck]
   │
   ├── AI Question Studio Module:
   │      ├── Dropdown 1: Select Subject (`Compulsory Science`)
   │      ├── Dropdown 2: Select Bloom Standard (`Medium-High • Bloom IV`)
   │      ├── Dropdown 3: Focus Unit (`Ch. 12: Hydrocarbon & its Compounds`)
   │      ├── Segmented Buttons: Pattern (`MCQ 1M` / `Short 2M` / `Long 4M`)
   │      │
   │      └── Trigger: Tap "Generate Next Batch with AI ✨"
   │             └── Generates live question draft with CDC marking points:
   │                   - 1.0M: Bond reactivity definition
   │                   - 1.5M: Electron cloud instability
   │                   - 1.5M: Structural formula & oxy-acetylene welding
   │
   ├── Draft Review Queue:
   │      ├── Trigger: Tap "Reject" ──► Discards draft
   │      ├── Trigger: Tap "Edit" ──► Inline modal to modify wording or marks
   │      └── Trigger: Tap "Approve to Bank" ──► Adds to live question registry
   │
   └── Trigger: Bottom Nav "Notes Studio" (Tab 2)
          └── Slide Transition ──► [Screen 46: Teacher Notes Studio (SSOT)]
                 │
                 ├── Displays 98.4% AI Question Vector Index
                 ├── Unit 12 Hydrocarbons: 100% Covered, 18 Active Questions
                 ├── Unit 5 Light & Refraction: Flagged "Needs Attention" (Incomplete diagram)
                 │
                 ├── Trigger: Tap "Open Note Editor"
                 │      └── Opens authoritative Markdown editor for classroom notes
                 │
                 └── Trigger: Tap "Gen AI Questions"
                        └── Automatically pre-populates Question Studio with this chapter
```

---

### Flow 8: Unified Question Bank & Moderation Review Deck
*Route: Screen 42 ──► Screen 59 / Student Dispatch*

```
[Screen 42: Unified Question Bank Hub]
   │
   ├── Tabs: [Draft Review (4)] | [Approved Bank (142)] | [Archived]
   │
   ├── Active Card: AI Draft #104 (Ch. 12 Hydrocarbons • 4 Marks • Bloom IV)
   │      ├── Originating link: Referenced from Teacher Note Ch.12 Topic 4
   │      ├── Trigger: Tap "Nepali View"
   │      │      └── Flips prompt to official Devanagari translation
   │      │
   │      ├── Attached Stimulus: Figure 12.4A (Bond Geometry) & Industrial Usage
   │      ├── CDC Step-by-Step Marking Rubric (Total: 4.0 Marks)
   │      │
   │      ├── Deployment Checkboxes:
   │      │      [x] Practice Sorties
   │      │      [x] Diagnostics
   │      │      [x] Mock 2081
   │      │
   │      └── Trigger: Tap "Approve & Publish" (Primary CTA)
   │             └── Instantly broadcasts question into student practice queues
   │
   ├── Approved Question Bank List:
   │      ├── Filter pills: All 142 | MCQ 42 | Short Qs 58 | Long Qs 32
   │      └── Item actions: View success rates, test usage count, edit tags
   │
   └── Trigger: Tap "Export Formatted Word / PDF for Print Exam"
          └── Compiles physical question paper matching Sanothimi board typography
```

---

### Flow 9: AI Evaluation Calibration Desk & Handwritten Script Review
*Route: Screen 44 ──► Score Sync to Student Transcript*

```
[Screen 44: AI Evaluation Calibration Deck]
   │
   ├── Context: Student Subham Shrestha (Roll #14) | Q14 Laboratory Prep of Methane Gas (5.0 Marks)
   │   Alert: AI Confidence 64% (Pencil diagram line contrast faint; delivery tube angle flagged)
   │
   ├── Candidate Handwritten Submission Viewport:
   │      ├── High-res photo of student handwritten answer script
   │      ├── OCR bounding boxes highlighted over apparatus sketch
   │      ├── Apparatus Geometry Verified badge
   │      └── Image controls: Zoom (+/-), Contrast Booster, Fullscreen
   │
   ├── Criteria Calibration Steppers:
   │      ├── Criterion 1: Balanced Reaction ──► [✓ 1.5 / 1.5] (100% Match)
   │      ├── Criterion 2: Apparatus Setup & Labels:
   │      │      - AI Provisional: 1.0 / 2.0
   │      │      - Trigger: Tap "+0.5" Stepper Button
   │      │      - Result: Updates to [1.5 / 2.0] ("Ramesh Sir Adjustment: +0.5 awarded")
   │      └── Criterion 3: Precaution & Collection ──► [0.5 / 1.5] (Candidate omitted gas solubility)
   │
   ├── Teacher Commentary & Voice Memo:
   │      ├── Text input: "Good diagram Subham, but remember delivery tube must not touch mixture."
   │      └── Trigger: Tap "Voice Dictation" ──► Records 15-second personalized audio note
   │
   ├── Bottom Grade Summary:
   │      └── Pre-Audit AI: 3.0 / 5.0  ──►  Calibrated Final Mark: 3.5 / 5.0
   │
   ├── Trigger: Tap "Confirm & Finalize Score (Lock Grade)" [PRIMARY ACTION]
   │      ├── Locks score into student official grade transcript
   │      ├── Transmits voice memo to Subham's post-test insight screen (Screen 54)
   │      ├── Updates class gradebook in Screen 48
   │      └── Advances queue to "Script 2 of 4 Pending"
   │
   └── Trigger: Tap "Request Model Re-evaluation"
          └── Sends teacher annotations back to fine-tune the OCR prompt weights
```

---

### Flow 10: Cohort Diagnostics, Hotspot Intervention & Parent Telemetry
*Route: Screen 48 ──► Parent SMS/WhatsApp & Remediation Sortie*

```
[Screen 48: Student Cohort Performance & Diagnostics Center]
   │
   ├── Header Metrics: Mean Accuracy 74.8% | Syllabus 68.0% | 4 At-Risk Students
   │
   ├── Critical Cohort Bottleneck Radar:
   │      └── "Organic Chemical Reaction Conditions (Ch. 12) — 41.0% Avg Accuracy"
   │            - 19 of 34 students tripped on dehydration temperatures
   │            - 44.1% correct, 41.2% wrong catalyst, 14.7% omitted temperature
   │            │
   │            └── Trigger: Tap "Push Targeted Class Sortie (10 Qs)"
   │                   └── One-click batch deployment: drops priority drill onto
   │                         all 19 affected students' daily home screen (Screen 53)
   │
   ├── Candidate Telemetry & Roster:
   │      ├── Segment Filter: [Needs Support (4)] | [Highest XP] | [Distinction Track]
   │      │
   │      ├── Card 1: Pooja Thapa (58% avg, 2 days inactive)
   │      │      └── Trigger: Tap "Nudge SMS / WhatsApp" ──► Direct message to parent Gopal Thapa
   │      │
   │      ├── Card 2: Ankit Tamang (54% avg, skipped geometry proofs 3x)
   │      │      └── Trigger: Tap "Assign Remediation Drill" ──► Schedules cyclic quad drill
   │      │
   │      └── Card 3: Subham Shrestha (78.4% avg, 5-day streak)
   │             └── Trigger: Tap "View Dossier" ──► Opens Screen 50
   │
   └── Parent-Teacher Meeting (PTM) Generator:
          └── Trigger: Tap "Download PTM Summary Report (PDF)"
                 └── Generates 34 individualized 2-page candidate dossiers
```

---

## 4. Comprehensive Trigger-Action-State Transition Matrix

This table lists every clickable interactive element, its source screen, user action, state mutation, and downstream destination screen:

| Source Screen | UI Element Selector | Action | Payload / State Change | Target Screen |
| :--- | :--- | :--- | :--- | :--- |
| **Screen 57** | `#role-student` | `click` | `authRole = 'student'` | In-place update |
| **Screen 57** | `#role-teacher` | `click` | `authRole = 'teacher'` | In-place update |
| **Screen 57** | `#btn-launch-gateway` | `click` | Auth token generated; load profile | `Screen 53` (Student) or `Screen 59` (Teacher) |
| **Screen 53** | `#card-continue-learning` | `click` | `unitId = 12`, `chapter = 'Hydrocarbon'` | `Screen 55` |
| **Screen 53** | `#card-needs-attention` | `click` | `mode = 'rapid-remedy'`, `subject = 'Chemistry'` | `Screen 56` |
| **Screen 53** | `#mission-finish-notes` | `click` | `noteId = 4`, `topic = 'Hydrocarbons'` | `Screen 62` |
| **Screen 53** | `#mission-practice-bio` | `click` | `unit = 'Living Beings'`, `count = 10` | `Screen 56` |
| **Screen 53** | `#nav-subjects` | `click` | Set active tab to Subjects | `Screen 61` |
| **Screen 53** | `#nav-tests` | `click` | Set active tab to Tests | `Screen 58` |
| **Screen 53** | `#nav-progress` | `click` | Set active tab to Progress | `Screen 64` |
| **Screen 61** | `#card-compulsory-science`| `click` | `subjectCode = 'SCI10'` | `Screen 52` |
| **Screen 61** | `#card-compulsory-math` | `click` | `subjectCode = 'MTH10'` | `Screen 52` (Filtered) |
| **Screen 52** | `#chapter-12-row` | `click` | `chapterId = 12` | `Screen 55` |
| **Screen 52** | `#btn-launch-mock` | `click` | Initialize mock test session | `Screen 65` |
| **Screen 55** | `#flight-note-topic-4` | `click` | `noteId = '12.4'` | `Screen 62` |
| **Screen 55** | `#btn-launch-drill` | `click` | `drillSetId = 'DS-12'` | `Screen 56` |
| **Screen 62** | `#btn-ready-practice` | `click` | `drillType = 'concept-check'` | `Screen 56` |
| **Screen 56** | `.option-card[data-opt='C']`| `click` | `selected = 'C'`, calculate score | In-place feedback |
| **Screen 56** | `#btn-next-question` | `click` | Increment `questionIndex` | `Screen 56` (Next) or Modal |
| **Screen 58** | `#btn-start-eval` | `click` | `testId = 'CUMULATIVE-U1-4'` | `Screen 65` |
| **Screen 65** | `.question-index-pill` | `click` | Jump to question index | In-place scroll |
| **Screen 65** | `#btn-next-question` | `click` | Save draft, load Q+1 | In-place transition |
| **Screen 65** | `#btn-finish-exam` | `click` | Trigger submission prompt | Submission Modal |
| Submission Modal | `#btn-confirm-submit` | `click` | Post answers to neural OCR API | `Screen 54` |
| **Screen 54** | `#btn-launch-recovery` | `click` | `focusTopic = 'Alkene Reaction Conditions'` | `Screen 56` (Recovery Mode) |
| **Screen 54** | `#btn-view-diagnostic` | `click` | Load complete rubric report | `Screen 51` |
| **Screen 50** | `#btn-edit-target` | `click` | Open target GPA modal | In-place modal |
| **Screen 50** | `#btn-settings-gear` | `click` | Load user configuration | `Screen 60` |
| **Screen 59** | `#card-calibration-alert`| `click` | `scriptId = 'SUBHAM-Q14'` | `Screen 44` |
| **Screen 59** | `#btn-gen-ai-batch` | `click` | Query Llama-3-SEE engine | In-place draft render |
| **Screen 59** | `#btn-approve-bank` | `click` | Save question to bank registry | `Screen 42` |
| **Screen 46** | `#btn-open-editor` | `click` | `unit = 12`, open Markdown edit | SSOT Markdown Editor |
| **Screen 42** | `#btn-approve-publish` | `click` | Distribute question to live feeds | Update Q-Bank count |
| **Screen 44** | `#btn-stepper-plus` | `click` | `score = score + 0.5` | In-place rubric recalculation |
| **Screen 44** | `#btn-lock-grade` | `click` | Commit score to database | `Screen 48` & syncs `Screen 54` |
| **Screen 48** | `#btn-push-class-sortie`| `click` | Broadcast drill to 19 candidates | Broadcast Toast confirmation |
| **Screen 48** | `#btn-nudge-parent` | `click` | Generate WhatsApp prefill payload | Native WhatsApp Web/App |
| **Screen 48** | `#btn-download-ptm-pdf` | `click` | Assemble 34 candidate reports | File download trigger |

---

## 5. Offline Resiliency, Caching & Data-Sync Specifications

To support low-bandwidth and intermittent connectivity across rural high schools in Nepal:

1. **Local SQLite Schema (IndexedDB / Mobile LocalStore):**
   - `cached_syllabi`: Full markdown of 12 compulsory chapters (Science, Math, English).
   - `offline_drills`: 250 pre-fetched practice items with verified CDC rationale.
   - `student_draft_vault`: Active exam responses, typed equations, and compressed base64 images of handwritten student scripts.
2. **Optimistic UI Updates:**
   - Score adjustments in `Screen 44` immediately update local candidate transcripts before network confirmation.
   - Streak counters in `Screen 53` increment instantly upon completion of Question 10.
3. **Background Sync Worker (`Sync Engine v4.2`):**
   - Polls every 90 seconds.
   - Syncs pending offline test submissions when connection reaches $\ge 2G$ threshold.
   - Reconciles teacher moderation adjustments and marks locked by Ramesh Sir.

---

## 6. Recommendations for Downstream AI Agent Screen Wiring

When wiring the interactive prototype in Figma or frontend code (HTML/React):
1. **Preserve Exact Color Tokens**: Maintain `#3b82f6` (Primary Blue), `#10b981` (Success Green), and `#ef4444` (Vulnerability Red).
2. **Maintain State Retention on Nav Tabs**: Switching between Tabs 1 through 5 must never reset in-progress drill states or active timers.
3. **Implement Bounding Box Overlays**: On Screen 44, ensure the student diagram container uses relative positioning with absolute SVG rectangle overlays for OCR verification labels.
4. **Modal Layering**: Modal dialogues (Streak Details, Confirmation, PTM Generator) must render at `z-index: 50` with an accessible backdrop blur (`backdrop-blur-sm bg-black/40`).
