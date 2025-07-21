import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";
import { Home } from "@/pages/Home";
import { Library } from "@/pages/Library";
import { Pricing } from "@/pages/Pricing";
import { ROUTES } from "@/utils/constants";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="dark">
          {" "}
          {/* Force dark mode */}
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.PRICING} element={<Pricing />} />
              <Route path={ROUTES.ACCOUNT} element={<Pricing />} />
              <Route path={ROUTES.LIBRARY} element={<Library />} />
            </Routes>
          </Layout>
          <Toaster />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
