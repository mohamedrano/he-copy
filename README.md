Firebase Studio

This is a NextJS starter in Firebase Studio with comprehensive testing and deployment pipeline.

## Features

- ✅ **Vitest** for unit testing with 80% coverage requirement
- ✅ **Playwright** for E2E testing across multiple browsers
- ✅ **ErrorBoundary** component with Sentry integration
- ✅ **Web Vitals** tracking and monitoring
- ✅ **Sentry** for production monitoring with sourcemaps
- ✅ **GitHub Actions** CI/CD pipeline
- ✅ **Firebase Hosting** deployment configuration
- ✅ **Bundle analysis** with 250KB compressed target
- ✅ **Performance reports** and monitoring

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
# Fill in your configuration values
```

3. Run development server:

```bash
npm run dev
```

## Testing

### Unit Tests

```bash
npm run test              # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
npm run test:ui          # Run tests with UI
```

### E2E Tests

```bash
npm run e2e              # Run E2E tests
npm run e2e:ui           # Run E2E tests with UI
npm run e2e:headed       # Run E2E tests in headed mode
npm run e2e:debug        # Debug E2E tests
```

### All Tests

```bash
npm run test:all         # Run both unit and E2E tests
```

## Build & Deploy



```bash
npm run build            # Build for development
npm run analyze          # Build with bundle analysis
```

### Production

```bash
npm run build:production # Build for production
npm run performance:report # Generate performance report
```

## Monitoring

### Sentry Configuration

1. Create a Sentry project
2. Add environment variables:
   - `NEXT_PUBLIC_SENTRY_DSN`
   - `SENTRY_ORG`
   - `SENTRY_PROJECT`
   - `SENTRY_AUTH_TOKEN`

### Firebase Hosting

1. Configure Firebase project
2. Set up GitHub secrets:
   - `FIREBASE_SERVICE_ACCOUNT_STAGING`
   - `FIREBASE_SERVICE_ACCOUNT_PRODUCTION`
   - `FIREBASE_PROJECT_ID_STAGING`
   - `FIREBASE_PROJECT_ID_PRODUCTION`

## Quality Gates

### Coverage Requirements

- Lines: ≥80%
- Functions: ≥80%
- Branches: ≥80%
- Statements: ≥80%

### Performance Targets

- Bundle size: ≤250KB compressed
- FCP: <1.8s
- LCP: <2.5s
- CLS: <0.1
- FID: <100ms

### CI/CD Pipeline

- Type checking
- Linting
- Unit tests with coverage
- E2E tests
- Bundle size validation
- Automated deployment

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build application
- `npm run test` - Run unit tests
- `npm run e2e` - Run E2E tests
- `npm run lint` - Run linter
- `npm run format` - Format code
- `npm run analyze` - Analyze bundle size
- `npm run performance:report` - Generate performance report

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # UI components with tests
│   └── ErrorBoundary.tsx
├── lib/                # Utilities
│   └── web-vitals.ts   # Web Vitals tracking
└── test/               # Test setup

tests/
└── e2e/                # E2E tests

scripts/
├── bundle-analysis.js   # Bundle size analysis
└── performance-report.js # Performance reporting

.github/
└── workflows/
    └── ci-cd.yml       # CI/CD pipeline
```

To get started, take a look at src/app/page.tsx.
