# @veroui/spinner

The Spinner component provides visual feedback to indicate loading states or ongoing processes. It supports multiple variants including default, simple, spinner (bars), wave, and dots — all customizable by size and color.

Please refer to the [documentation](https://veroui.com/docs/components/spinner) for more information.

## Installation

Install the `@veroui/spinner` package via pnpm, yarn, or npm:

```sh
pnpm add @veroui/spinner
# or
yarn add @veroui/spinner
# or
npm i @veroui/spinner
```

## Usage

In a Vue 3 project using `<script setup>`, you can import and use the Spinner component directly:

```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <Spinner color="primary" label="Loading..." />
    <Spinner variant="wave" color="secondary" />
    <Spinner variant="spinner" size="lg" />
  </div>
</template>

<script setup lang="ts">
import { Spinner } from '@veroui/spinner';
</script>
```

For more detailed usage examples and customization options, check the [documentation](https://veroui.com/docs/components/spinner).

## Contribution

Yes please! We welcome contributions to improve `@veroui/spinner`. See the
[contributing guidelines](https://github.com/I-am-abdulazeez/veroui/blob/master/CONTRIBUTING.md)
for details on how to get started.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/I-am-abdulazeez/veroui/blob/master/LICENSE).

## Credits

VeroUI is inspired by [HeroUI](https://heroui.com) and adapted for Vue 3.
