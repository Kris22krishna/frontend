export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

/**
 * Ensures a list of MCQ options are unique by value and label.
 * @param {Object} correct The correct option {value, label}
 * @param {Array} distractors List of distractor options [{value, label}]
 * @returns {Array} Shuffled array of 4 unique options
 */
export const ensureUniqueOptions = (correct, distractors) => {
    const normalize = (s) => String(s || "").replace(/\$/g, "").replace(/\s+/g, "").replace(/\{/g, "").replace(/\}/g, "").toLowerCase();
    
    const options = [correct];
    const seen = new Set([normalize(correct.value)]);

    for (const opt of distractors) {
        if (options.length >= 4) break;
        const norm = normalize(opt.value);
        if (!seen.has(norm)) {
            seen.add(norm);
            options.push(opt);
        }
    }

    let safety = 0;
    while (options.length < 4 && safety < 40) {
        const baseVal = options[0].value;
        const baseNorm = normalize(baseVal);
        let newVal, newLabel;

        const numMatch = baseNorm.match(/^-?\d+(\.\d+)?$/);
        if (numMatch) {
            const numVal = parseFloat(numMatch[0]);
            const jitter = numVal + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(safety / 2) + 1);
            newVal = String(jitter);
            newLabel = String(jitter);
        } else {
            if (baseVal.includes("^")) {
                newVal = baseVal.replace(/\^(\d+)/, (m, p) => `^${parseInt(p) + (safety % 3) + 1}`);
                newLabel = newVal;
            } else {
                newVal = baseVal + " "; 
                newLabel = baseVal;
            }
        }

        const normNew = normalize(newVal);
        if (!seen.has(normNew)) {
            seen.add(normNew);
            options.push({ value: newVal, label: newLabel });
        }
        safety++;
    }

    return shuffleArray(options).slice(0, 4);
};

export const formatLinearExpression = (terms) => {
    let result = "";
    terms.forEach((term) => {
        const { coeff, var: variable } = term;
        if (coeff === 0) return;

        let part = "";
        const absCoeff = Math.abs(coeff);
        const isFirst = result === "";

        // Sign
        if (!isFirst) {
            part += coeff > 0 ? " + " : " - ";
        } else if (coeff < 0) {
            part += "-";
        }

        // Coefficient and variable
        if (variable === "") {
            part += absCoeff;
        } else {
            if (absCoeff !== 1) {
                part += absCoeff;
            }
            part += variable;
        }
        result += part;
    });
    return result || "0";
};
