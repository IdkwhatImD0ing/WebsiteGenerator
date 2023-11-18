'use client';
import { UserButton, useAuth } from '@clerk/nextjs';
export default function TopBar() {
  const { userId } = useAuth();
  return (
    <div>
      <div>
        <a href='/'>Home</a>
      </div>
      {!userId && (
        <div>
          <a href='/sign-in'>Sign In</a>
        </div>
      )}
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}
