function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuestion(question, options, correctAnswer, explanation) {
  const shuffled = shuffleArray(options);
  return {
    question,
    options: shuffled,
    correct: shuffled.indexOf(correctAnswer),
    explanation,
  };
}

export const generateFunctionBasicsQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion(
        "Check whether $R = \\{(2,3),(2,5),(4,6)\\}$ is a function.",
        [
          "No, because input $2$ has two outputs",
          "Yes, because all pairs are ordered",
          "Yes, because outputs may repeat",
          "No, because $4$ appears only once",
        ],
        "No, because input $2$ has two outputs",
        "A function cannot assign two different outputs to the same input. Here $2$ maps to $3$ and $5$."
      ),
    () =>
      buildQuestion(
        "Is $R = \\{(x,|x|) \\mid x \\in \\mathbb{R}\\}$ a function?",
        [
          "Yes, every real input has exactly one output",
          "No, because positive and negative inputs can share an output",
          "No, because modulus is not a function",
          "Yes, only for positive $x$",
        ],
        "Yes, every real input has exactly one output",
        "For each real value of $x$, the modulus $|x|$ gives one unique output."
      ),
    () =>
      buildQuestion(
        "Find the domain of $\\{(1,7),(2,5),(3,5)\\}$.",
        ["$\\{1,2,3\\}$", "$\\{7,5\\}$", "$\\{1,2,3,5,7\\}$", "$\\{5\\}$"],
        "$\\{1,2,3\\}$",
        "The domain is the set of first coordinates."
      ),
    () =>
      buildQuestion(
        "Find the range of $\\{(1,7),(2,5),(3,5)\\}$.",
        ["$\\{7,5\\}$", "$\\{1,2,3\\}$", "$\\{1,2,3,5,7\\}$", "$\\{5\\}$"],
        "$\\{7,5\\}$",
        "The range is the set of actual outputs, so repeated outputs are listed once."
      ),
    () =>
      buildQuestion(
        "Determine whether $R = \\{(1,2),(2,3),(3,4)\\}$ is a function.",
        [
          "Yes, each input has exactly one output",
          "No, because outputs are consecutive",
          "No, because it has three ordered pairs",
          "Yes, but only on natural numbers",
        ],
        "Yes, each input has exactly one output",
        "Inputs 1, 2, and 3 each appear once with one output, so the relation is a function."
      ),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generateFunctionBasicsAssessment = () => generateFunctionBasicsQuestions(10);

export const generateFunctionTypesQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion("If $f(x)=x$, then $f(5)$ equals:", ["$5$", "$0$", "$25$", "$-5$"], "$5$", "The identity function returns the same input."),
    () =>
      buildQuestion("If $f(x)=5$, then the range of $f$ is:", ["$\\{5\\}$", "$\\mathbb{R}$", "$[0,\\infty)$", "$\\{x\\}$"], "$\\{5\\}$", "A constant function always returns the same fixed value."),
    () =>
      buildQuestion("For $f(x)=x^2+3x+1$, find $f(2)$.", ["$11$", "$7$", "$9$", "$5$"], "$11$", "Substitute $x=2$: $2^2+3(2)+1 = 11$."),
    () =>
      buildQuestion("What is the domain of $f(x)=\\frac{1}{x+2}$?", ["$x \\neq -2$", "$x \\neq 2$", "All real numbers", "$x > -2$"], "$x \\neq -2$", "The denominator cannot be zero, so $x=-2$ is excluded."),
    () =>
      buildQuestion("For $f(x)=|x|$, find $f(-3)$.", ["$3$", "$-3$", "$0$", "$9$"], "$3$", "Absolute value gives the non-negative magnitude."),
    () =>
      buildQuestion("Evaluate the greatest integer function $[-1.2]$.", ["$-2$", "$-1$", "$0$", "$1$"], "$-2$", "The greatest integer less than or equal to $-1.2$ is $-2$."),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generateFunctionTypesAssessment = () => generateFunctionTypesQuestions(10);

export const generateFunctionAlgebraQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion("If $f(x)=x+1$ and $g(x)=x^2$, then $(f+g)(x)$ equals:", ["$x^2+x+1$", "$x^3+1$", "$x^2-x-1$", "$2x+1$"], "$x^2+x+1$", "Add the outputs: $(f+g)(x)=(x+1)+x^2$."),
    () =>
      buildQuestion("If $f(x)=2x+3$ and $g(x)=x-1$, then $(f-g)(x)$ equals:", ["$x+4$", "$3x+2$", "$x+2$", "$2x-4$"], "$x+4$", "$(f-g)(x)=(2x+3)-(x-1)=x+4$."),
    () =>
      buildQuestion("If $f(x)=x+2$ and $g(x)=x-1$, then $(fg)(2)$ equals:", ["$4$", "$3$", "$8$", "$12$"], "$4$", "$(fg)(2)=f(2)g(2)=4 \\cdot 1 = 4$."),
    () =>
      buildQuestion("If $f(x)=x^2$ and $g(x)=x+1$, then $\\left(\\frac{f}{g}\\right)(x)$ is:", ["$\\frac{x^2}{x+1},\\ x \\neq -1$", "$\\frac{x+1}{x^2}$", "$x^2+x+1$", "$\\frac{x^2}{x+1}$ for all real $x$"], "$\\frac{x^2}{x+1},\\ x \\neq -1$", "For quotient, divide outputs and exclude denominator zero."),
    () =>
      buildQuestion("If $f(x)=x^2-1$, then $(2f)(3)$ equals:", ["$16$", "$8$", "$18$", "$4$"], "$16$", "$(2f)(3)=2f(3)=2(8)=16$."),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generateFunctionAlgebraAssessment = () => generateFunctionAlgebraQuestions(10);

export const generateFunctionEquationQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion("Solve $2x^2-1=1-3x$.", ["$x=\\frac{1}{2},-2$", "$x=1,-\\frac{1}{2}$", "$x=-1,2$", "$x=0,1$"], "$x=\\frac{1}{2},-2$", "$2x^2-1=1-3x \\Rightarrow 2x^2+3x-2=0=(2x-1)(x+2)$."),
    () =>
      buildQuestion("If $f(x)=x^2-1$ and $g(x)=x+1$, solve $f(x)=g(x)$.", ["$x=-1,2$", "$x=0,2$", "$x=-2,1$", "$x=1,3$"], "$x=-1,2$", "$x^2-1=x+1 \\Rightarrow x^2-x-2=0=(x-2)(x+1)$."),
    () =>
      buildQuestion("If $f(x)=2x+1$ and $g(x)=x^2$, find $f(3)+g(-5)$.", ["$32$", "$31$", "$20$", "$36$"], "$32$", "$f(3)=7$ and $g(-5)=25$, so the sum is $32$."),
    () =>
      buildQuestion("If $f(x)=x+4$ and $g(x)=3x-2$, find $f\\left(\\frac{1}{2}\\right)\\cdot g(14)$.", ["$180$", "$315$", "$294$", "$301$"], "$180$", "$f(1/2)=9/2$ and $g(14)=40$, so the product is $180$."),
    () =>
      buildQuestion("If $f(x)=x^2$ and $g(x)=x+3$, find $f(-2)+g(-1)$.", ["$6$", "$4$", "$8$", "$2$"], "$6$", "$f(-2)=4$ and $g(-1)=2$, so the sum is $6$."),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generateFunctionEquationAssessment = () => generateFunctionEquationQuestions(10);

export const generateFunctionDomainRangeQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion("Find the domain of $f(x)=\\frac{1}{x-5}$.", ["$x \\neq 5$", "$x>5$", "$x<5$", "All real numbers"], "$x \\neq 5$", "The denominator cannot be zero."),
    () =>
      buildQuestion("Find the domain of $f(x)=\\frac{1}{\\sqrt{x^2-1}}$.", ["$x<-1$ or $x>1$", "$-1 \\le x \\le 1$", "$x \\neq \\pm 1$", "All real numbers"], "$x<-1$ or $x>1$", "Because the square root is in the denominator, we need $x^2-1>0$."),
    () =>
      buildQuestion("Find the domain of $f(x)=\\frac{1}{x^2+3x+2}$.", ["$x \\neq -1,-2$", "$x \\neq 1,2$", "All real numbers", "$x>-2$"], "$x \\neq -1,-2$", "$x^2+3x+2=(x+1)(x+2)$, so exclude $-1$ and $-2$."),
    () =>
      buildQuestion("Find the range of $f(x)=\\sqrt{16-x^2}$.", ["$[0,4]$", "$[-4,4]$", "$[0,16]$", "$(-\\infty,4]$"], "$[0,4]$", "The square root is non-negative and is largest when $x=0$."),
    () =>
      buildQuestion("Find the range of $f(x)=2-\\sqrt{x-5}$.", ["$(-\\infty,2]$", "$[2,\\infty)$", "$[0,2]$", "All real numbers"], "$(-\\infty,2]$", "Since $\\sqrt{x-5} \\ge 0$, the expression is always less than or equal to 2."),
    () =>
      buildQuestion("Find the range of $f(x)=\\frac{x-4}{x-4}$ with $x \\neq 4$.", ["$\\{1\\}$", "$\\{0,1\\}$", "All real numbers", "$\\mathbb{R}\\setminus\\{1\\}$"], "$\\{1\\}$", "For every allowed input $x \\neq 4$, the expression equals 1."),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generateFunctionDomainRangeAssessment = () => generateFunctionDomainRangeQuestions(10);
