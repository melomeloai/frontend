import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { AuthCallback } from "@/components/auth/AuthCallback";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PublicLayout } from "@/layouts/PublicLayout";
// Public pages
import { Pricing } from "@/pages/public/Pricing";
import { APIAccess } from "@/pages/workspace/APIAccess";
// Workspace pages
import { Create } from "@/pages/workspace/Create";
import { EditRemix } from "@/pages/workspace/EditRemix";
import { Library } from "@/pages/workspace/Library";
import { Plan } from "@/pages/workspace/Plan";
import { Project } from "@/pages/workspace/Project";
import { SessionChat } from "@/pages/workspace/sessions/SessionChat";
import { CLERK_APPEARANCE, ROUTES } from "@/utils/constants";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ClerkProvider appearance={CLERK_APPEARANCE} publishableKey={clerkPubKey}>
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Public routes */}
              <Route
                path={ROUTES.PRICING}
                element={
                  <PublicLayout>
                    <Pricing />
                  </PublicLayout>
                }
              />

              {/* Create page - always with AuthenticatedLayout */}
              <Route
                path={ROUTES.HOME}
                element={
                  <AuthenticatedLayout>
                    <Create />
                  </AuthenticatedLayout>
                }
              />
              <Route
                path={ROUTES.WORKSPACE}
                element={<Navigate to={ROUTES.HOME} replace />}
              />
              <Route
                path={ROUTES.WORKSPACE_CREATE}
                element={<Navigate to={ROUTES.HOME} replace />}
              />
              <Route
                path={ROUTES.WORKSPACE_LIBRARY}
                element={
                  <>
                    <SignedIn>
                      <AuthenticatedLayout>
                        <Library />
                      </AuthenticatedLayout>
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path={ROUTES.WORKSPACE_PLAN}
                element={
                  <>
                    <SignedIn>
                      <AuthenticatedLayout>
                        <Plan />
                      </AuthenticatedLayout>
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path={ROUTES.WORKSPACE_API_ACCESS}
                element={
                  <>
                    <SignedIn>
                      <AuthenticatedLayout>
                        <APIAccess />
                      </AuthenticatedLayout>
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path={ROUTES.WORKSPACE_SESSION}
                element={
                  <>
                    <SignedIn>
                      <AuthenticatedLayout>
                        <SessionChat />
                      </AuthenticatedLayout>
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path={ROUTES.WORKSPACE_PROJECT}
                element={
                  <>
                    <SignedIn>
                      <AuthenticatedLayout>
                        <Project />
                      </AuthenticatedLayout>
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path={ROUTES.WORKSPACE_EDIT_REMIX}
                element={
                  <>
                    <SignedIn>
                      <AuthenticatedLayout>
                        <EditRemix />
                      </AuthenticatedLayout>
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
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
