export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
