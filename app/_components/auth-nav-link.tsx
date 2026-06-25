"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";

export default function AuthNavLink({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  if (status === "loading") return null;

  const isAdmin = session?.user?.role === "ADMIN";
  const href = isAdmin ? "/admin" : "/mypage";
  const label = isAdmin ? "Admin" : "My Page";

  if (!session?.user) {
    if (variant === "mobile") {
      return (
        <Link
          href="/login"
          onClick={onNavigate}
          className="block px-3 py-3 rounded-xl text-base font-medium hover:bg-[#F1EADA]"
        >
          Login
        </Link>
      );
    }
    return (
      <Link href="/login" className="nav-link">
        Login
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="space-y-1">
        <Link
          href={href}
          onClick={onNavigate}
          className="flex items-center gap-2 px-3 py-3 rounded-xl text-base font-medium hover:bg-[#F1EADA]"
        >
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </Link>
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            signOut({ callbackUrl: "/" });
          }}
          className="flex items-center gap-2 px-3 py-3 rounded-xl text-base font-medium hover:bg-[#F1EADA] w-full text-left"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="user-menu-trigger nav-link"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="user-menu-panel">
          <div className="user-menu-name">{session.user.name}</div>
          <div className="user-menu-email">{session.user.email}</div>
          <div className="user-menu-divider" />
          <Link href={href} onClick={() => setOpen(false)} className="user-menu-item">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="user-menu-item danger"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
