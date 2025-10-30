# @veroui/button

Buttons allow users to perform actions and choose with a single tap.

Please refer to the [documentation](https://veroui.com/docs/components/button) for more information.

## Installation

Install the `@veroui/button` package via yarn or npm:

```sh
pnpm add @veroui/button
# or
yarn add @veroui/button
# or
npm i @veroui/button
```

## Usage

In a Vue 3 project using <script setup>, you can import and use the Button component directly:

```vue
<template>
  <Button color="primary" @click="handleClick">Click Me</Button>
</template>

<script setup lang="ts">
import { Button } from '@veroui/button';

const handleClick = () => {
  console.log('Button clicked!');
};
</script>
```

For more detailed usage examples, check the [documentation](https://veroui.com/docs/components/button).

## Contribution

Yes please! We welcome contributions to improve `@veroui/button`. See the
[contributing guidelines](https://github.com/I-am-abdulazeez/veroui/blob/master/CONTRIBUTING.md)
for details on how to get started.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/I-am-abdulazeez/veroui/blob/master/LICENSE).

## Credits

VeroUI is inspired by [HeroUI](https://heroui.com) and adapted for Vue 3.
```
