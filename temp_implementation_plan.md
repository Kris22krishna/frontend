# Implementation Plan - Add "Shapes and Angles" to Grade 5 Syllabus

The "Shapes and Angles" chapter is missing from the Grade 5 syllabus due to omission in the manual override in `MiddleGradeSyllabus.jsx`.

## Proposed Changes

### Frontend

#### [MODIFY] [MiddleGradeSyllabus.jsx](file:///d:/learners/latest_version/frontend/src/pages/middle/MiddleGradeSyllabus.jsx)

Insert the "Shapes and Angles" chapter data into the Grade 5 manual override (around line 609).

```javascript
        skillsByTopic['Shapes and Angles'] = {
            'Learn': [
                { skill_id: 'SA-5W1H', skill_name: '5W1H Introduction', topic: 'Shapes and Angles', sub_topic: 'Learn', isLocal: true, path: '/shapes-and-angles/introduction' },
                { skill_id: 'SA-TERM', skill_name: 'Terminology', topic: 'Shapes and Angles', sub_topic: 'Learn', isLocal: true, path: '/shapes-and-angles/terminology' },
                { skill_id: 'SA-SKILLS', skill_name: 'Skills Practice & Assessment', topic: 'Shapes and Angles', sub_topic: 'Learn', isLocal: true, path: '/shapes-and-angles/skills' }
            ],
            'Chapter Test': [
                { skill_id: 'SA-TEST', skill_name: 'Chapter Test', topic: 'Shapes and Angles', sub_topic: 'Chapter Test', isLocal: true, path: '/middle/grade/5/shapes-angles/chapter-test' }
            ]
        };
```

## Verification Plan

### Manual Verification
1. Open `http://localhost:5173/middle/grade/5`.
2. Verify "Shapes and Angles" card visibility.
3. Test navigation for "Learn" and "Chapter Test" subtopics.
