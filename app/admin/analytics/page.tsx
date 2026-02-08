import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export const metadata = {
  title: "Analytics"
};

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export default async function AnalyticsPage() {
  await requireAdmin();

  const today = startOfDay(new Date());
  const days = 14;
  const from = new Date(today);
  from.setDate(from.getDate() - (days - 1));

  const views = await db.pageView.findMany({
    where: { createdAt: { gte: from } },
    select: { createdAt: true, path: true }
  });

  const byDay = new Map<string, number>();
  for (let i = 0; i < days; i++) {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    byDay.set(d.toISOString().slice(0, 10), 0);
  }

  for (const v of views) {
    const key = v.createdAt.toISOString().slice(0, 10);
    byDay.set(key, (byDay.get(key) ?? 0) + 1);
  }

  const topPaths = new Map<string, number>();
  for (const v of views) {
    topPaths.set(v.path, (topPaths.get(v.path) ?? 0) + 1);
  }
  const top = [...topPaths.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-700">
          Local page-view tracking (no third-party).
        </p>
      </div>

      <div className="card p-6">
        <h2 className="text-sm font-semibold text-slate-900">Daily page views</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold text-slate-600">
              <tr>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Views</th>
              </tr>
            </thead>
            <tbody>
              {[...byDay.entries()].map(([date, count]) => (
                <tr key={date} className="border-t border-slate-100">
                  <td className="py-3 pr-4 text-xs text-slate-600">{date}</td>
                  <td className="py-3 pr-4 font-medium text-slate-900">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-sm font-semibold text-slate-900">Top paths (last 14 days)</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold text-slate-600">
              <tr>
                <th className="py-2 pr-4">Path</th>
                <th className="py-2 pr-4">Views</th>
              </tr>
            </thead>
            <tbody>
              {top.length === 0 ? (
                <tr>
                  <td className="py-3 text-slate-600" colSpan={2}>
                    No data yet.
                  </td>
                </tr>
              ) : (
                top.map(([path, count]) => (
                  <tr key={path} className="border-t border-slate-100">
                    <td className="py-3 pr-4">{path}</td>
                    <td className="py-3 pr-4 font-medium text-slate-900">{count}</td>
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

