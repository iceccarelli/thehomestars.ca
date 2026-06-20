"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import SocialLoginButtons from "@/app/_components/social-login-buttons";
import type { OAuthProvider } from "@/lib/auth-providers";
import { BRAND } from "@/app/brand";

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  OAuthAccountNotLinked: "This email is already registered. Sign in with email & password, or use the same social login you originally used.",
  OAuthSignin: "Could not start social login. Please try again.",
  OAuthCallback: "Social login failed during callback. Please try again.",
  OAuthCreateAccount: "Could not create account via social login. Please try again.",
  Configuration: "A server configuration error occurred. Please try again later.",
  AccessDenied: "Access was denied. Please try again.",
  Verification: "The sign-in link has expired or already been used.",
};

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm({ enabledProviders }: { enabledProviders: OAuthProvider[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const oauthError = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (oauthError) {
      const message = OAUTH_ERROR_MESSAGES[oauthError] ?? `Sign-in error: ${oauthError}`;
      toast.error(message, { duration: 6000 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password. Please try again.");
        return;
      }

      toast.success("Welcome back!");
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        const session = await getSession();
        router.push(session?.user?.role === "ADMIN" ? "/admin" : "/mypage");
      }
      router.refresh();
    } catch (err) {
      console.error("[login] error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-mark" style={{ width: 44, height: 44 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.5 10v9.5h13V10" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.18" />
            </svg>
          </span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.15rem" }}>{BRAND}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>Customer Portal</div>
          </div>
        </div>

        <h1 className="auth-title">Sign in to your account</h1>
        <p className="auth-sub">Access your quotes, projects, and invoices.</p>

        {enabledProviders.length > 0 && (
          <>
            <SocialLoginButtons enabledProviders={enabledProviders} callbackUrl={callbackUrl ?? "/mypage"} mode="login" />
            <div className="auth-or-divider"><span>or sign in with email</span></div>
          </>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="auth-form">
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={errors.email ? "field-error" : ""}
              {...register("email")}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={errors.password ? "field-error" : ""}
              {...register("password")}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="pbtn pbtn-accent pbtn-lg"
            style={{ width: "100%", marginTop: "0.5rem" }}
            disabled={isLoading}
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link href="/register">Create one — it&apos;s free</Link>
        </p>
      </div>
    </div>
  );
}
