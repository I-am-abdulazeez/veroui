# Contributing to VeroUI 🎨

First off, thank you for considering contributing to VeroUI! It's people like you that make VeroUI such a great tool for the Vue community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Coding Guidelines](#coding-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Component Development](#component-development)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9
- Git
- A GitHub account

### Development Setup

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/veroui.git
   cd veroui
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/I-am-abdulazeez/veroui.git
   ```

4. **Install dependencies**
   ```bash
   pnpm install
   ```

5. **Build all packages**
   ```bash
   pnpm build
   ```

6. **Start development mode**
   ```bash
   pnpm dev
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version, etc.)

Use the bug report template when available.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why this enhancement would be useful
- **Proposed solution**
- **Alternative solutions** you've considered
- **Examples** from other libraries if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - simple issues perfect for beginners
- `help wanted` - issues that need assistance
- `documentation` - improvements or additions to documentation

### Component Development

We're actively building out the component library! Check the [Component Checklist](README.md#-component-checklist) in the README to see what needs to be done.

## Development Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write your code
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   # Build all packages
   pnpm build
   
   # Run tests (when available)
   pnpm test
   
   # Type check
   pnpm typecheck
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Keep your fork updated**
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

## Coding Guidelines

### TypeScript

- Use TypeScript for all code
- Provide proper type definitions
- Avoid using `any` - use `unknown` if needed
- Export types for public APIs

### Vue Components

- Use `<script setup lang="ts">` syntax
- Define props with proper types using `defineProps`
- Use composables for reusable logic
- Follow Vue 3 Composition API best practices

### Styling

- Use Tailwind CSS utility classes
- Use Tailwind Variants for component variants
- Follow the existing theme structure
- Ensure responsive design
- Test in both light and dark modes

### File Structure

```
packages/components/[component-name]/
├── src/
│   ├── [component-name].vue       # Main component
│   ├── types.ts                   # Type definitions
│   ├── use-[component-name].ts    # Composable (if needed)
│   └── index.ts                   # Exports
├── stories/
│   └── [component-name].stories.ts
├── package.json
└── README.md
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `DatePicker`)
- **Files**: kebab-case (e.g., `button.vue`, `use-disclosure.ts`)
- **Variables/Functions**: camelCase (e.g., `isOpen`, `handleClick`)
- **Types/Interfaces**: PascalCase (e.g., `ButtonProps`, `ThemeConfig`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_LOCALE`)

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools
- `ci`: Changes to CI configuration

### Examples

```bash
# Features
feat(button): add loading state
feat(composables): add useDisclosure hook
feat(theme): add accordion variants
feat(spinner): add component with theme support
feat(composables): add readme and package.json
feat(composables): add useDisclosure hook
feat(theme): add accordion variants
feat(theme): add spinner styles

# Fixes
fix(button): resolve focus ring issue
fix(theme): correct dark mode colors

# Documentation
docs(contributing): add pr guidelines
docs(readme): update installation steps

# Chores
chore(deps): update dependencies
chore(build): configure tsup for system package
chore(docs): remove redundant sections

# Refactoring
refactor(composables): simplify useTheme logic
refactor(button): extract variant logic
```

## Pull Request Process

1. **Update documentation** - Ensure README, docs, and comments are updated
2. **Update the checklist** - Mark completed components in README
3. **Test thoroughly** - Ensure all builds pass and no regressions
4. **Write clear description** - Explain what, why, and how
5. **Link related issues** - Use "Closes #123" or "Fixes #456"
6. **Request review** - Tag maintainers if needed
7. **Address feedback** - Respond to review comments promptly
8. **Keep commits clean** - Squash if necessary before merging

### PR Title Format

Follow the same convention as commits:

```
feat(button): add ripple effect
fix(input): resolve focus ring issue
```

## Component Development

When creating a new component:

1. **Check the spec** - Review HeroUI's component for reference
2. **Use RekaUI** - Leverage headless primitives for accessibility
3. **Create variants** - Use Tailwind Variants for different styles
4. **Add composables** - Extract reusable logic
5. **Write stories** - Create Storybook/Histoire examples
6. **Document props** - Add JSDoc comments
7. **Test accessibility** - Ensure keyboard navigation and screen reader support
8. **Support theming** - Use design tokens from `@veroui/theme`

### Component Template

```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentProps } from './types'

const props = withDefaults(defineProps<ComponentProps>(), {
  // defaults
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Component logic
</script>

<template>
  <div>
    <!-- Component template -->
  </div>
</template>
```

## Questions?

Feel free to:
- Open a [Discussion](https://github.com/I-am-abdulazeez/veroui/discussions) for questions
- Join our community channels (coming soon)
- Reach out to maintainers

---

Thank you for contributing to VeroUI! 🎉
