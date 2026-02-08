import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { logoutAction } from "./actions";
import { AnalyticsTracker } from "@/components/shared/AnalyticsTracker";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (user.mustChangePassword) redirect("/force-password-change");

  return (
    <div className="min-h-screen bg-slate-50">
      <AnalyticsTracker />
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link className="text-sm font-semibold tracking-wide text-brand-blue" href="/admin">
              OUTRIGHT LOGISTICS
            </Link>
            <span className="text-xs text-slate-600">Internal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{user.email}</p>
              <p className="text-xs text-slate-600">
                {user.role === "ADMIN" ? "Admin" : "Employee"}
              </p>
            </div>
            <form action={logoutAction}>
              <button className="btn-secondary" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-page py-6">
        <div className="grid gap-6 md:grid-cols-12">
          <aside className="md:col-span-3">
            <nav className="card p-4 text-sm">
              <div className="space-y-1">
                <Link className="block rounded px-2 py-1 hover:bg-slate-50" href="/admin">
                  Dashboard
                </Link>
                <Link
                  className="block rounded px-2 py-1 hover:bg-slate-50"
                  href="/admin/clients"
                >
                  Clients
                </Link>
                <Link
                  className="block rounded px-2 py-1 hover:bg-slate-50"
                  href="/admin/documents"
                >
                  Documents
                </Link>
                <Link
                  className="block rounded px-2 py-1 hover:bg-slate-50"
                  href="/admin/analytics"
                >
                  Analytics
                </Link>
                {user.role === "ADMIN" ? (
                  <Link
                    className="block rounded px-2 py-1 hover:bg-slate-50"
                    href="/admin/users"
                  >
                    Employees
                  </Link>
                ) : null}
              </div>
            </nav>
          </aside>

          <main className="md:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}

