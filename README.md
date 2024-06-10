# Ingenious

## Introduction

A notion alternative multipurpose productive app

## Features

- Markdown based note taking
- ...

## Main technologies

- React + TypeScript + Vite ☑️
- Package management: [PNPM](https://pnpm.io/) ☑️
- UI library: [shadcn/ui](https://ui.shadcn.com/) ☑️
- Backend:
  - [NestJS](https://docs.nestjs.com/) ☑️
    - [OpenAPI (Swagger)](https://docs.nestjs.com/openapi/introduction) ☑️
    - [Validation data sent to server](https://docs.nestjs.com/techniques/validation) ☑️
  - [MongoDB](https://www.mongodb.com/docs/manual/) ☑️
- Testing:
  - Unit Test: [JestJS](https://jestjs.io/docs/getting-started) + [React Testing library](https://jestjs.io/docs/tutorial-react)
  - E2E Test: Playwright or Cypress

- State management: ☑️
  - [Redux toolkit](https://redux-toolkit.js.org/introduction/getting-started) ☑️
  - [Redux toolkit query](https://redux-toolkit.js.org/rtk-query/overview) ☑️
- Implement PWA: ☑️
  - Can be installed ☑️
  - App still working when offline ☑️
  - Automatic sync local data with backend when online ☑️
  - [Vite PWA Plugin](https://vite-pwa-org.netlify.app/guide/)
- [Validate commit message convention using Commitlint and Husky](https://dev.to/omarzi/how-to-validate-commit-message-convention-using-commitlint-and-husky-aaa) (This post use old version of Husky, we can use this [Migrate guide](https://typicode.github.io/husky/migrate-from-v4.html)) ☑️
- Use Github Action to run test before release
- Deployment:
  - On [Vercel](https://vercel.com/)
- [React Markdown Editor](https://github.com/uiwjs/react-markdown-editor) (An implement of [React MD Editor](https://github.com/uiwjs/react-md-editor) using [CodeMirror](https://codemirror.net/)
) ☑️

## Resources

- [Progressive Web App](https://web.dev/explore/progressive-web-apps)
- [modern-full-stack-development-with-nestjs-react-typescript-and-mongodb-part-1](https://auth0.com/blog/modern-full-stack-development-with-nestjs-react-typescript-and-mongodb-part-1/)
- [React + PWA](https://www.saurabhmisra.dev/setup-react-pwa-using-vite/)
- [NestJS JWT Authentication Tutorial](https://www.youtube.com/watch?v=EFDUvzJT_wI)
- [NestJS Authorization with CASL](https://www.youtube.com/watch?v=1pPjCX0FHco)
- [NestJS Access Current User without Request Scope](https://webcache.googleusercontent.com/search?q=cache:https://medium.com/@sascha.wolff/advanced-nestjs-how-to-have-access-to-the-current-user-in-every-service-without-request-scope-2586665741f&strip=0&vwsrc=1&referer=medium-parser)

## Libs

- [React Edit Text](https://www.npmjs.com/package/react-edit-text)
- [React Tags Input](https://www.npmjs.com/package/react-tagsinput)
