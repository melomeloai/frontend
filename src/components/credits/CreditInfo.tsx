import { formatDistanceToNow } from "date-fns";
import { Clock, Coins } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCredits } from "@/hooks/useCredits";

export const CreditInfo: React.FC = () => {
  const { credits, isLoading, error, refetch } = useCredits();

  // Helper function to render credit value with loading/error states
  const renderCreditValue = (
    value: number | undefined,
    variant: "default" | "secondary" | "outline" = "default"
  ) => {
    if (isLoading) {
      return (
        <Badge variant={variant} className="text-xs animate-pulse">
          --
        </Badge>
      );
    }

    if (error || value === undefined) {
      return (
        <Badge variant="destructive" className="text-xs">
          ?
        </Badge>
      );
    }

    return (
      <Badge variant={variant} className="text-xs">
        {value}
      </Badge>
    );
  };

  const availableCredits = credits
    ? credits.permanentCredits +
      credits.renewableCredits -
      credits.frozenCredits
    : undefined;
  const nextResetTime = credits ? new Date(credits.nextResetTime) : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Coins
          className={`h-4 w-4 ${
            isLoading ? "text-muted-foreground animate-pulse" : "text-primary"
          }`}
        />
        <h4 className="text-sm font-semibold">Credit Balance</h4>
        {error && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            className="text-destructive p-0 h-auto ml-auto"
          >
            Retry
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Renewable Credits
          </span>
          {renderCreditValue(credits?.renewableCredits, "secondary")}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Permanent Credits
          </span>
          {renderCreditValue(credits?.permanentCredits, "outline")}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm font-medium">Total Available</span>
          {renderCreditValue(availableCredits, "default")}
        </div>
      </div>

      {credits && credits.renewableCredits > 0 && nextResetTime && (
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            Resets {formatDistanceToNow(nextResetTime, { addSuffix: true })}
          </span>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3 animate-pulse" />
          <span>Loading reset time...</span>
        </div>
      )}
    </div>
  );
};
