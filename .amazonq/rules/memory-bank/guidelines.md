# Development Guidelines

## Code Quality Standards

### TypeScript Usage

- **Strict typing**: All files use TypeScript with strict type checking
- **Interface definitions**: Complex objects use proper TypeScript interfaces (e.g., `ScreenplayEditorProps`, `AITeamBrainstormingInput`)
- **Type exports**: Types are exported for reuse across modules (`export type`)
- **Generic constraints**: Use generic types with proper constraints for reusable components

### Import Organization

- **React imports first**: `import * as React from 'react'` or `import React from 'react'`
- **Third-party imports**: External libraries grouped together
- **Internal imports**: Local components and utilities imported with `@/` path alias
- **Dynamic imports**: Heavy components loaded dynamically with loading states

### Component Structure

- **Functional components**: All components use React functional components with hooks
- **forwardRef pattern**: UI components use `React.forwardRef` for ref forwarding
- **Props interfaces**: Component props defined as TypeScript interfaces
- **Default props**: Use default parameter values in function signatures

## Architectural Patterns

### Component Composition

- **Compound components**: Complex UI components split into composable parts (e.g., Sidebar system)
- **Provider pattern**: Context providers for shared state (e.g., `SidebarProvider`)
- **Custom hooks**: Shared logic extracted into custom hooks (`useSidebar`, `useToast`)
- **Slot pattern**: Use `@radix-ui/react-slot` for flexible component composition

### State Management

- **useState for local state**: Component-level state with React hooks
- **useCallback for handlers**: Event handlers wrapped in `useCallback` for performance
- **useMemo for expensive calculations**: Complex computations memoized
- **Context for shared state**: Global state managed through React Context

### Error Handling

- **Try-catch blocks**: Async operations wrapped in proper error handling
- **Error boundaries**: Components have error boundary integration
- **User feedback**: Errors displayed through toast notifications
- **Graceful degradation**: Fallback UI states for error conditions

## Code Formatting Conventions

### Naming Standards

- **camelCase**: Variables, functions, and methods use camelCase
- **PascalCase**: Components, types, and interfaces use PascalCase
- **UPPER_SNAKE_CASE**: Constants and configuration values
- **kebab-case**: CSS classes and file names (when applicable)

### Function Definitions

- **Arrow functions**: Prefer arrow functions for inline handlers and short functions
- **Function declarations**: Use function declarations for main component functions
- **Async/await**: Prefer async/await over Promise chains
- **Early returns**: Use early returns to reduce nesting

### Object and Array Patterns

- **Destructuring**: Extract properties using destructuring assignment
- **Spread operator**: Use spread for object/array copying and merging
- **Optional chaining**: Use `?.` for safe property access
- **Nullish coalescing**: Use `??` for default value assignment

## Internal API Patterns

### Server Actions

```typescript
"use server";
// Server actions marked with directive
export async function serverFunction(input: InputType): Promise<OutputType> {
  // Implementation
}
```

### AI Integration

```typescript
// Genkit AI flow definition
const aiFlow = ai.defineFlow(
  {
    name: "flowName",
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  async (input) => {
    // Flow implementation
  }
);
```

### Component Props Pattern

```typescript
interface ComponentProps {
  // Required props first
  requiredProp: string;
  // Optional props with defaults
  optionalProp?: boolean;
  // Event handlers
  onEvent?: (data: EventData) => void;
  // Children and composition
  children?: React.ReactNode;
  // Styling
  className?: string;
}
```

### Custom Hook Pattern

```typescript
function useCustomHook() {
  const [state, setState] = useState(initialValue);

  const handler = useCallback(() => {
    // Handler logic
  }, [dependencies]);

  return { state, handler };
}
```

## Performance Optimization

### Component Optimization

- **React.memo**: Wrap components that receive stable props
- **useCallback**: Memoize event handlers passed to child components
- **useMemo**: Memoize expensive calculations
- **Dynamic imports**: Code-split heavy components

### Bundle Optimization

- **Tree shaking**: Import only needed functions from libraries
- **Dynamic imports**: Lazy load non-critical components
- **Bundle analysis**: Regular bundle size monitoring
- **Performance budgets**: 250KB compressed target maintained

### Rendering Optimization

- **Key props**: Proper key props for list items
- **Conditional rendering**: Efficient conditional rendering patterns
- **State colocation**: Keep state close to where it's used
- **Avoid inline objects**: Extract objects to prevent unnecessary re-renders

## Testing Patterns

### Unit Testing

- **Vitest framework**: All unit tests use Vitest
- **Testing Library**: React components tested with Testing Library
- **Mock patterns**: External dependencies properly mocked
- **Coverage targets**: 80% minimum coverage requirement

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('component renders correctly', () => {
  render(<Component />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

### E2E Testing

- **Playwright framework**: End-to-end tests use Playwright
- **Page object pattern**: Complex interactions abstracted into page objects
- **Cross-browser testing**: Tests run across multiple browsers
- **Performance testing**: Web Vitals measured in E2E tests

## Documentation Standards

### JSDoc Comments

- **Function documentation**: All exported functions have JSDoc comments
- **Parameter descriptions**: Function parameters documented with types
- **Return value documentation**: Return types and descriptions provided
- **Example usage**: Complex functions include usage examples

### Code Comments

- **Inline comments**: Complex logic explained with inline comments
- **TODO comments**: Future improvements marked with TODO
- **Arabic language support**: Comments acknowledge Arabic text processing
- **Business logic**: Domain-specific logic clearly documented
