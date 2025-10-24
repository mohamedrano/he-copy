# Project Structure

## Directory Organization

### Core Application (`src/`)

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main application routes
│   │   └── analysis/      # Analysis features
│   ├── api/               # API routes
│   ├── actions.ts         # Server actions
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── ScreenplayEditor.tsx  # Main script editor
│   ├── ErrorBoundary.tsx    # Error handling
│   └── stations-pipeline.tsx # Analysis pipeline
├── ai/                   # AI integration
│   ├── flows/           # AI workflow definitions
│   ├── ai-team-brainstorming.ts # Multi-agent system
│   ├── genkit.ts        # Google Genkit configuration
│   └── dev.ts           # Development AI server
├── lib/                 # Utilities and configurations
│   ├── ai/             # AI helper functions
│   ├── drama-analyst/ # Dramatic analysis logic
│   ├── utils.ts       # General utilities
│   └── web-vitals.ts  # Performance tracking
├── hooks/              # Custom React hooks
└── test/              # Test configuration
```

### Testing (`tests/`)

```
tests/
└── e2e/               # End-to-end tests
    ├── homepage.spec.ts
    ├── navigation.spec.ts
    └── performance.spec.ts
```

### Build & Deployment

```
scripts/               # Build and analysis scripts
├── bundle-analysis.js
└── performance-report.js

.github/workflows/     # CI/CD pipeline
└── ci-cd.yml

docs/                  # Documentation
└── blueprint.md       # Design specifications
```

## Architectural Patterns

### Next.js App Router Architecture

- Server-side rendering with App Router
- Server actions for form handling
- API routes for external integrations
- Nested layouts for consistent UI

### Component Architecture

- UI components in `components/ui/` following shadcn/ui patterns
- Feature components at root level
- Error boundaries for fault tolerance
- Custom hooks for shared logic

### AI Integration

- Google Genkit for AI workflow orchestration
- Multi-agent brainstorming system
- Dramatic analysis pipeline with multiple stages
- Separate development server for AI testing

### State Management

- React Server Components for server state
- Client components for interactive features
- Form state with react-hook-form
- Toast notifications with Radix UI

### Testing Strategy

- Unit tests with Vitest and Testing Library
- E2E tests with Playwright
- Coverage requirements (80% minimum)
- Performance testing integration
