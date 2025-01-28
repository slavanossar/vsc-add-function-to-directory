# Add Function to Directory

Simple extension for creating functions and managing index files

## Features

Creates a function

```ts
// functions/myFunction.ts
const myFunction = () => {};

export default myFunction;
```

and updates the `index` file

```ts
// functions/index.ts
export { default as myFunction } from "./myFunction";
export { default as myOtherFunction } from "./myOtherFunction";
```

If no `index` is present, you'll be prompted to select between `.ts` and `.js`.

## Requirements

## Extension Settings

## Known Issues

## Release Notes
