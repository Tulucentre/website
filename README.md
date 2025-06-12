# Tulucentre

This repository is a part of the project by NMAMIT Tulu Studies department,Nitte titled <b>"Documentation of Koraga Folk Knowledge and Dictionary Project"</b>.

## Table of contents

- [Motive](#motive)
- [Tech-Stack](#tech-stack)
- [Installation](#installation)
- [Rules](#rules)
- [Commit-Message-Format](#commit-message-format)
- [Hosted-Links](#hosted-links)
- [License](#license)
- [Contributers](#contributers)

## Motive

The motive of building this repository is to create a website for the end users to search for the meanings of Tulu words collected by the <b>Tulu Department</b> of <b>NMAMIT, Nitte</b>

## Tech-Stack

The tech stacks for building this website is listed below. More tech stacks are expected to be used which will be decided in course of development.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Typescript](https://www.typescriptlang.org/)
- [Shadcn](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [Postgres](https://www.postgresql.org/)
- [Vercel](https://vercel.com/)
- [pnpm](https://pnpm.io/)

## Installation

To start with the installtaion it is recommended to have [Git](https://git-scm.com/) and [Node](https://nodejs.org/en) installed in the system. For the respective docs for their installation

step 1(optional): Check NodeJs version

```bash
node --version
## output: v20.12.2
```

step 2: Clone the repository and move to the directory

```bash
git clone https://github.com/pratham-ak2004/tulucentre
cd tulucentre
```

step 3: Install dependencies. We recommend to use pnpm as your package manager for this repository

```bash
npm install
pnpm install
```

step 4: Run the dev server. Open the link dispalyed in the terminal window to open the server

```bash
npm run dev
pnpm run dev
```

## Rules

We have imposed some rules for contributions

- Follow the commit message format as mentioned in the [next section](#commit-message-format)
- Create pull request only to the `dev` branch of this repository
- Use `pnpm` for building the project
- Use meaningful names for identifiers while working on the project

## Commit-Message-Format

Each commit message consists of a <b>header</b>, a <b>body</b> and a <b>footer</b>. The header has a special format that includes a <b>type</b>, a <b>scope</b> and a <b>subject</b>:

```code
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The <b>header</b> is mandatory and the scope is optional

### Type

Your commit message should be one of the following types:

- <b>feat</b>: A new feature.
- <b>fix</b>: A bug fix.
- <b>docs</b>: Documentation only changes.
- <b>style</b>: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- <b>refactor</b>: A code change that neither fixes a bug nor adds a feature.
- <b>perf</b>: A code change that improves performance.
- <b>test</b>: Adding missing tests.
- <b>chore</b>: Changes to the build process or auxiliary tools and libraries such as documentation generation.

### Imporatnt

your commit message must conatain atleast `type` and `subject`.

Ex: `feat: created navbar`

### Reference

For more information on commit message format, refer this [documention](https://gist.github.com/develar/273e2eb938792cf5f86451fbac2bcd51) by <b>develar</b>

## Hosted-Links

- [Production](https://tulucentre-kbadykwau-pratham-a-ks-projects.vercel.app/)
- [Preview](https://tulucentre-6nvm5zo5z-pratham-a-ks-projects.vercel.app/)

## License

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

## Contributers

- [Hithesh](https://github.com/HitheshPoojary187)
- [Pratham A Kadekar](https://github.com/pratham-ak2004)
- [Rakshith N Poojary](https://github.com/Rakshu047)
