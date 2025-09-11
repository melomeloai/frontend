import React from "react";
import { HelpCircle, Book } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/auth/UserMenu";
import { useCredits } from "@/hooks/useCredits";

export const TopHeader: React.FC = () => {
  const { credits, isLoading } = useCredits();

  const availableCredits = credits
    ? credits.permanentCredits +
      credits.renewableCredits -
      credits.frozenCredits
    : undefined;

  const renderCreditValue = () => {
    if (isLoading) {
      return (
        <span className="animate-pulse">--</span>
      );
    }

    if (!credits || availableCredits === undefined) {
      return "?";
    }

    return availableCredits;
  };

  return (
    <header className="flex items-center justify-end gap-3 p-4 pb-0">
      {/* Credits Display */}
      <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2 border border-border/30">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
          <span className="text-xs text-white">💎</span>
        </div>
        <span className="font-medium text-sm">{renderCreditValue()}</span>
        <span className="text-xs text-muted-foreground">Free trial</span>
      </div>

      {/* Action Buttons */}
      <Button 
        variant="ghost" 
        size="sm"
        className="w-9 h-9 p-0 rounded-full bg-muted/50 hover:bg-muted border border-border/30"
      >
        <HelpCircle className="h-4 w-4" />
      </Button>

      <Button 
        variant="ghost" 
        size="sm"
        className="w-9 h-9 p-0 rounded-full bg-muted/50 hover:bg-muted border border-border/30"
      >
        <Book className="h-4 w-4" />
      </Button>

      {/* User Avatar */}
      <UserMenu showFullInfo={false} />
    </header>
  );
};