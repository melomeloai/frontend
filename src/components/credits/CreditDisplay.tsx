import { formatDistanceToNow } from "date-fns";
import { Clock, Coins } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCredits } from "@/hooks/useCredits";

export const CreditDisplay: React.FC = () => {
  const { credits, isLoading, error, refetch } = useCredits();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <Coins className="h-4 w-4 text-muted-foreground animate-pulse" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (error || !credits) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => refetch()}
        className="text-destructive"
      >
        <Coins className="h-4 w-4 mr-1" />
        Error
      </Button>
    );
  }

  const totalCredits = credits.permanentCredits + credits.renewableCredits;
  const nextResetTime = new Date(credits.nextResetTime);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="secondary" size="sm" className="space-x-1">
          <Coins className="h-4 w-4" />
          <span>{totalCredits}</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Credit Balance</h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Renewable Credits
              </span>
              <Badge variant="secondary">{credits.renewableCredits}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Permanent Credits
              </span>
              <Badge variant="outline">{credits.permanentCredits}</Badge>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm font-medium">Total Available</span>
              <Badge>{totalCredits}</Badge>
            </div>
          </div>

          {credits.renewableCredits > 0 && (
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                Resets {formatDistanceToNow(nextResetTime, { addSuffix: true })}
              </span>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
