# Technology Stack

## Core Technologies

### Frontend Framework

- **Next.js 15.3.3**: React framework with App Router
- **React 18.3.1**: UI library with concurrent features
- **TypeScript 5**: Type-safe JavaScript development
- **Tailwind CSS 3.4.1**: Utility-first CSS framework

### AI & Machine Learning

- **Google Genkit 1.20.0**: AI workflow orchestration
- **@google/generative-ai 0.24.1**: Google AI integration
- **@genkit-ai/google-genai**: Genkit Google AI connector
- **@genkit-ai/next**: Next.js Genkit integration

### UI Components

- **Radix UI**: Accessible component primitives
  - Dialog, Dropdown, Popover, Toast, Tabs, etc.
- **Lucide React 0.475.0**: Icon library
- **class-variance-authority**: Component variant management
- **tailwindcss-animate**: Animation utilities

### Development Tools

- **Node.js**: >=20.0.0 <21.0.0
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality gates
- **lint-staged**: Pre-commit linting

### Testing Framework

- **Vitest 4.0.2**: Unit testing framework
- **@testing-library/react**: React testing utilities
- **@testing-library/jest-dom**: DOM testing matchers
- **Playwright 1.49.1**: E2E testing framework
- **@vitest/coverage-v8**: Code coverage reporting

### Build & Deployment

- **Firebase 11.9.1**: Backend and hosting platform
- **Sentry**: Error monitoring and performance tracking
- **@next/bundle-analyzer**: Bundle size analysis
- **PostCSS**: CSS processing and optimization

### Form & Data Handling

- **react-hook-form 7.54.2**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod 3.25.76**: Schema validation
- **date-fns 3.6.0**: Date manipulation

### File Processing

- **pdfjs-dist 4.4.168**: PDF document processing
- **mammoth 1.7.0**: Word document conversion
- **@types/pdfjs-dist**: TypeScript definitions

### Performance & Monitoring

- **web-vitals 4.2.4**: Core Web Vitals measurement
- **@sentry/nextjs**: Next.js Sentry integration
- **@sentry/react**: React error boundary integration

## Development Commands

### Core Development

```bash
npm run dev              # Start development server (port 9002)
npm run build           # Production build
npm run start           # Start production server
npm run typecheck       # TypeScript validation
```

### AI Development

```bash
npm run genkit:dev      # Start Genkit development server
npm run genkit:watch    # Start Genkit with file watching
```

### Testing

```bash
npm run test            # Unit tests in watch mode
npm run test:coverage   # Unit tests with coverage
npm run test:ui         # Unit tests with UI
npm run e2e             # E2E tests
npm run e2e:ui          # E2E tests with UI
npm run test:all        # All tests
```

### Code Quality

```bash
npm run lint            # ESLint checking
npm run lint:fix        # ESLint with auto-fix
npm run format          # Prettier formatting
npm run format:check    # Prettier validation
```

### Analysis & Monitoring

```bash
npm run analyze         # Bundle size analysis
npm run performance:report  # Performance reporting
```

## Configuration Files

- `next.config.ts`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS setup
- `vitest.config.ts`: Vitest testing configuration
- `playwright.config.ts`: Playwright E2E configuration
- `tsconfig.json`: TypeScript compiler options
- `firebase.json`: Firebase hosting configuration
- `sentry.*.config.ts`: Sentry monitoring setup
