import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSubscription } from "@/hooks/useSubscription";
import { UserButton } from "@clerk/clerk-react";

export function UserInfo() {
  const { subscription } = useSubscription();

  return (
    <div className="flex items-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-md cursor-default">
              Credits: {subscription?.currentCredit ?? "--"}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Next reset:{" "}
              {subscription?.nextResetAt
                ? new Date(subscription.nextResetAt).toLocaleString()
                : "--"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UserButton />
    </div>
  );
}
