import Link from "next/link";
import { loginAction } from "./actions";

export const metadata = {
  title: "Internal login"
};

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const error = typeof searchParams?.error === "string" ? searchParams.error : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-12">
        <div className="max-w-md">
          <Link href="/" className="text-sm font-semibold text-brand-blue">
            ← Back to site
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
            Internal login
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            This portal is for OUTRIGHT LOGISTICS internal use only.
          </p>

          <form action={loginAction} className="card mt-6 space-y-4 p-6">
            <div className="space-y-1">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            {error ? (
              <p className="text-sm font-medium text-red-700">
                Invalid email or password.
              </p>
            ) : null}

            <button className="btn-primary w-full" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

