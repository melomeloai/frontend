import React from "react";
import { Copy, Key, Code2, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const APIAccess: React.FC = () => {
  const handleCopyApiKey = () => {
    // In a real app, this would copy the actual API key
    navigator.clipboard.writeText("sk-1234567890abcdef...");
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Code2 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
            API Access
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Integrate MeloReels.AI into your applications with our powerful API. Generate music and soundtracks programmatically.
        </p>
      </div>

      {/* API Key Section */}
      <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Key className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">API Key</h2>
          <Badge variant="outline" className="text-xs">Premium Feature</Badge>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Your secret API key is used to authenticate requests. Keep it secure and don't share it publicly.
          </p>
          
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
            <code className="flex-1 text-sm font-mono text-foreground">
              sk-1234567890abcdef1234567890abcdef1234567890abcdef
            </code>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopyApiKey}
              className="h-8 px-3"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            This key is hidden for security. Click copy to get your actual API key.
          </p>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Quick Start</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">1. Install the SDK</h3>
            <div className="bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm relative">
              <code>npm install @meloreels/sdk</code>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopyCode('npm install @meloreels/sdk')}
                className="absolute top-2 right-2 h-8 px-3 text-gray-400 hover:text-gray-100"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">2. Generate Music</h3>
            <div className="bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm relative overflow-x-auto">
              <pre><code>{`import { MeloReels } from '@meloreels/sdk';

const client = new MeloReels({
  apiKey: 'your-api-key-here'
});

const music = await client.generate({
  prompt: 'Upbeat electronic music for a tech video',
  duration: 60,
  style: 'electronic'
});

console.log('Generated music:', music.audioUrl);`}</code></pre>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopyCode(`import { MeloReels } from '@meloreels/sdk';

const client = new MeloReels({
  apiKey: 'your-api-key-here'
});

const music = await client.generate({
  prompt: 'Upbeat electronic music for a tech video',
  duration: 60,
  style: 'electronic'
});

console.log('Generated music:', music.audioUrl);`)}
                className="absolute top-2 right-2 h-8 px-3 text-gray-400 hover:text-gray-100"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Documentation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="#" 
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <h3 className="font-medium group-hover:text-primary transition-colors">API Reference</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Complete API documentation with examples
            </p>
          </a>
          
          <a 
            href="#" 
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <h3 className="font-medium group-hover:text-primary transition-colors">SDK Documentation</h3>
            <p className="text-sm text-muted-foreground mt-1">
              JavaScript/TypeScript SDK guide
            </p>
          </a>
          
          <a 
            href="#" 
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <h3 className="font-medium group-hover:text-primary transition-colors">Rate Limits</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Understanding API limits and quotas
            </p>
          </a>
          
          <a 
            href="#" 
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <h3 className="font-medium group-hover:text-primary transition-colors">Webhooks</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Set up webhooks for async processing
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};