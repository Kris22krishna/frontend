export const linIneqIntroData = {
  prerequisites: [
    { title: 'Linear Equations', desc: 'Solving equations of the form ax + b = c — the foundation before replacing = with inequalities.', icon: '=' },
    { title: 'Number Line', desc: 'Plotting integers and fractions on a number line, understanding direction and order.', icon: '📏' },
    { title: 'Coordinate Geometry', desc: 'Plotting points (x, y), drawing lines in the plane — needed for two-variable inequalities.', icon: '📐' }
  ],
  cards5W1H: [
    {
      q: "WHAT",
      label: "are Linear Inequalities?",
      icon: "🔍",
      gradFrom: "#0891b2",
      gradTo: "#06b6d4",
      shadow: "rgba(6,182,212,0.35)",
      content: `A <strong>linear inequality</strong> is a mathematical statement that compares two linear expressions using an inequality symbol: $<$ (less than), $>$ (greater than), $\\leq$ (less than or equal to), or $\\geq$ (greater than or equal to). Unlike an equation which gives a single answer, an inequality gives a <em>range</em> of values. For example, $2x + 3 > 7$ says "which values of $x$ make $2x+3$ bigger than 7?" — the answer is the entire set $x > 2$, an infinite collection of solutions! In two variables, $3x + 2y \\leq 12$ describes an entire <strong>half-plane</strong> — one side of a line in the coordinate plane.`,
      fact: 'The symbols $<$ and $>$ were introduced by Thomas Harriot in 1631. The symbols $\\leq$ and $\\geq$ came even later — mathematics notation evolved over centuries!',
    },
    {
      q: "WHO",
      label: "uses Linear Inequalities?",
      icon: "👥",
      gradFrom: "#059669",
      gradTo: "#10b981",
      shadow: "rgba(16,185,129,0.35)",
      content: `Inequalities are everywhere in professional life! <strong>Structural Engineers</strong> specify safety tolerances (stress must be $\\leq$ maximum load). <strong>Doctors</strong> prescribe dosage ranges: 2 mg $\\leq$ dose $\\leq$ 5 mg. <strong>Airline pilots</strong> maintain altitude bounds. <strong>Financial analysts</strong> set portfolio constraints (risk $\\leq$ threshold, return $\\geq$ target). <strong>Nutritionists</strong> balance diet plans: 1800 $\\leq$ calories $\\leq$ 2200. <strong>Factory managers</strong> optimise production within capacity limits — the entire science of <strong>Linear Programming</strong> (Class 12 Chapter 12) is built on systems of linear inequalities!`,
      fact: "During WWII, linear programming using systems of inequalities was used to optimise military supply chains — it is credited with saving thousands of lives through efficient resource allocation!",
    },
    {
      q: "WHEN",
      label: "was this concept formalised?",
      icon: "📅",
      gradFrom: "#b45309",
      gradTo: "#f59e0b",
      shadow: "rgba(245,158,11,0.35)",
      content: `The formal study of inequalities grew alongside algebra. Thomas Harriot introduced $<$ and $>$ in 1631. The study of systems of linear inequalities took off in the 20th century. <strong>George Dantzig</strong> invented the <em>Simplex Method</em> in 1947 for solving linear programming problems — the most practical application of systems of inequalities. The Indian mathematician <strong>C.R. Rao</strong> and others contributed to statistical inequalities. Today, every computer algorithm that optimises resources — from GPS routing to protein folding — uses systems of inequalities at its core.`,
      fact: "George Dantzig's Simplex Method is considered one of the top 10 algorithms of the 20th century. It runs trillions of computations daily across the world's logistics and scheduling systems!",
    },
    {
      q: "WHERE",
      label: "do we see them?",
      icon: "🌍",
      gradFrom: "#be185d",
      gradTo: "#ec4899",
      shadow: "rgba(236,72,153,0.35)",
      content: `Linear inequalities appear in every corner of life! <strong>Road signs</strong>: Speed $\\leq$ 80 km/h. <strong>Elevators</strong>: Load $\\leq$ 680 kg. <strong>Banks</strong>: Minimum balance $\\geq$ ₹5000. <strong>Exams</strong>: To pass, marks $\\geq$ 35%. <strong>Health</strong>: Normal body temperature: 36°C $\\leq T \\leq$ 37.5°C. <strong>Sports</strong>: Legal javelin throw must be $\\leq$ 90m AND $\\geq$ 60m for a record attempt. In <strong>two dimensions</strong>, every safety zone, restricted airspace, and marine boundary is defined by a system of linear inequalities!`,
      fact: "Your smartphone's battery management system solves a real-time constraint satisfaction problem — a system of inequalities — thousands of times per second to optimise charging and power delivery!",
    },
    {
      q: "WHY",
      label: "should I learn this?",
      icon: "🚀",
      gradFrom: "#7c3aed",
      gradTo: "#a855f7",
      shadow: "rgba(168,85,247,0.35)",
      content: `This chapter is the <strong>gateway to Linear Programming</strong> (Class 12), one of the most powerful and practical applications of mathematics. But it also directly powers: <strong>Calculus</strong> — domains, intervals of increase/decrease, and the squeeze theorem all use inequalities. <strong>Coordinate Geometry</strong> — regions defined by constraints. <strong>Statistics</strong> — confidence intervals and range analysis. In <strong>JEE</strong>, inequalities appear in questions on domains of functions, number of solutions, and optimisation. Mastering this chapter makes you significantly better at problem-solving across all branches of mathematics!`,
      fact: "In competitive programming (olympiads, ICPC), knowing how to model a problem as a system of linear inequalities and recognise infeasibility is a decisive skill that separates top performers!",
    },
    {
      q: "HOW",
      label: "do we solve them?",
      icon: "🎯",
      gradFrom: "#0369a1",
      gradTo: "#3b82f6",
      shadow: "rgba(59,130,246,0.35)",
      content: `<strong>One variable</strong>: Solve like an equation with one critical rule — <em>flip the inequality sign when multiplying or dividing by a negative number</em>. Example: $-2x > 6 \\Rightarrow x < -3$ (sign flips!). Represent on a <strong>number line</strong>: open circle $○$ for strict ($<$, $>$), filled circle $●$ for non-strict ($\\leq$, $\\geq$). <strong>Two variables</strong>: Draw the boundary line $ax + by = c$ (dashed for strict, solid for non-strict). Substitute a test point to determine which half-plane to shade. <strong>Systems</strong>: Shade each inequality individually, then the overlapping region is the <strong>feasible region</strong>!`,
      fact: "The #1 mistake students make with inequalities is forgetting to flip the sign when dividing by a negative — even experienced mathematicians double-check this! Make it a habit: negative divisor = flip!",
    }
  ]
};
