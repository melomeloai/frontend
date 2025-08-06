# Frontend Architecture Structure

## Overview
This document describes the current structure and design of the Galileo frontend application, built with React, TypeScript, and TailwindCSS following mobile-first responsive design principles.

## Technical Stack
- **Framework**: React 18 + TypeScript
- **Styling**: TailwindCSS (mobile-first approach)
- **Authentication**: Clerk
- **Routing**: React Router v6
- **UI Components**: Shadcn/ui
- **Build Tool**: Vite
- **Theme**: System theme support with dark/light mode

## Architecture Overview

### Dual Layout System
The application implements a dual-layout architecture that separates pre-login and post-login experiences:

- **Public Layout**: Vertical layout for unauthenticated users
- **Authenticated Layout**: Horizontal layout with responsive sidebar for authenticated users

### Route Architecture
```
Public Routes (unauthenticated):
├── / (Home - Landing Page)
└── /pricing (Pricing Information)

Workspace Routes (authenticated):
├── /workspace → redirects to /workspace/create
├── /workspace/create (Video Creation)
├── /workspace/library (Video Library)  
└── /workspace/plan (Billing & Account)

Legacy Redirects (backwards compatibility):
├── /create → /workspace/create
├── /library → /workspace/library
└── /account → /workspace/plan
```

## File Structure

```
src/
├── App.tsx                          # Main app component with routing
├── main.tsx                         # App entry point
├── index.css                        # Global styles
├── vite-env.d.ts                    # Vite type definitions
│
├── components/                      # Reusable UI components
│   ├── auth/                        # Authentication components
│   │   ├── AuthCallback.tsx         # Clerk auth callback handler
│   │   ├── AuthRedirect.tsx         # Auth state redirect logic
│   │   ├── ProtectedRoute.tsx       # Route protection wrapper
│   │   └── UserMenu.tsx             # User menu dropdown
│   ├── create/                      # Video creation components
│   │   ├── ActionButtons.tsx        # Action buttons (generate, etc)
│   │   ├── DescriptionInput.tsx     # Description input field
│   │   ├── GenerateButton.tsx       # Main generate button
│   │   ├── TaskCard.tsx             # Task status card
│   │   ├── TaskCenter.tsx           # Task management center
│   │   ├── VideoDisplay.tsx         # Video preview display
│   │   ├── VideoFileInfo.tsx        # Video file information
│   │   ├── VideoUpload.tsx          # Video upload logic
│   │   ├── VideoUploadContainer.tsx # Upload container wrapper
│   │   ├── VideoUploadZone.tsx      # Drag & drop upload zone
│   │   └── index.ts                 # Component exports
│   ├── credits/                     # Credit management
│   │   ├── CreditDisplay.tsx        # Credit counter display
│   │   └── CreditInfo.tsx           # Credit information
│   ├── landing/                     # Landing page components
│   │   ├── LandingPage.tsx          # Main landing page
│   │   ├── SampleGallery.tsx        # Sample video gallery
│   │   └── ScrollIndicator.tsx      # Scroll progress indicator
│   ├── pricing/                     # Pricing components
│   │   ├── PricingCard.tsx          # Individual pricing card
│   │   ├── PricingTable.tsx         # Pricing table layout
│   │   └── SubscriptionStatus.tsx   # User subscription status
│   ├── theme-provider.tsx           # Theme context provider
│   └── ui/                          # Shadcn/ui components
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── select.tsx
│       ├── sheet.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
│
├── contexts/                        # React contexts
│   └── VideoMetadataContext.tsx     # Video metadata state management
│
├── hooks/                           # Custom React hooks
│   ├── useApi.ts                    # Generic API hook
│   ├── useCredits.ts                # Credit management hook
│   ├── useDesktopSidebar.ts         # Desktop sidebar state
│   ├── useMobileSidebar.ts          # Mobile sidebar state
│   ├── useMockMusicGeneration.ts    # Mock music generation
│   ├── useSubscription.ts           # Subscription management
│   ├── useTaskAPI.ts                # Task API operations
│   ├── useTaskManager.ts            # Task state management
│   ├── useVideoMetadata.ts          # Video metadata hook
│   └── useVideoUpload.ts            # Video upload logic
│
├── layouts/                         # Layout components
│   ├── PublicLayout.tsx             # Public (pre-login) layout
│   ├── AuthenticatedLayout.tsx      # Authenticated (post-login) layout
│   └── components/                  # Layout-specific components
│       ├── DesktopSidebar.tsx       # Desktop sidebar component
│       ├── MobileSidebar.tsx        # Mobile sidebar component
│       ├── PublicHeader.tsx         # Public layout header
│       └── WorkspaceHeader.tsx      # Workspace header
│
├── lib/                             # Utility libraries
│   └── utils.ts                     # Common utility functions
│
├── pages/                           # Page components
│   ├── public/                      # Public pages
│   │   ├── Home.tsx                 # Public home page
│   │   └── Pricing.tsx              # Public pricing page
│   └── workspace/                   # Workspace pages
│       ├── Create.tsx               # Video creation page
│       ├── Library.tsx              # Video library page
│       └── Plan.tsx                 # Billing & account page
│
├── services/                        # External service integrations
│   └── api.ts                       # API service layer
│
├── types/                           # TypeScript type definitions
│   ├── index.ts                     # Common types
│   ├── task.ts                      # Task-related types
│   └── video.ts                     # Video-related types
│
└── utils/                           # Utility functions
    ├── constants.ts                 # App constants and routes
    ├── fileValidation.ts            # File validation utilities
    ├── navigation.ts                # Shared navigation configuration
    └── videoHelpers.ts              # Video processing helpers
```

## Key Design Patterns

### 1. Responsive Sidebar System
- **Mobile (< md/768px)**: Sidebar hidden by default, accessible via hamburger menu
- **Desktop (≥ md/768px)**: Sidebar visible with collapse/expand functionality
- **State Management**: Separate hooks for mobile (`useMobileSidebar`) and desktop (`useDesktopSidebar`)

### 2. Authentication Flow
- **Clerk Integration**: Seamless authentication with customized appearance
- **Route Protection**: `ProtectedRoute` wrapper for workspace routes
- **Automatic Redirects**: Post-login redirect to workspace/create

### 3. Layout Architecture
```typescript
// Public Layout Structure
<PublicLayout>
  <PublicHeader />      // Logo + Pricing + Sign In
  <main>{children}</main>
</PublicLayout>

// Authenticated Layout Structure
<AuthenticatedLayout>
  <MobileSidebar />     // Mobile: Sheet overlay
  <DesktopSidebar />    // Desktop: Fixed sidebar
  <WorkspaceHeader />   // Mobile: Header with menu button
  <main>{children}</main>
</AuthenticatedLayout>
```

### 4. State Management Strategy
- **Local State**: React hooks for component-specific state
- **Global State**: React Context for shared state (VideoMetadata)
- **Server State**: Custom hooks with API integration
- **UI State**: Dedicated hooks for sidebar, modals, etc.

## Component Conventions

### File Naming
- **Components**: PascalCase (e.g., `VideoUpload.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useVideoUpload.ts`)
- **Types**: camelCase (e.g., `video.ts`)
- **Utils**: camelCase (e.g., `fileValidation.ts`)

### Import Organization
1. React imports
2. External libraries
3. Internal components (@ alias)
4. Types and interfaces
5. Constants and utilities

### Component Structure
```typescript
// Props interface
interface ComponentProps {
  // ...
}

// Component definition
export const Component: React.FC<ComponentProps> = ({
  // destructured props
}) => {
  // hooks
  // state
  // handlers
  
  return (
    // JSX
  );
};
```

## Responsive Design Strategy

### Breakpoint System
- **Single Breakpoint**: `md` (768px) as the primary breakpoint
- **Mobile First**: Base styles target mobile, `md:` prefix for desktop
- **Sidebar Behavior**: Core responsive behavior based on this breakpoint

### CSS Architecture
- **TailwindCSS**: Utility-first approach
- **Component Variants**: Using `cn()` utility for conditional classes
- **Theme System**: CSS variables for color theming
- **Mobile Optimization**: Touch-friendly interactions, appropriate sizing

## Performance Considerations

### Code Splitting
- **Route-based**: Automatic splitting via React Router
- **Component-based**: Dynamic imports for heavy components
- **Asset Optimization**: Vite handles bundling and optimization

### State Management
- **Selective Updates**: Minimized re-renders via proper dependency arrays
- **Memoization**: Strategic use of React.memo and useMemo
- **Context Optimization**: Separate contexts to avoid unnecessary updates

## Security Patterns

### Authentication
- **Clerk Integration**: Industry-standard authentication provider
- **Route Protection**: Server-side validation via Clerk
- **Token Management**: Automatic token refresh and management

### API Security
- **Environment Variables**: Sensitive keys stored in environment
- **Request Validation**: Type-safe API calls with error handling
- **Error Boundaries**: Graceful error handling and user feedback

## Future Considerations

### Scalability
- **Modular Architecture**: Easy to add new features and pages
- **Component Reusability**: Shared components across layouts
- **Hook Extraction**: Reusable business logic in custom hooks

### Maintenance
- **TypeScript**: Strong typing for maintainability
- **Consistent Patterns**: Established conventions across codebase
- **Documentation**: Inline comments and type definitions

## Recent Optimizations (2025-08-06)

### Code Cleanup
- **Removed Legacy Files**: Cleaned up unused legacy page components (`Create.tsx`, `Home.tsx`, `Library.tsx`, `Pricing.tsx`)
- **Consolidated Sidebar Logic**: Removed duplicate sidebar components and hooks
- **Optimized Navigation**: Created shared navigation configuration in `utils/navigation.ts`
- **Fixed TypeScript Issues**: Resolved unused parameter warnings and import cleanup

### Structural Improvements
- **Single Source of Truth**: Navigation items now managed centrally
- **Cleaner Architecture**: Removed redundant components and outdated patterns
- **Better Organization**: Reorganized constants and routes for clarity
- **Improved Maintainability**: Eliminated code duplication across sidebar components

### Performance Benefits
- **Reduced Bundle Size**: Removal of unused components and imports
- **Faster Build Times**: Cleaner dependency graph
- **Better Tree Shaking**: Improved import patterns for smaller production builds

This structure provides a solid foundation for the video generation platform while maintaining flexibility for future enhancements and scaling.