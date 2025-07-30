import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthCallback } from "@/components/auth/AuthCallback";
import { Layout } from "@/components/layout/Layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Create } from "@/pages/Create";
import { Home } from "@/pages/Home";
import { Library } from "@/pages/Library";
import { Pricing } from "@/pages/Pricing";
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
            <Layout>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.CREATE} element={<Create />} />
                <Route path={ROUTES.LIBRARY} element={<Library />} />
                <Route path={ROUTES.PRICING} element={<Pricing />} />
                <Route path={ROUTES.ACCOUNT} element={<Pricing />} />
              </Routes>
            </Layout>
            <AuthCallback />
            <Toaster />
          </div>
        </Router>
      </ClerkProvider>
    </ThemeProvider>
  );
}

export default App;
