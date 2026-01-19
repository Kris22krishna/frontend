export const getGradeSyllabus = async (gradeId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // For now, return the same structure regardless of grade, 
    // but we could switch based on gradeId if we wanted more mock data.
    return {
        "gradeId": gradeId,
        "gradeName": `Class ${gradeId}`,
        "categories": [
            {
                "id": 1,
                "code": "A",
                "name": "Numbers and comparing",
                "children": [
                    {
                        "id": 2,
                        "name": "Even and odd",
                        "children": [],
                        "skills": [
                            {
                                "id": 101,
                                "code": "A.1",
                                "title": "Even or odd"
                            },
                            {
                                "id": 102,
                                "code": "A.2",
                                "title": "Even or odd: arithmetic rules"
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "name": "Sequences",
                        "children": [
                            {
                                "id": 4,
                                "name": "Skip counting",
                                "children": [],
                                "skills": [
                                    {
                                        "id": 103,
                                        "code": "A.3",
                                        "title": "Skip-counting puzzles"
                                    },
                                    {
                                        "id": 104,
                                        "code": "A.4",
                                        "title": "Number sequences"
                                    }
                                ]
                            }
                        ],
                        "skills": [{
                                        "id": 103,
                                        "code": "A.3",
                                        "title": "Skip-counting puzzles"
                                    }]
                    }
                ],
                "skills": [
                    {
                        "id": 105,
                        "code": "A.5",
                        "title": "Comparing numbers" // Direct skill under category
                    }
                ]
            },
            {
                "id": 5,
                "code": "B",
                "name": "Place values",
                "children": [
                    {
                        "id": 50,
                        "name": "Nested Concept B.2",
                        "children": [],
                        "skills": [
                            { "id": 250, "code": "B.2.1", "title": "Sub-skill of B.2" },
                            { "id": 251, "code": "B.2.2", "title": "Another sub-skill" }
                        ]
                    }
                ],
                "skills": [
                    { "id": 201, "code": "B.1", "title": "Place value models up to hundreds" },
                    // B.2 is represented by the child category above which has B.2.1
                    { "id": 203, "code": "B.3", "title": "Value of a digit" }
                ]
            },
            {
                "id": 6,
                "code": "C",
                "name": "Addition",
                "children": [],
                "skills": [
                    { "id": 301, "code": "C.1", "title": "Add two numbers up to three digits" },
                    { "id": 302, "code": "C.2", "title": "Addition input/output tables" },
                    { "id": 303, "code": "C.3", "title": "Complete the addition sentence" }
                ]
            }
        ]
    };
};
