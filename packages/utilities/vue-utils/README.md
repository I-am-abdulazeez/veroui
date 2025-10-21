# @veroui/vue-utils

Internal utility functions and composables for VeroUI Vue components.

> This is an internal utility package, not intended for public usage.

## Installation

```sh
yarn add @veroui/vue-utils
# or
npm i @veroui/vue-utils
# or
pnpm add @veroui/vue-utils
```

## Usage

```vue
<script setup>
import { useIsHydrated } from '@veroui/vue-utils'

const isHydrated = useIsHydrated()
</script>

<template>
  <div v-if="!isHydrated">
    Loading...
  </div>
  <div v-else>
    Client rendered content
  </div>
</template>
```

## Available Utilities

### `useIsHydrated()`

A composable that returns `true` if the component is mounted on the client (hydrated) and `false` when rendering on the server. Useful for SSR applications to avoid hydration mismatches.

## Contribution

Yes please! See the [contributing guidelines](https://github.com/I-am-abdulazeez/veroui/blob/main/CONTRIBUTING.md) for details.

## License

This project is licensed under the terms of the [MIT license](https://github.com/I-am-abdulazeez/veroui/blob/main/LICENSE).

---

**Note:** This package is part of the VeroUI design system, a Vue port of HeroUI (React).
