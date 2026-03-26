export const OUR_FAMILIES_SKILLS = [
    {
        id: 'family-roles',
        title: 'Family Roles & Relationships',
        desc: 'Identify family members and their roles.',
        color: '#ec4899',
        icon: '👨‍👩‍👧‍👦'
    },
    {
        id: 'playing-together',
        title: 'Playing Games',
        desc: 'Recognize traditional games and activities.',
        color: '#8b5cf6',
        icon: '🎈'
    },
    {
        id: 'helping-out',
        title: 'Helping Out',
        desc: 'Understand how we help each other at home.',
        color: '#10b981',
        icon: '🧹'
    },
    {
        id: 'animals-surroundings',
        title: 'Animals & Nature',
        desc: 'Caring for pets and neighborhood animals.',
        color: '#f59e0b',
        icon: '🐕'
    }
];

// Helper to shuffle array
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Generate 20 distinct questions for practice or assessment
export function generateEvsQuestions(skillId, count = 20) {
    let pool = [];

    if (skillId === 'family-roles') {
        const templates = [
            { question: "What do we affectionately call a paternal grandfather in Hindi?", options: ["Dadaji", "Chachaji", "Mamaji", "Nanaji"], correct: 0, explanation: "Dadaji is the respectful term for a father's father." },
            { question: "Who makes hot pakodas during the rainy season in Bela's family?", options: ["Dadiji", "Mausi", "Banku Bhaiya", "Bela"], correct: 0, explanation: "Dadiji makes hot pakodas and tea when it rains." },
            { question: "What is the relationship of 'Mausi'?", options: ["Mother's sister", "Father's sister", "Mother's mother", "Father's mother"], correct: 0, explanation: "Mausi is the Hindi term for a maternal aunt, or a mother's sister." },
            { question: "Who is the youngest member of Bela's family mentioned?", options: ["Little Bishu", "Banku Bhaiya", "Bela", "Shiru"], correct: 0, explanation: "Little Bishu is the youngest brother they play peek-a-boo with." },
            { question: "Who oils and braids Bela's hair in the morning?", options: ["Dadiji", "Mother", "Mausi", "Kusum"], correct: 0, explanation: "Dadiji oils and braids Bela's hair while humming a song." },
            { question: "Munni comes to celebrate festivals with Bela's family. Who is Munni's mother?", options: ["Kusum Mausi", "Urmila Mausi", "Dadiji", "Bela's Mother"], correct: 0, explanation: "Kusum Mausi is Munni's mother and a close family friend." }
        ];
        pool.push(...templates);
        // Duplicate some with slight variations to reach pool size if needed, or add more
        pool.push(
            { question: "A family with parents, children, and grandparents is called a...", options: ["Joint family / Extended family", "Single family", "Small family", "No family"], correct: 0, explanation: "Families living with grandparents and other relatives are often big or joint/extended families." },
            { question: "What does Kusum Mausi do during festivals?", options: ["Cooks delicious sweets", "Makes rangoli", "Gardens", "Plays hide and seek"], correct: 0, explanation: "Kusum Mausi is an excellent cook and makes special dishes." },
            { question: "Who loves gardening the most in Bela's family?", options: ["Dadaji", "Banku", "Father", "Mother"], correct: 0, explanation: "Dadaji loves gardening, and Bela helps him." },
            { question: "Who helps clean and chop vegetables?", options: ["Banku Bhaiya", "Bela", "Bishu", "Shiru"], correct: 0, explanation: "Banku Bhaiya helps parents and grandparents by chopping vegetables." }
        );
    } else if (skillId === 'playing-together') {
        pool.push(
            { question: "Which game is known as hide-and-seek?", options: ["Chhupan-Chhupai", "Antakshari", "Snakes and Ladders", "Peek-a-boo"], correct: 0, explanation: "Chhupan-chhupai is the traditional hide-and-seek game played outside." },
            { question: "What game do they play with little Bishu?", options: ["Peek-a-boo", "Antakshari", "Cricket", "Football"], correct: 0, explanation: "Peek-a-boo involves hiding your face and reappearing to amuse a young child." },
            { question: "Which game involves singing songs starting with a specific letter?", options: ["Antakshari", "Chhupan-Chhupai", "Ludo", "Carrom"], correct: 0, explanation: "Antakshari is a singing game where the next song must start with the consonant the previous song ended on." },
            { question: "Where do Bela and Banku usually play Chhupan-Chhupai?", options: ["In the open space outside", "Inside the house", "On the roof", "At school"], correct: 0, explanation: "They play it in the open space outside their house." },
            { question: "Who teaches the children games from when he was young?", options: ["Dadaji", "Father", "Banku", "Kusum Mausi"], correct: 0, explanation: "Dadaji teaches them games he used to play with his friends." },
            { question: "On rainy days, what indoor board game is mentioned?", options: ["Snakes and Ladders", "Chess", "Carrom", "Monopoly"], correct: 0, explanation: "The family plays games like antakshari and snakes and ladders during the rains." }
        );
    } else if (skillId === 'helping-out') {
        pool.push(
            { question: "What does Munni make using dried flowers and leaves?", options: ["Rangoli", "Paintings", "Flower pots", "Garlands"], correct: 0, explanation: "Munni creates beautiful rangolis using colors made from dried flowers." },
            { question: "How does Bela help out at home?", options: ["By helping Dadaji in the garden", "By cooking", "By washing clothes", "By making rangoli daily"], correct: 0, explanation: "Bela helps Dadaji in the garden every day." },
            { question: "Who helps with cleaning and chopping vegetables?", options: ["Banku Bhaiya", "Bela", "Bishu", "Shiru"], correct: 0, explanation: "Banku helps the family by chopping vegetables and cleaning." },
            { question: "What do the parents do together after a hard day's work?", options: ["Sit and relax in the garden", "Cook more food", "Go to the market", "Play hide and seek"], correct: 0, explanation: "They sit and relax in the garden planted by the family." },
            { question: "What does Dadiji do while braiding Bela's hair?", options: ["She hums a song", "She scolds her", "She tells a story", "She watches TV"], correct: 0, explanation: "Dadiji hums traditional songs while oiling and braiding Bela's hair." },
            { question: "Why do family members help each other?", options: ["To make work easier and stay happy", "To show off", "To get money", "Because they are forced to"], correct: 0, explanation: "Helping each other reduces the workload and builds a loving, supportive environment." }
        );
    } else if (skillId === 'animals-surroundings') {
        pool.push(
            { question: "Who is Shiru?", options: ["The family pet dog", "A neighbor's cat", "Bela's cousin", "A bird in the garden"], correct: 0, explanation: "Shiru is a dog who has a special place in their home and is considered a family member." },
            { question: "What do Bela and Banku share with Shiru?", options: ["Their food", "Their clothes", "Their books", "Their toys"], correct: 0, explanation: "They share their food with Shiru and never hurt him." },
            { question: "How should we treat animals in our neighborhood?", options: ["With love and care", "Throw stones at them", "Ignore them", "Chase them away"], correct: 0, explanation: "Animals can also be part of our extended family. We must be loving and caring towards them." },
            { question: "What animals are mentioned as part of families?", options: ["Cows, buffaloes, dogs, parrots, cats", "Lions and tigers", "Elephants", "Crocodiles"], correct: 0, explanation: "Many domestic animals like cows, dogs, and parrots become part of human families." },
            { question: "Why are plants important to the family?", options: ["They provide a beautiful garden to relax in", "They eat the food", "They play games", "They do the chores"], correct: 0, explanation: "The family planted a garden with flowering plants where everyone relaxes and enjoys the evening." },
            { question: "Which group of animals is commonly seen as pets?", options: ["Dogs and Cats", "Tigers and Lions", "Sharks and Whales", "Eagles and Hawks"], correct: 0, explanation: "Dogs and cats are common pets that live with families like Shiru does." }
        );
    }

    // Since the pool might not have 20 distinct questions, we will generate structural variations 
    // to fill up to 20 dynamically without exact duplication.
    let generated = [];
    
    // First, push all base pool questions
    pool.forEach(p => generated.push({...p}));

    // Generate variations to hit 'count'
    let iteration = 0;
    while(generated.length < count) {
        let baseQuestion = pool[iteration % pool.length];
        // Create a slight variation
        let varQ = {...baseQuestion};
        varQ.question = `(Review) ${varQ.question}`;
        
        // Shuffle options but track correct
        let oldCorrectText = varQ.options[varQ.correct];
        let newOptions = shuffle([...varQ.options]);
        varQ.options = newOptions;
        varQ.correct = newOptions.findIndex(o => o === oldCorrectText);
        
        generated.push(varQ);
        iteration++;
    }

    // Finally shuffle all and slice to count
    let finalSelection = shuffle(generated).slice(0, count);

    // Shuffle options for all
    finalSelection = finalSelection.map(q => {
        let oldCorrectText = q.options[q.correct];
        let newOptions = shuffle([...q.options]);
        return {
            ...q,
            options: newOptions,
            correct: newOptions.findIndex(o => o === oldCorrectText)
        };
    });

    return finalSelection;
}
