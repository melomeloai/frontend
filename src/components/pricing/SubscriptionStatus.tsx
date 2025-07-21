import { format } from "date-fns";
import { AlertCircle, Calendar, CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";
import { useSubscription } from "@/hooks/useSubscription";

export const SubscriptionStatus: React.FC = () => {
  const { subscription, isLoading, error } = useSubscription();
  const { subscriptionAPI } = useApi();

  const handleManageSubscription = async () => {
    try {
      const response = await subscriptionAPI.getCustomerPortal();
      window.open(response.portalUrl, "_blank");
      toast.success("Opening customer portal...");
    } catch (error) {
      console.error("Portal error:", error);
      toast.error("Failed to open customer portal");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !subscription) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-destructive">
            <XCircle className="h-4 w-4" />
            <span>Failed to load subscription information</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isFree = subscription.planType === "FREE";
  const isActive = subscription.status === "ACTIVE";
  const isCancelled = subscription.cancelAtPeriodEnd;

  const getStatusIcon = () => {
    if (isFree) return <CheckCircle className="h-4 w-4 text-blue-500" />;
    if (isCancelled) return <AlertCircle className="h-4 w-4 text-orange-500" />;
    if (isActive) return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusText = () => {
    if (isFree) return "Free Plan";
    if (isCancelled) return "Cancelled - Active until period end";
    if (isActive) return "Active";
    return "Inactive";
  };

  const getStatusVariant = () => {
    if (isFree) return "secondary" as const;
    if (isCancelled) return "destructive" as const;
    if (isActive) return "default" as const;
    return "destructive" as const;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getStatusIcon()}
          <span>Current Subscription</span>
        </CardTitle>
        <CardDescription>
          Manage your subscription and billing settings
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Plan</span>
          <div className="flex items-center space-x-2">
            <span className="capitalize">
              {subscription.planType.toLowerCase()}
            </span>
            {subscription.billingCycle && !isFree && (
              <Badge variant="outline" className="text-xs">
                {subscription.billingCycle.toLowerCase()}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status</span>
          <Badge variant={getStatusVariant()}>{getStatusText()}</Badge>
        </div>

        {!isFree && subscription.currentPeriodEnd && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {isCancelled ? "Active Until" : "Next Billing"}
            </span>
            <div className="flex items-center space-x-1 text-sm">
              <Calendar className="h-3 w-3" />
              <span>
                {format(
                  new Date(subscription.currentPeriodEnd),
                  "MMM dd, yyyy"
                )}
              </span>
            </div>
          </div>
        )}

        {isCancelled && (
          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              Your subscription will be cancelled at the end of the current
              billing period. You'll still have access to all premium features
              until then.
            </p>
          </div>
        )}

        {!isFree && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleManageSubscription}
          >
            Manage Subscription
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
