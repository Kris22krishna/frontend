// Data file for the dynamic testing skills engine.
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const OUR_COMMUNITY_SKILLS = [
  {
    id: 'community-places',
    name: "Places in Our Community",
    shortDesc: "Identify where to go when you need stamps, fresh vegetables, or a doctor.",
    color: '#3498DB',
    nodeId: 'b4041001-0001-0000-0000-000000000000'
  },
  {
    id: 'people-at-work',
    name: "People at Work",
    shortDesc: "Match the tools and professions to the people who help maintain our neighborhood.",
    color: '#E74C3C',
    nodeId: 'b4041001-0002-0000-0000-000000000000'
  },
  {
    id: 'festivals-togetherness',
    name: "Festivals & Togetherness",
    shortDesc: "Celebrate Van Mahotsav and Uruka by organizing community events.",
    color: '#F1C40F',
    nodeId: 'b4041001-0003-0000-0000-000000000000'
  },
  {
    id: 'teamwork',
    name: "Teamwork & Cooperation",
    shortDesc: "Build bridges and solve problems together just like ants and bees.",
    color: '#2ECC71',
    nodeId: 'b4041001-0004-0000-0000-000000000000'
  }
];

export const generateEvsQuestions = (skillId) => {
  const questions = [];

  for (let i = 0; i < 20; i++) {
    switch(skillId) {
      case 'community-places': {
        const scenarios = [
          { q: "Where do you go to buy fresh vegetables, fruits, and other goods?", ans: "Market", wrong: ["Post Office", "Park", "Hospital"] },
          { q: "Where do you go to play kabaddi and relax with friends?", ans: "Playground / Park", wrong: ["Hospital", "Police Station", "Bus Stop"] },
          { q: "If you want to send a letter using a stamp, you should visit the...", ans: "Post Office", wrong: ["Health Centre", "Market", "School"] },
          { q: "If your grandmother gets sick, where should you take her for treatment?", ans: "Health Centre / Hospital", wrong: ["Post Office", "Bus Stop", "Market"] },
          { q: "Where do you wait to catch a ride to another city?", ans: "Bus Stop", wrong: ["Police Station", "School", "Post Office"] },
          { q: "Which place is responsible for providing safety in your locality?", ans: "Police Station", wrong: ["Market", "Park", "School"] }
        ];
        const sc = scenarios[i % scenarios.length];
        const options = shuffleArray([sc.ans, ...sc.wrong]);
        questions.push({
          id: `q-${i}`,
          type: 'multiple_choice',
          question: sc.q,
          options: options,
          correctAnswer: sc.ans
        });
        break;
      }

      case 'people-at-work': {
        const scenarios = [
          { q: "Who repairs the streetlights next to the park?", ans: "Electrician", wrong: ["Mason", "Plumber", "Teacher"] },
          { q: "Who uses bricks, cement, and a trowel to build walls?", ans: "Mason", wrong: ["Shopkeeper", "Driver", "Nurse"] },
          { q: "Who brings saplings from the nursery to plant trees?", ans: "Gardener", wrong: ["Police", "Postman", "Mason"] },
          { q: "Who fixes the broken wooden benches in the park?", ans: "Carpenter", wrong: ["Mason", "Driver", "Shopkeeper"] },
          { q: "Who sells daily goods like clothes and food items?", ans: "Shopkeeper", wrong: ["Teacher", "Police", "Electrician"] },
          { q: "Who helps students learn new things at school?", ans: "Teacher", wrong: ["Doctor", "Mason", "Driver"] }
        ];
        const sc = scenarios[i % scenarios.length];
        const options = shuffleArray([sc.ans, ...sc.wrong]);
        questions.push({
          id: `q-${i}`,
          type: 'multiple_choice',
          question: sc.q,
          options: options,
          correctAnswer: sc.ans
        });
        break;
      }

      case 'festivals-togetherness': {
        const scenarios = [
          { q: "Van Mahotsav is also known as the...", ans: "Tree Planting Festival", wrong: ["Harvest Festival", "Light Festival", "Color Festival"] },
          { q: "When is Van Mahotsav celebrated in India?", ans: "1 July to 7 July", wrong: ["14 January", "25 December", "15 August"] },
          { q: "Uruka is the first day of which festival celebrated in Assam?", ans: "Magh Bihu", wrong: ["Diwali", "Holi", "Pongal"] },
          { q: "What is the bamboo and hay hut built during Uruka called?", ans: "Bhela Ghar", wrong: ["Khetala", "Van Mahotsav", "Chinar House"] },
          { q: "Why do people celebrate Van Mahotsav?", ans: "To protect the environment and make earth greener", wrong: ["To eat sweets", "To launch fireworks", "To build a Bhela Ghar"] },
          { q: "What happens after the community feast during festivals?", ans: "Leaves are buried in a pit to become manure", wrong: ["Trash is thrown in the river", "Leftovers are left on the ground", "Everyone goes to sleep instantly"] }
        ];
        const sc = scenarios[i % scenarios.length];
        const options = shuffleArray([sc.ans, ...sc.wrong]);
        questions.push({
          id: `q-${i}`,
          type: 'multiple_choice',
          question: sc.q,
          options: options,
          correctAnswer: sc.ans
        });
        break;
      }

      case 'teamwork': {
        const scenarios = [
          { q: "Who are the 'Khetala' in Sikkim?", ans: "Agriculture specialists who help harvest crops", wrong: ["People who build bridges", "People who plant trees during Van Mahotsav", "Teachers in schools"] },
          { q: "What did the community in Kanker, Chhattisgarh, build together when the Chinar river overflowed?", ans: "A strong bamboo and stone bridge", wrong: ["A large hospital", "A new park", "A Bhela Ghar"] },
          { q: "Which insects work in colonies where everyone has a special job, like collecting food or protecting the home?", ans: "Ants and Bees", wrong: ["Butterflies and Moths", "Spiders and Beetles", "Grasshoppers and Crickets"] },
          { q: "Why is it important for communities to work together?", ans: "Teamwork makes activities more useful and solves big problems faster", wrong: ["So people can fight over jobs", "To make more money alone", "They don't need to work together"] },
          { q: "What role can you play as a member of your school community?", ans: "Help clean the campus and respect teachers", wrong: ["Break the benches", "Ignore other students", "Leave trash on the ground"] },
          { q: "When building the park in Chandan's village, what was the key to their success?", ans: "Everyone contributed their special skills and worked together", wrong: ["They paid someone else to do it", "Only one person did all the work", "They gave up because it was too hard"] }
        ];
        const sc = scenarios[i % scenarios.length];
        const options = shuffleArray([sc.ans, ...sc.wrong]);
        questions.push({
          id: `q-${i}`,
          type: 'multiple_choice',
          question: sc.q,
          options: options,
          correctAnswer: sc.ans
        });
        break;
      }

      default:
        break;
    }
  }

  return questions;
};
