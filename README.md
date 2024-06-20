<h1 align="center">
  Ingenious
</h1>
<p align="center">
  <img src="./react/public/pwa-512x512.png" width="120" alt="Ingenious Logo" />
</p>

## Introduction

A notion alternative multipurpose productive app

## Features

- Markdown based note taking

## Main technologies

### [React + TypeScript + Vite](https://vitejs.dev/guide/)

- ☑️ UI library: [shadcn/ui](https://ui.shadcn.com/)
- ☑️ State management:
  - ☑️ [Redux toolkit](https://redux-toolkit.js.org/introduction/getting-started)
  - ☑️ [Redux toolkit query](https://redux-toolkit.js.org/rtk-query/overview)
- ☑️ Implement PWA ([With Vite PWA](https://vite-pwa-org.netlify.app/guide/)):
  - ☑️ Can be installed
  - ☑️ App still working when offline
  - ☑️ Automatic sync local data with backend when online
- ☑️ Deployment On [Vercel](https://vercel.com/)

### [NestJS](https://docs.nestjs.com/)

- ☑️ Database: [MongoDB](https://www.mongodb.com/docs/manual/)
- ☑️ ORM/ODM: [Mongoose](https://docs.nestjs.com/techniques/mongodb)
- ☑️ [Authentication With JWT](https://docs.nestjs.com/security/authentication)
- ☑️ [Authorization With CASL](https://docs.nestjs.com/security/authorization)
- ☑️ [Password Hashing](https://docs.nestjs.com/security/encryption-and-hashing)
- ☑️ [Validation data sent to server](https://docs.nestjs.com/techniques/validation)
- ☑️ [OpenAPI (Swagger)](https://docs.nestjs.com/openapi/introduction)
- ☑️ Deployment On Dedicated VPS

### Others

- ☑️ Package management: [PNPM](https://pnpm.io/)
- ☑️ [Validate commit message convention using Commitlint and Husky](https://dev.to/omarzi/how-to-validate-commit-message-convention-using-commitlint-and-husky-aaa) ([Use newer husky version](https://typicode.github.io/husky/migrate-from-v4.html))
- Testing:
  - Unit Test: [JestJS](https://jestjs.io/docs/getting-started) + [React Testing library](https://jestjs.io/docs/tutorial-react)
  - E2E Test: Playwright or Cypress
- 🚧 Use Github Action to run test before release

## Resources

- [Progressive Web App](https://web.dev/explore/progressive-web-apps)
- [modern-full-stack-development-with-nestjs-react-typescript-and-mongodb-part-1](https://auth0.com/blog/modern-full-stack-development-with-nestjs-react-typescript-and-mongodb-part-1/)
- [React + PWA](https://www.saurabhmisra.dev/setup-react-pwa-using-vite/)
- [NestJS JWT Authentication Tutorial](https://www.youtube.com/watch?v=EFDUvzJT_wI)
- [NestJS Authorization with CASL](https://www.youtube.com/watch?v=1pPjCX0FHco)
- [Async Local Storage](https://papooch.github.io/nestjs-cls/introduction/quick-start)
- [CI/CD with Github Docker & a VPS](https://omasuaku.medium.com/ci-cd-with-github-docker-a-vps-687a00e552af)

## Libs

- [React Markdown Editor](https://github.com/uiwjs/react-markdown-editor) (An implement of [React MD Editor](https://github.com/uiwjs/react-md-editor) using [CodeMirror](https://codemirror.net/)
- [React Edit Text](https://www.npmjs.com/package/react-edit-text)
- [React Tags Input](https://www.npmjs.com/package/react-tagsinput)

## Setup VPS Guide (Debian)

- [Setup SSH Server](https://wiki.debian.org/SSH)
- [Install Docker & Docker-compose](https://docs.docker.com/engine/install/debian/)
- [Enable SSL/TLS](https://www.server-world.info/en/note?os=Debian_12&p=nginx&f=3)
- Port Forward SSH & HTTPS
