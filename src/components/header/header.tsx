import { Link } from "react-router-dom";

import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";

import { Button } from "../ui/button";
import { UserInfo } from "./user-info";

export function Header() {
  const { openSignIn } = useClerk();
  return (
    <header className="fixed top-0 left-0 w-full h-16 px-4 flex items-center justify-between border-b z-50">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold">
          AI Music For Video
        </Link>
        <Link to="/pricing" className="text-lg">
          Pricing
        </Link>
      </div>
      <SignedIn></SignedIn>
      <SignedOut>
        <Button onClick={() => openSignIn()}>Sign In</Button>
      </SignedOut>
      <SignedIn>
        <UserInfo />
      </SignedIn>
    </header>
  );
}
