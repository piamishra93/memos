"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
      setPassword("");
    }
  }

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          Investment Memos
        </p>
        <h1
          className="font-serif text-4xl font-medium mb-10"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Private access
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none font-mono text-sm py-2 transition-colors placeholder:text-muted/40"
              placeholder="enter password"
            />
            {error && (
              <p className="font-mono text-xs text-muted mt-3">
                Incorrect password.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="font-mono text-xs tracking-widest uppercase border border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
