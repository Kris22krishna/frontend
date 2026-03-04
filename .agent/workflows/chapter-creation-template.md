---
description: # 🏗️ Universal Chapter Creation Template
---



This template provides a technical blueprint for creating a new interactive chapter for **any grade** (e.g., Grade 7, 10, or 12). 

> [!IMPORTANT]
> **Golden Reference:** All new chapters MUST be a visual and structural replica of the **Algebra** chapter located at `E:\LD\frontend\src\components\Math-Branches\Algebra`. Use this folder as your primary source of truth for UI, animations, and layout.

---

## 📂 1. Directory Structure

Create a new directory under `src/components/practice/class-[Grade]/[ChapterName]/`. 
*(Note: Use `class-12` for Grade 12, `class-8` for Grade 8, etc.)*

```text
[ChapterName]/
├── [ChapterName].jsx                 # REPLICA OF: Algebra.jsx
├── Topics/
│   ├── 5W1H/
│   │   └── [ChapterName]Intro5W1H.jsx    # REPLICA OF: AlgebraIntro5W1H.jsx
│   ├── Terminology/
│   │   └── [ChapterName]Terminology.jsx  # REPLICA OF: AlgebraTerminology.jsx
│   └── Skills/
│       ├── [ChapterName]Skills.jsx       # REPLICA OF: AlgebraSkills.jsx
│       └── [chapterName]Questions.js     # REPLICA OF: algebraQuestions.js
└── DeepDive/
    └── Tests/                        
        ├── [ChapterName]EasyTest.jsx     
        ├── [ChapterName]MediumTest.jsx   
        └── [ChapterName]HardTest.jsx     
```

---

## 🧩 2. Design Pillars (The "Algebra" Standard)

### A. The Split-Panel Hub (`[ChapterName].jsx`)
- **Reference File:** [src/components/Math-Branches/Algebra/Algebra.jsx](file:///e:/LD/frontend/src/components/Math-Branches/Algebra/Algebra.jsx)
- **Layout:** Left panel for the "Hero" content (Title, Tagline, Stats) and Right panel for the "Module Cards".
- **Styling:** Always import and utilize the CSS patterns found in [src/components/Math-Branches/Algebra/algebra.css](file:///e:/LD/frontend/src/components/Math-Branches/Algebra/algebra.css).

### B. The 5W1H Framework (`[ChapterName]Intro5W1H.jsx`)
- **Reference File:** [src/components/Math-Branches/Algebra/Topics/5W1H/AlgebraIntro5W1H.jsx](file:///e:/LD/frontend/src/components/Math-Branches/Algebra/Topics/5W1H/AlgebraIntro5W1H.jsx)
- **Pattern:** 6 expandable cards with specific icons and color gradients.

### C. Terminology & Rules (`[ChapterName]Terminology.jsx`)
- **Reference File:** [src/components/Math-Branches/Algebra/Topics/Terminology/AlgebraTerminology.jsx](file:///e:/LD/frontend/src/components/Math-Branches/Algebra/Topics/Terminology/AlgebraTerminology.jsx)
- **Pattern:** A list of terms, followed by "Golden Rules", concluding with a `Vocab Quiz`.

### D. Skill-Based Practice (`[ChapterName]Skills.jsx`)
- **Reference File:** [src/components/Math-Branches/Algebra/Topics/Skills/AlgebraSkills.jsx](file:///e:/LD/frontend/src/components/Math-Branches/Algebra/Topics/Skills/AlgebraSkills.jsx)
- **Pattern:** A skill picker that switches between **Learn** (Explainer), **Practice** (Interactive), and **Assess** (Timed) modes.

---

## 🛠️ 3. Technical Integration

### 🎨 Styling (CSS)
Do not write ad-hoc CSS. Instead, rely on the classes defined in [algebra.css](file:///e:/LD/frontend/src/components/Math-Branches/Algebra/algebra.css). If specific adjustments are needed, create a local CSS file that extends the Algebra design system.

### 🔢 Math Standards
- **Component:** Always use `<LatexText />` for text containing math.
- **Notation:** Wrap math in single dollar signs (`$x = 2$`).
- **IDs:** Standardize skill IDs using the grade as a prefix (e.g., `12xxx`).

### 🛣️ Universal Routing Guide ([App.jsx](file:///e:/LD/frontend/src/App.jsx))

New routes should be placed in the appropriate "School Level" section of [src/App.jsx](file:///e:/LD/frontend/src/App.jsx). Use the following path conventions based on the grade:

| School Level | Grades | Path Prefix | Example Route |
| :--- | :--- | :--- | :--- |
| **Junior** | 1, 2, 3 | `/junior/grade/[X]/...` | `/junior/grade/1/addition` |
| **Middle** | 4, 5, 6, 7 | `/middle/grade/[X]/...` | `/middle/grade/5/area-boundary` |
| **Senior** | 8, 9, 10, 11, 12 | `/senior/grade/[X]/...` | `/senior/grade/12/determinants` |

**Standard Chapter Sub-Routes:**
Regardless of the grade, always implement these 7 sub-routes for consistency:
1.  **Hub:** `.../[chapter]`
2.  **Intro:** `.../[chapter]/introduction`
3.  **Terminology:** `.../[chapter]/terminology`
4.  **Skills:** `.../[chapter]/skills`
5.  **Easy Test:** `.../[chapter]/deep-dive/test/easy`
6.  **Medium Test:** `.../[chapter]/deep-dive/test/medium`
7.  **Hard Test:** `.../[chapter]/deep-dive/test/hard`

---

### 📋 Syllabus Visibility
Add your chapter to the corresponding Grade Syllabus file.

| Grades | Syllabus File |
| :--- | :--- |
| **Junior (1 - 3)** | [src/pages/juniors/JuniorGradeSyllabus.jsx](file:///e:/LD/frontend/src/pages/juniors/JuniorGradeSyllabus.jsx) |
| **Middle (4 - 7)** | [src/pages/middle/MiddleGradeSyllabus.jsx](file:///e:/LD/frontend/src/pages/middle/MiddleGradeSyllabus.jsx) |
| **Senior (8 - 12)** | [src/pages/high/SeniorGradeSyllabus.jsx](file:///e:/LD/frontend/src/pages/high/SeniorGradeSyllabus.jsx) |

**Registration Entry Pattern:**
Add your chapter entry to the appropriate `setSkills` array:
```javascript
{ 
  skill_id: [GradePrefix][Series], // e.g., 01100 (Gr 1), 05100 (Gr 5), 12100 (Gr 12)
  skill_name: '[ChapterName]: Interactive Chapter', 
  topic: '[ChapterName]', 
  subtopic: 'Complete Chapter', 
  isLocal: true, 
  path: '/[level]/grade/[X]/[chapter]' 
}
```

---

## ✅ 4. Summary Checklist
- [ ] Folder structure mirrors the **Algebra** branch exactly.
- [ ] Hub component uses the **Algebra** left/right split layout.
- [ ] [algebra.css](file:///e:/LD/frontend/src/components/Math-Branches/Algebra/algebra.css) is used or referenced for styling.
- [ ] LateX math verified in all "Learn" and "Question" blocks.
- [ ] Easy/Medium/Hard tests implemented in `DeepDive/Tests`.
- [ ] Routes (Hub, Intro, Terminology, Skills, Tests) added to [App.jsx](file:///e:/LD/frontend/src/App.jsx).
- [ ] Chapter card registered in the Grade Syllabus page.

