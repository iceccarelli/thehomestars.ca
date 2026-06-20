"use client";

/**
 * Server already verified the token; this just renders the success state
 * and routes the user to login (we don't have their plaintext password to auto-sign-in).
 */
import Link from "next/link";

export default function VerifyEmailClient({
  email,
  linkedQuotesCount,
}: {
  email: string;
  linkedQuotesCount: number;
}) {
  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1 className="auth-title">Email verified!</h1>
        <p className="auth-sub">
          Your account ({email}) is ready. Sign in with your email and password to access your portal.
        </p>

        {linkedQuotesCount > 0 && (
          <div style={{
            marginTop: "1rem",
            padding: "0.875rem 1rem",
            background: "rgba(74,124,89,0.08)",
            border: "1px solid rgba(74,124,89,0.25)",
            borderRadius: "var(--p-radius-lg)",
            fontSize: "0.9rem",
            color: "var(--ink)",
          }}>
            We found <strong>{linkedQuotesCount}</strong> previous quote request{linkedQuotesCount > 1 ? "s" : ""} and linked {linkedQuotesCount > 1 ? "them" : "it"} to your account.
          </div>
        )}

        <Link
          href="/login?callbackUrl=/mypage"
          className="pbtn pbtn-accent pbtn-lg"
          style={{ marginTop: "1.5rem", display: "inline-block", width: "100%" }}
        >
          Sign in to your account →
        </Link>
      </div>
    </div>
  );
}
