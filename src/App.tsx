import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";

import { AuthCallback } from "@/components/auth/AuthCallback";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

// Public pages
import { Home } from "@/pages/public/Home";
import { Pricing } from "@/pages/public/Pricing";

// Workspace pages
import { Create } from "@/pages/workspace/Create";
import { Library } from "@/pages/workspace/Library";
import { Plan } from "@/pages/workspace/Plan";

import { ROUTES, CLERK_APPEARANCE } from "@/utils/constants";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ClerkProvider
        appearance={CLERK_APPEARANCE}
        publishableKey={clerkPubKey}
      >
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Public routes */}
              <Route path={ROUTES.HOME} element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              } />
              <Route path={ROUTES.PRICING} element={
                <PublicLayout>
                  <Pricing />
                </PublicLayout>
              } />

              {/* Workspace routes (protected) */}
              <Route path={ROUTES.WORKSPACE} element={
                <Navigate to={ROUTES.WORKSPACE_CREATE} replace />
              } />
              <Route path={ROUTES.WORKSPACE_CREATE} element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Create />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              } />
              <Route path={ROUTES.WORKSPACE_LIBRARY} element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Library />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              } />
              <Route path={ROUTES.WORKSPACE_PLAN} element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Plan />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              } />

              {/* Legacy routes (backwards compatibility) */}
              <Route path={ROUTES.CREATE} element={<Navigate to={ROUTES.WORKSPACE_CREATE} replace />} />
              <Route path={ROUTES.LIBRARY} element={<Navigate to={ROUTES.WORKSPACE_LIBRARY} replace />} />
              <Route path={ROUTES.ACCOUNT} element={<Navigate to={ROUTES.WORKSPACE_PLAN} replace />} />
            </Routes>
            <AuthCallback />
            <Toaster />
          </div>
        </Router>
      </ClerkProvider>
    </ThemeProvider>
  );
}

export default App;
