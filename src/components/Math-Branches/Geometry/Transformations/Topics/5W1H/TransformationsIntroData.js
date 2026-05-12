export const transformationsCards5W1H = [
    {
        q: 'What?', label: 'What are Transformations?',
        icon: '🔄', gradFrom: '#06b6d4', gradTo: '#22d3ee', shadow: 'rgba(6,182,212,0.3)',
        content: `A **geometric transformation** is a rule that moves, flips, turns, or resizes a shape. The original shape is called the **pre-image** and the result is called the **image**.\n\nThe four main transformations are:\n- **Translation** — slide in a direction\n- **Rotation** — turn around a fixed point\n- **Reflection** — flip across a mirror line\n- **Dilation** — enlarge or shrink by a scale factor`,
        fact: `💡 **Isometric transformations** (translation, rotation, reflection) preserve size and shape. Dilation changes size but keeps shape similar.`
    },
    {
        q: 'Why?', label: 'Why Study Transformations?',
        icon: '🎯', gradFrom: '#8b5cf6', gradTo: '#a78bfa', shadow: 'rgba(139,92,246,0.3)',
        content: `Transformations are the foundation of **symmetry, design, and motion**. They explain:\n- Why snowflakes have 6-fold symmetry (rotation by 60°)\n- How computer graphics animate characters (chains of transformations)\n- Why reflections appear in mirrors and water\n- How maps scale real-world distances (dilation)`,
        fact: `🌍 **Real-world applications:** Architecture, robotics, computer vision, video games, and crystallography all rely on transformation mathematics.`
    },
    {
        q: 'Who?', label: 'Who Uses Transformations?',
        icon: '👩‍💻', gradFrom: '#f59e0b', gradTo: '#fcd34d', shadow: 'rgba(245,158,11,0.3)',
        content: `- **Graphic designers** use rotations and reflections to create logos and patterns\n- **Architects** apply symmetry (reflective) and scaling (dilation) in blueprints\n- **Robotics engineers** use rotation matrices to control arm movements\n- **Game developers** transform 3D coordinates 60 times per second for smooth animation\n- **Crystallographers** classify crystal structures by their rotational symmetry groups`,
        fact: `🤖 A robot arm's position is controlled by a series of rotation and translation matrices — the same maths you study here!`
    },
    {
        q: 'When?', label: 'When Did This Develop?',
        icon: '📅', gradFrom: '#f43f5e', gradTo: '#fb7185', shadow: 'rgba(244,63,94,0.3)',
        content: `- **Ancient times:** Symmetric patterns appeared in Greek, Islamic, and Celtic art long before formal maths\n- **1637:** René Descartes introduced the coordinate plane, making transformations algebraic\n- **1872:** Felix Klein's **Erlangen Programme** unified all geometries through transformation groups\n- **20th century:** Transformation matrices became central to computer graphics and robotics`,
        fact: `📐 Felix Klein showed that every geometry can be defined by its group of transformations — a revolutionary insight called the Erlangen Programme.`
    },
    {
        q: 'Where?', label: 'Where Do We See Transformations?',
        icon: '🌏', gradFrom: '#10b981', gradTo: '#34d399', shadow: 'rgba(16,185,129,0.3)',
        content: `Transformations appear everywhere around us:\n- **Art & Patterns:** Islamic geometric patterns use 17 distinct symmetry groups\n- **Nature:** Butterfly wings show bilateral (reflective) symmetry\n- **Technology:** GPS systems use coordinate transformations to map locations\n- **Sport:** Analysing player motion in football uses rotation and translation\n- **Medicine:** MRI scans rotate coordinate frames to produce 3D images`,
        fact: `🦋 Every repeating pattern (wallpaper, fabric, tiles) belongs to one of just **17 wallpaper groups** — all classified by their transformation symmetries!`
    },
    {
        q: 'How?', label: 'How Do Transformations Work?',
        icon: '⚙️', gradFrom: '#ec4899', gradTo: '#f472b6', shadow: 'rgba(236,72,153,0.3)',
        content: `Each transformation is described by a **rule applied to coordinates (x, y)**:\n\n- **Translation by (a, b):** $(x, y) \\to (x+a, y+b)$\n- **Reflection in x-axis:** $(x, y) \\to (x, -y)$\n- **Rotation 90° anticlockwise about origin:** $(x, y) \\to (-y, x)$\n- **Dilation by factor k from origin:** $(x, y) \\to (kx, ky)$\n\nApply the rule to every vertex of the shape to find the image.`,
        fact: `🧮 In matrix form, a 2D rotation by angle θ is: $\\begin{pmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{pmatrix}$ — the foundation of all computer graphics.`
    }
];
