import { useAuth, useClerk, useSignIn } from "@clerk/clerk-react";

import { Header } from "./components/header";
import { MainContent } from "./components/main-content";
import { PricingTable } from "./components/price-table";
import { ThemeProvider } from "./components/theme-provider";
import { useSubscription } from "./hooks/useSubscription";
import { useUser } from "./hooks/useUser";

function App() {
  const { user } = useUser();

  const { subscription } = useSubscription();

  function handleUploadClick() {
    alert("Open file picker / upload dialog (todo)");
  }

  async function handleGenerateClick() {
    alert("Generate button clicked (todo)");
    console.log(
      "Generate button clicked, current user:",
      user,
      "subscription:",
      subscription
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <MainContent
        onUploadClick={handleUploadClick}
        onGenerateClick={handleGenerateClick}
      />
      <PricingTable
        currentPlan={subscription?.currentPlan}
        onUpgrade={(plan) => alert(`Upgrade to ${plan} plan (todo)`)}
      />
    </ThemeProvider>
  );
}

export default App;
