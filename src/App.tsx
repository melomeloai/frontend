import { Header } from "./components/header";
import { MainContent } from "./components/main-content";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  function handleUploadClick() {
    alert("Open file picker / upload dialog (todo)");
  }

  function handleGenerateClick() {
    alert("Call backend to generate music (todo)");
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <MainContent
        onUploadClick={handleUploadClick}
        onGenerateClick={handleGenerateClick}
      />
    </ThemeProvider>
  );
}

export default App;
