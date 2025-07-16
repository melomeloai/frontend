import { Route, Routes } from "react-router-dom";

import { Header } from "./components/header/header";
import { PricingTable } from "./components/price-table";
import { ThemeProvider } from "./components/theme-provider";
import { useSubscription } from "./hooks/useSubscription";
import { useUser } from "./hooks/useUser";
import { MainContent } from "./pages/main-page";
import PricingPage from "./pages/pricing-page";

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
      <Routes>
        <Route
          path="/"
          element={
            <MainContent
              onUploadClick={handleUploadClick}
              onGenerateClick={handleGenerateClick}
            />
          }
        />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
