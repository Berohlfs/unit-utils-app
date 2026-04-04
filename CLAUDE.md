# CLAUDE.md

## App summary
This is Unit Utils, a simple mobile unit converter built with Expo and React Native.

The app is fully **client-side**. There are **no backend calls**, no authentication, and no external data dependencies. The product should feel modern, clean, fast, and easy to use.

## Core rules
- Keep the app simple
- Do not overengineer
- Keep changes small and scoped
- Build production-minded UI, but with minimal complexity

## Styling rules
- Use React Native `StyleSheet` for styles
- Do not use third-party styling libraries
- Keep styles simple, readable, and local when possible

## Navigation rules
- Do not use Expo navigation UI components such as Tabs or Stack
- Navigation layouts must be custom
- Use the `app` folder for routing only
- Route files should only re-export page entry components

## Folder structure
Use this structure:

- `app/` for router files only
- `pages/` for feature-scoped page implementations

Example:

```txt
/pages
  /home
    /components
    /hooks
    /helpers
    index.tsx
  /other-page

/app
  index.tsx
  _layout.tsx
```

## Route file rule

Route files must stay minimal. Example:

```
import Home from '@/pages/home';

export default Home;
```

Do not place page logic inside app/ route files.

## Page structure

Each page should be feature-scoped inside pages/.

A page can contain:

> components/
> hooks/
> helpers/
> types/
> constants/
> index.tsx

Only create folders when they are actually needed.

## Product scope

Unit Utils is a simple unit converter.

It should:

- convert values instantly
- work offline
- use only local logic
- avoid unnecessary features
- avoid backend patterns
- apply modern UI
- have a clean layout

Avoid: 

- unnecessary dependencies
- global complexity
- backend-oriented architecture
- logic inside router files