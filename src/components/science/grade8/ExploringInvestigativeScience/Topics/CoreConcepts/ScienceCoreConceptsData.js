export const CORE_CONCEPTS = [
    {
        "id": "1.1",
        "title": "Scientific Method & Inquiry",
        "subtitle": "The Process of Discovery",
        "desc": "Master the step-by-step approach scientists use to ask questions and solve mysteries.",
        "icon": "🔬",
        "color": "#f59e0b",
        "learn": {
            "concept": "The scientific method is a systematic process used to explore observations and answer questions. It involves forming a hypothesis, conducting experiments, and drawing conclusions.",
            "rules": [
                {
                    "title": "Observation and Questioning",
                    "f": "\\text{Observation} \\rightarrow \\text{Question}",
                    "d": "Every investigation starts with noticing something interesting (observation) and asking \"Why?\" or \"How?\" (question).",
                    "tip": "Good scientific questions are testable and measureable.",
                    "ex": "\\text{Observation: Plants near the window grow taller. Question: Does sunlight affect plant growth?}"
                },
                {
                    "title": "Formulating a Hypothesis",
                    "f": "\\text{If... then... because...}",
                    "d": "A hypothesis is an educated guess or prediction about the relationship between two variables.",
                    "tip": "A hypothesis MUST be testable through an experiment. It can be proven wrong!",
                    "ex": "\\text{If a plant gets more sunlight, then it will grow taller, because sunlight provides energy.}"
                },
                {
                    "title": "Experimental Design",
                    "f": "\\text{Independent Var.} \\rightarrow \\text{Dependent Var.}",
                    "d": "Designing an experiment involves changing one thing (Independent Variable) to see how it affects something else (Dependent Variable), while keeping everything else the same (Controlled Variables).",
                    "tip": "Always have a \"Control Group\" that doesn't receive the experimental treatment for comparison.",
                    "ex": "\\text{IV: Sunlight, DV: Plant Height, Controls: Water, Soil, Pot size}"
                }
            ]
        },
        "practice": [
            { "question": "Q1: What is the first step of the scientific method?", "options": ["Form a hypothesis", "Make an observation", "Conduct an experiment", "Analyze data"], "correct": 1, "explanation": "The scientific method always begins by observing the world around you and asking a question." },
            { "question": "Q2: An educated guess that can be tested is called a:", "options": ["Conclusion", "Theory", "Hypothesis", "Law"], "correct": 2, "explanation": "A hypothesis is a proposed explanation made on the basis of limited evidence as a starting point for further investigation." },
            { "question": "Q3: The variable that the scientist intentionally changes in an experiment is the:", "options": ["Dependent variable", "Independent variable", "Control variable", "Constant"], "correct": 1, "explanation": "The independent variable is 'I changed it'. It is manipulated by the scientist." },
            { "question": "Q4: The variable being measured in an experiment is the:", "options": ["Dependent variable", "Independent variable", "Control variable", "Constant"], "correct": 0, "explanation": "The dependent variable depends on the independent variable. It is what you measure." },
            { "question": "Q5: Variables that are kept the same throughout an experiment are called:", "options": ["Independent variables", "Control variables (Constants)", "Dependent variables", "Experimental variables"], "correct": 1, "explanation": "Constants or controls ensure a fair test by making sure only one variable is changing." },
            { "question": "Q6: Which question is testable using the scientific method?", "options": ["Do dogs dream?", "Is blue a better color than red?", "Does salt water freeze slower than fresh water?", "Why are unicorns magical?"], "correct": 2, "explanation": "Freezing times of water can be directly measured and tested." },
            { "question": "Q7: A student tests how different types of music affect plant growth. What is the independent variable?", "options": ["Plant growth", "Type of music", "Amount of water", "Type of plant"], "correct": 1, "explanation": "The type of music is what the student is intentionally changing." },
            { "question": "Q8: In the same music and plant experiment, what is the dependent variable?", "options": ["Type of music", "Type of soil", "Plant growth (height)", "Amount of sunlight"], "correct": 2, "explanation": "The plant's growth is what the scientist will measure." },
            { "question": "Q9: Why is it important to have only one independent variable?", "options": ["To make the experiment faster", "To save money on materials", "So you know exactly what caused the result", "So the dependent variable doesn't change too much"], "correct": 2, "explanation": "If you change multiple things, you won't know which one caused the measured effect." },
            { "question": "Q10: After an experiment, if your data does not support your hypothesis, what should you do?", "options": ["Change your data", "Report your findings as they are", "Throw the experiment away", "Assume you made a mistake"], "correct": 1, "explanation": "A rejected hypothesis is still useful data. You report findings and perhaps form a new hypothesis." },
            { "question": "Q11: The statement 'If I add more fertilizer, then the tomato plant will produce more tomatoes' is a:", "options": ["Conclusion", "Procedure", "Hypothesis", "Observation"], "correct": 2, "explanation": "This follows the 'If... then...' format of a testable prediction." },
            { "question": "Q12: A control group in an experiment is used for:", "options": ["Measuring changes", "Comparing against the experimental group", "Ensuring the experiment lasts long enough", "Changing multiple variables at once"], "correct": 1, "explanation": "The control group represents normal conditions and is used as a baseline for comparison." },
            { "question": "Q13: Which of these is an observation?", "options": ["The liquid turned blue", "The liquid must be magical", "It turned blue because of the oxygen", "Blue liquids are the most dangerous"], "correct": 0, "explanation": "An observation is a factual statement gathered through the senses." },
            { "question": "Q14: An inference is:", "options": ["A factual measurement", "A logical conclusion based on an observation", "An educated guess before an experiment", "The final step of the scientific method"], "correct": 1, "explanation": "An inference uses observations and prior knowledge to figure something out." },
            { "question": "Q15: You see a broken window and a baseball on the floor. Saying 'A baseball broke the window' is an:", "options": ["Observation", "Inference", "Experiment", "Independent variable"], "correct": 1, "explanation": "You didn't see the ball hit the window, you logically concluded it based on evidence." },
            { "question": "Q16: A scientist wants to know if a new medicine cures headaches faster. Group A gets the medicine. Group B gets a sugar pill. What is Group B?", "options": ["Experimental Group", "Control Group", "Independent Variable", "Dependent Variable"], "correct": 1, "explanation": "Group B gets a placebo, making them the control group." },
            { "question": "Q17: In a graph of experimental results, the Independent Variable usually goes on the:", "options": ["X-axis", "Y-axis", "Legend", "Title"], "correct": 0, "explanation": "The independent variable is almost always plotted on the horizontal X-axis." },
            { "question": "Q18: In a graph, the Dependent Variable usually goes on the:", "options": ["X-axis", "Y-axis", "Title", "Key"], "correct": 1, "explanation": "The dependent variable is plotted on the vertical Y-axis." },
            { "question": "Q19: Which word describes information gathered during an experiment?", "options": ["Hypothesis", "Procedure", "Data", "Conclusion"], "correct": 2, "explanation": "Data refers to the measurements and observations collected." },
            { "question": "Q20: Why do scientists repeat experiments?", "options": ["To use up extra materials", "Because they forgot the answer", "To verify the results are consistent and reliable", "To change the independent variable slightly"], "correct": 2, "explanation": "Repetition confirms that the results weren't just a fluke or coincidence." }
        ],
        "assessment": [
            { "question": "Q1: A hypothesis must be:", "options": ["Correct", "Testable", "Proven", "Popular"], "correct": 1, "explanation": "A hypothesis is only scientifically useful if it can be tested through experimentation." },
            { "question": "Q2: A student tests how temperature affects the bouncing height of a rubber ball. What must remain constant?", "options": ["The temperature", "The bouncing height", "The type. of rubber ball", "The location of the sun"], "correct": 2, "explanation": "To ensure a fair test, the ball completely identical (or the exact same ball) must be used across tests." },
            { "question": "Q3: The independent variable is the cause, and the dependent variable is the:", "options": ["Effect", "Control", "Constant", "Hypothesis"], "correct": 0, "explanation": "The independent variable causes a change in the dependent variable (the effect)." },
            { "question": "Q4: A summary that explains whether the data supports the hypothesis is called the:", "options": ["Observation", "Procedure", "Material List", "Conclusion"], "correct": 3, "explanation": "The conclusion wraps up the experiment by analyzing data in the context of the hypothesis." },
            { "question": "Q5: Which is qualitative data?", "options": ["15 centimeters", "20 grams", "Bright red color", "5 degrees Celsius"], "correct": 2, "explanation": "Qualitative data describes qualities (color, texture) rather than numerical values." },
            { "question": "Q6: Which is quantitative data?", "options": ["Smooth surface", "10 seconds", "Sour taste", "Loud noise"], "correct": 1, "explanation": "Quantitative data involves numbers and measurements." },
            { "question": "Q7: A scientist discovers a new behavior in monkeys. What should they do next?", "options": ["Keep it a secret", "Form a hypothesis for why it happens", "Publish it as a Law", "Destroy the monkeys"], "correct": 1, "explanation": "After observing something new, a scientist asks questions and forms a testable hypothesis." },
            { "question": "Q8: If an experiment tests how much weight different paper towels hold, what is the IV?", "options": ["Amount of water used", "Weight of the pennies", "Brand of paper towel", "Size of the paper towel"], "correct": 2, "explanation": "The scientist is intentionally changing the brand of the paper towel." },
            { "question": "Q9: If an experiment tests how much weight different paper towels hold, what is the DV?", "options": ["Brand of paper towel", "Amount of weight held", "Type of liquid used", "Size of towel"], "correct": 1, "explanation": "The weight held is the outcome being measured." },
            { "question": "Q10: True or False: A scientific law explains WHY something happens.", "options": ["True", "False"], "correct": 1, "explanation": "False. A law describes WHAT happens (usually mathematically). A theory explains WHY." }
        ]
    },
    {
        "id": "1.2",
        "title": "Measurements & Observational Skills",
        "subtitle": "Quantifying the World",
        "desc": "Learn how to gather accurate data using standardized units and sharp observational techniques.",
        "icon": "📏",
        "color": "#14b8a6",
        "learn": {
            "concept": "Observation is the foundation of science. To communicate findings globally, scientists use quantitative measurements relying on the International System of Units (SI).",
            "rules": [
                {
                    "title": "Qualitative vs Quantitative",
                    "f": "\\text{Characteristics} \\quad \\text{vs} \\quad \\text{Numbers}",
                    "d": "Qualitative observations describe qualities like color, texture, or smell. Quantitative observations involve numbers, measurements, or quantities.",
                    "tip": "Quantitative data is preferred in experiments because it is less subjective.",
                    "ex": "\\text{Qualitative: The leaf is rough and green.} \\\\ \\text{Quantitative: The leaf is 4.5 cm long.}"
                },
                {
                    "title": "SI Units (Metric System)",
                    "f": "\\text{Meters }(m), \\text{Grams }(g), \\text{Liters }(L)",
                    "d": "The scientific community uses the metric system so measurements are consistent worldwide. Length is in meters, mass in grams (or kilograms), and volume in liters.",
                    "tip": "Remember conversions: Kilo (1000), Centi (1/100), Milli (1/1000)",
                    "ex": "1 \\text{ Kilogram} = 1000 \\text{ grams} \\\\ 1 \\text{ meter} = 100 \\text{ centimeters}"
                },
                {
                    "title": "Precision and Accuracy",
                    "f": "\\text{Exactness} \\quad \\text{vs} \\quad \\text{Correctness}",
                    "d": "Accuracy is how close a measurement is to the true value. Precision is how exact or repeatable a measurement is.",
                    "tip": "Think of a dartboard: Accuracy is hitting the bullseye. Precision is hitting the same spot repeatedly, even if it's not the bullseye.",
                    "ex": "\\text{True length: 10cm. Accurate: 9.9cm. Precise: 7.1cm, 7.1cm, 7.2cm.}"
                }
            ]
        },
        "practice": [
            { "question": "Q1: Which system of measurement do scientists use globally?", "options": ["Imperial System", "SI (Metric) System", "American Standard", "Fahrenheit System"], "correct": 1, "explanation": "The International System of Units (SI) is used globally in science." },
            { "question": "Q2: What is the base SI unit for length?", "options": ["Inch", "Foot", "Meter", "Mile"], "correct": 2, "explanation": "The meter is the base unit of length in the metric system." },
            { "question": "Q3: What is the base SI unit for mass?", "options": ["Ounce", "Pound", "Kilogram/Gram", "Ton"], "correct": 2, "explanation": "Kilogram (and gram) is the base unit for mass." },
            { "question": "Q4: Which prefix means 1000?", "options": ["Centi-", "Milli-", "Kilo-", "Deci-"], "correct": 2, "explanation": "Kilo means one thousand. (e.g., 1 kilometer = 1000 meters)." },
            { "question": "Q5: Which prefix means 1/100th (0.01)?", "options": ["Kilo-", "Milli-", "Centi-", "Deka-"], "correct": 2, "explanation": "Centi means one hundredth. (e.g., 100 centimeters = 1 meter)." },
            { "question": "Q6: Which is an example of quantitative data?", "options": ["The liquid smells sweet", "The rock is 5.2 grams", "The bird has blue feathers", "The metal is shiny"], "correct": 1, "explanation": "Quantitative data contains numbers and units." },
            { "question": "Q7: Which is an example of qualitative data?", "options": ["14 degrees Celsius", "3.5 meters", "Loud popping sound", "12 liters"], "correct": 2, "explanation": "Qualitative data describes characteristics that can't easily be numbered." },
            { "question": "Q8: If you measure a 10cm block as 4.2cm, 4.3cm, and 4.2cm, your measurements are:", "options": ["Accurate but not precise", "Precise but not accurate", "Both accurate and precise", "Neither accurate nor precise"], "correct": 1, "explanation": "They are clustered closely together (precise) but far from the true value of 10cm (inaccurate)." },
            { "question": "Q9: To measure the volume of a liquid precisely, you should use:", "options": ["A beaker", "A graduated cylinder", "A cup", "A ruler"], "correct": 1, "explanation": "A graduated cylinder has fine markings precisely calibrated for liquid volume." },
            { "question": "Q10: When reading a graduated cylinder, you read the:", "options": ["Top of the curve", "Bottom of the meniscus", "Side of the glass", "Highest water drop"], "correct": 1, "explanation": "The meniscus is the curve of the liquid. You always read the lowest point of the curve." },
            { "question": "Q11: Mass is a measure of:", "options": ["How much space an object takes up", "The pull of gravity on an object", "The amount of matter in an object", "The density of an object"], "correct": 2, "explanation": "Mass measures matter. Weight measures gravitational pull." },
            { "question": "Q12: Volume is a measure of:", "options": ["How heavy an object is", "How much space an object occupies", "The temperature of an object", "The length of an object"], "correct": 1, "explanation": "Volume refers to 3D space occupied." },
            { "question": "Q13: What instrument is used to measure mass?", "options": ["Triple-beam balance", "Thermometer", "Graduated cylinder", "Meter stick"], "correct": 0, "explanation": "Balances measure mass by comparing it to known masses." },
            { "question": "Q14: 1 liter (L) is equal to how many milliliters (mL)?", "options": ["10", "100", "1000", "10000"], "correct": 2, "explanation": "Milli- means one-thousandth, so there are 1000 mL in a Liter." },
            { "question": "Q15: How many centimeters are in 1 meter?", "options": ["10", "100", "1000", "10000"], "correct": 1, "explanation": "Centi- means one-hundredth. 100 cm = 1 m." },
            { "question": "Q16: Which unit would be best to measure the length of a pencil?", "options": ["Kilometers", "Meters", "Centimeters", "Micrometers"], "correct": 2, "explanation": "Centimeters are appropriate for small, everyday objects." },
            { "question": "Q17: Which unit would be best to measure the mass of a large dog?", "options": ["Milligrams", "Grams", "Kilograms", "Liters"], "correct": 2, "explanation": "Kilograms are generally used for human-sized or larger weights." },
            { "question": "Q18: 5000 meters is equal to:", "options": ["5 mm", "50 cm", "5 km", "50 km"], "correct": 2, "explanation": "Since 1000 meters = 1 km, 5000 meters = 5 km." },
            { "question": "Q19: Density is calculated by dividing an object's mass by its:", "options": ["Weight", "Volume", "Length", "Temperature"], "correct": 1, "explanation": "$Density = Mass / Volume$" },
            { "question": "Q20: Water boils at what temperature in Celsius?", "options": ["0", "32", "100", "212"], "correct": 2, "explanation": "In the Celsius scale, used by scientists, water boils at 100 degrees." }
        ],
        "assessment": [
            { "question": "Q1: A student records that a chemical reaction produced a 'foul-smelling yellow gas.' What kind of observation is this?", "options": ["Quantitative", "Qualitative", "Inaccurate", "Hypothetical"], "correct": 1, "explanation": "Smell and color are descriptive qualities." },
            { "question": "Q2: A student records that a chemical reaction took '45.2 seconds'. What kind of observation is this?", "options": ["Quantitative", "Qualitative", "Inaccurate", "Subjective"], "correct": 0, "explanation": "Time is a measured numerical quantity." },
            { "question": "Q3: Convert 2.5 Liters into milliliters.", "options": ["25 mL", "250 mL", "2500 mL", "25000 mL"], "correct": 2, "explanation": "$2.5 \\times 1000 = 2500$ mL." },
            { "question": "Q4: A balance measures a 5g weight as 5.01g, 5.00g, and 4.99g. The balance is:", "options": ["Accurate and precise", "Accurate but not precise", "Precise but not accurate", "Neither"], "correct": 0, "explanation": "The numbers are very close to the true value (5g) and to each other." },
            { "question": "Q5: The downward curve of water in a graduated cylinder is called the:", "options": ["Apex", "Meniscus", "Trough", "Vertex"], "correct": 1, "explanation": "Fluid tension against the glass creates the meniscus." },
            { "question": "Q6: Which prefix signifies the smallest unit?", "options": ["Centi-", "Deci-", "Kilo-", "Milli-"], "correct": 3, "explanation": "Milli is 1/1000th." },
            { "question": "Q7: A scientist measures a table to be 1500 millimeters. What is this length in meters?", "options": ["1.5 m", "15 m", "150 m", "1500 m"], "correct": 0, "explanation": "$1500 / 1000 = 1.5$ meters." },
            { "question": "Q8: Mass is independent of gravity. Therefore, your mass on the moon would be:", "options": ["Less than on Earth", "More than on Earth", "The same as on Earth", "Zero"], "correct": 2, "explanation": "Mass is matter. Weight changes with gravity." },
            { "question": "Q9: You have an irregularly shaped rock. How can you find its volume?", "options": ["Measure it with a ruler", "Weigh it on a balance", "Use water displacement in a graduated cylinder", "Calculate length x width x height"], "correct": 2, "explanation": "Submerging the rock and measuring the rise in water level gives its volume." },
            { "question": "Q10: The SI unit for temperature commonly used in science experiments is:", "options": ["Celsius", "Fahrenheit", "Rankine", "Moles"], "correct": 0, "explanation": "Celsius (and Kelvin) are the standard scientific temperature scales." }
        ]
    },
    {
        "id": "1.3",
        "title": "Data Analysis & Drawing Conclusions",
        "subtitle": "Finding the Truth",
        "desc": "Discover how to organize data, identify trends, and decide if your hypothesis was right or wrong.",
        "icon": "📊",
        "color": "#ec4899",
        "learn": {
            "concept": "Data collected during an experiment means nothing until it is organized, graphed, and analyzed. Identifying trends allows scientists to draw logical conclusions.",
            "rules": [
                {
                    "title": "Organizing Data tables",
                    "f": "\\text{Columns \\& Rows}",
                    "d": "A data table organizes information logically. The Independent Variable is usually placed in the left column, and the Dependent Variable measurements go in the right columns.",
                    "tip": "Always include labels and units of measurement in your table headers.",
                    "ex": "\\text{Time (min) | Temp (} ^\\circ \\text{C)}"
                },
                {
                    "title": "Choosing the Right Graph",
                    "f": "\\text{Bar vs Line vs Pie}",
                    "d": "Line graphs show change over time. Bar graphs compare different categories. Pie charts show percentages of a whole.",
                    "tip": "Most scientific experiments testing variables over a continuous range use Line Graphs or Scatter Plots.",
                    "ex": "\\text{Tracking plant height over 30 days } \\rightarrow \\text{ Line Graph}"
                },
                {
                    "title": "Drawing a Conclusion",
                    "f": "\\text{CER: Claim, Evidence, Reasoning}",
                    "d": "A strong conclusion states whether the hypothesis was supported or rejected, provides specific numeric evidence from the data, and explains the scientific reasoning behind it.",
                    "tip": "Never say an experiment 'proved' something. Say the data 'supports' or 'rejects' the hypothesis.",
                    "ex": "\\text{Claim: Fertilizer improves growth. Ev: Plant grew 5cm more. Reason: Nutrients were provided.}"
                }
            ]
        },
        "practice": [
            { "question": "Q1: What is the main purpose of a data table?", "options": ["To make the report look nice", "To organize data systematically for easy reading", "To prove the hypothesis right", "To list the materials used"], "correct": 1, "explanation": "Data tables sort information logically so trends can be spotted easily." },
            { "question": "Q2: Which graph is best for showing how something changes continuously over time?", "options": ["Bar Graph", "Line Graph", "Pie Chart", "Scatter Plot"], "correct": 1, "explanation": "Line graphs are perfect for tracking changes over periods of time." },
            { "question": "Q3: Which graph is best for comparing discrete categories (like favorite colors of students)?", "options": ["Bar Graph", "Line Graph", "Pie Chart", "Histogram"], "correct": 0, "explanation": "Bar graphs compare distinct, separate categories." },
            { "question": "Q4: Which graph is best for showing parts of a whole (percentages)?", "options": ["Bar Graph", "Line Graph", "Pie Chart", "Line Plot"], "correct": 2, "explanation": "Pie charts divide a circle into proportions representing 100% total." },
            { "question": "Q5: When graphing experimental data, the independent variable goes on the:", "options": ["X-axis (horizontal)", "Y-axis (vertical)", "Z-axis", "Legend"], "correct": 0, "explanation": "The cause (IV) is on the X, the effect (DV) is on the Y." },
            { "question": "Q6: Which acronym represents a common way to write scientific conclusions?", "options": ["ROYGBIV", "PEMDAS", "CER (Claim, Evidence, Reasoning)", "DNA"], "correct": 2, "explanation": "CER is the standard format for constructing scientific arguments." },
            { "question": "Q7: In CER, what does 'Claim' mean?", "options": ["Data collected", "A statement answering the original question", "The scientific principle", "The materials list"], "correct": 1, "explanation": "The claim is your direct answer or conclusion." },
            { "question": "Q8: In CER, what does 'Evidence' refer to?", "options": ["A guess", "Specific data and numbers from the experiment", "The hypothesis", "Information from a textbook"], "correct": 1, "explanation": "Evidence is the hard proof gathered during your specific experiment." },
            { "question": "Q9: In CER, what does 'Reasoning' involve?", "options": ["Explaining how the evidence supports the claim using scientific principles", "Listing numbers", "Making an observation", "Designing the experiment"], "correct": 0, "explanation": "Reasoning bridges the gap between the raw data and the conceptual claim." },
            { "question": "Q10: If your data rejects your hypothesis, your experiment was a failure.", "options": ["True", "False"], "correct": 1, "explanation": "False! Rejecting a hypothesis provides valuable scientific knowledge." },
            { "question": "Q11: What must every graph include to be understandable?", "options": ["Lots of colors", "A title, axis labels, and units", "At least 3 lines", "Images"], "correct": 1, "explanation": "Titles and labeled axes define what the data actually means." },
            { "question": "Q12: A trend in data describes:", "options": ["A random error", "The materials used", "A general direction or pattern in the data", "A type of graph"], "correct": 2, "explanation": "Trends show relationships, like 'as temperature increases, volume increases'." },
            { "question": "Q13: Why is statistical averaging (finding the mean) used in science?", "options": ["To make the math harder", "To reduce the impact of anomalies or errors from a single trial", "To guess missing data", "To increase the independent variable"], "correct": 1, "explanation": "Averaging multiple trials smooths out random errors." },
            { "question": "Q14: An anomaly or outlier in a data set is:", "options": ["The most common number", "The average", "A data point that doesn't fit the overall pattern", "The title of the graph"], "correct": 2, "explanation": "Outliers are weird results often caused by errors or unknown variables." },
            { "question": "Q15: When writing a conclusion, you should say your experiment 'proved' the hypothesis.", "options": ["True", "False"], "correct": 1, "explanation": "False. Experiments 'support' a hypothesis. Science is always open to new evidence." },
            { "question": "Q16: A scientist measures plant height for 10 days. The best graph is:", "options": ["Pie Chart", "Line Graph", "Bar Graph", "None of these"], "correct": 1, "explanation": "Time (days) is continuous, making a line graph ideal." },
            { "question": "Q17: A scientist counts how many birds of 4 different species visit a feeder. The best graph is:", "options": ["Pie Chart", "Line Graph", "Bar Graph", "Scatter Plot"], "correct": 2, "explanation": "The 4 species are distinct categories, perfect for a bar graph." },
            { "question": "Q18: What goes typically in the left-hand column of a data table?", "options": ["Dependent Variable", "Independent Variable", "Errors", "Conclusion"], "correct": 1, "explanation": "It's standard practice to put the variable you control on the left." },
            { "question": "Q19: If data points on a scatter plot form an upward sloping line, the relationship is:", "options": ["Negative correlation", "No correlation", "Positive correlation", "Constant"], "correct": 2, "explanation": "As X goes up, Y goes up = positive trend." },
            { "question": "Q20: After concluding an experiment, scientists often 'communicate their findings'. Why?", "options": ["To brag", "So others can review, verify, and build upon the work", "To sell products", "To finish the homework"], "correct": 1, "explanation": "Peer review and sharing knowledge pushes scientific progress forward." }
        ],
        "assessment": [
            { "question": "Q1: In the CER format, providing numerical data from your table acts as the:", "options": ["Claim", "Evidence", "Reasoning", "Hypothesis"], "correct": 1, "explanation": "Numbers/data from the experiment represent the evidence used to back the claim." },
            { "question": "Q2: Which graph correctly compares the percentages of gases in Earth's atmosphere?", "options": ["Bar graph", "Line graph", "Pie chart", "Scatter plot"], "correct": 2, "explanation": "Atmosphere gases sum up to 100%, which a pie chart displays best." },
            { "question": "Q3: If variable X increases, and variable Y decreases consistently, the correlation is:", "options": ["Positive", "Zero", "Negative", "Symmetrical"], "correct": 2, "explanation": "Moving in opposite directions indicates a negative trend." },
            { "question": "Q4: A student states 'Plant A grew 14cm because it was placed in sunlight, increasing photosynthesis.' This statement is:", "options": ["Just an observation", "Just a claim", "Evidence and Reasoning combined", "A hypothesis"], "correct": 2, "explanation": "It offers the data ('14cm') and the scientific rationale ('photosynthesis')." },
            { "question": "Q5: If an outlier is discovered in a data set, a scientist should:", "options": ["Erase it secretly", "Publish it as the main result", "Investigate potential errors causing the anomaly", "Change the hypothesis immediately"], "correct": 2, "explanation": "Outliers warrant investigation, not immediate acceptance or deletion." },
            { "question": "Q6: Which is an essential component of a graph that explains what different colors/lines mean?", "options": ["X-axis", "Y-axis", "Title", "Legend/Key"], "correct": 3, "explanation": "The legend decodes the visual elements." },
            { "question": "Q7: When summarizing a report, the conclusion must directly address the:", "options": ["Materials list", "Original hypothesis", "Teacher's request", "Safety precautions"], "correct": 1, "explanation": "The entire purpose of the experiment was to test the hypothesis." },
            { "question": "Q8: True or False: Data manipulation (changing numbers to fit a theory) is acceptable in professional science.", "options": ["True", "False"], "correct": 1, "explanation": "False. That is scientific fraud." },
            { "question": "Q9: If you calculate the average of 5, 10, and 15, the result is:", "options": ["5", "10", "15", "30"], "correct": 1, "explanation": "5+10+15 = 30. 30 / 3 = 10." },
            { "question": "Q10: Why do we use line graphs to show temperature changes during a chemical reaction?", "options": ["Because temperature changes continuously over time", "Because it is required", "Because it is easier to draw", "Because it involves categories"], "correct": 0, "explanation": "Line graphs are used for continuous data." }
        ]
    }
];
