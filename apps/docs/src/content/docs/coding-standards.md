---
title: "Coding standards"
---

This document outlines the design principles and best practices for developing applications within our monorepo, powered by React, TypeScript, pnpm, Turborepo, and Biome. Adhering to these guidelines ensures consistency, maintainability, scalability, and high quality across all projects.


## 1. Core principles

These principles guide our development philosophy and should be applied across all aspects of the codebase.

### Parse, don't validate

**Concept**: Instead of validating raw, untrusted input (e.g., from network requests, user input, or external APIs) and then working with that same raw input, transform the untrusted input into a structured, type-safe, and validated domain object as early as possible. This "parsing" step ensures that subsequent code only operates on data that is guaranteed to be in a valid and expected shape.

**Why**:
  - **Stronger Type Safety**: Eliminates the need for defensive checks throughout your codebase, as the types themselves enforce validity.
  - **Reduced Boilerplate**: Less if (!isValid(data)) checks everywhere.
  - **Clearer Data Flow**: Data transformations are explicit at the boundary.
  - **Easier Reasoning**: If you have an object of a certain type, you can trust its structure.

**How**:
  - Use libraries like `Valibot` for schema definition and parsing.
  - Define clear `types` for your parsed domain objects.
  - Perform parsing at the edge of your system (e.g., API request handlers, form submission handlers).
  - Handle parsing errors gracefully, transforming them into user-friendly messages or appropriate error responses.


### Discoverable APIs through Dot Operator

**Concept**: Design your APIs (functions, objects, components) such that related functionalities are grouped logically and accessed via the dot operator (.). This promotes discoverability, autocomplete support in IDEs, and a clear mental model of available features.

**Why**:
  - **Improved Developer Experience**: IDEs can suggest available methods/properties, reducing the need to consult documentation constantly.
  - **Enhanced Readability**: Code becomes more self-documenting when related actions are grouped.
  - **Better Organization**: Encourages logical structuring of code and discourages scattered utility functions.
  - **Reduced Global Namespace Pollution**: Groups related functions under a single namespace.

**How**:
  - **Define files as modules**: Group all exported elements to a single namespace through wildcard exports
  - **Component Composition**: Use compound components for complex UIs.

  ```tsx
  // Bad:
  <Dropdown />
  <DropdownItem />
  <DropdownTrigger />

  // Good:
  <Dropdown.Root>
    <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
    <Dropdown.Content>
      <Dropdown.Item>Edit Profile</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Logout</Dropdown.Item>
    </Dropdown.Content>
  </Dropdown.Root>
  ```

  - **Type Definitions**: Ensure your TypeScript types reflect these discoverable structures.


### Assert Invariants

**Concept**: An invariant is a condition that is always true at a specific point in the execution of your program, or throughout a particular state. Asserting invariants means programmatically checking these conditions and immediately failing if they are violated. This helps catch logical errors early during development and testing, rather than propagating corrupt state.

**Why**:
  - **Early Bug Detection**: Catches invalid states before they cause harder-to-debug issues downstream.
  - **Clearer Code**: Forces developers to define and understand the necessary conditions for their code to function correctly.
  - **Enhanced Debugging**: When an assertion fails, it points directly to the violation.
  - **Prevention of Corrupted State**: Stops execution before data integrity is compromised.

**How**:
  - Use extensively `assert` from `@tau/utils`.
  - Place assertions at the beginning of functions, after external data loading, or whenever a critical state transition occurs.
  - Assertions are typically for _developer errors_ (bugs in logic), not user errors or expected runtime failures. For expected failures, use regular error handling (e.g., try...catch).
  - In TypeScript, use type guards or custom assertion functions to narrow types based on invariants.


### Arrange, Act, Assert for testing

**Concept**: The AAA pattern is a widely adopted structure for writing clear, maintainable, and readable tests. Each test case is divided into three distinct sections:

1. **Arrange**: Set up the test environment, including test data, mocks, and any necessary preconditions.
2. **Act**: Perform the action or call the function/component under test.
3. **Assert**: Verify the outcome of the action against the expected results.

**Why**:
  - **Clarity**: Makes tests easy to understand at a glance.
  - **Consistency**: Provides a uniform structure for all tests, reducing cognitive load.
  - **Focus**: Each section has a specific purpose, preventing tests from becoming convoluted.
  - **Maintainability**: Easier to modify or debug tests when their structure is clear.

**How**:
  - Visually separate the sections (e.g., with comments or blank lines).
  - Keep each section concise and focused on its purpose.
  - Avoid mixing responsibilities between sections.


## 2. Tooling & Setup

- **TypeScript**: TypeScript is fundamental to our codebase, providing static type checking for robustness and developer productivity.
- **pnpm**: We use `pnpm` as our package manager. It leverages hard links and symlinks to save disk space and improve installation speed, especially in monorepos.
- **Turborepo**: Turborepo is our high-performance build system for JavaScript and TypeScript monorepos. It optimizes builds by caching outputs and only re-running tasks that have changed.
- **Biome**: Biome is our chosen formatter and linter. It's designed for speed and consistency, replacing separate ESLint, Prettier, and Jest setups.


## 3. Code Style & Formatting

All code must adhere to the rules enforced by Biome.

- **Automatic Formatting**: Configure your IDE to format on save using Biome.
- **Consistency**: Consistent indentation, naming conventions, and spacing are non-negotiable.
- **Naming Conventions**:
  - **Variables/Functions**: `camelCase` (e.g., `userName`, `getPosts`).
  - **Components**: `PascalCase` (e.g., `UserProfile`, `Button`).
  - **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`, `DEFAULT_TIMEOUT`).
  - **Filenames/directories**: `kebab-case` (e.g., `user-slots.ts`, `docs/`)
- **Quotes**: Prefer double quotes for anything. Biome will enforce this.
- **Semicolons**: Biome will handle semicolon usage. Generally, we use semicolons anywhere they are required.
- **Line Length**: Biome will enforce a consistent line length (default 90 characters), wrap lines as necessary for readability.
- **Import Ordering**: Biome will automatically sort and group imports.


## 4. Documentation

Well-documented code is easier to understand, maintain, and onboard new team members.

- **READMEs**: Every package and app should have a comprehensive `README.md` explaining its purpose, how to run it, build it, test it, and any common usage patterns.
- **JSDoc/TSDoc**: Use JSDoc/TSDoc comments for public functions, components, interfaces, and complex logic. Explain parameters, return values, and side effects.
- **Code Comments**: Use inline comments sparingly for explaining why something is done, not what it does (unless the "what" is non-obvious).
- **Architecture Decisions Records (ADRs)**:(sometimes in the future) For significant technical decisions, create an ADR to document the problem, options considered, decision made, and rationale.


## 5. Security

Security is everyone's responsibility.

- **Input Sanitization**: Always sanitize and validate all user and external input before processing or storing it.
- **Cross-Site Scripting (XSS) Prevention**: React inherently helps prevent XSS by escaping content, but be mindful when using `dangerouslySetInnerHTML`.
- **Authentication & Authorization**: Use secure and robust authentication and authorization mechanisms. Never store sensitive data (e.g., JWTs) in localStorage. Prefer HttpOnly cookies.
- **Environment Variables**: Store sensitive configuration (API keys, secrets) in environment variables, never commit them to the repository.


## Code Examples & Analysis

This section provides concrete examples from our codebase and analyzes how they adhere to (or occasionally deviate from) the design guidelines.


### Example 1: @tau/app/lib/types.ts

This file defines custom validation schemas and types for date-related objects using `valibot` and `date-fns`.

```ts
import { formatISO, isBefore } from "date-fns";
import * as v from "valibot";

/**
 * A validation schema for ISO 8601 date strings.
 *
 * - Validates that the value is a string.
 * - Ensures the string is a valid ISO date (e.g., "2023-05-04T12:00:00.000Z").
 * - Applies a `brand` named `"isoDate"` to distinguish it from regular strings at the type level.
 *
 * Useful for enforcing stricter typing when working with date strings throughout the codebase.
 */
export const isoDate = v.pipe(v.string(), v.isoDate(), v.brand("isoDate"));
export type isoDate = v.InferOutput<typeof isoDate>;

export function newIsoDate(value: Date | number | string) {
  return v.parse(isoDate, formatISO(value, { representation: "date" }));
}

/**
 * A validation schema for a date period object with `start` and `end` properties.
 *
 * - `start`: must be a valid ISO date string.
 * - `end`: must be a valid ISO date string.
 * - Additionally, the `start` date must be before the `end` date.
 */
export const period = v.pipe(
  v.object({
    start: isoDate,
    end: isoDate,
  }),
  v.check(({ start, end }) => isBefore(start, end), "Start date must be before end date"),
);
export type period = v.InferOutput<typeof period>;

export function newPeriod(from: { start: Date; end: Date }) {
  return v.parse(period, { start: newIsoDate(from.start), end: newIsoDate(from.end) });
}
```

**Analysis**:
- **Parse, Don't Validate**:
  - The `isoDate` schema directly parses and validates a string into a branded `isoDate` type.
  - `newIsoDate` takes `Date | number | string` and explicitly parses it into the `isoDate` brand using `v.parse`. It doesn't just validate and return the original; it transforms it into a guaranteed-valid, branded type.
  - The period schema not only validates the structure but also asserts an invariant (start before end) as part of the parsing process. If this condition isn't met, v.check will cause the parse to fail, preventing invalid period objects from ever being created.
  - `newPeriod` similarly parses raw `Date` objects into the type-safe `period` using `v.parse`.
- **Assert Invariants**:
  - The `period` schema directly asserts a critical invariant: the `start` date must be strictly before the `end` date, using `v.check`. This provides a powerful compile-time and runtime guarantee enforced at the parsing boundary. This perfectly aligns with the principle of asserting invariants as early as possible in the data flow.
- The use of `v.InferOutput` for robust type inference from schemas is a best practice. The branding (`v.brand("isoDate")`) is a sophisticated use of TypeScript to enhance type safety beyond mere string validation, ensuring that only properly validated ISO date strings are accepted by functions expecting `isoDate` type.
- The branding of `isoDate` is a very strong type safety measure. It prevents accidentally passing a generic `string` where a validated ISO date is expected. The `period` type also offers robust type safety for date ranges, ensuring their logical consistency.


### Example 2: @tau/app/lib/api/interview-slots.ts

This file defines API query functions for the client-side (`@tanstack/react-query`) and server-side handlers (`@tanstack/react-start`) for managing interview slots, leveraging `valibot` for validation and internal database/middleware modules.

```ts
// External packages
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import * as v from "valibot";

// Internal packages
import { db, type schema } from "@tau/db";
import { ids } from "@tau/db/ids";

// local files
import { middleware } from "~/lib/middlewares";

export * as interviewSlots from "./interview-slots";

export const queries = {
  /**
   * Fetches all interview slots for a given interview round.
   *
   * @param id - The ID of the interview round.
   * @returns A query options object for fetching:
   * - Slot `id` (branded as `"ivsl_id"`)
   * - `start_at` timestamp
   * - Associated `interviewer` object
   *
   * The query function calls the server-side `ofRound` handler, which:
   * - Requires the user to organize the given round
   * - Queries `interview_slot` table with the matching `interview_round_id`
   * - Includes interviewer details in the response
   */
  ofRound: (id: ids.interview_round) =>
    queryOptions({
      queryKey: ["interviewSlots", id],
      queryFn: (opts) =>
        ofRound({ data: { id }, signal: opts.signal }) as Promise<
          Array<
            { id: string & v.Brand<"ivsl_id">; start_at: Date } & {
              interviewer: schema.interviewer;
            }
          >
        >,
    }),

  /**
   * Fetches interview slots for a specific round and interviewer.
   *
   * @param roundId - The ID of the interview round.
   * @param interviewerEmail - The email address of the interviewer.
   * @returns A query options object for fetching:
   * - A list of `schema.interview_slot` objects associated with both the round and interviewer.
   *
   * The query function calls the server-side `ofRoundAndInterviewer` handler, which:
   * - Requires authentication (`middleware.auth`)
   * - Validates `roundId` and `interviewerEmail`
   * - Queries the `interview_slot` table using both values
   * - Orders results by `start_at` in ascending order
   */
  ofRoundAndInterviewer: (roundId: ids.interview_round, interviewerEmail: string) =>
    queryOptions({
      queryKey: ["interviewSlots", roundId, "interviewer", interviewerEmail],
      queryFn: (opts) =>
        ofRoundAndInterviewer({
          data: { roundId, interviewerEmail },
          signal: opts.signal,
        }) as Promise<Array<schema.interview_slot>>,
    }),
};

/**
 * @internal
 * @remarks
 * This export is intended for testing only. Avoid using it in production code.
 */
export const ofRound = createServerFn({ method: "GET" })
  .middleware([middleware.assertOrganizesRound])
  .handler(async ({ context }) => {
    const slots = await db.query.interview_slot.findMany({
      columns: { id: true, start_at: true },
      with: { interviewer: true },
      where: (slot, op) => op.eq(slot.interview_round_id, context.round.id),
    });

    return slots;
  });

export const ofRoundAndInterviewer = createServerFn({ method: "GET" })
  .middleware([middleware.auth])
  .validator(
    v.object({
      roundId: ids.interview_round,
      interviewerEmail: v.pipe(v.string(), v.email()),
    }),
  )
  .handler(async ({ data }) => {
    const slots = await db.query.interview_slot.findMany({
      where: (slot, op) =>
        op.and(
          op.eq(slot.interview_round_id, data.roundId),
          op.eq(slot.interviewer_email, data.interviewerEmail),
        ),
      orderBy: (slot, op) => op.asc(slot.start_at),
    });

    return slots;
  });
```

**Analysis**:
- **Parse, Don't Validate**: The `api.interviewSlots.ofRoundAndInterviewer` handler uses `.validator()` method. This is an excellent example of parsing and validating incoming data at the server function boundary. `roundId` is parsed as `ids.interview_round` (a branded type from `@tau/db/ids`) and `interviewerEmail` is validated as an email string. If these inputs don't match the schema, the request will fail early, preventing invalid data from reaching the core handler logic.
- **Discoverable APIs through Dot Operator**: The `export * as interviewSlots from "./interview-slots";` statement at the module level is a prime example of providing a discoverable API. Instead of having consumers import `ofRound` and `ofRoundAndInterviewer` directly as flat functions, they can import the `interviewSlots` namespace and then access `interviewSlots.queries.ofRound` or `interviewSlots.ofRoundAndInterviewer`. The queries object further groups related client-side query logic under a single, discoverable namespace (`interviewSlots.queries.ofRound`, interviewSlots.queries.ofRoundAndInterviewer`). This perfectly aligns with the principle, improving IDE autocompletion and code readability.
- **Assert Invariants**: The `middleware.assertOrganizesRound` applied to `ofRound` serves as an assertion. It ensures that the invariant "the authenticated user must organize the given round" is met before the sensitive database query proceeds. If this invariant is violated (e.g., user is not authorized), the function will fail early with an appropriate error. This is a robust form of asserting invariants at the request processing boundary.
- **Type Safety**: The use of `ids.interview_round` and implied `ids.interview_slot` (via `v.Brand<"ivsl_id">`) demonstrates the powerful use of branded types for IDs, preventing type-related errors when passing IDs between different domains. `valibot`'s role in inference means that validated data typically carries correct TypeScript types downstream.
