---
title: "Design patterns"
---

## 1. Chain of responsibility

In this project, the **Chain of Responsibility** pattern is used extensively to implement server-side request handling through middleware composition.

### Purpose

The Chain of Responsibility pattern allows a request to pass through a series of processing units (handlers), where each unit can:

- **Handle** or validate part of the request
- **Enrich** the request context
- **Stop** the execution chain (e.g., by throwing an error)
- **Pass** control to the next handler in the chain

### Implementation

The request flow is composed using the `createMiddleware()` and `createServerFn()` APIs, forming a linear chain of logic:

```ts title="api/interview-slots.ts"
const organizer = createMiddleware().server(async ({ next }) => {
  // Enrich context with session and organizer ID
  return next({ context: { session, organizerId } });
});

const assertOrganizesRound = createMiddleware()
  .middleware([organizer]) // Uses earlier middleware to get access to context
  .validator(v.looseObject({ id: ids.interview_round })) // Validates input;
  // if the validator fails, the chain stops before being handled
  .server(async ({ context, data, next }) => {
    const round = // some logic to look up round by ID
    assert(!!round, "Round could not be found"); // Stops the chain if invalid
    return next({ context: { round } }); // Pass enriched context forward
  });

const ofRound = createServerFn({ method: "GET" })
  .middleware([middleware.assertOrganizesRound]) // Full chain: organizer -> assertOrganizesRound
  .handler(async ({ context }) => {
    // Only runs if chain passes validation
    return db.query.interview_slot.findMany({
      where: (slot, op) => op.eq(slot.interview_round_id, context.round.id),
    });
  });
```

### Why Chain of Responsibility Fits

- **Modular handlers**: Each middleware is a self-contained unit with a clear responsibility.

- **Flexible chaining**: Middleware can be reused or rearranged as needed.

- **Short-circuiting**: If any step fails (e.g. an assertion), the request stops immediately.

- **Context propagation**: Each step can extend or modify the context passed to subsequent steps.

This pattern promotes separation of concerns by isolating authentication, validation, and business logic.

Middleware is composed in a declarative style, resembling a fluent API that also loosely aligns with the Builder pattern, but the execution model remains a classic Chain of Responsibility.


## 2. Composite

The **Composite** design pattern is applied in this project through the use of nested UI components that form a tree-like structure. This pattern enables individual components (leaves) and groups of components (composites) to be treated uniformly in the render tree.

### Purpose

The Composite pattern allows clients to treat individual elements and compositions of elements in a consistent way. It is especially well-suited for user interfaces, where complex views are composed from smaller, reusable parts.

### Implementation

A clear example of this pattern is seen in the `Card` component, which is composed of several subcomponents such as `Card.Header`, `Card.Content`, and `Card.Footer`. These subcomponents can contain other components or elements, forming a recursive hierarchy:

```tsx title="Card Usage Example"
<Card.Root className="w-[380px]" {...args}>
  <Card.Header>
    <Card.Title>Notifications</Card.Title>
    <Card.Description>You have 3 unread messages.</Card.Description>
  </Card.Header>
  <Card.Content>
    {/* Composed from both atomic UI elements and further nested structures */}
    <Switch />
    {notifications.map((notification) => (
      <NotificationItem {...notification} />
    ))}
  </Card.Content>
  <Card.Footer>
    <Button>
      <Check /> Mark all as read
    </Button>
  </Card.Footer>
</Card.Root>
```

### Why Composite Fits

- **Leaf components** like `Card.Title`, `Card.Description`, `Button`, and `Switch` are individual UI elements with no children.
- **Composite components** like `Card.Content` or `Card.Header` contain and manage groups of components, whether leaf or other composites.
- The `Card.Root` component treats all children the same — it does not need to distinguish between simple or composed nodes, aligning with the core idea of the Composite pattern.

This approach allows the UI to be composed in a modular, declarative, and extensible way, making the codebase easier to maintain and evolve.


## 3. Parameterized Factory Pattern

This project implements a robust, type-safe system for generating unique identifiers by expertly applying the Parameterized Factory design pattern. This approach addresses common challenges in ID management, ensuring consistency and preventing errors across your application.

### Purpose

The Factory Method pattern (and its variation, the Parameterized Factory) primarily aims to:

- **Decouple Object Creation**: Separate the concerns of what objects are being created from how they are created. This means client code requests an object (an ID schema) from the factory without needing to know the complex details of its construction.
- **Provide a Flexible Interface for Creation**: Offer a single, parameterized method to produce different "flavors" or types of related objects. Instead of creating distinct factory methods or classes for each ID type, a parameter (the ID prefix) is used to specify the desired ID schema.

### Implementation

The core of this pattern's implementation is the `createId` function, which serves as our Parameterized Factory method:

```ts
function createId<const P extends string>(prefix: P) {
  // Uses a validation library to create a branded string schema
  const schema = v.pipe(v.string(), v.brand(`${prefix}_id`));
  // Attaches the prefix to the schema for later use (e.g., in `generate`)
  return Object.assign(schema, { prefix }) as typeof schema & { readonly prefix: P };
}

// Example usage defining distinct ID types:
export const interview_round = createId("ivro");
export const interviewer = createId("iver");
```

### Why the Parameterized Factory Fits This Architecture

- **Centralized and Controlled Creation**: The `createId` function centralizes all logic for creating ID schema definitions. This means if the underlying mechanism for branding IDs (e.g., the validation library, the branding strategy) ever changes, modifications are confined to this single factory method. Also, it ensures all ID schemas are consistently created with the correct validation rules and branding.
- **Enhanced Type Safety (Key Benefit)**: The factory, in conjunction with TypeScript's type inference and branded types, is crucial for achieving compile-time type safety. Each call to `createId` with a unique prefix generates a distinct type (e.g., `interview_round` is a separate type from `interviewer`). This prevents common bugs where an ID of one type might accidentally be used where an ID of another type is expected.
- **Simplified Extension**: Adding a new type of ID (e.g., for project or task entities) is incredibly simple. You just call createId("proj") or createId("task"), and the factory handles all the complex setup, eliminating repetitive code.
- **Clearer Intent**: The `createId(prefix)` syntax clearly expresses the intent: "create an ID schema for this specific domain entity indicated by the prefix."

This application of the Parameterized Factory pattern significantly enhances the robustness, maintainability, and scalability of the ID generation system. It provides a clean, consistent, and type-safe way to manage diverse identifiers across the codebase.


## 4. State Pattern and Finite State Machines (FSMs)

While not a classical, explicit implementation of the Gang of Four State Pattern, the provided store example embodies the core principles of state management that align closely with both the State Pattern and Finite State Machines (FSMs). It effectively manages transitions between distinct application states in a centralized and predictable manner.

### Purpose

Both the State Pattern and FSMs aim to:

- **Manage State-Dependent Behavior**: Define how an object's behavior changes when its internal state changes.
- **Encapsulate State Logic**: Group all behavior associated with a particular state into a distinct entity, making it easier to understand, manage, and modify.
- **Prevent Invalid Transitions**: Ensure that state changes only occur in defined ways in response to specific events, reducing the likelihood of illogical or erroneous states.

### Implementation

The `store` object effectively represents a state machine where the `context.path` property defines the current "state" of the navigation or UI, and the `on` object defines the "transitions" in response to "events."

```ts
const store = createStore({
  // The 'context' holds the current state, notably 'path'
  context: { path: [] as Array<Path> },
  on: {
    // Each property here represents an 'event' that triggers a 'transition'
    return: (ctx) => ({ ...ctx, path: ctx.path.slice(0, -1) }),
    navigate: (ctx, evt: { to: string }) => ({
      ...ctx,
      path: [...ctx.path, createPath(evt.to)],
    }),

    open: (ctx) => ({ ...ctx, path: [createPath("root")] }),
    close: (ctx) => ({ ...ctx, path: [] }),
    toggle: (ctx) => ({
      ...ctx,
      path: ctx.path.length > 0 ? [] : [createPath("root")],
    }),

    search: (ctx, evt: { value: string }) => {
      const page = ctx.path.at(-1);
      assert(!!page, "path cannot be empty");

      return {
        ...ctx,
        path: ctx.path.with(-1, { ...page, search: evt.value }),
      };
    },
  },
});
```

### Why State Pattern/FSM Concepts Fit

1. **Encapsulated State and Context**:
  - The `context` object, particularly the `path` array, is the core "state" of our system. It's encapsulated within the `store`, and its manipulation is controlled by the `on` transitions.
  - This aligns with the State Pattern's idea of a `Context` object whose behavior depends on its internal state.

2. **Explicit State Transitions via "Events"**:
  - Each property in the `on` object (`return`, `navigate`, `open`, `close`, `toggle`, `search`) acts as an "event". When one of these functions is called, it triggers a "transition" to a new state.
  - This is a fundamental aspect of Finite State Machines: a current state, an event, and a resulting new state.

3. **Behavior Tied to State (Implicitly)**:
  - While there aren't distinct "state objects" like in a classical State Pattern, the logic within each `on` function defines the behavior when a specific event occurs in a particular state.
  - For instance, `toggle`'s behavior is explicitly state-dependent: if `path` has length, it clears; otherwise, it sets to `["root"]`. This demonstrates how an action's outcome is conditional on the current state, a hallmark of FSMs.

4. **Predictable State Changes (FSM Benefit)**:
  - The `store` functions are pure reducers: they take the current `ctx` and an `event`, and return a _new_ state. This immutability and predictability are cornerstones of robust state management and align perfectly with FSM principles, where transitions lead to well-defined next states.
  - Invalid transitions (e.g., trying to search on an empty path) can be explicitly handled (e.g., with `assert`).
