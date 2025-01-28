# add-function-to-directory README

This is the README for your extension "add-function-to-directory". After writing up a brief description, we recommend including the following sections.

## Features

Creates a function

```ts
// functions/myFunction.ts
const myFunction = () => {}

export default myFunction
```

and updates the `index` file

```ts
// functions/index.ts
export { default as myFunction } from './myFunction'
export { default as myOtherFunction } from './myOtherFunction'
```

If no `index` is present, you'll be prompted to select between `.ts` and `.js`.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: Enable/disable this extension.
- `myExtension.thing`: Set to `blah` to do something.

## Known Issues

## Release Notes
