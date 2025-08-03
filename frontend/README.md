# Research Process System - Frontend

Modern React frontend infrastructure for the Research Process System (RPS).

## Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Ant Design 5 (with Chinese localization)
- **Routing**: React Router v6
- **Testing**: Playwright (E2E)
- **Code Quality**: ESLint + Prettier

## Features

- 🎨 **Role-based theming**: Different themes for Professor, Student, Secretary, and Leader roles
- 🌓 **Dark mode support**: Toggle between light and dark themes
- 🌐 **Chinese localization**: Full Chinese language support
- 📱 **Responsive design**: Mobile-first approach with Ant Design components
- 🔧 **TypeScript**: Full type safety and IntelliSense
- 🚀 **Fast development**: Hot Module Replacement with Vite
- 🧪 **Testing ready**: Playwright E2E testing setup

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Theme, Auth)
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── constants/      # Application constants
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Application entry point
├── tests/
│   └── e2e/           # Playwright E2E tests
├── public/            # Static assets
└── dist/              # Build output
```

## Development

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript type checking
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run Playwright tests with UI

## Theme System

The application supports role-based theming with the following color schemes:

- **Professor**: Blue (#1A73E8)
- **Student**: Green (#4CAF50)  
- **Secretary**: Purple (#7C4DFF)
- **Leader**: Gold (#FF9800)

Each role has its own theme configuration that automatically applies when the user's role is set.

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_APP_TITLE=Research Process System
VITE_API_BASE_URL=http://localhost:8000
VITE_TEST_MODE=false
VITE_DEV_TOOLS=true
```

## Architecture Notes

- **No content implemented**: This is infrastructure only - no actual pages or features
- **Context-based state management**: Uses React Context for theme and auth state
- **Path aliases**: Uses `@/` for clean imports
- **Strict TypeScript**: All code is fully typed for better maintainability
- **Chinese-first**: Built with Chinese localization as primary language

## Next Steps

This infrastructure is ready for development teams to build upon:

1. Add routing and page components
2. Implement authentication flows
3. Build role-specific dashboards
4. Add business logic and API integration
5. Expand component library