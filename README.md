# VeroUI 🎨

A beautiful, fast, and modern Vue 3 UI library inspired by [HeroUI](https://heroui.com).

> ⚠️ **Work in Progress** - VeroUI is currently in active development and not ready for production use.

## About

VeroUI is a Vue 3 port of HeroUI, bringing the same elegant design system and developer experience to the Vue ecosystem. Built with accessibility, customization, and developer experience in mind.

## Tech Stack

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Tailwind Variants](https://www.tailwind-variants.org/)** - Component variants
- **[RekaUI](https://reka-ui.com/)** - Headless UI primitives for accessibility
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Turborepo](https://turbo.build/)** - High-performance monorepo build system

## Project Structure
```
veroui/
├── apps/                  # (Coming soon) Demo apps and documentation
├── packages/
│   ├── core/
│   │   ├── theme/         # Design tokens, colors, Tailwind plugin
│   │   └── system/        # Type system, utilities, provider
│   ├── composables/       # Vue composables (hooks)
│   ├── components/        # (Coming soon) UI components
│   └── utilities/         # Shared utility functions (vue-utils, shared-util, shared-icons)
```

## Current Status

### ✅ Completed

- [x] Monorepo setup (pnpm + Turborepo)
- [x] Theme system (colors, tokens, design system)
- [x] Core utilities and type system
- [x] Provider and configuration
- [x] Base composables (useDisclosure, useTheme, useIsMounted, etc.)
- [x] Storybook/Histoire setup

### 🚧 In Progress

- [ ] Component library (Button, Input, Card, etc.)
- [ ] Documentation site
- [ ] Storybook/Histoire demos

### 📋 Planned

- [ ] Full component coverage
- [ ] Theming and customization guide
- [ ] Accessibility testing
- [ ] npm publishing

## 🧩 Component Checklist

Below is the full list of components in progress for **VeroUI**.  
We'll check them off as they are completed.

### ✅ Completed
- [x] **Button**
- [x] **Spinner**

### 🚧 In Progress / Planned
- [ ] Accordion  
- [ ] Alert  
- [ ] Autocomplete  
- [ ] Avatar  
- [ ] Badge  
- [ ] Breadcrumbs  
- [ ] Calendar  
- [ ] Card  
- [ ] Checkbox  
- [ ] Chip  
- [ ] Code  
- [ ] Date Input  
- [ ] Date Picker  
- [ ] Divider  
- [ ] Drawer  
- [ ] Dropdown  
- [ ] Form  
- [ ] Image  
- [ ] Input OTP  
- [ ] Input  
- [ ] Kbd  
- [ ] Link  
- [ ] Listbox  
- [ ] Menu  
- [ ] Modal  
- [ ] Navbar  
- [ ] Number Input  
- [ ] Pagination  
- [ ] Popover  
- [ ] Progress  
- [ ] Radio  
- [ ] Ripple  
- [ ] Scroll Shadow  
- [ ] Select  
- [ ] Skeleton  
- [ ] Slider  
- [ ] Snippet  
- [ ] Spacer  
- [ ] Switch  
- [ ] Table  
- [ ] Tabs  
- [ ] Toast  
- [ ] Tooltip  
- [ ] User  
- [ ] All Component stories

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 9
- Vue 3.4+

### Setup
```bash
# Clone the repository
git clone https://github.com/I-am-abdulazeez/veroui.git
cd veroui

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Watch mode for development
pnpm dev
```

### Building Specific Packages
```bash
# Build theme only
pnpm --filter @veroui/theme build

# Build system only
pnpm --filter @veroui/system build

# Build composables only
pnpm --filter @veroui/composables build
```

## Packages

### `@veroui/theme`

Design tokens, color system, and Tailwind CSS plugin.
```typescript
import { veroui } from '@veroui/theme'

// In your tailwind.config.ts
export default {
  plugins: [veroui()],
}
```

### `@veroui/system`

Core utilities, type system, and provider for global configuration.

Option 1: Using the Plugin (Recommended for apps)
```typescript
import { createVeroUI } from '@veroui/system'

// In your main.ts
const app = createApp(App)
app.use(createVeroUI({
  disableAnimation: false,
  locale: 'en-US'
}))
```

Option 2: Using the Component
```vue
<script setup lang="ts">
import { VeroUIProvider } from '@veroui/system'
</script>

<template>
  <VeroUIProvider
    :disable-animation="false"
    :disable-ripple="false"
    locale="en-US"
  >
    <RouterView />
  </VeroUIProvider>
</template>
```

### `@veroui/composables`

Reusable Vue composables for building interactive components.
```typescript
import { useDisclosure, useTheme, useIsMobile } from '@veroui/composables'
```

### `@veroui/utilities`

Shared utility functions used across packages.

## Philosophy

VeroUI follows these core principles of HeroUI which follows:

- **Accessible by Default** - All components follow WAI-ARIA guidelines
- **Customizable** - Easy theming with design tokens and variants
- **Type-Safe** - Full TypeScript support throughout
- **Developer Experience** - Intuitive APIs and comprehensive documentation
- **Performance** - Optimized builds and tree-shakeable components

## Credits

VeroUI is inspired by and adapted from:
- **[HeroUI](https://heroui.com)** - The original React UI library
- **[NextUI](https://nextui.org)** - HeroUI's predecessor
- **[RekaUI](https://reka-ui.com/)** - Headless UI primitives

## Contributing

Contributions are welcome! This project is in early stages, so feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Community

- [GitHub Issues](https://github.com/I-am-abdulazeez/veroui/issues)
- [Discussions](https://github.com/I-am-abdulazeez/veroui/discussions)

---

**Built with ❤️ for the Vue community**
