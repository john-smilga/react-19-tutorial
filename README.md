# React 19 Tutorial

## Bootstrap Project

- `npm i `
- `npm run dev`

## Project Overview

Will cover the entire setup of the project (step by step) towards the end of the tutorial.

Boilerplate Vite React-TS. Added:

- latest react and react-dom, as well as types for both
- JSON Server for mock API (localhost:3001)
  [JSON Server](https://www.npmjs.com/package/json-server)
- Axios for API calls
- TailwindCSS for styling
- src/utils.ts for API_URL

Reference package.json

## React 19

- src/final - complete source code
- src/tutorial - sandbox for each step where we will test the features

## use

use is a React API that lets you read the value of a resource like a Promise or context.

- Key Features:
- More flexible than traditional hooks - can be used in loops and conditionals
- Works with both Promises and Context
- Integrates with Suspense and Error Boundaries- Can be used anywhere in a component (not just at the top level)

Common Use Cases:

```tsx
// Reading Context
const theme = use(ThemeContext);

// Handling Promises
function Message({ messagePromise }) {
  const message = use(messagePromise);
  return <p>{message}</p>;
}
```

Important Notes:

- Must be called inside a Component or Hook
- For Server Components, prefer async/await over use
- When using with Promises, wrap components in Suspense/Error Boundaries
- Cannot be used in try-catch blocks

Best Practice:

```tsx
// Preferred: Create Promises in Server Components
<Suspense fallback={<Loading />}>
  <ClientComponent messagePromise={serverPromise} />
</Suspense>
```

## React Actions

- React 19 introduced a new way to handle form submissions using the `action` attribute.
- This approach simplifies form handling and provides built-in loading states and error handling.
- if you are familiar with `server actions` in Next.js, you will feel right at home.

Evolution of Form Handling

1. Traditional HTML Forms

```tsx
<form action='/api/submit' method='POST'>
  <input name='data' />
  <button type='submit'>Submit</button>
</form>
```

- Simple but requires page refresh
- No built-in state management
- Limited user feedback

2. React's Traditional Approach

```tsx
function Form() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    // handle submission
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

- Client-side handling
- Manual state management
- Requires preventDefault()
- requires handling loading and error states

3. New React Actions (React 19)

```tsx
function Form() {
  async function formAction(formData: FormData) {
    // handle submission
  }

  return <form action={formAction}>...</form>;
}
```

- No preventDefault() needed
- Automatic FormData handling
- Form reset on success

- Built-in loading state (useActionState)
- easier Error handling (useActionState)

## useActionState hook

useActionState Hook

Purpose

A React hook that manages state for asynchronous actions, particularly useful for form submissions.

```tsx
const [state, dispatch, isPending] = useActionState(action, initialState);
```

Returns

- state: Current state value
- dispatch: Function to trigger the action
- isPending: Boolean indicating if action is processing

Example

```tsx
function Form() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      // Process form data
      return { status: 'success' };
    },
    { status: 'idle' }
  );

  return (
    <form action={formAction}>
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

Key Points

- Combines state management with async actions
- Automatically handles loading states
- Type-safe when used with TypeScript
- Designed to work with form submissions
- Similar to useReducer but with built-in async support

Types

```tsx
useActionState<StateType, PayloadType>(action, initialState);
```

## useFormStatus hook

## useOptimistic hook

## useTransition hook

## compiler

will cover at the very end of the tutorial

## Create React 19 TypeScript Project

- Node.js Version ?

### Bootstrap Vite Project

```bash
npm create vite@latest react-19-tutorial  -- --template react-ts
```

### React 19

```json
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

### React 19

libraries

```bash
npm install react@19.0.0 react-dom@19.0.0
```

types

```bash
npm install --save-exact @types/react@^19.0.0 @types/react-dom@^19.0.0

```

### React Compiler

```tsx
import { memo, useState } from 'react';

const Parent = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  return (
    <div>
      <h1>Parent Component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child value={value} setValue={setValue} />
      {/* <OptimizedChild value={value} setValue={setValue} /> */}
    </div>
  );
};
const Child = ({
  value,
  setValue,
}: {
  value: number;
  setValue: (value: number) => void;
}) => {
  console.log('Child rendered');
  return (
    <div>
      <h1>Child Component</h1>
      <p>Value: {value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};
const OptimizedChild = memo(Child);

export default Parent;
```

```bash
npm install -D babel-plugin-react-compiler@beta eslint-plugin-react-compiler@beta
```

eslint.config.js

```js

import reactCompiler from 'eslint-plugin-react-compiler';

export default tseslint.config(
 ...
    plugins: {
   ...
      'react-compiler': reactCompiler,
    },
    rules: {
     ...
      'react-compiler/react-compiler': 'error',
    },

);

```

eslint.config.js

```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactCompiler from 'eslint-plugin-react-compiler';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
    },
  }
);
```

vite.config.ts

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const ReactCompilerConfig = {};
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
});
```
