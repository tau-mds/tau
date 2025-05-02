---
title: Contributing
description: How to contribute to the Tau project.
---

## Prerequisites

- [git](https://git-scm.com/)
- [Node.js v22.12.0](https://nodejs.org/en/)
- [pnpm v10+](https://pnpm.io/installation)

## 🚀 Getting started

1. Clone repository

    ```bash
    git clone git@github.com:tau-mds/tau.git && cd tau
    ```

1. Install Node.js (using [fnm](https://github.com/Schniz/fnm) recommended)

    ```bash
    # Install fnm (if not already installed)
    curl -fsSL https://fnm.vercel.app/install | bash

    # Install correct Node version
    fnm use
    ```

1. Ensure [pnpm](https://pnpm.io/installation) is installed

    :::note
    Why? We use pnpm to manage workspace dependencies. It's easily the best monorepo/workspace experience available as of when this was written.
    :::

## 🔧 Development Setup

1. Install dependencies

    ```bash
    pnpm install
    ```

    :::tip
    We use pnpm workspaces for efficient monorepo dependency management. Dependencies inside of the packages and examples are automatically linked together as local/dynamic dependencies.
    :::

1. Configure environment

    ```bash
    # Copy example environment file
    cp apps/app/.env.example apps/app/.env
    ```

    :::caution[Important]
    Update any values in `.env` before proceeding if needed.
    :::

1. Initialize local database

    ```bash
    # Create SQLite database and run migrations
    pnpm local db
    ```

1. Start Development Servers

    **Option 1: Run all services simultaneously**

    ```bash
    pnpm turbo dev
    ```

    **Option 2: Run all services simultaneously**


    ```bash
    # Fullstack application
    pnpm turbo dev -F=@tau/app

    # Database studio
    pnpm turbo dev -F=@tau/db

    # Documentation site
    pnpm turbo dev -F=@tau/docs
    ```

    :::tip
    You can combine multiple `-F` flags to run more packages in dev mode simultaneously.
    :::


## 🏗️ Build & Deployment


1. Build production artifacts

    ```bash
    # Build all packages
    pnpm turbo build

    # Build specific package
    pnpm turbo build -F=@tau/app
    ```

1. Run production builds locally
    ```bash
    pnpm turbo start -F=@tau/app
    ```

## 📚 Guides

### Database Migrations

  ```bash
  # Create new migration
  pnpm db generate

  # Apply migrations
  pnpm db migrate
  ```


### Package Creation

  ```bash
  pnpm gen:package -n=@tau/<name>

  # Follow interactive prompts (press Enter for defaults)
  ```


  :::note[Scaffolding]
  Generates a new package with TypeScript and proper workspace configuration.
  :::

## 🆘 Troubleshooting

Common Issues:

- **Missing Dependencies**: Run `pnpm install` after pulling new changes
- **Migration Problems**: Try deleting the local db file and run `pnpm db local` to recreate database
- **Environment Issues**: Verify `.env` files exist in `apps/app/`
