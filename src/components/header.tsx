import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSubscription } from "@/hooks/useSubscription";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

export function Header() {
  const { subscription } = useSubscription();

  return (
    <header className="fixed top-0 left-0 w-full h-16 px-4 flex items-center justify-between border-b z-50">
      <div className="text-xl font-bold">AI Music For Video</div>
      <div className="flex items-center gap-4">
        <SignedIn>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-sm cursor-default">
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
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
