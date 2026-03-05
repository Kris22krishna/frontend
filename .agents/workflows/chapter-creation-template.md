---
description: # 🏗️ Universal Chapter Creation Template
---

This template provides a technical blueprint for creating a new interactive chapter for **any grade** (e.g., Grade 6, 7, 10). 

> [!IMPORTANT]
> **Golden Reference:** All new chapters MUST be a visual and structural replica of the **The Other Side of Zero (Integers)** chapter located at `/Users/prasidh/Documents/frontend/frontend/src/components/practice/grade-6/the-other-side-of-zero` and its hub logic in `/Users/prasidh/Documents/frontend/frontend/src/components/Math-Branches/Integers`. Use this as your primary source of truth for UI, animations, and layout.

---

## 📂 1. Directory Structure

Create a new directory under `src/components/practice/grade-[Grade]/[ChapterName]/`. 
*(Note: Use `grade-6` for Grade 6, `grade-8` for Grade 8, etc.)*

We recommend establishing a central Hub folder inside your chapter directory if applicable, to isolate routing and logic.

```text
[ChapterName]/
├── Hub/
│   ├── [ChapterName]Hub.jsx                 # REPLICA OF: IntegersHub.jsx
│   ├── [ChapterName]Skills.jsx              # REPLICA OF: IntegersSkills.jsx (with scrollable list & detail inline view)
│   └── [ChapterName]Topic.jsx               # Universal wrapper for assess/practice (REPLICA OF: LinesAndAnglesTopic.jsx pattern)
├── [ChapterName].css                        # Styles (REPLICA OF: theOtherSideOfZero.css + integers.css)
├── [Topic1].jsx                             # REPLICA OF: ComparingIntegers.jsx
├── [Topic2].jsx                             # REPLICA OF: AdditionOfIntegers.jsx
└── DeepDive/
    └── Tests/                        
        ├── [ChapterName]EasyTest.jsx     
        ├── [ChapterName]MediumTest.jsx   
        └── [ChapterName]HardTest.jsx     
```

---

## 🧩 2. Design Pillars (The "Grade 6 Integers" Standard)

### A. The Split-Panel Hub (`[ChapterName]Hub.jsx`)
- **Reference File:** [IntegersHub.jsx](file:///Users/prasidh/Documents/frontend/frontend/src/components/Math-Branches/Integers/IntegersHub.jsx)
- **Layout:** Left panel for the "Hero" content (Title, Tagline, Stats) and Right panel for the "Module Cards".
- **Styling:** Always use `.int-fullpage`, `.int-left`, `.int-right` mapped out in the equivalent of `integers.css`. Ensure `min-height: 100vh;` for the `.int-fullpage` container.

### B. Skill-Based Practice (`[ChapterName]Skills.jsx`)
- **Reference File:** [IntegersSkills.jsx](file:///Users/prasidh/Documents/frontend/frontend/src/components/Math-Branches/Integers/Topics/Skills/IntegersSkills.jsx) (or `LinesAndAnglesSkills.jsx`)
- **Pattern:** A skill picker that switches between **Learn** (inline Explainer viewing a scrollable sidebar), **Practice** (Interactive immediate feedback), and **Assess** (Timed evaluation via `?mode=assess`).

### C. The Practice / Assess Interface (`[Topic].jsx`)
- **Reference File:** [ComparingIntegers.jsx](file:///Users/prasidh/Documents/frontend/frontend/src/components/practice/grade-6/the-other-side-of-zero/ComparingIntegers.jsx) or unified `LinesAndAnglesTopic.jsx`
- **Pattern:** Use the unified `junior-practice-page` standard. Incorporate header pills for the question counter, animated mascot feedback for correct answers in practice, and a `PracticeSummaryModal` for completion.
- **Two Column Assessment Layout:** When the mode is `assess` via URL search parameters, display a two-column setup where the right side contains the `timer-display` and `QuestionPalette`.

---

## 🛠️ 3. Technical Integration

### 🎨 Styling (CSS)
Do not write ad-hoc CSS unless strictly necessary. Instead, rely on the identical standard classes defined in `theOtherSideOfZero.css` and `integers.css`. If specific adjustments are needed, map class names exactly like TOSOZ.

### 🔢 Math Standards
- **Component:** Always use `<MathRenderer>` or `<LatexContent>` for text containing math.
- **Notation:** Wrap math in double dollar signs (`$$x = 2$$`).
- **IDs:** Standardize skill IDs using the grade as a prefix (e.g., `12xxx`).

### 🛣️ Universal Routing Guide (`App.jsx`)

New routes should be placed in the appropriate grade section of `src/App.jsx` OUTSIDE the `<MainLayout>` tag to preserve the fullscreen experience.

| School Level | Grades | Path Prefix | Example Route |
| :--- | :--- | :--- | :--- |
| **Middle** | 4, 5, 6, 7 | `/middle/grade/[X]/...` | `/middle/grade/6/the-other-side-of-zero/integers` |

**Standard Chapter Sub-Routes:**
Ensure that topics map natively.
1.  **Hub:** `.../[chapter]/hub`
2.  **Skills:** `.../[chapter]/skills`
3.  **Topics:** `.../[chapter]/[topicName]` (handles practice & assess modes inherently via `?mode=assess`)
4.  **Chapter Test:** `.../[chapter]/chapter-test`

---

### 📋 Syllabus Visibility
Add your chapter to the corresponding Grade Syllabus file.

| Grades | Syllabus File |
| :--- | :--- |
| **Middle (4 - 7)** | [src/pages/middle/MiddleGradeSyllabus.jsx](file:///Users/prasidh/Documents/frontend/frontend/src/pages/middle/MiddleGradeSyllabus.jsx) |

**Registration Entry Pattern:**
Add your chapter entry to the appropriate `setSkills` array.
```javascript
{ 
  skill_id: [GradePrefix][Series], // e.g., 06100 (Gr 6)
  skill_name: '[ChapterName]: Interactive Chapter', 
  topic: '[ChapterName]', 
  subtopic: 'Complete Chapter', 
  isLocal: true, 
  path: '/middle/grade/[X]/[chapter]/hub' 
}
```

---

## ✅ 4. Summary Checklist
- [ ] Folder structure mimics the `the-other-side-of-zero` architecture properly.
- [ ] Hub component uses the `IntegersHub` left/right split layout visually and structurally.
- [ ] UI relies directly on TOSOZ `theOtherSideOfZero.css` patterns without unnecessary ad-hoc overrides.
- [ ] Two-column `mode="assess"` implemented successfully via URL parsing exactly like `TheOtherSideOfZero` / `Lines and Angles`.
- [ ] Routes added effectively in `App.jsx` avoiding `MainLayout`.
- [ ] Chapter card correctly registered in the relative Grade Syllabus file.
