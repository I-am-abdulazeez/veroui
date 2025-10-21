# @veroui/system

VeroUI system primitives for Vue. Contains utilities for creating consistent, accessible Vue components with Tailwind CSS.

Please refer to the [documentation](https://veroui.com) for more information.

## Features

- 🎨 **Variant System** - Type-safe component variants using `tailwind-variants`
- 🔧 **Utilities** - Helper functions for component development
- 📦 **Type-safe** - Full TypeScript support
- 🎯 **Vue-optimized** - Built specifically for Vue 3

## Installation
```sh
pnpm add @veroui/system
# or
npm i @veroui/system
# or
yarn add @veroui/system
# or
bun add @veroui/system
```

## Usage
```vue
<script setup lang="ts">
import { tv } from '@veroui/system'

const button = tv({
  base: 'px-4 py-2 rounded',
  variants: {
    color: {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }
  }
})
</script>

<template>
  <button :class="button({ color: 'primary', size: 'md' })">
    Click me
  </button>
</template>
```

## Included Utilities

- `tv()` - Tailwind Variants for type-safe styling
- `cn()` - Class name merger with Tailwind conflict resolution
- `dataAttr()` - Data attribute helper
- `ariaAttr()` - ARIA attribute helper

## Contributing

Yes please! See the [contributing guidelines](https://github.com/I-am-abdulazeez/veroui/blob/main/CONTRIBUTING.md) for details.

## License

This project is licensed under the terms of the [MIT license](https://github.com/I-am-abdulazeez/veroui/blob/main/LICENSE).

## Credits

VeroUI is inspired by [HeroUI](https://heroui.com) and adapted for Vue 3.
