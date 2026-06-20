"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AuthNavLink({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const isAdmin = session?.user?.role === "ADMIN";
  const href = !session?.user ? "/login" : isAdmin ? "/admin" : "/mypage";
  const label = !session?.user ? "Login" : isAdmin ? "Admin" : "My Page";

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className="block px-3 py-3 rounded-xl text-base font-medium hover:bg-[#F1EADA]"
      >
        {label}
      </Link>
    );
  }

  return (
    <Link href={href} className="nav-link">
      {label}
    </Link>
  );
}
