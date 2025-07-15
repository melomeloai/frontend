import { Button } from "@/components/ui/button";

interface MainContentProps {
  onUploadClick: () => void;
  onGenerateClick: () => void;
}

export function MainContent({
  onUploadClick,
  onGenerateClick,
}: MainContentProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-16">
      <h1 className="text-4xl font-bold mb-8 text-center max-w-xl">
        Welcome to AI Music Generator
        <br />
        Upload your video and get a unique soundtrack created!
      </h1>
      <div className="flex gap-4">
        <Button onClick={onUploadClick}>Upload Video</Button>
        <Button variant="outline" onClick={onGenerateClick}>
          Generate Music
        </Button>
      </div>
    </main>
  );
}
