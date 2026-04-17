const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = (array) => {
    let oldElement;
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        oldElement = array[i];
        array[i] = array[rand];
        array[rand] = oldElement;
    }
    return array;
};

const generateOptions = (correctAns, type = 'num') => {
    let opts = new Set([correctAns]);
    while (opts.size < 4) {
        let wrong;
        if (typeof correctAns === 'number') {
            wrong = correctAns + randInt(-20, 20);
            if (wrong < 0) wrong = Math.abs(wrong) + randInt(1, 10);
            if (wrong === correctAns) wrong += 5;
        } else {
            // String manipulation or just fallback
            wrong = correctAns + randInt(1, 5) * 10;
        }
        opts.add(wrong);
    }
    const optsArr = Array.from(opts);
    shuffle(optsArr);
    return {
        options: optsArr.map(o => String(o)),
        ansIndex: optsArr.indexOf(correctAns)
    };
};

export const generateBarGraphScenarios = () => {
    const scenarios = [];
    
    for (let i = 0; i < 20; i++) {
        // Types: read exact value, calculate sum, calculate difference, find max/min
        const months = ["Jan", "Feb", "Mar", "Apr", "May"];
        const values = [randInt(10, 50), randInt(10, 50), randInt(10, 50), randInt(10, 50), randInt(10, 50)];
        const data = months.map((m, idx) => ({ label: m, value: values[idx] }));
        
        const type = i % 4;
        let q = "";
        let ans = 0;
        let expl = "";

        if (type === 0) {
            // Read exact value
            const targetIdx = randInt(0, 4);
            ans = values[targetIdx];
            q = `According to the bar graph, what is the value for ${months[targetIdx]}?`;
            expl = `By looking at the bar for ${months[targetIdx]}, we can see its height corresponds to ${ans} on the vertical axis.`;
        } else if (type === 1) {
            // Sum
            const i1 = randInt(0, 2);
            const i2 = randInt(3, 4);
            ans = values[i1] + values[i2];
            q = `What is the total sum of values for ${months[i1]} and ${months[i2]}?`;
            expl = `Value for ${months[i1]} is ${values[i1]} and ${months[i2]} is ${values[i2]}. Sum = ${values[i1]} + ${values[i2]} = ${ans}.`;
        } else if (type === 2) {
            // Difference
            let maxI = values.indexOf(Math.max(...values));
            let minI = values.indexOf(Math.min(...values));
            if (maxI === minI) { maxI = 0; minI = 1; }
            ans = values[maxI] - values[minI];
            q = `What is the difference between the maximum value (${months[maxI]}) and minimum value (${months[minI]})?`;
            expl = `Max value is ${values[maxI]}. Min value is ${values[minI]}. Difference = ${values[maxI]} - ${values[minI]} = ${ans}.`;
        } else {
            // Find max month value
            ans = Math.max(...values);
            q = `What is the highest value recorded across all months?`;
            expl = `The tallest bar represents the highest value, which is ${ans}.`;
        }

        const { options, ansIndex } = generateOptions(ans);
        scenarios.push({
            q, type: "mcq", opts: options, ans: ansIndex, expl,
            svg: { type: "bar-graph", data }
        });
    }
    return scenarios;
};

export const generateHistogramScenarios = () => {
    const scenarios = [];
    
    for (let i = 0; i < 20; i++) {
        // Types: uniform (read), non-uniform (calculate adjusted frequency)
        const isUniform = i % 2 === 0;

        if (isUniform) {
            const start = randInt(0, 2) * 10;
            const width = 10;
            const data = Array.from({length: 4}, (_, idx) => ({
                label: `${start + idx*width}-${start + (idx+1)*width}`,
                x: start + idx*width,
                w: width,
                freq: randInt(5, 30)
            }));
            
            const targetIdx = randInt(0, 3);
            const ans = data[targetIdx].freq;
            const q = `In the given histogram (uniform width), what is the frequency of the class interval ${data[targetIdx].label}?`;
            const expl = `The classes have uniform width, so the height of the rectangle directly represents the frequency: ${ans}.`;
            const { options, ansIndex } = generateOptions(ans);

            scenarios.push({
                q, type: "mcq", opts: options, ans: ansIndex, expl,
                svg: { type: "histogram-uniform", data, maxVal: 40 }
            });
        } else {
            // Non-uniform: adjusted frequency = (min width / class width) * freq
            const baseW = 10;
            const vWidths = [10, 20, 10, 30];
            const freqs = [10, 30, 15, 60];
            const xStarts = [0, 10, 30, 40];
            
            const targetIdx = randInt(1, 3); // pick a varying one
            if (vWidths[targetIdx] === 10) targetIdx === 3 ? 3 : 1; // force non-10 if possible
            
            const classW = vWidths[targetIdx];
            const freq = freqs[targetIdx];
            const ans = (baseW / classW) * freq;

            const data = vWidths.map((w, idx) => ({
                label: `${xStarts[idx]}-${xStarts[idx]+w}`,
                x: xStarts[idx],
                w: w,
                freq: freqs[idx],
                adjFreq: (baseW / w) * freqs[idx]
            }));

            const q = `The table shows a frequency distribution with varying class widths. To draw a histogram, we adjust the height. For the class ${data[targetIdx].label}, the actual frequency is ${freq}. If the minimum class width is ${baseW}, what is the adjusted height (length of rectangle)?`;
            const expl = `Formula: Adjusted Frequency = (Minimum class size / Class size) × Frequency = (${baseW} / ${classW}) × ${freq} = ${ans}.`;
            const { options, ansIndex } = generateOptions(ans);

            scenarios.push({
                q, type: "mcq", opts: options, ans: ansIndex, expl,
                svg: { type: "histogram-varying", data, targetIdx }
            });
        }
    }
    return scenarios;
};

export const generateFrequencyPolygonScenarios = () => {
    const scenarios = [];
    
    for (let i = 0; i < 20; i++) {
        // Find class mark, read frequency from point, identify coordinates
        const start = randInt(10, 50);
        const width = 10;
        const data = Array.from({length: 5}, (_, idx) => {
            const low = start + idx*width;
            const high = low + width;
            return {
                label: `${low}-${high}`,
                low: low,
                high: high,
                mark: (low + high) / 2,
                freq: randInt(5, 25)
            };
        });

        const type = i % 3;
        let ans, q, expl;

        if (type === 0) {
            // Find class mark
            const targetIdx = randInt(0, 4);
            ans = data[targetIdx].mark;
            q = `For the class interval ${data[targetIdx].label}, what is the class-mark (the x-coordinate used to plot the frequency polygon)?`;
            expl = `Class-mark = (Lower limit + Upper limit) / 2 = (${data[targetIdx].low} + ${data[targetIdx].high}) / 2 = ${ans}.`;
        } else if (type === 1) {
            // Read frequency
            const targetIdx = randInt(0, 4);
            ans = data[targetIdx].freq;
            q = `Looking at the frequency polygon, what is the frequency corresponding to the class mark ${data[targetIdx].mark}?`;
            expl = `The y-coordinate of the point at x = ${data[targetIdx].mark} is ${ans}.`;
        } else {
            // Previous class assumption (the zero frequency point)
            ans = data[0].mark - width;
            q = `To complete the frequency polygon, we assume a class interval before the first class (${data[0].label}) with frequency zero. What is the class mark of this imaginary preceding class?`;
            expl = `The preceding class would be ${data[0].low - width}-${data[0].low}. Its class mark is ${ans}.`;
        }

        const { options, ansIndex } = generateOptions(ans);
        scenarios.push({
            q, type: "mcq", opts: options, ans: ansIndex, expl,
            svg: { type: "frequency-polygon", data }
        });
    }
    return scenarios;
};
