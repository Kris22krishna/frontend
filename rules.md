# Project Development Rules

Please follow these guidelines when adding or modifying code in this repository:

### CSS & Styling
1. **No Inline CSS**: Avoid using inline styles (e.g., `style={{ ... }}`). Always use external CSS files to apply styles via `className`.
2. **Unique CSS Class Names**: Ensure that class names in `.css` files are unique and properly scoped to prevent conflicts. Use a specific prefix for the module or component (e.g., `.grph-nav-link`, `.alg-skill-card`).
3. **Avoid Changing Global CSS**: Do not modify global `.css` files (like `index.css` or `App.css`) unless absolutely necessary. Instead, create a separate `.css` file in the respective component's or module's directory and make styling changes there.

### Project Structure
4. **Chapter Organization**: Create separate folders and files for each chapter under their respective grades. Do not mix chapters or grades.
5. **Separate Styling Files**: Create separate `.css` files for styling components, ensuring styles are kept distinct from the component logic files.
