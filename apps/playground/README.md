# Playground

Interactive web demo of [`json-difference`](../../libs/json-difference). Paste two JSON payloads and see the computed delta in real time.

🔗 **Live:** <https://lukascivil.github.io/json-difference/>

## Stack

- [React 19](https://react.dev)
- [Chakra UI v3](https://chakra-ui.com)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) (via `react-monaco-editor`) for the JSON input panes
- [Vite](https://vitejs.dev) build
- Consumes the local `json-difference` library

## Running locally

From the repository root:

```sh
yarn install
yarn nx serve playground
```

The app starts on `http://localhost:4200` by default.

## Other targets

```sh
yarn nx build playground       # production build (outputs to apps/playground/dist)
yarn nx preview playground     # preview the production build
yarn nx lint playground        # lint
yarn nx type-check playground  # type-check
```

## Deployment

Deployed to GitHub Pages on each release. See the root [CD workflow](../../.github/workflows/cd.yml).
