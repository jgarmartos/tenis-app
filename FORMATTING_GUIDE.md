# Code Formatting Rules for Tennis App

This document outlines the formatting rules and conventions used in this project.

## Configuration Files Created

### Root Level (affects all files)

- **`.editorconfig`** - Basic formatting rules (indentation, line endings, charset)
- **`.prettierrc`** - Prettier configuration for code formatting
- **`.prettierignore`** - Files to ignore during formatting
- **`.vscode/settings.json`** - VS Code specific settings

### Frontend (Vue.js/TypeScript)

- **`frontend/.eslintrc.json`** - ESLint configuration for linting rules
- **Frontend package.json** - Added formatting scripts

### Backend (Java)

- **`backend/.java-formatter.properties`** - Java formatting configuration

## VS Code Extensions Installed

1. **Prettier - Code formatter** (esbenp.prettier-vscode)
2. **ESLint** (dbaeumer.vscode-eslint)
3. **EditorConfig for VS Code** (EditorConfig.EditorConfig)
4. **Vue Language Features (Volar)** (Vue.volar) - Already installed
5. **Language Support for Java by Red Hat** (redhat.java) - Already installed

## Formatting Rules

### General Rules (All Files)

- **Indentation**: 2 spaces for web files (JS, TS, Vue, HTML, CSS), 4 spaces for Java
- **Line endings**: LF (Unix-style)
- **Charset**: UTF-8
- **Trailing whitespace**: Removed
- **Final newline**: Always added

### JavaScript/TypeScript/Vue

- **Quotes**: Single quotes preferred
- **Semicolons**: Always required
- **Print width**: 80 characters max
- **Trailing commas**: ES5 style
- **Bracket spacing**: Enabled
- **Arrow function parentheses**: Avoid when possible

### Vue Specific

- **Component names**: Multi-word components allowed (rule disabled)
- **Template indentation**: 2 spaces
- **Script indentation**: 2 spaces
- **Self-closing tags**: Required for all elements

### Java

- **Indentation**: 4 spaces
- **Line length**: 120 characters max
- **Braces**: End of line style
- **Method spacing**: 1 blank line around methods

## Available Commands

### Frontend Commands

```bash
# Navigate to frontend directory first
cd frontend

# Lint and fix all files
npm run lint

# Check for linting errors (without fixing)
npm run lint:check

# Format all files with Prettier
npm run format

# Check if files are formatted correctly
npm run format:check
```

## VS Code Settings

### Automatic Formatting

- **Format on save**: Enabled
- **Format on paste**: Enabled
- **Organize imports on save**: Enabled
- **Fix ESLint errors on save**: Enabled

### File Associations

- Vue files are properly recognized
- Emmet support for Vue templates

## How to Use

1. **Automatic formatting**: Files will be formatted automatically when you save them
2. **Manual formatting**: Use `Shift + Alt + F` to format the current file
3. **Command palette**: `Ctrl + Shift + P` → "Format Document"
4. **Linting**: ESLint will show warnings and errors in the Problems panel

## Custom Rules Applied

### Following Your Coding Instructions

- **camelCase**: Variable names use camelCase (enforced by ESLint)
- **Error handling**: ESLint warns about missing error handling
- **Comments**: JSDoc style comments are encouraged
- **Type annotations**: TypeScript strict mode enabled
- **Function length**: ESLint warns about overly complex functions
- **Imports**: Explicit imports preferred over wildcard imports

### Vue.js Specific

- **Component structure**: Proper order enforced (template, script, style)
- **Props**: Require type definitions and default values
- **Template**: Proper indentation and attribute formatting
- **Self-closing tags**: Enforced for consistency

## Testing the Setup

To test if everything is working correctly:

1. Open any Vue file (like `MatchesPanel.vue`)
2. Make some formatting changes (add extra spaces, change quotes)
3. Save the file - it should automatically format
4. Run `npm run lint` in the frontend directory to check for any issues

## Troubleshooting

If formatting doesn't work:

1. Make sure all extensions are installed and enabled
2. Check if the file type is recognized (bottom right corner of VS Code)
3. Try restarting VS Code
4. Check the Output panel for any error messages

The formatting rules are now fully configured and ready to use!
