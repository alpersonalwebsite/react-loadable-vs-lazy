# Three ways to load a React component lazily

[![CircleCI](https://circleci.com/gh/alpersonalwebsite/react-loadable-vs-lazy.svg?style=shield)](https://circleci.com/gh/alpersonalwebsite/react-loadable-vs-lazy)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

The same dynamically imported component, loaded three different ways on one page, so
you can see what each one costs you.

| | `react-loadable` | `@loadable/component` | `React.lazy` |
| --- | --- | --- | --- |
| dependency | yes | yes | none, it is built in |
| where the fallback goes | `loading` option on the component | `fallback` prop | a `<Suspense>` boundary above it |
| server-side rendering | yes | yes | not at the time this was written |
| maintained | **no**, archived since 2019 | yes | yes |

The short version: `React.lazy` is the default answer now, and the reason to know the
other two is that you will meet them in existing code. `@loadable/component` is still
the one to reach for if you need SSR.

`src/App.js` sets all three up next to each other; the three leaf components are
deliberately trivial, because the interesting part is how they arrive, not what they
render.

## The artificial delay

Each loader waits before resolving, so the fallback is actually visible. That used to
be written as:

```js
let timer = await new Promise(resolve => setTimeout(resolve, 7000))
clearTimeout(timer)
```

which does not do what it looks like. `timer` is the promise's **resolved value**, and
that promise resolves with nothing, so `timer` is `undefined` and
`clearTimeout(undefined)` cancels nothing. `setTimeout`'s actual handle was never
captured. It reads like careful cleanup and is dead code, which is worth knowing about
because this is the kind of repo people copy from.

It is now a named `delay()` in `src/delay.js`, and the wait is one second rather than
7, 9 and 11.

## Installation

```shell
npm ci
npm start
npm run lint
npm test
npm run build
```

Two version pins here are load-bearing, not arbitrary:

- `eslint` at `^5.16.0` and `babel-eslint` at `10.0.1`, because `react-scripts` 3.0.1
  runs a preflight check that refuses to build when `node_modules` holds different
  ones, with a long error that never quite says so.
- `eslint-plugin-import`, `-flowtype`, `-jsx-a11y` and `-react-hooks` are declared even
  though nothing here imports them. Adding a root `eslint` makes eslint 5 resolve
  plugins from the project root, where `react-scripts`' own nested copies are
  invisible, so without them the build fails with `Failed to load plugin import`.

**On Node 17 or newer `npm run build` fails** with `ERR_OSSL_EVP_UNSUPPORTED`: webpack 4
asking OpenSSL 3 for MD4, not a problem with this code. The versions here are
deliberately frozen, so pass the flag:

```shell
NODE_OPTIONS=--openssl-legacy-provider npm run build
```
