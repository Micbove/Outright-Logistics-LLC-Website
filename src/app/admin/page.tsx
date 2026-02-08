import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";

export const metadata = {
  title: "Admin dashboard"
};

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export default async function AdminDashboardPage() {
  await requireUser();

  const today = startOfDay(new Date());
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const [clientsByStatus, recentLeads, docsCount, pageViewsToday, pageViews7d] =
    await Promise.all([
      db.client.groupBy({
        by: ["status"],
        _count: { _all: true }
      }),
      db.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      }),
      db.document.count(),
      db.pageView.count({ where: { createdAt: { gte: today } } }),
      db.pageView.count({ where: { createdAt: { gte: weekAgo } } })
    ]);

  const statusCount = Object.fromEntries(
    clientsByStatus.map((x) => [x.status, x._count._all])
  ) as Record<string, number>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-700">
            Operational snapshot. Keep it simple.
          </p>
        </div>
        <div className="flex gap-2">
          <Link className="btn-primary" href="/admin/clients/new">
            New client
          </Link>
          <Link className="btn-secondary" href="/admin/documents/new">
            New document
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs font-semibold text-slate-600">Clients</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {(statusCount.ACTIVE ?? 0) + (statusCount.LEAD ?? 0) + (statusCount.COMPLETED ?? 0)}
          </p>
          <div className="mt-3 space-y-1 text-sm text-slate-700">
            <p>
              <span className="font-medium text-slate-900">Lead:</span>{" "}
              {statusCount.LEAD ?? 0}
            </p>
            <p>
              <span className="font-medium text-slate-900">Active:</span>{" "}
              {statusCount.ACTIVE ?? 0}
            </p>
            <p>
              <span className="font-medium text-slate-900">Completed:</span>{" "}
              {statusCount.COMPLETED ?? 0}
            </p>
          </div>
        </div>

        <div className="card p-5">
          <p className="text-xs font-semibold text-slate-600">Documents</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{docsCount}</p>
          <p className="mt-2 text-sm text-slate-700">
            Metadata only today. File storage can be added later.
          </p>
        </div>

        <div className="card p-5">
          <p className="text-xs font-semibold text-slate-600">Page views</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {pageViewsToday}
          </p>
          <p className="mt-2 text-sm text-slate-700">
            <span className="font-medium text-slate-900">Last 7 days:</span>{" "}
            {pageViews7d}
          </p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Recent contact submissions
          </h2>
          <span className="text-xs text-slate-600">Latest 5</span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold text-slate-600">
              <tr>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Company</th>
                <th className="py-2 pr-4">Email</th>
              </tr>
            </thead>
            <tbody className="text-slate-800">
              {recentLeads.length === 0 ? (
                <tr>
                  <td className="py-3 text-sm text-slate-600" colSpan={4}>
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                recentLeads.map((x) => (
                  <tr key={x.id} className="border-t border-slate-100">
                    <td className="py-3 pr-4 text-xs text-slate-600">
                      {x.createdAt.toISOString().slice(0, 10)}
                    </td>
                    <td className="py-3 pr-4">{x.name}</td>
                    <td className="py-3 pr-4">{x.company}</td>
                    <td className="py-3 pr-4">{x.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

