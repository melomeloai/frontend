import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { AuthCallback } from "@/components/auth/AuthCallback";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PublicLayout } from "@/layouts/PublicLayout";
// Public pages
import { Home } from "@/pages/public/Home";
import { Pricing } from "@/pages/public/Pricing";
// Workspace pages
import { Create } from "@/pages/workspace/Create";
import { Library } from "@/pages/workspace/Library";
import { Plan } from "@/pages/workspace/Plan";
import { SessionChat } from "@/pages/workspace/sessions/SessionChat";
import { CLERK_APPEARANCE, ROUTES } from "@/utils/constants";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ClerkProvider appearance={CLERK_APPEARANCE} publishableKey={clerkPubKey}>
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Public routes */}
              <Route
                path={ROUTES.HOME}
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                }
              />
              <Route
                path={ROUTES.PRICING}
                element={
                  <PublicLayout>
                    <Pricing />
                  </PublicLayout>
                }
              />

              {/* Workspace routes (protected) */}
              <Route
                path={ROUTES.WORKSPACE}
                element={<Navigate to={ROUTES.WORKSPACE_CREATE} replace />}
              />
              <Route
                path={ROUTES.WORKSPACE_CREATE}
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <Create />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.WORKSPACE_LIBRARY}
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <Library />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.WORKSPACE_PLAN}
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <Plan />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.WORKSPACE_SESSION}
                element={
                  <ProtectedRoute>
                    <AuthenticatedLayout>
                      <SessionChat />
                    </AuthenticatedLayout>
                  </ProtectedRoute>
                }
              />
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
