# Custom Instructions for GitHub Copilot

- **Code Style:** Use camelCase for variable names, unless it's a constant (all uppercase with underscores).
- **Error Handling:** Implement comprehensive error handling with try-except blocks.
- **Comments:** Add clear and concise comments in english to explain complex logic. In typescript, use JSDoc style comments for functions and classes.
- **Documentation:** Provide detailed docstrings for all functions and classes, including parameter types and return types.
- **Type Annotations:** Use type annotations for function parameters and return types in Python, and TypeScript.
- **Function Length:** Keep functions short and focused on a single task. If a function exceeds 20 lines, consider refactoring it into smaller functions.
- **Code Complexity:** Avoid complex nested structures; prefer flat structures where possible.
- **Imports:** Prioritize explicit module imports (e.g., `from module import function` instead of `import module`).
- **Testing:** Generate unit tests for all new functions and classes.
- **Responses:** When providing code examples, include relevant unit tests and thorough explanations.