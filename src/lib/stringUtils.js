
/**
 * Capitalizes the first letter of a string, keeping the rest as is.
 * Handles null/undefined inputs and strings starting with LaTeX math delimiters.
 * @param {string} str - The input string
 * @returns {string} - The capitalized string
 */
export function capitalizeFirstLetter(str) {
    if (!str) return '';
    const s = String(str);

    // If it starts with a LaTeX delimiter, don't mess with it immediately
    if (s.startsWith('$') || s.startsWith('\\(') || s.startsWith('\\[')) {
        return s;
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
}
