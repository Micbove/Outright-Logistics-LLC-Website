import { requireUser } from "@/lib/session";
import { forceChangePasswordAction } from "./actions";
import { logoutAction } from "@/app/admin/actions";

export const metadata = {
  title: "Change password"
};

export default async function ForcePasswordChangePage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const user = await requireUser();
  const error = typeof searchParams?.error === "string" ? searchParams.error : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-12">
        <div className="max-w-lg">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Change password
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            {user.mustChangePassword
              ? "First login requires a password change."
              : "Update your password."}
          </p>

          <form action={forceChangePasswordAction} className="card mt-6 space-y-4 p-6">
            <div className="space-y-1">
              <label className="label" htmlFor="currentPassword">
                Current password
              </label>
              <input
                className="input"
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="label" htmlFor="newPassword">
                New password
              </label>
              <input
                className="input"
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
              />
              <p className="hint">Minimum 10 characters.</p>
            </div>

            {error ? (
              <p className="text-sm font-medium text-red-700">
                Could not change password. Check your current password and try again.
              </p>
            ) : null}

            <button className="btn-primary" type="submit">
              Save password
            </button>
          </form>

          <form action={logoutAction} className="mt-4">
            <button className="btn-secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

