import { CreditCard, ExternalLink, LogOut, User } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components//ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApi } from "@/hooks/useApi";
import { useClerk, useUser } from "@clerk/clerk-react";

export const UserMenu: React.FC = () => {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();
  const { subscriptionAPI } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const handleManageAccount = () => {
    // Open Clerk's user profile modal
    if (user) {
      openUserProfile();
    }
  };

  const handleManagePlan = async () => {
    setIsLoading(true);
    try {
      const response = await subscriptionAPI.getCustomerPortal();
      window.open(response.portalUrl, "_blank");
      toast.success("Redirecting to customer portal...");
    } catch (error) {
      console.error("Failed to open customer portal:", error);
      toast.error("Failed to open customer portal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  if (!user) {
    return null;
  }

  const userInitials = user.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">
            {user.fullName || "User"}
          </p>
          <p className="text-xs leading-none text-muted-foreground truncate">
            {user.emailAddresses[0]?.emailAddress}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleManageAccount}>
          <User className="mr-2 h-4 w-4" />
          <span>Manage Account</span>
          <ExternalLink className="ml-auto h-3 w-3" />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleManagePlan} disabled={isLoading}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Manage Plan</span>
          <ExternalLink className="ml-auto h-3 w-3" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
