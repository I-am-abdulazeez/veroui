# @veroui/ripple

The Ripple component provides a smooth, interactive visual feedback effect that appears when users click or tap on elements — adding a touch of elegance and responsiveness to your UI.

Please refer to the [documentation](https://veroui.com/docs/components/ripple) for more information.

## Installation

Install the `@veroui/ripple` package via pnpm, yarn, or npm:

```sh
pnpm add @veroui/ripple
# or
yarn add @veroui/ripple
# or
npm i @veroui/ripple
```

## Usage

In a Vue 3 project using `<script setup>`, you can import and use the Ripple component directly:

```vue
<template>
  <div class="relative overflow-hidden inline-flex">
    <Ripple />
    <button class="px-4 py-2 bg-primary text-white rounded">
      Click Me
    </button>
  </div>
</template>

<script setup lang="ts">
import { Ripple } from '@veroui/ripple';
</script>
```

For more detailed usage examples, check the [documentation](https://veroui.com/docs/components/ripple).

## Contribution

Yes please! We welcome contributions to improve `@veroui/ripple`. See the
[contributing guidelines](https://github.com/I-am-abdulazeez/veroui/blob/master/CONTRIBUTING.md)
for details on how to get started.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/I-am-abdulazeez/veroui/blob/master/LICENSE).

## Credits

VeroUI is inspired by [HeroUI](https://heroui.com) and adapted for Vue 3.
