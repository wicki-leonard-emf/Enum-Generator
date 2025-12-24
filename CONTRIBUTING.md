# Contributing to Enum Generator

Thank you for considering contributing to Enum Generator! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive criticism
- Assume good intentions

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Enum-Generator.git`
3. Add upstream remote: `git remote add upstream https://github.com/wicki-leonard-emf/Enum-Generator.git`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm package manager
- Git

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## Project Structure

```
Enum-Generator/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/              # React components
│   ├── enumeration-generator.tsx  # Main generator logic
│   ├── pixel-background.tsx       # Animated background
│   └── ui/                  # UI component library (shadcn/ui)
├── lib/                     # Utility functions
│   └── utils.ts            # Helper utilities
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── README.md               # Project documentation
└── CONTRIBUTING.md         # This file
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types when possible
- Use descriptive variable and function names

### React

- Use functional components with hooks
- Follow React best practices
- Keep components focused and single-purpose
- Use meaningful component and prop names

### Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Maintain consistent spacing and sizing
- Ensure responsive design

### Documentation

- Add JSDoc comments to all functions and components
- Document parameters and return values
- Include usage examples for complex functions
- Keep documentation up to date with code changes

### Code Quality

```typescript
// Good: Well-documented function with proper types
/**
 * Generates enumerations from input terms
 * @param terms - Array of input terms
 * @param mode - Generation mode (simple, medium, hard)
 * @returns Array of generated enumeration strings
 */
function buildEnumerations(terms: string[], mode: GenerationMode): string[] {
  // Implementation
}

// Bad: No documentation, unclear types
function generate(t: any, m: any) {
  // Implementation
}
```

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add copy to clipboard functionality
fix: prevent duplicate terms with different cases
docs: update README with installation instructions
refactor: improve enumeration generation performance
```

## Submitting Changes

1. **Update your fork** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Make your changes** following the coding standards

3. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes** with a descriptive message:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with:
     - Description of changes
     - Related issue numbers
     - Testing performed
     - Screenshots (if applicable)

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Update documentation for any changed functionality
- Add tests if applicable
- Ensure all checks pass
- Respond to review feedback promptly

## Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - OS and version
   - Browser and version
   - Node.js version
6. **Screenshots**: If applicable
7. **Additional Context**: Any other relevant information

Use the bug report template when creating an issue.

## Suggesting Features

When suggesting features, please include:

1. **Description**: Clear description of the feature
2. **Use Case**: Why this feature would be useful
3. **Proposed Solution**: How you envision it working
4. **Alternatives**: Other approaches you've considered
5. **Additional Context**: Any other relevant information

Use the feature request template when creating an issue.

## Testing

Currently, the project doesn't have automated tests. Contributions to add testing infrastructure would be welcome!

When adding tests:
- Use Jest for unit tests
- Use React Testing Library for component tests
- Ensure tests are meaningful and maintainable
- Aim for good coverage of critical paths

## Performance Considerations

When contributing code:
- Be mindful of performance implications
- Avoid unnecessary re-renders in React
- Optimize large data processing
- Test with large inputs when relevant

## Questions?

If you have questions:
- Open a discussion on GitHub
- Check existing issues and PRs
- Review the documentation

Thank you for contributing to Enum Generator! 🎉
