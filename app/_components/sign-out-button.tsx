"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className ?? "portal-signout"}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </button>
  );
}
