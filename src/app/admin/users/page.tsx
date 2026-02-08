import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { createEmployeeAction, setUserActiveAction } from "./actions";

export const metadata = {
  title: "Employees"
};

export default async function UsersPage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  await requireAdmin();
  const error = typeof searchParams?.error === "string" ? searchParams.error : null;

  const users = await db.user.findMany({
    orderBy: [{ createdAt: "desc" }]
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Employees
        </h1>
        <p className="mt-1 text-sm text-slate-700">
          Create and deactivate internal accounts. No public signup.
        </p>
      </div>

      <div className="card p-6">
        <h2 className="text-sm font-semibold text-slate-900">Create employee</h2>
        <form action={createEmployeeAction} className="mt-4 grid gap-4 md:grid-cols-12">
          {error ? (
            <p className="md:col-span-12 text-sm font-medium text-red-700">
              {error === "exists"
                ? "That email already exists."
                : "Invalid data. Check fields and try again."}
            </p>
          ) : null}
          <div className="md:col-span-4 space-y-1">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" id="email" name="email" type="email" required />
          </div>
          <div className="md:col-span-4 space-y-1">
            <label className="label" htmlFor="name">
              Name (optional)
            </label>
            <input className="input" id="name" name="name" />
          </div>
          <div className="md:col-span-4 space-y-1">
            <label className="label" htmlFor="tempPassword">
              Temp password
            </label>
            <input
              className="input"
              id="tempPassword"
              name="tempPassword"
              type="password"
              required
            />
            <p className="hint">User will be forced to change on first login.</p>
          </div>
          <div className="md:col-span-12">
            <button className="btn-primary" type="submit">
              Create employee
            </button>
          </div>
        </form>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-semibold text-slate-600">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Must change password</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <span className="font-medium text-slate-900">{u.email}</span>
                  {u.name ? (
                    <span className="block text-xs text-slate-600">{u.name}</span>
                  ) : null}
                </td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">{u.active ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{u.mustChangePassword ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <form
                    action={setUserActiveAction.bind(null, u.id, !u.active)}
                    className="inline"
                  >
                    <button className="btn-secondary" type="submit">
                      {u.active ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

