import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

export const Auth: React.FC = () => (
  <div className="flex items-center md:grid md:grid-cols-2 md:gap-4 md:p-4">
    <SignedIn>
      <UserButton />
      <Button variant="destructive" className="hidden md:inline-flex" asChild>
        <SignOutButton />
      </Button>
    </SignedIn>
  </div>
)
