import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 px-4 flex items-center justify-between border-b z-50">
      <div className="text-xl font-bold">AI Music For Video</div>
      <div>
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
